import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD82k8dubi2nTBcmSi2uzVWtVq97PRciQU",
  authDomain: "kfc-website-ee85e.firebaseapp.com",
  projectId: "kfc-website-ee85e",
  storageBucket: "kfc-website-ee85e.firebasestorage.app",
  messagingSenderId: "751357576339",
  appId: "1:751357576339:web:67cfca93c219569e89f966"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to LOCAL by default
setPersistence(auth, browserLocalPersistence);

// Configure Google OAuth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, app, googleProvider };