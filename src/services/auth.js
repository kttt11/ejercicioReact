import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const auth = getAuth();

export const registerUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const checkEmailExists = async (email) => {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  return signInMethods.length > 0;
};