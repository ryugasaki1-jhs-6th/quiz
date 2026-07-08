import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/shared/components';
import { getRoomByPin, joinRoom } from '@/services';
import { useLocalStorage } from '@/shared/hooks';
import { STORAGE_KEYS, PIN_LENGTH } from '@/constants';

const joinSchema = z.object({
  pin: z.string().length(PIN_LENGTH, `PINは${PIN_LENGTH}桁です`),
  nickname: z.string().min(1, 'ニックネームを入力してください').max(15, '15文字以下にしてください'),
});

type JoinForm = z.infer<typeof joinSchema>;

export function JoinPage() {
  const { user, signInAnonymously } = useAuth();
  const navigate = useNavigate();
  const [savedNickname, setSavedNickname] = useLocalStorage(STORAGE_KEYS.NICKNAME, '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<JoinForm>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      pin: '',
      nickname: savedNickname || user?.displayName || '',
    },
  });

  const onSubmit = async (data: JoinForm) => {
    setError('');
    setIsLoading(true);
    try {
      // Sign in anonymously if not already signed in
      let currentUser = user;
      if (!currentUser) {
        currentUser = await signInAnonymously();
      }

      const room = await getRoomByPin(data.pin);
      if (!room) {
        setError('このPINのゲームが見つかりません');
        return;
      }
      if (room.status === 'finished') {
        setError('このゲームは終了しています');
        return;
      }

      await joinRoom(room.roomId, currentUser.uid, data.nickname);
      setSavedNickname(data.nickname);
      navigate(`/room/${room.roomId}/play`);
    } catch (err: any) {
      console.error('Join error:', err);
      setError(`参加に失敗しました: ${err.message || '不明なエラー'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md"
      >
        <Link to="/" className="text-primary-600 hover:underline text-sm mb-4 inline-block">&larr; ホームに戻る</Link>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ゲームに参加</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">PINコードとニックネームを入力してください</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PINコード</label>
            <input
              type="text"
              {...register('pin')}
              className="input-field text-center text-2xl tracking-widest font-mono"
              placeholder="000000"
              maxLength={PIN_LENGTH}
              inputMode="numeric"
            />
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ニックネーム</label>
            <input
              type="text"
              {...register('nickname')}
              className="input-field"
              placeholder="あなたの名前"
              maxLength={15}
            />
            {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            参加する
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
