import React from 'react';

const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="card animate-pulse">
      <div className="bg-gray-200 h-44 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-300"></div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;