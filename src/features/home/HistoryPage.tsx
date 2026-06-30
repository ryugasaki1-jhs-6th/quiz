import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-primary-600 hover:underline text-sm mb-4 inline-block">&larr; ホームに戻る</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ゲーム履歴</h1>
          <div className="card text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">ゲーム履歴はまだありません</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">ゲームに参加すると、ここに履歴が表示されます</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
