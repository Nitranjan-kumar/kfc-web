import React from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'delivered';
}

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-02-10T10:00:00Z',
    items: [
      { name: 'Zinger Burger', quantity: 2, price: 199 },
      { name: 'French Fries', quantity: 1, price: 99 }
    ],
    total: 497,
    status: 'delivered'
  },
  {
    id: '2',
    date: '2024-02-09T15:30:00Z',
    items: [
      { name: 'Chicken Bucket', quantity: 1, price: 599 }
    ],
    total: 599,
    status: 'processing'
  }
];

export function OrderHistory() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.date), 'PPP')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="border-t border-b py-4 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center font-medium">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}