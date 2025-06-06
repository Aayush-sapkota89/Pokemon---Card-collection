import React from 'react';
import { usePokemon } from '../../context/PokemonContext';

const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter: React.FC = () => {
  const { activeType, setActiveType } = usePokemon();
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Filter by Type</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeType === '' 
              ? 'bg-pokemon-gray-dark text-white' 
              : 'bg-pokemon-gray-light text-pokemon-gray-dark hover:bg-pokemon-gray hover:text-white'
          }`}
        >
          All
        </button>
        
        {pokemonTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeType === type 
                ? `bg-type-${type} text-white` 
                : 'bg-pokemon-gray-light text-pokemon-gray-dark hover:bg-pokemon-gray hover:text-white'
            }`}
            style={activeType === type ? { backgroundColor: `var(--tw-color-type-${type}, #A8A878)` } : {}}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;