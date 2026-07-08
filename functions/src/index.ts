import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';

initializeApp();

const SPEED_BONUS_MAX = 500;

interface Choice {
  id: string;
  isCorrect?: boolean;
}

interface Question {
  choices?: Choice[];
  points?: number;
  timeLimit?: number;
}

function calculateScore(timeTaken: number, timeLimit: number, points: number): number {
  const timeRatio = Math.max(0, (timeLimit - timeTaken) / timeLimit);
  return points + Math.round(timeRatio * SPEED_BONUS_MAX);
}

export const scoreAnswerSubmission = onDocumentCreated(
  'rooms/{roomId}/answerSubmissions/{questionId}/players/{playerId}',
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const { roomId, questionId, playerId } = event.params;
    const { choiceId } = snap.data() as { choiceId?: string };
    if (!choiceId) return;

    const db = getFirestore();
    const roomRef = db.doc(`rooms/${roomId}`);
    const playerRef = roomRef.collection('players').doc(playerId);
    const answerRef = roomRef.collection('answers').doc(`${questionId}_${playerId}`);

    await db.runTransaction(async (tx) => {
      const [roomSnap, playerSnap, answerSnap] = await Promise.all([
        tx.get(roomRef),
        tx.get(playerRef),
        tx.get(answerRef),
      ]);

      if (!roomSnap.exists || !playerSnap.exists || answerSnap.exists) return;

      const room = roomSnap.data();
      const questionSnap = await tx.get(db.doc(`games/${room?.gameId}/questions/${questionId}`));
      if (!questionSnap.exists) return;

      const question = questionSnap.data() as Question;
      const correctChoice = question.choices?.find((choice) => choice.id === choiceId);
      const isCorrect = correctChoice?.isCorrect === true;
      const submittedAt = snap.createTime?.toMillis() ?? Date.now();
      const startedAt = typeof room?.currentQuestionStartedAt === 'number'
        ? room.currentQuestionStartedAt
        : submittedAt;
      const timeTaken = Math.max(0, (submittedAt - startedAt) / 1000);
      const points = typeof question.points === 'number' ? question.points : 1000;
      const timeLimit = typeof question.timeLimit === 'number' ? question.timeLimit : 20;
      const score = isCorrect ? calculateScore(timeTaken, timeLimit, points) : 0;

      tx.set(answerRef, {
        roomId,
        questionId,
        playerId,
        choiceId,
        isCorrect,
        score,
        answeredAt: submittedAt,
        timeTaken,
      });

      tx.set(playerRef, {
        score: FieldValue.increment(score),
        correctCount: FieldValue.increment(isCorrect ? 1 : 0),
        streak: isCorrect ? FieldValue.increment(1) : 0,
        updatedAt: submittedAt,
      }, { merge: true });
    });
  }
);

export const incrementRoomPlayerCount = onDocumentCreated(
  'rooms/{roomId}/players/{playerId}',
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const { roomId, playerId } = event.params;
    const db = getFirestore();
    const playerRef = db.doc(`rooms/${roomId}/players/${playerId}`);
    const player = snap.data();
    await Promise.all([
      playerRef.set({
        score: typeof player.score === 'number' ? player.score : 0,
        correctCount: typeof player.correctCount === 'number' ? player.correctCount : 0,
        streak: typeof player.streak === 'number' ? player.streak : 0,
        updatedAt: typeof player.updatedAt === 'number' ? player.updatedAt : Date.now(),
      }, { merge: true }),
      db.doc(`rooms/${roomId}`).set({
        playerCount: FieldValue.increment(1),
        updatedAt: Date.now(),
      }, { merge: true }),
      db.doc(`rooms/${roomId}/public/state`).set({
        playerCount: FieldValue.increment(1),
        updatedAt: Date.now(),
      }, { merge: true }),
    ]);
  }
);

export const decrementRoomPlayerCount = onDocumentDeleted(
  'rooms/{roomId}/players/{playerId}',
  async (event) => {
    const { roomId } = event.params;
    const db = getFirestore();
    await Promise.all([
      db.doc(`rooms/${roomId}`).set({
        playerCount: FieldValue.increment(-1),
        updatedAt: Date.now(),
      }, { merge: true }),
      db.doc(`rooms/${roomId}/public/state`).set({
        playerCount: FieldValue.increment(-1),
        updatedAt: Date.now(),
      }, { merge: true }),
    ]);
  }
);
