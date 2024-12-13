import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../lib/stripe';
import { CheckoutForm } from './CheckoutForm';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#dc2626',
  },
};

export function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-8">Checkout</h2>
        <Elements 
          stripe={stripePromise} 
          options={{
            appearance,
            amount: getTotal(),
            currency: 'inr',
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}