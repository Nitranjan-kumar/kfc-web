import React from 'react';
import { useForm } from 'react-hook-form';

interface NewsletterFormData {
  email: string;
}

export function NewsletterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterFormData>();

  const onSubmit = (data: NewsletterFormData) => {
    console.log('Newsletter subscription:', data);
    // TODO: Implement newsletter subscription
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}