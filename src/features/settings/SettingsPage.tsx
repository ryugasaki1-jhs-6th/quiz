import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';

export function SettingsPage() {
  const { settings, toggleDarkMode, toggleSound, toggleBgm } = useSettings();
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="text-primary-600 hover:underline text-sm mb-4 inline-block">&larr; ホームに戻る</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">設定</h1>

          <div className="card space-y-6">
            {/* Profile info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">プロフィール</h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>名前: {userProfile?.displayName}</p>
                <p>メール: {userProfile?.email}</p>
                <p>役割: {userProfile?.role === 'teacher' ? '教師' : '生徒'}</p>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Settings toggles */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">表示</h2>
              <ToggleItem
                label="ダークモード"
                description="暗い背景に切り替えます"
                checked={settings.darkMode}
                onChange={toggleDarkMode}
              />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">サウンド</h2>
              <div className="space-y-4">
                <ToggleItem
                  label="効果音"
                  description="正解・不正解などの効果音"
                  checked={settings.soundEnabled}
                  onChange={toggleSound}
                />
                <ToggleItem
                  label="BGM"
                  description="バックグラウンドミュージック"
                  checked={settings.bgmEnabled}
                  onChange={toggleBgm}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
}
