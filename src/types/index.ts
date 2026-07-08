/** User roles in the system */
export type UserRole = 'teacher' | 'student';

/** Question types supported */
export type QuestionType = 'multiple-choice' | 'true-false' | 'image';

/** Game status states */
export type GameStatus = 'draft' | 'published';

/** Room status states */
export type RoomStatus = 'waiting' | 'playing' | 'showing-question' | 'accepting-answers' | 'closed' | 'showing-result' | 'showing-ranking' | 'finished';

/** User profile */
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;
}

/** Choice option for a question */
export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

/** Choice option exposed to players */
export interface PublicChoice {
  id: string;
  text: string;
}

/** Question in a game */
export interface Question {
  id: string;
  gameId: string;
  type: QuestionType;
  text: string;
  choices: Choice[];
  timeLimit: number;
  points: number;
  explanation: string;
  imageUrl: string | null;
  order: number;
  createdAt: number;
  updatedAt: number;
}

/** Question copy exposed to players during a room */
export interface PublicQuestion {
  id: string;
  type: QuestionType;
  text: string;
  choices: PublicChoice[];
  timeLimit: number;
  points: number;
  imageUrl: string | null;
  order: number;
  createdAt: number;
  updatedAt: number;
}

/** Game (quiz set) */
export interface Game {
  id: string;
  title: string;
  description: string;
  hostId: string;
  status: GameStatus;
  questionCount: number;
  shuffleQuestions: boolean;
  shuffleChoices: boolean;
  createdAt: number;
  updatedAt: number;
}

/** Room (active game session) */
export interface Room {
  id: string;
  gameId: string;
  hostId: string;
  pin: string;
  status: RoomStatus;
  currentQuestionIndex: number;
  currentQuestionStartedAt: number | null;
  currentPublicQuestionId?: string | null;
  questionOrder?: string[];
  playerCount: number;
  createdAt: number;
  updatedAt: number;
}

/** Minimal room state exposed to joined players */
export interface PublicRoomState {
  id: string;
  status: RoomStatus;
  currentQuestionIndex: number;
  currentQuestionStartedAt: number | null;
  currentPublicQuestionId: string | null;
  playerCount: number;
  questionCount: number;
  updatedAt: number;
}

/** PIN lookup document. The PIN itself is the document id. */
export interface RoomPinLookup {
  id: string;
  roomId: string;
  status: RoomStatus;
  createdAt: number;
  updatedAt: number;
}

/** Player in a room */
export interface Player {
  id: string;
  roomId: string;
  uid: string;
  nickname: string;
  score?: number;
  correctCount?: number;
  streak?: number;
  isConnected: boolean;
  joinedAt: number;
  updatedAt?: number;
}

/** Answer submitted by a player */
export interface Answer {
  id: string;
  roomId: string;
  questionId: string;
  playerId: string;
  choiceId: string;
  isCorrect: boolean;
  score: number;
  answeredAt: number;
  timeTaken: number;
}

/** Untrusted answer submission accepted from the client */
export interface AnswerSubmission {
  choiceId: string;
}

/** Result for a question in a room */
export interface QuestionResult {
  id: string;
  roomId: string;
  questionId: string;
  totalPlayers: number;
  correctCount: number;
  averageTime: number;
  choiceDistribution: Record<string, number>;
}

/** Ranking entry */
export interface RankingEntry {
  playerId: string;
  nickname: string;
  score: number;
  correctCount: number;
  rank: number;
}

/** Settings for the app */
export interface AppSettings {
  soundEnabled: boolean;
  bgmEnabled: boolean;
  darkMode: boolean;
}

/** CSV import/export format */
export interface CsvQuestion {
  type: string;
  text: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctIndex: string;
  timeLimit: string;
  points: string;
  explanation: string;
}

/** AI generation interface (future) */
export interface QuestionGenerator {
  generate(topic: string, count: number): Promise<Question[]>;
}
