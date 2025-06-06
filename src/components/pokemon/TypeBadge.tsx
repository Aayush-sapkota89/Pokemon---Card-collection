import React from 'react';
import { PokemonType } from '../../types/pokemon';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'sm' }) => {
  const typeClass = `bg-type-${type}`;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };
  
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <span 
      className={`rounded-full font-medium text-white ${sizeClasses[size]} ${typeClass}`}
      style={{ backgroundColor: `var(--tw-color-type-${type}, #A8A878)` }}
    >
      {capitalizedType}
    </span>
  );
};

export default TypeBadge;