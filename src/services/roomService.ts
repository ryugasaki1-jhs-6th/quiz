import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  increment,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import {
  Answer,
  Player,
  PublicQuestion,
  PublicRoomState,
  Question,
  QuestionResult,
  Room,
  RoomPinLookup,
  RoomStatus,
} from '@/types';
import { COLLECTIONS } from '@/constants';
import { generatePin, generateId, shuffleArray } from '@/utils';
import { getGame, getQuestions } from './gameService';

const PUBLIC_STATE_DOC = 'state';
const SPEED_BONUS_MAX = 500;

function calculateScore(timeTaken: number, timeLimit: number, points: number): number {
  const timeRatio = Math.max(0, (timeLimit - timeTaken) / timeLimit);
  return points + Math.round(timeRatio * SPEED_BONUS_MAX);
}

function toPublicQuestion(question: Question): Omit<PublicQuestion, 'id'> {
  return {
    type: question.type,
    text: question.text,
    choices: question.choices.map(({ id, text }) => ({ id, text })),
    timeLimit: question.timeLimit,
    points: question.points,
    imageUrl: question.imageUrl,
    order: question.order,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}

function publicStateRef(roomId: string) {
  return doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PUBLIC, PUBLIC_STATE_DOC);
}

/** Create a new room */
export async function createRoom(gameId: string, hostId: string): Promise<string> {
  const roomId = generateId();
  const pin = generatePin();
  const now = Date.now();
  const game = await getGame(gameId);
  const questions = game?.shuffleQuestions
    ? shuffleArray(await getQuestions(gameId))
    : await getQuestions(gameId);
  const orderedQuestions = questions.map((question, order) => ({ ...question, order }));
  const questionOrder = orderedQuestions.map((question) => question.id);

  const room: Omit<Room, 'id'> = {
    gameId,
    hostId,
    pin,
    status: 'waiting',
    currentQuestionIndex: -1,
    currentQuestionStartedAt: null,
    currentPublicQuestionId: null,
    questionOrder,
    playerCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const publicState: Omit<PublicRoomState, 'id'> = {
    status: room.status,
    currentQuestionIndex: room.currentQuestionIndex,
    currentQuestionStartedAt: room.currentQuestionStartedAt,
    currentPublicQuestionId: null,
    playerCount: 0,
    questionCount: orderedQuestions.length,
    updatedAt: now,
  };

  const batch = writeBatch(db);
  batch.set(doc(db, COLLECTIONS.ROOMS, roomId), room);
  batch.set(doc(db, COLLECTIONS.ROOM_PINS, pin), {
    roomId,
    status: room.status,
    createdAt: now,
    updatedAt: now,
  });
  batch.set(publicStateRef(roomId), publicState);

  orderedQuestions.forEach((question) => {
    batch.set(
      doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PUBLIC_QUESTIONS, question.id),
      toPublicQuestion(question)
    );
  });

  await batch.commit();
  return roomId;
}

/** Get room by PIN */
export async function getRoomByPin(pin: string): Promise<RoomPinLookup | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.ROOM_PINS, pin));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as RoomPinLookup;
}

/** Get room by ID */
export async function getRoom(roomId: string): Promise<Room | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.ROOMS, roomId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Room;
}

/** Update room status */
export async function updateRoomStatus(roomId: string, status: RoomStatus, extra?: Partial<Room>): Promise<void> {
  const now = Date.now();
  const roomRef = doc(db, COLLECTIONS.ROOMS, roomId);
  const roomSnap = await getDoc(roomRef);
  const room = roomSnap.exists() ? ({ id: roomSnap.id, ...roomSnap.data() } as Room) : null;
  const update = {
    status,
    updatedAt: now,
    ...extra,
  };

  const batch = writeBatch(db);
  batch.update(roomRef, update);
  batch.set(publicStateRef(roomId), {
    status,
    currentQuestionIndex: extra?.currentQuestionIndex ?? room?.currentQuestionIndex ?? -1,
    currentQuestionStartedAt: extra?.currentQuestionStartedAt ?? room?.currentQuestionStartedAt ?? null,
    currentPublicQuestionId: extra?.currentPublicQuestionId ?? room?.currentPublicQuestionId ?? null,
    playerCount: room?.playerCount ?? 0,
    updatedAt: now,
  }, { merge: true });
  if (room?.pin) {
    batch.set(doc(db, COLLECTIONS.ROOM_PINS, room.pin), { status, updatedAt: now }, { merge: true });
  }
  await batch.commit();
}

/** Join a room as a player */
export async function joinRoom(roomId: string, uid: string, nickname: string): Promise<void> {
  const playerRef = doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, uid);
  const existing = await getDoc(playerRef);
  
  if (existing.exists()) {
    await updateDoc(playerRef, { isConnected: true, nickname });
    return;
  }

  const player: Omit<Player, 'id'> = {
    roomId,
    uid,
    nickname,
    score: 0,
    correctCount: 0,
    streak: 0,
    isConnected: true,
    joinedAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(playerRef, player);
}

/** Remove a player from room */
export async function removePlayer(roomId: string, playerId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId));
}

/** Get players in a room */
export async function getPlayers(roomId: string): Promise<Player[]> {
  const playersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS);
  // Sort by joinedAt to ensure all players (even those with 0 score) are visible
  const q = query(playersRef, orderBy('joinedAt', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Player));
}

