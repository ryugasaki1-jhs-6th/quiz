import { createContext, useContext, useEffect, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '@/shared/hooks';
import { STORAGE_KEYS } from '@/constants';
import { AppSettings } from '@/types';

interface SettingsContextValue {
  settings: AppSettings;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  toggleBgm: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.DARK_MODE, false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);
  const [bgmEnabled, setBgmEnabled] = useLocalStorage(STORAGE_KEYS.BGM_ENABLED, false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);
  const toggleSound = useCallback(() => setSoundEnabled(prev => !prev), [setSoundEnabled]);
  const toggleBgm = useCallback(() => setBgmEnabled(prev => !prev), [setBgmEnabled]);

  const settings: AppSettings = {
    darkMode,
    soundEnabled,
    bgmEnabled,
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleDarkMode, toggleSound, toggleBgm }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
