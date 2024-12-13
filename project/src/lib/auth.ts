import { 
  signInWithPopup, 
  AuthError, 
  UserCredential,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export interface AuthResponse {
  success: boolean;
  user?: UserCredential;
  error?: {
    code: string;
    message: string;
  };
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Get the Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    
    // Store the token securely if needed
    if (token) {
      sessionStorage.setItem('google_access_token', token);
    }
    
    return {
      success: true,
      user: result
    };
  } catch (error) {
    const authError = error as AuthError;
    
    // Handle specific error cases
    let errorMessage = 'An error occurred during Google sign in';
    
    switch (authError.code) {
      case 'auth/popup-blocked':
        errorMessage = 'The sign in popup was blocked. Please allow popups for this website.';
        break;
      case 'auth/popup-closed-by-user':
        errorMessage = 'The sign in popup was closed before completing authentication.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'The sign in process was cancelled.';
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage = 'An account already exists with the same email address but different sign in credentials.';
        break;
    }
    
    return {
      success: false,
      error: {
        code: authError.code,
        message: errorMessage
      }
    };
  }
}