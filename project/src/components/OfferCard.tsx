import React from 'react';

interface OfferCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
}

export function OfferCard({ title, description, imageUrl, price }: OfferCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {price && <p className="text-red-600 font-bold text-lg mb-4">{price}</p>}
        <div className="flex gap-4">
          <button className="text-gray-600 underline">View Details</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
            Apply Offer
          </button>
        </div>
      </div>
    </div>
  );
}