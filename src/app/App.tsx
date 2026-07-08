import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Loading } from '@/shared/components';
import { ROUTES } from '@/constants';

// Lazy loaded pages
const LoginPage = lazy(() => import('@/features/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const HomePage = lazy(() => import('@/features/home/HomePage').then(m => ({ default: m.HomePage })));
const HistoryPage = lazy(() => import('@/features/home/HistoryPage').then(m => ({ default: m.HistoryPage })));
const JoinPage = lazy(() => import('@/features/student/JoinPage').then(m => ({ default: m.JoinPage })));
const PlayerRoomPage = lazy(() => import('@/features/student/PlayerRoomPage').then(m => ({ default: m.PlayerRoomPage })));
const GameListPage = lazy(() => import('@/features/teacher/GameListPage').then(m => ({ default: m.GameListPage })));
const GameEditPage = lazy(() => import('@/features/teacher/GameEditPage').then(m => ({ default: m.GameEditPage })));
const HostRoomPage = lazy(() => import('@/features/teacher/HostRoomPage').then(m => ({ default: m.HostRoomPage })));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading fullScreen />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
}

function TeacherRoute({ children }: { children: React.ReactNode }) {
  const { isTeacher, isLoading } = useAuth();
  if (isLoading) return <Loading fullScreen />;
  if (!isTeacher) return <Navigate to={ROUTES.HOME} replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading fullScreen />;
  if (user) return <Navigate to={ROUTES.HOME} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path={ROUTES.REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Semi-protected routes (allow guests) */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.JOIN} element={<JoinPage />} />
        <Route path="/room/:roomId/play" element={<PlayerRoomPage />} />

        {/* Protected routes (require login) */}
        <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path={ROUTES.HISTORY} element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

        {/* Teacher routes */}
        <Route path={ROUTES.GAME_LIST} element={<TeacherRoute><GameListPage /></TeacherRoute>} />
        <Route path={ROUTES.GAME_CREATE} element={<TeacherRoute><GameEditPage /></TeacherRoute>} />
        <Route path={ROUTES.GAME_EDIT} element={<TeacherRoute><GameEditPage /></TeacherRoute>} />
        <Route path="/room/:roomId/host" element={<TeacherRoute><HostRoomPage /></TeacherRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <SettingsProvider>
            <AppRoutes />
          </SettingsProvider>
        </AuthProvider>
      </HashRouter>
    </QueryClientProvider>
  );
}
