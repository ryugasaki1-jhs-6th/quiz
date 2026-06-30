import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/shared/components';
import { ROUTES } from '@/constants';

export function HomePage() {
  const { userProfile, isTeacher, signOut } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            Quiz App
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {userProfile?.displayName}
              <span className="ml-2 px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {isTeacher ? '教師' : '生徒'}
              </span>
            </span>
            <Link to={ROUTES.SETTINGS}>
              <Button variant="ghost" size="sm">設定</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>ログアウト</Button>
          </div>
        </motion.header>

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {/* Join Game */}
          <motion.div variants={itemVariants}>
            <Link to={ROUTES.JOIN} className="block">
              <div className="card hover:shadow-xl transition-shadow cursor-pointer group h-full">
                <div className="w-16 h-16 bg-quiz-blue/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-quiz-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">ゲームに参加</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">PINコードを入力してクイズに参加</p>
              </div>
            </Link>
          </motion.div>

          {/* Create Game (Teacher only) */}
          {isTeacher && (
            <motion.div variants={itemVariants}>
              <Link to={ROUTES.GAME_CREATE} className="block">
                <div className="card hover:shadow-xl transition-shadow cursor-pointer group h-full">
                  <div className="w-16 h-16 bg-quiz-green/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-quiz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">ゲーム作成</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">新しいクイズゲームを作成</p>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Game List (Teacher only) */}
          {isTeacher && (
            <motion.div variants={itemVariants}>
              <Link to={ROUTES.GAME_LIST} className="block">
                <div className="card hover:shadow-xl transition-shadow cursor-pointer group h-full">
                  <div className="w-16 h-16 bg-quiz-yellow/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-quiz-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">マイゲーム</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">作成したゲームの管理</p>
                </div>
              </Link>
            </motion.div>
          )}

          {/* History */}
          <motion.div variants={itemVariants}>
            <Link to={ROUTES.HISTORY} className="block">
              <div className="card hover:shadow-xl transition-shadow cursor-pointer group h-full">
                <div className="w-16 h-16 bg-quiz-red/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-quiz-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">履歴</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">過去のゲーム結果を確認</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
