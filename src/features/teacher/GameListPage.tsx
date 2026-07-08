import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Loading, ErrorDisplay } from '@/shared/components';
import { getGamesByHost, deleteGame, createRoom, createGameFromTemplate } from '@/services';
import { Game } from '@/types';
import { formatDate } from '@/utils';
import { QUIZ_TEMPLATES } from '@/constants/templates';

export function GameListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'my-games' | 'templates'>('my-games');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openSubcategories, setOpenSubcategories] = useState<string[]>([]);
  const [isCreatingFromTemplate, setIsCreatingFromTemplate] = useState(false);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleSubcategory = (sub: string) => {
    setOpenSubcategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleUseTemplate = async (template: typeof QUIZ_TEMPLATES[0]) => {
    if (!user) return;
    if (!confirm(`${template.title} をテンプレートとしてマイゲームに追加しますか？`)) return;

    setIsCreatingFromTemplate(true);
    try {
      await createGameFromTemplate(user.uid, template);
      alert('テンプレートからゲームを作成しました！「マイゲーム」タブから確認できます。');
      setActiveTab('my-games');
      fetchGames();
    } catch (err) {
      console.error('Template error:', err);
      alert(`テンプレートからの作成に失敗しました: ${err instanceof Error ? err.message : '不明なエラー'}`);
    } finally {
      setIsCreatingFromTemplate(false);
    }
  };

  const fetchGames = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await getGamesByHost(user.uid);
      setGames(data);
    } catch (err) {
      console.error('Fetch games error:', err);
      setError(`ゲーム一覧の取得に失敗しました: ${err instanceof Error ? err.message : '不明なエラー'}`);
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="text-primary-600 hover:underline text-sm mb-2 inline-block">&larr; ホームに戻る</Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeTab === 'my-games' ? 'マイゲーム' : 'クイズテンプレート'}
            </h1>
          </div>
          <Link to="/games/create">
            <Button>新規作成</Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'my-games'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('my-games')}
          >
            マイゲーム
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'templates'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            テンプレート
          </button>
        </div>

        {activeTab === 'my-games' ? (
          games.length === 0 ? (
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
          )
        ) : (
          /* Templates Tab */
          <div className="space-y-4">
            {isCreatingFromTemplate && (
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-4 text-primary-700 dark:text-primary-300 animate-pulse">
                テンプレートからゲームを作成中...
              </div>
            )}
            
            {/* Group templates by category and subcategory */}
            {Array.from(new Set(QUIZ_TEMPLATES.map(t => t.category))).map(category => (
              <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className={`w-5 h-5 transition-transform ${openCategories.includes(category) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {category}
                  </span>
                </button>
                
                {openCategories.includes(category) && (
                  <div className="p-2 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
                    {Array.from(new Set(QUIZ_TEMPLATES.filter(t => t.category === category).map(t => t.subcategory))).map(sub => (
                      <div key={sub} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                        <button
                          onClick={() => toggleSubcategory(sub)}
                          className="w-full flex items-center justify-between p-3 text-left font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <svg className={`w-4 h-4 transition-transform ${openSubcategories.includes(sub) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {sub}
                          </span>
                        </button>
                        
                        {openSubcategories.includes(sub) && (
                          <div className="p-3 space-y-3">
                            {QUIZ_TEMPLATES.filter(t => t.category === category && t.subcategory === sub).map(template => (
                              <div key={template.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 dark:text-white">{template.title}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-2 font-medium">問題数: {template.questions.length}問</p>
                                </div>
                                <Button size="sm" onClick={() => handleUseTemplate(template)} disabled={isCreatingFromTemplate}>
                                  このテンプレートを使う
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
