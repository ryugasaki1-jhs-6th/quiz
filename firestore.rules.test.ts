import { readFileSync } from 'node:fs';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

const PROJECT_ID = 'quiz-rules-test';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await Promise.all([
      setDoc(doc(db, 'users/host'), {
        uid: 'host',
        email: 'host@example.com',
        displayName: 'Host',
        role: 'teacher',
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'users/otherTeacher'), {
        uid: 'otherTeacher',
        email: 'other@example.com',
        displayName: 'Other',
        role: 'teacher',
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'users/student'), {
        uid: 'student',
        email: 'student@example.com',
        displayName: 'Student',
        role: 'student',
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'users/otherStudent'), {
        uid: 'otherStudent',
        email: 'other-student@example.com',
        displayName: 'Other Student',
        role: 'student',
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'games/game1'), {
        title: 'Game',
        description: '',
        hostId: 'host',
        status: 'published',
        questionCount: 1,
        shuffleQuestions: false,
        shuffleChoices: false,
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1'), {
        gameId: 'game1',
        hostId: 'host',
        pin: '123456',
        status: 'accepting-answers',
        currentQuestionIndex: 0,
        currentQuestionStartedAt: 1,
        currentPublicQuestionId: 'q1',
        playerCount: 2,
        createdAt: 1,
        updatedAt: 1,
      }),
    ]);

    await Promise.all([
      setDoc(doc(db, 'games/game1/questions/q1'), {
        gameId: 'game1',
        type: 'multiple-choice',
        text: '2 + 2?',
        choices: [
          { id: 'a', text: '3', isCorrect: false },
          { id: 'b', text: '4', isCorrect: true },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '2 + 2 = 4',
        imageUrl: null,
        order: 0,
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1/public/state'), {
        status: 'accepting-answers',
        currentQuestionIndex: 0,
        currentQuestionStartedAt: 1,
        currentPublicQuestionId: 'q1',
        playerCount: 2,
        questionCount: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1/publicQuestions/q1'), {
        type: 'multiple-choice',
        text: '2 + 2?',
        choices: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
        ],
        timeLimit: 20,
        points: 1000,
        imageUrl: null,
        order: 0,
        createdAt: 1,
        updatedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1/players/student'), {
        roomId: 'room1',
        uid: 'student',
        nickname: 'Student',
        score: 100,
        correctCount: 1,
        streak: 1,
        isConnected: true,
        joinedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1/players/otherStudent'), {
        roomId: 'room1',
        uid: 'otherStudent',
        nickname: 'Other',
        score: 0,
        correctCount: 0,
        streak: 0,
        isConnected: true,
        joinedAt: 1,
      }),
      setDoc(doc(db, 'rooms/room1/answers/q1_student'), {
        roomId: 'room1',
        questionId: 'q1',
        playerId: 'student',
        choiceId: 'b',
        isCorrect: true,
        score: 100,
        answeredAt: 2,
        timeTaken: 1,
      }),
    ]);
  });
});

afterAll(async () => {
  await testEnv?.cleanup();
});

function dbFor(uid?: string) {
  return uid ? testEnv.authenticatedContext(uid).firestore() : testEnv.unauthenticatedContext().firestore();
}

describe('firestore security rules', () => {
  it('rejects unauthenticated reads and writes', async () => {
    const db = dbFor();

    await assertFails(getDoc(doc(db, 'users/student')));
    await assertFails(getDoc(doc(db, 'games/game1')));
    await assertFails(getDoc(doc(db, 'rooms/room1')));
    await assertFails(setDoc(doc(db, 'rooms/room1/players/anon'), { nickname: 'anon' }));
  });

  it('does not let anonymous users list users, games, or rooms', async () => {
    const db = dbFor('anonymousUser');

    await assertFails(getDocs(collection(db, 'users')));
    await assertFails(getDocs(collection(db, 'games')));
    await assertFails(getDocs(collection(db, 'rooms')));
  });

  it('lets users read only their own profile and prevents client teacher elevation', async () => {
    const db = dbFor('student');

    await assertSucceeds(getDoc(doc(db, 'users/student')));
    await assertFails(getDoc(doc(db, 'users/host')));
    await assertFails(updateDoc(doc(db, 'users/student'), { role: 'teacher' }));
  });

  it('does not let students read private questions with answers', async () => {
    const db = dbFor('student');

    await assertFails(getDoc(doc(db, 'games/game1/questions/q1')));
  });

  it('lets the host teacher read their own games and rooms', async () => {
    const db = dbFor('host');

    await assertSucceeds(getDoc(doc(db, 'games/game1')));
    await assertSucceeds(getDocs(query(collection(db, 'games'), where('hostId', '==', 'host'))));
    await assertSucceeds(getDoc(doc(db, 'rooms/room1')));
  });

  it('rejects other teachers reading a different host game or room', async () => {
    const db = dbFor('otherTeacher');

    await assertFails(getDoc(doc(db, 'games/game1')));
    await assertFails(getDoc(doc(db, 'rooms/room1')));
  });

  it('does not let students read another player document', async () => {
    const db = dbFor('student');

    await assertSucceeds(getDoc(doc(db, 'rooms/room1/players/student')));
    await assertFails(getDoc(doc(db, 'rooms/room1/players/otherStudent')));
    await assertFails(getDocs(collection(db, 'rooms/room1/players')));
  });

  it('does not let students read scored answers', async () => {
    const db = dbFor('student');

    await assertFails(getDoc(doc(db, 'rooms/room1/answers/q1_student')));
    await assertFails(getDocs(collection(db, 'rooms/room1/answers')));
  });

  it('does not let students write score or isCorrect fields', async () => {
    const db = dbFor('student');

    await assertFails(updateDoc(doc(db, 'rooms/room1/players/student'), { score: 9999 }));
    await assertFails(setDoc(doc(db, 'rooms/room1/answerSubmissions/q1/players/student'), {
      choiceId: 'b',
      isCorrect: true,
    }));
  });

  it('lets students submit only a choiceId for the current question', async () => {
    const db = dbFor('student');

    await assertSucceeds(setDoc(doc(db, 'rooms/room1/answerSubmissions/q1/players/student'), {
      choiceId: 'b',
    }));
  });

  it('lets joined students read public questions without answer metadata', async () => {
    const db = dbFor('student');

    const snap = await assertSucceeds(getDoc(doc(db, 'rooms/room1/publicQuestions/q1')));
    const data = snap.data();

    expect(data).not.toHaveProperty('explanation');
    expect(JSON.stringify(data)).not.toContain('isCorrect');
  });
});
