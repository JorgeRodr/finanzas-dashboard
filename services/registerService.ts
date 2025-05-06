import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/interfaces/user';

const USER_COLLECTION = 'users';

export async function registerUser({ email, password, displayName }: User) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  await setDoc(doc(db, USER_COLLECTION, user.uid), {
    id: user.uid,
    email,
    displayName,
    createdAt: new Date().toISOString(),
  });

  return user;
}
