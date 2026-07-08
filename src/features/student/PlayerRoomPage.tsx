import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Loading } from '@/shared/components';
import {
  subscribeToPublicRoomState,
  subscribeToPlayer,
  subscribeToPlayers,
  subscribeToPlayerAnswer,
  getPublicQuestions,
  submitAnswer,
} from '@/services';
import { Answer, Player, PublicQuestion, PublicRoomState } from '@/types';
import { playSound } from '@/utils/sound';
import { useCountdown } from '@/shared/hooks';
import { ANSWER_COLORS } from '@/constants';

export function PlayerRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [room, setRoom] = useState<PublicRoomState | null>(null);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [playerCount, setPlayerCount] = useState(0);
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<PublicQuestion | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [, setSelectedAnswer] = useState<string | null>(null);
  const [myAnswer, setMyAnswer] = useState<Answer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const countdown = useCountdown({
    onTick: (remaining) => {
      if (remaining <= 3 && remaining > 0) {
        playSound('countdown', settings.soundEnabled);
      }
    },
  });

  const myScore = useMemo(() => myPlayer?.score ?? 0, [myPlayer]);
  const myCorrectCount = useMemo(() => myPlayer?.correctCount ?? 0, [myPlayer]);

  useEffect(() => {
    if (!roomId || !user) return;
    setIsLoading(true);

    const unsubRoom = subscribeToPublicRoomState(roomId, async (r) => {
      if (!r) {
        console.error('Room not found or insufficient permissions:', roomId);
        setError('ゲームが見つからないか、接続に失敗しました');
        setIsLoading(false);
        // Do not navigate away immediately so user can see the error
        return;
      }
      setRoom(r);

      // Load questions on first connect
      if (questions.length === 0) {
        try {
          const qs = await getPublicQuestions(roomId);
          setQuestions(qs);
        } catch {
          // Retry on next state change
        }
        setIsLoading(false);
      }

      // Update current question based on room state
      if (r.status === 'showing-question' || r.status === 'accepting-answers') {
        setHasAnswered(false);
        setSelectedAnswer(null);
        setMyAnswer(null);
      }
    });

    const unsubPlayer = subscribeToPlayer(roomId, user.uid, (p) => {
      setMyPlayer(p);
    });

    // Also subscribe to players to get real-time count
    const unsubPlayers = subscribeToPlayers(roomId, (ps) => {
      setPlayerCount(ps.length);
    });

    return () => {
      unsubRoom();
      unsubPlayer();
      unsubPlayers();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user, navigate]);

  useEffect(() => {
    if (!roomId || !user || !currentQuestion) return;
    return subscribeToPlayerAnswer(roomId, currentQuestion.id, user.uid, (answer) => {
      setMyAnswer(answer);
    });
  }, [roomId, user, currentQuestion?.id]);

  useEffect(() => {
    if (!room || questions.length === 0) return;
    if (room.currentQuestionIndex >= 0 && room.currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[room.currentQuestionIndex]);
      if (room.status === 'accepting-answers' && room.currentQuestionStartedAt) {
        const elapsed = Math.floor((Date.now() - room.currentQuestionStartedAt) / 1000);
        const remaining = Math.max(0, questions[room.currentQuestionIndex].timeLimit - elapsed);
        if (remaining > 0 && !hasAnswered) {
          countdown.start(remaining);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.currentQuestionIndex, room?.status, questions]);

  const handleAnswer = async (choiceId: string) => {
    if (!roomId || !user || !currentQuestion || !room || hasAnswered) return;
    
    setHasAnswered(true);
    setSelectedAnswer(choiceId);
    countdown.stop();

    playSound('button', settings.soundEnabled);

    try {
      await submitAnswer(roomId, currentQuestion.id, user.uid, choiceId);
    } catch {
      // Answer may have been submitted already
    }
  };

  if (isLoading) return <Loading fullScreen text="ゲームに接続中..." />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary-600 rounded-lg font-bold"
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Waiting */}
      {room.status === 'waiting' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <div className="animate-pulse-slow">
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">待機中...</h2>
          <p className="text-gray-400">ゲームの開始を待っています</p>
          <p className="text-gray-500 mt-4">{playerCount || room.playerCount}人が参加中</p>
          {myPlayer && (
            <p className="text-primary-400 mt-2">あなた: {myPlayer.nickname}</p>
          )}
        </motion.div>
      )}

      {/* Showing Question (countdown before answers) */}
      {room.status === 'showing-question' && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <p className="text-gray-400 mb-4">問題 {room.currentQuestionIndex + 1}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center">{currentQuestion.text}</h2>
          {currentQuestion.imageUrl && (
            <img src={currentQuestion.imageUrl} alt="" className="max-h-48 mt-4 rounded-lg" />
          )}
          <p className="text-gray-400 mt-6">まもなく回答開始...</p>
        </motion.div>
      )}

      {/* Accepting Answers */}
      {room.status === 'accepting-answers' && currentQuestion && !hasAnswered && (
        <div className="flex-1 flex flex-col p-4">
          {/* Timer */}
          <div className="text-center mb-4">
            <motion.span
              className="text-4xl font-bold text-primary-400"
              animate={{ scale: countdown.remaining <= 5 ? [1, 1.3, 1] : 1 }}
            >
              {countdown.remaining}
            </motion.span>
          </div>

          {/* Answer buttons - Kahoot! style */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.choices.map((choice, index) => {
              const color = ANSWER_COLORS[index as keyof typeof ANSWER_COLORS];
              return (
                <motion.button
                  key={choice.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(choice.id)}
                  className={`${color?.bg || 'bg-gray-700'} rounded-2xl p-6 md:p-8 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg active:shadow-sm transition-shadow min-h-[100px]`}
                >
                  {choice.text}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Answer result */}
      {room.status === 'closed' && hasAnswered && myAnswer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4 text-center"
        >
          <div className="text-6xl mb-4">{myAnswer.isCorrect ? '○' : '×'}</div>
          <h2 className={`text-3xl font-bold ${myAnswer.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {myAnswer.isCorrect ? '正解！' : '不正解'}
          </h2>
          <p className="text-gray-300 mt-3 text-xl">+{myAnswer.score}点</p>
          <p className="text-gray-400 mt-2">次の画面を待っています...</p>
        </motion.div>
      )}

      {/* Answered - waiting for result */}
      {(hasAnswered || (room.status === 'accepting-answers' && hasAnswered) || room.status === 'closed') && hasAnswered && !(room.status === 'closed' && myAnswer) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <AnimatePresence mode="wait">
            <motion.div key="waiting" className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold">回答済み</h2>
              <p className="text-gray-400 mt-2">結果を待っています...</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Not answered and time's up */}
      {room.status === 'closed' && !hasAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-400">時間切れ</h2>
        </motion.div>
      )}

      {/* Ranking */}
      {room.status === 'showing-ranking' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <h2 className="text-2xl font-bold mb-2">現在のスコア</h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-primary-400 mb-4"
          >
            {myScore}点
          </motion.div>
          <p className="text-gray-400">現在のスコア</p>
        </motion.div>
      )}

      {/* Final Results */}
      {room.status === 'finished' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-4"
        >
          <h2 className="text-3xl font-bold mb-4">最終結果</h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-6"
          >
            <p className="text-6xl font-bold text-primary-400 mb-2">{myScore}点</p>
            <p className="text-gray-400 mt-2">{myCorrectCount}問正解</p>
          </motion.div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 text-primary-400 hover:underline"
          >
            ホームに戻る
          </button>
        </motion.div>
      )}
    </div>
  );
}
