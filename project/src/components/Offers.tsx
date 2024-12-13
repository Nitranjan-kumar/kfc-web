import React from 'react';
import { OfferCard } from './OfferCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const offers = [
  {
    title: "FREE ZINGER",
    description: "1 Pc Free Chicken Zinger on a cart value of 499 or above on first order",
    imageUrl: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "₹209"
  },
  {
    title: "2PC HOT & CRISPY",
    description: "Add 2 Pc Hot n Crispy Chicken at just Rs 99 on min cart value of Rs 499 or more",
    imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "₹99"
  }
];

export function Offers() {
  return (
    <section className="bg-gray-900 py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">EXCLUSIVE OFFERS FOR YOU</h2>
        <button className="text-white underline">View All Deals →</button>
      </div>
      
      <div className="relative">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-2 shadow-lg">
          <ChevronLeft size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <OfferCard key={offer.title} {...offer} />
          ))}
        </div>
        
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-2 shadow-lg">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}