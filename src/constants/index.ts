/** Default time limit for questions (seconds) */
export const DEFAULT_TIME_LIMIT = 20;

/** Default points for a question */
export const DEFAULT_POINTS = 1000;

/** Bonus points based on speed */
export const SPEED_BONUS_MAX = 500;

/** PIN code length */
export const PIN_LENGTH = 6;

/** Maximum players per room */
export const MAX_PLAYERS = 50;

/** Maximum questions per game */
export const MAX_QUESTIONS = 100;

/** Maximum image file size (5MB) */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/** Supported image types */
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/** Quiz answer colors matching Kahoot! style */
export const ANSWER_COLORS = {
  0: { bg: 'bg-quiz-red', hover: 'hover:bg-red-700', text: 'text-white', hex: '#e21b3c' },
  1: { bg: 'bg-quiz-blue', hover: 'hover:bg-blue-800', text: 'text-white', hex: '#1368ce' },
  2: { bg: 'bg-quiz-yellow', hover: 'hover:bg-yellow-600', text: 'text-white', hex: '#d89e00' },
  3: { bg: 'bg-quiz-green', hover: 'hover:bg-green-700', text: 'text-white', hex: '#26890c' },
} as const;

/** Answer shapes for accessibility */
export const ANSWER_SHAPES = ['triangle', 'diamond', 'circle', 'square'] as const;

/** Routes */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  JOIN: '/join',
  GAME_CREATE: '/games/create',
  GAME_EDIT: '/games/:gameId/edit',
  GAME_LIST: '/games',
  ROOM_HOST: '/room/:roomId/host',
  ROOM_PLAY: '/room/:roomId/play',
  ROOM_WAITING: '/room/:roomId/waiting',
  SETTINGS: '/settings',
  HISTORY: '/history',
} as const;

/** Firestore collection names */
export const COLLECTIONS = {
  USERS: 'users',
  GAMES: 'games',
  QUESTIONS: 'questions',
  ROOMS: 'rooms',
  PLAYERS: 'players',
  ANSWERS: 'answers',
  RESULTS: 'results',
} as const;

/** Local storage keys */
export const STORAGE_KEYS = {
  DARK_MODE: 'quiz-dark-mode',
  SOUND_ENABLED: 'quiz-sound-enabled',
  BGM_ENABLED: 'quiz-bgm-enabled',
  NICKNAME: 'quiz-nickname',
} as const;