/** Submit an answer choice for trusted server-side scoring */
export async function submitAnswer(
  roomId: string,
  questionId: string,
  playerId: string,
  choiceId: string
): Promise<void> {
  await setDoc(
    doc(
      db,
      COLLECTIONS.ROOMS,
      roomId,
      COLLECTIONS.ANSWER_SUBMISSIONS,
      questionId,
      COLLECTIONS.PLAYERS,
      playerId
    ),
    { choiceId }
  );
}

/** Get answers for a question */
export async function getAnswersForQuestion(roomId: string, questionId: string): Promise<Answer[]> {
  const answersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.ANSWERS);
  const q = query(answersRef, where('questionId', '==', questionId));
  const snapshot = await getDocs(q);
  const existingAnswers = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Answer));
  if (existingAnswers.length > 0) return existingAnswers;

  const roomSnap = await getDoc(doc(db, COLLECTIONS.ROOMS, roomId));
  if (!roomSnap.exists()) return [];

  const room = { id: roomSnap.id, ...roomSnap.data() } as Room;
  const questionSnap = await getDoc(doc(db, COLLECTIONS.GAMES, room.gameId, COLLECTIONS.QUESTIONS, questionId));
  if (!questionSnap.exists()) return [];

  const question = { id: questionSnap.id, ...questionSnap.data() } as Question;
  const submissionsRef = collection(
    db,
    COLLECTIONS.ROOMS,
    roomId,
    COLLECTIONS.ANSWER_SUBMISSIONS,
    questionId,
    COLLECTIONS.PLAYERS
  );
  const submissions = await getDocs(submissionsRef);
  if (submissions.empty) return [];

  const batch = writeBatch(db);
  const answeredAt = Date.now();
  const startedAt = typeof room.currentQuestionStartedAt === 'number' ? room.currentQuestionStartedAt : answeredAt;
  const timeTaken = Math.max(0, (answeredAt - startedAt) / 1000);
  const points = typeof question.points === 'number' ? question.points : 1000;
  const timeLimit = typeof question.timeLimit === 'number' ? question.timeLimit : 20;
  const answers = submissions.docs.map((submissionDoc) => {
    const playerId = submissionDoc.id;
    const choiceId = submissionDoc.data().choiceId as string;
    const isCorrect = question.choices?.some(choice => choice.id === choiceId && choice.isCorrect === true) === true;
    const score = isCorrect ? calculateScore(timeTaken, timeLimit, points) : 0;
    const answer: Answer = {
      id: `${questionId}_${playerId}`,
      roomId,
      questionId,
      playerId,
      choiceId,
      isCorrect,
      score,
      answeredAt,
      timeTaken,
    };

    batch.set(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.ANSWERS, answer.id), {
      roomId,
      questionId,
      playerId,
      choiceId,
      isCorrect,
      score,
      answeredAt,
      timeTaken,
    });
    batch.update(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId), {
      score: increment(score),
      correctCount: increment(isCorrect ? 1 : 0),
      streak: isCorrect ? increment(1) : 0,
      updatedAt: answeredAt,
    });

    return answer;
  });

  await batch.commit();
  return answers;
}

/** Subscribe to room changes */
export function subscribeToRoom(roomId: string, callback: (room: Room | null) => void): Unsubscribe {
  return onSnapshot(doc(db, COLLECTIONS.ROOMS, roomId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as Room);
    } else {
      callback(null);
    }
  });
}

/** Subscribe to public room state for joined players */
export function subscribeToPublicRoomState(
  roomId: string,
  callback: (room: PublicRoomState | null) => void
): Unsubscribe {
  return onSnapshot(publicStateRef(roomId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as PublicRoomState);
    } else {
      callback(null);
    }
  });
}

/** Get public questions for a room */
export async function getPublicQuestions(roomId: string): Promise<PublicQuestion[]> {
  const questionsRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PUBLIC_QUESTIONS);
  const q = query(questionsRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PublicQuestion));
}

/** Subscribe to players in a room */
export function subscribeToPlayers(roomId: string, callback: (players: Player[]) => void): Unsubscribe {
  const playersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS);
  // Sort by joinedAt to ensure all players (even those with 0 score) are visible
  const q = query(playersRef, orderBy('joinedAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Player));
    callback(players);
  });
}

/** Subscribe to the signed-in player's own room record */
export function subscribeToPlayer(
  roomId: string,
  playerId: string,
  callback: (player: Player | null) => void
): Unsubscribe {
  return onSnapshot(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as Player);
    } else {
      callback(null);
    }
  });
}

/** Subscribe to answers for a question */
export function subscribeToAnswers(
  roomId: string,
  questionId: string,
  callback: (answers: Answer[]) => void
): Unsubscribe {
  const answersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.ANSWERS);
  const q = query(answersRef, where('questionId', '==', questionId));
  return onSnapshot(q, (snapshot) => {
    const answers = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Answer));
    callback(answers);
  });
}

/** Save question result */
export async function saveQuestionResult(roomId: string, result: Omit<QuestionResult, 'id'>): Promise<void> {
  const resultId = `${roomId}_${result.questionId}`;
  await setDoc(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.RESULTS, resultId), result);
}
