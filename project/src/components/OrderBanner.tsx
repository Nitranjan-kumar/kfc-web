import React from 'react';

export function OrderBanner() {
  return (
    <div className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <h2 className="font-bold">LET'S ORDER FOR DELIVERY, PICK UP, OR DINE-IN</h2>
      <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
        Start Order
      </button>
    </div>
  );
}