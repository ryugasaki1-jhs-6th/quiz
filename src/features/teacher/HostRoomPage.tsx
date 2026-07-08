import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { Button, Loading } from '@/shared/components';
import {
  getRoom,
  getQuestions,
  getGame,
  updateRoomStatus,
  subscribeToRoom,
  subscribeToPlayers,
  subscribeToAnswers,
  getAnswersForQuestion,
  saveQuestionResult,
  removePlayer,
} from '@/services';
import { Room, Player, Question, Answer, RankingEntry } from '@/types';
import { shuffleArray } from '@/utils';
import { playSound } from '@/utils/sound';
import { useCountdown } from '@/shared/hooks';
import { ANSWER_COLORS } from '@/constants';

export function HostRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const countdown = useCountdown({
    onComplete: () => {
      handleTimeUp();
    },
    onTick: (remaining) => {
      if (remaining <= 3 && remaining > 0) {
        playSound('countdown', settings.soundEnabled);
      }
    },
  });

  const rankings: RankingEntry[] = useMemo(() => {
    return [...players]
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || a.joinedAt - b.joinedAt)
      .map((p, i) => ({
        playerId: p.id,
        nickname: p.nickname,
        score: p.score ?? 0,
        correctCount: p.correctCount ?? 0,
        rank: i + 1,
      }));
  }, [players]);

  const fetchInitialData = useCallback(async () => {
    if (!roomId) return;
    setIsLoading(true);
    try {
      const roomData = await getRoom(roomId);
      if (!roomData) {
        navigate('/');
        return;
      }
      setRoom(roomData);

      const game = await getGame(roomData.gameId);
      if (!game) return;

      let qs = await getQuestions(roomData.gameId);
      if (roomData.questionOrder?.length) {
        const order = new Map(roomData.questionOrder.map((id, index) => [id, index]));
        qs = qs
          .filter((question) => order.has(question.id))
          .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
      } else if (game.shuffleQuestions) {
        qs = shuffleArray(qs);
      }
      setQuestions(qs);
    } catch (error) {
      console.error('fetchInitialData error:', error);
      alert('データの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, [roomId, navigate]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (!roomId) return;
    const unsubRoom = subscribeToRoom(roomId, (r) => {
      if (r) setRoom(r);
    });
    const unsubPlayers = subscribeToPlayers(roomId, (p) => {
      setPlayers(p);
    });
    return () => {
      unsubRoom();
      unsubPlayers();
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !currentQuestion) return;
    const unsub = subscribeToAnswers(roomId, currentQuestion.id, (a) => {
      setAnswers(a);
    });
    return () => unsub();
  }, [roomId, currentQuestion]);

  const handleStartGame = async () => {
    if (!roomId || questions.length === 0) return;
    try {
      playSound('gameStart', settings.soundEnabled);
      await updateRoomStatus(roomId, 'playing', { currentQuestionIndex: 0 });
      showNextQuestion(0);
    } catch (error) {
      console.error('handleStartGame error:', error);
      alert('ゲームの開始に失敗しました。');
    }
  };

  const showNextQuestion = async (index: number) => {
    if (!roomId) return;
    const question = questions[index];
    if (!question) {
      await handleEndGame();
      return;
    }
    setCurrentQuestion(question);
    setAnswers([]);
    setShowResult(false);
    await updateRoomStatus(roomId, 'showing-question', {
      currentQuestionIndex: index,
      currentQuestionStartedAt: Date.now(),
      currentPublicQuestionId: question.id,
    });

    setTimeout(async () => {
      await updateRoomStatus(roomId, 'accepting-answers');
      countdown.start(question.timeLimit);
    }, 3000);
  };

  const handleTimeUp = async () => {
    if (!roomId || !currentQuestion) return;
    await updateRoomStatus(roomId, 'closed');
    setShowResult(true);

    const allAnswers = await getAnswersForQuestion(roomId, currentQuestion.id);
    const correctCount = allAnswers.filter(a => a.isCorrect).length;
    const choiceDistribution: Record<string, number> = {};
    currentQuestion.choices.forEach(c => { choiceDistribution[c.id] = 0; });
    allAnswers.forEach(a => {
      if (choiceDistribution[a.choiceId] !== undefined) {
        choiceDistribution[a.choiceId]++;
      }
    });

    await saveQuestionResult(roomId, {
      roomId,
      questionId: currentQuestion.id,
      totalPlayers: players.length,
      correctCount,
      averageTime: allAnswers.length > 0
        ? allAnswers.reduce((sum, a) => sum + a.timeTaken, 0) / allAnswers.length
        : 0,
      choiceDistribution,
    });
  };

  const handleShowRanking = async () => {
    if (!roomId) return;
    playSound('ranking', settings.soundEnabled);
    await updateRoomStatus(roomId, 'showing-ranking');
  };

  const handleNextQuestion = async () => {
    if (!roomId || !room) return;
    const nextIndex = room.currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      await handleEndGame();
    } else {
      showNextQuestion(nextIndex);
    }
  };

  const handleEndGame = async () => {
    if (!roomId) return;
    playSound('gameEnd', settings.soundEnabled);
    await updateRoomStatus(roomId, 'finished');
  };

  const handleKickPlayer = async (playerId: string) => {
    if (!roomId) return;
    if (!confirm('このプレイヤーを退出させますか？')) return;
    await removePlayer(roomId, playerId);
  };

  if (isLoading) return <Loading fullScreen />;
  if (!room) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Waiting Room */}
        {room.status === 'waiting' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">待機中</h1>
            <div className="bg-gray-800 rounded-2xl p-8 inline-block mb-8">
              <p className="text-gray-400 text-sm mb-2">PIN コード</p>
              <p className="text-6xl font-mono font-bold tracking-widest text-primary-400">{room.pin}</p>
            </div>
            <p className="text-xl text-gray-300 mb-8">参加者: {players.length}人</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-3xl mx-auto mb-8">
              {players.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gray-800 rounded-xl p-3 flex items-center justify-between"
                >
                  <span className="text-sm truncate">{player.nickname}</span>
                  <button
                    onClick={() => handleKickPlayer(player.id)}
                    className="text-red-400 hover:text-red-300 ml-2 text-xs"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>

            <Button size="lg" onClick={handleStartGame} disabled={players.length === 0 || questions.length === 0}>
              ゲーム開始 ({questions.length}問)
            </Button>
          </motion.div>
        )}

        {/* Question Display */}
        {(room.status === 'showing-question' || room.status === 'accepting-answers' || room.status === 'closed') && currentQuestion && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400">
                問題 {room.currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="text-gray-400">
                回答: {answers.length} / {players.length}
              </span>
            </div>

            {/* Timer */}
            {countdown.isRunning && (
              <div className="text-center mb-6">
                <motion.div
                  className="text-6xl font-bold text-primary-400"
                  animate={{ scale: countdown.remaining <= 5 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {countdown.remaining}
                </motion.div>
              </div>
            )}

            {/* Question text */}
            <div className="bg-gray-800 rounded-2xl p-8 mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">{currentQuestion.text}</h2>
              {currentQuestion.imageUrl && (
                <img src={currentQuestion.imageUrl} alt="" className="max-h-64 mx-auto mt-4 rounded-lg" />
              )}
            </div>

            {/* Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQuestion.choices.map((choice, index) => {
                const color = ANSWER_COLORS[index as keyof typeof ANSWER_COLORS];
                const answerCount = answers.filter(a => a.choiceId === choice.id).length;
                return (
                  <div
                    key={choice.id}
                    className={`${color?.bg || 'bg-gray-700'} rounded-xl p-6 relative overflow-hidden`}
                  >
                    <span className="text-xl font-bold">{choice.text}</span>
                    {showResult && (
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        <span className="text-sm opacity-80">{answerCount}人</span>
                        {choice.isCorrect && <span className="text-2xl">✓</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Result / Controls */}
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                {currentQuestion.explanation && (
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-300">{currentQuestion.explanation}</p>
                  </div>
                )}
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleShowRanking}>ランキング表示</Button>
                  <Button variant="secondary" onClick={handleNextQuestion}>
                    {room.currentQuestionIndex + 1 >= questions.length ? '結果発表' : '次の問題'}
                  </Button>
                </div>
              </motion.div>
            )}

            {room.status === 'accepting-answers' && !showResult && (
              <div className="text-center">
                <Button variant="danger" onClick={handleTimeUp}>締め切る</Button>
              </div>
            )}
          </div>
        )}

        {/* Ranking */}
        {room.status === 'showing-ranking' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-3xl font-bold mb-8">ランキング</h2>
            <div className="max-w-lg mx-auto space-y-3">
              {rankings.slice(0, 10).map((entry, index) => (
                <motion.div
                  key={entry.playerId}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-4 flex items-center gap-4"
                >
                  <span className="text-2xl font-bold text-primary-400 w-10">{entry.rank}</span>
                  <span className="flex-1 text-left font-medium">{entry.nickname}</span>
                  <span className="text-xl font-bold">{entry.score}</span>
                </motion.div>
              ))}
            </div>
            <Button className="mt-8" onClick={handleNextQuestion}>
              {room.currentQuestionIndex + 1 >= questions.length ? '結果発表' : '次の問題'}
            </Button>
          </motion.div>
        )}

        {/* Final Results */}
        {room.status === 'finished' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <h2 className="text-4xl font-bold mb-2">最終結果</h2>
            <p className="text-gray-400 mb-8">お疲れ様でした！</p>
            <div className="max-w-lg mx-auto space-y-3 mb-8">
              {rankings.map((entry, index) => (
                <motion.div
                  key={entry.playerId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-4 flex items-center gap-4 ${
                    index === 0 ? 'bg-yellow-600/20 border border-yellow-500' :
                    index === 1 ? 'bg-gray-400/10 border border-gray-400' :
                    index === 2 ? 'bg-orange-600/10 border border-orange-500' :
                    'bg-gray-800'
                  }`}
                >
                  <span className="text-2xl font-bold w-10">{entry.rank}</span>
                  <span className="flex-1 text-left font-medium">{entry.nickname}</span>
                  <div className="text-right">
                    <p className="text-xl font-bold">{entry.score}</p>
                    <p className="text-xs text-gray-400">{entry.correctCount}問正解</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button onClick={() => navigate('/')}>ホームに戻る</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
