import { Button } from './Button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message = 'エラーが発生しました', onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-center">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          再試行
        </Button>
      )}
    </div>
  );
}
