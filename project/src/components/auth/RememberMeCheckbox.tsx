import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface RememberMeCheckboxProps {
  register: UseFormRegister<any>;
}

export function RememberMeCheckbox({ register }: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        id="remember-me"
        type="checkbox"
        {...register('rememberMe')}
        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
        Remember me
      </label>
    </div>
  );
}