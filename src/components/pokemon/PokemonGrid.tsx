import React from 'react';
import PokemonCard from './PokemonCard';
import PokemonCardSkeleton from './PokemonCardSkeleton';
import { usePokemon } from '../../context/PokemonContext';
import { PokemonListItem } from '../../types/pokemon';

const PokemonGrid: React.FC = () => {
  const { pokemonList, loading, error, searchTerm, activeType } = usePokemon();
  
  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType ? pokemon.types.includes(activeType) : true;
    return matchesSearch && matchesType;
  });

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 font-medium text-lg">{error}</p>
        <button 
          className="mt-4 btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {loading ? (
        Array(20).fill(0).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))
      ) : filteredPokemon.length > 0 ? (
        filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      ) : (
        <div className="col-span-full p-8 text-center">
          <p className="text-lg font-medium">No Pokémon found matching your search.</p>
          {searchTerm && (
            <p className="text-pokemon-gray mt-2">
              Try a different search term or clear your filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonGrid;