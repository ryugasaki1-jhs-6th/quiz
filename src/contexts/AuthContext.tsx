import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { UserProfile, UserRole } from '@/types';
import { COLLECTIONS } from '@/constants';

interface AuthContextValue {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  signInAnonymously: () => Promise<User>;
  signOut: () => Promise<void>;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async (uid: string) => {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserProfile(docSnap.data() as UserProfile);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [fetchUserProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(credential.user.uid);
  }, [fetchUserProfile]);

  const signUp = useCallback(async (email: string, password: string, displayName: string, role: UserRole) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });

    const profile: UserProfile = {
      uid: credential.user.uid,
      email,
      displayName,
      role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await setDoc(doc(db, COLLECTIONS.USERS, credential.user.uid), profile);
    setUserProfile(profile);
  }, []);

  const signInAnonymously = useCallback(async () => {
    const credential = await firebaseSignInAnonymously(auth);
    return credential.user;
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  }, []);

  const isTeacher = userProfile?.role === 'teacher';

  return (
    <AuthContext.Provider value={{ user, userProfile, isLoading, signIn, signUp, signInAnonymously, signOut, isTeacher }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
