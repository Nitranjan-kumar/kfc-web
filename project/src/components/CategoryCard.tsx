import React from 'react';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg shadow-md">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-3 text-center font-bold uppercase tracking-wide">{title}</h3>
    </div>
  );
}