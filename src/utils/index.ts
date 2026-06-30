import { PIN_LENGTH, DEFAULT_POINTS, SPEED_BONUS_MAX } from '@/constants';

/** Generate a random PIN code */
export function generatePin(): string {
  const pin = Math.floor(Math.random() * Math.pow(10, PIN_LENGTH))
    .toString()
    .padStart(PIN_LENGTH, '0');
  return pin;
}

/** Generate a unique ID */
export function generateId(): string {
  return crypto.randomUUID();
}

/** Calculate score based on time taken and time limit */
export function calculateScore(timeTaken: number, timeLimit: number, points: number = DEFAULT_POINTS): number {
  const timeRatio = Math.max(0, (timeLimit - timeTaken) / timeLimit);
  const speedBonus = Math.round(timeRatio * SPEED_BONUS_MAX);
  return points + speedBonus;
}

/** Shuffle an array (Fisher-Yates) */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Format time in seconds to mm:ss */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/** Format timestamp to locale date string */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/** Class names utility (simple cn) */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Parse CSV string to array of objects */
export function parseCsv<T extends Record<string, string>>(csv: string): T[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: T[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {} as Record<string, string>;
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row as T);
  }
  
  return rows;
}

/** Convert array of objects to CSV string */
export function toCsv<T extends Record<string, string | number>>(data: T[], headers: string[]): string {
  const headerLine = headers.join(',');
  const rows = data.map(row => headers.map(h => String(row[h] ?? '')).join(','));
  return [headerLine, ...rows].join('\n');
}
