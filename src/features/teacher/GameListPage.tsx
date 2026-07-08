import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Loading, ErrorDisplay } from '@/shared/components';
import { getGamesByHost, deleteGame, createRoom } from '@/services';
import { Game } from '@/types';
import { formatDate } from '@/utils';

export function GameListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGames = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await getGamesByHost(user.uid);
      setGames(data);
    } catch {
      setError('ゲーム一覧の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleDelete = async (gameId: string) => {
    if (!confirm('このゲームを削除しますか？')) return;
    try {
      await deleteGame(gameId);
      setGames(prev => prev.filter(g => g.id !== gameId));
    } catch {
      alert('削除に失敗しました');
    }
  };

  const handleStartGame = async (gameId: string) => {
    if (!user) return;
    try {
      const roomId = await createRoom(gameId, user.uid);
      navigate(`/room/${roomId}/host`);
    } catch {
      alert('ゲームの開始に失敗しました');
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchGames} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-primary-600 hover:underline text-sm mb-2 inline-block">&larr; ホームに戻る</Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">マイゲーム</h1>
          </div>
          <Link to="/games/create">
            <Button>新規作成</Button>
          </Link>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">まだゲームがありません</p>
            <Link to="/games/create">
              <Button className="mt-4">最初のゲームを作成</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {game.questionCount}問 ・ {formatDate(game.updatedAt)}
                  </p>
                  {game.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{game.description}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" onClick={() => handleStartGame(game.id)}>
                    開始
                  </Button>
                  <Link to={`/games/${game.id}/edit`}>
                    <Button variant="secondary" size="sm">編集</Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(game.id)}>
                    削除
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
