import React from 'react';
import { ProductCard } from './ProductCard';

const products = [
  {
    id: '1',
    name: 'International Burger Fest',
    description: 'A delicious selection of international burgers',
    price: 599,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Match Day Combos',
    description: 'Perfect for game day celebrations',
    price: 799,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Value Lunch Specials',
    description: 'Great deals for your lunch break',
    price: 399,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Box Meals',
    description: 'Complete meals in a convenient box',
    price: 499,
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}