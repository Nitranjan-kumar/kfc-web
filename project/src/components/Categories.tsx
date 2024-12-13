import React from 'react';
import { CategoryCard } from './CategoryCard';

const categories = [
  {
    title: "International Burger Fest",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Match Day Combos",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Value Lunch Specials",
    imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Box Meals",
    imageUrl: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
];

export function Categories() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-8">BROWSE CATEGORIES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}