import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Room, Player, Answer, RoomStatus, QuestionResult } from '@/types';
import { COLLECTIONS } from '@/constants';
import { generatePin, generateId } from '@/utils';

/** Create a new room */
export async function createRoom(gameId: string, hostId: string): Promise<string> {
  const roomId = generateId();
  const pin = generatePin();
  const now = Date.now();

  const room: Omit<Room, 'id'> = {
    gameId,
    hostId,
    pin,
    status: 'waiting',
    currentQuestionIndex: -1,
    currentQuestionStartedAt: null,
    playerCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, COLLECTIONS.ROOMS, roomId), room);
  return roomId;
}

/** Get room by PIN */
export async function getRoomByPin(pin: string): Promise<Room | null> {
  const q = query(
    collection(db, COLLECTIONS.ROOMS),
    where('pin', '==', pin),
    where('status', '!=', 'finished')
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as Room;
}

/** Get room by ID */
export async function getRoom(roomId: string): Promise<Room | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.ROOMS, roomId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Room;
}

/** Update room status */
export async function updateRoomStatus(roomId: string, status: RoomStatus, extra?: Partial<Room>): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.ROOMS, roomId), {
    status,
    updatedAt: Date.now(),
    ...extra,
  });
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
  };

  await setDoc(playerRef, player);

  // Increment player count
  const room = await getRoom(roomId);
  if (room) {
    await updateDoc(doc(db, COLLECTIONS.ROOMS, roomId), {
      playerCount: room.playerCount + 1,
    });
  }
}

/** Remove a player from room */
export async function removePlayer(roomId: string, playerId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId));
  const room = await getRoom(roomId);
  if (room) {
    await updateDoc(doc(db, COLLECTIONS.ROOMS, roomId), {
      playerCount: Math.max(0, room.playerCount - 1),
    });
  }
}

/** Get players in a room */
export async function getPlayers(roomId: string): Promise<Player[]> {
  const playersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS);
  const q = query(playersRef, orderBy('score', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Player));
}

/** Submit an answer */
export async function submitAnswer(
  roomId: string,
  questionId: string,
  playerId: string,
  choiceId: string,
  isCorrect: boolean,
  score: number,
  timeTaken: number
): Promise<void> {
  const answerId = `${questionId}_${playerId}`;
  const answerRef = doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.ANSWERS, answerId);
  
  // Check for duplicate answer
  const existing = await getDoc(answerRef);
  if (existing.exists()) return;

  const answer: Omit<Answer, 'id'> = {
    roomId,
    questionId,
    playerId,
    choiceId,
    isCorrect,
    score,
    answeredAt: Date.now(),
    timeTaken,
  };

  await setDoc(answerRef, answer);

  // Update player score
  if (isCorrect) {
    const playerRef = doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId);
    const playerSnap = await getDoc(playerRef);
    if (playerSnap.exists()) {
      const player = playerSnap.data() as Player;
      await updateDoc(playerRef, {
        score: player.score + score,
        correctCount: player.correctCount + 1,
        streak: player.streak + 1,
      });
    }
  } else {
    const playerRef = doc(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS, playerId);
    const playerSnap = await getDoc(playerRef);
    if (playerSnap.exists()) {
      await updateDoc(playerRef, { streak: 0 });
    }
  }
}

/** Get answers for a question */
export async function getAnswersForQuestion(roomId: string, questionId: string): Promise<Answer[]> {
  const answersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.ANSWERS);
  const q = query(answersRef, where('questionId', '==', questionId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Answer));
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

/** Subscribe to players in a room */
export function subscribeToPlayers(roomId: string, callback: (players: Player[]) => void): Unsubscribe {
  const playersRef = collection(db, COLLECTIONS.ROOMS, roomId, COLLECTIONS.PLAYERS);
  const q = query(playersRef, orderBy('score', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Player));
    callback(players);
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
