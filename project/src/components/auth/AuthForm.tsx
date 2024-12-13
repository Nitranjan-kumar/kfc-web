import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthError } from './AuthError';
import { RememberMeCheckbox } from './RememberMeCheckbox';

interface AuthFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, resetPassword, error: authError, clearError } = useAuth();
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<AuthFormData>();

  useEffect(() => {
    // Clear any existing errors when switching between login/signup
    setLocalError('');
    clearError();
    reset();
  }, [isLogin, clearError, reset]);

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLocalError('');
      if (isLogin) {
        await signIn(data.email, data.password, data.rememberMe);
      } else {
        await signUp(data.email, data.password);
      }
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLocalError('');
      await signInWithGoogle();
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  const handleResetPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }

    try {
      setLocalError('');
      await resetPassword(email);
      alert('Password reset email sent! Please check your inbox.');
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        {displayError && <AuthError message={displayError} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <RememberMeCheckbox register={register} />
            
            {isLogin && (
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Forgot your password?
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Google
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-red-600 hover:text-red-500"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}