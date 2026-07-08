import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Game, Question } from '@/types';
import { COLLECTIONS } from '@/constants';
import { generateId } from '@/utils';

const gamesRef = collection(db, COLLECTIONS.GAMES);

/** Get all games for a host */
export async function getGamesByHost(hostId: string): Promise<Game[]> {
  try {
    // 複合インデックスが必要なため、エラーが出る場合はソートを外してクライアント側でソートする
    const q = query(gamesRef, where('hostId', '==', hostId));
    const snapshot = await getDocs(q);
    const games = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Game));
    // クライアント側でソート
    return games.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch (error) {
    console.error('Error fetching games by host:', error);
    throw error;
  }
}

/** Get a single game */
export async function getGame(gameId: string): Promise<Game | null> {
  const docSnap = await getDoc(doc(db, COLLECTIONS.GAMES, gameId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Game;
}

/** Create a new game */
export async function createGame(data: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(gamesRef, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

/** Update a game */
export async function updateGame(gameId: string, data: Partial<Game>): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.GAMES, gameId), {
    ...data,
    updatedAt: Date.now(),
  });
}

/** Delete a game and its questions */
export async function deleteGame(gameId: string): Promise<void> {
  const questionsRef = collection(db, COLLECTIONS.GAMES, gameId, COLLECTIONS.QUESTIONS);
  const snapshot = await getDocs(questionsRef);
  const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
  await Promise.all(deletePromises);
  await deleteDoc(doc(db, COLLECTIONS.GAMES, gameId));
}

/** Get questions for a game */
export async function getQuestions(gameId: string): Promise<Question[]> {
  const questionsRef = collection(db, COLLECTIONS.GAMES, gameId, COLLECTIONS.QUESTIONS);
  const q = query(questionsRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Question));
}

/** Add a question to a game */
export async function addQuestion(gameId: string, data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const questionsRef = collection(db, COLLECTIONS.GAMES, gameId, COLLECTIONS.QUESTIONS);
  const now = Date.now();
  const docRef = await addDoc(questionsRef, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  
  // Update question count
  const game = await getGame(gameId);
  if (game) {
    await updateGame(gameId, { questionCount: game.questionCount + 1 });
  }
  
  return docRef.id;
}

/** Update a question */
export async function updateQuestion(gameId: string, questionId: string, data: Partial<Question>): Promise<void> {
  const questionRef = doc(db, COLLECTIONS.GAMES, gameId, COLLECTIONS.QUESTIONS, questionId);
  await updateDoc(questionRef, {
    ...data,
    updatedAt: Date.now(),
  });
}

/** Delete a question */
export async function deleteQuestion(gameId: string, questionId: string): Promise<void> {
  const questionRef = doc(db, COLLECTIONS.GAMES, gameId, COLLECTIONS.QUESTIONS, questionId);
  await deleteDoc(questionRef);
  
  const game = await getGame(gameId);
  if (game) {
    await updateGame(gameId, { questionCount: Math.max(0, game.questionCount - 1) });
  }
}

/** Duplicate a question */
export async function duplicateQuestion(gameId: string, questionId: string): Promise<string> {
  const questions = await getQuestions(gameId);
  const original = questions.find(q => q.id === questionId);
  if (!original) throw new Error('Question not found');

  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = original;
  void _id; void _c; void _u;

  return addQuestion(gameId, { ...rest, order: questions.length, choices: original.choices.map(c => ({ ...c, id: generateId() })) });
}

/** Create a game from a template */
export async function createGameFromTemplate(
  hostId: string, 
  template: { 
    title: string; 
    description: string; 
    questions: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'gameId'>[] 
  }
): Promise<string> {
  const gameId = await createGame({
    title: template.title,
    description: template.description,
    hostId,
    questionCount: 0,
    shuffleQuestions: true,
    shuffleChoices: true,
  });

  // シーケンシャルに追加して不整合を防ぐ
  for (const q of template.questions) {
    await addQuestion(gameId, q as any);
  }

  return gameId;
}
