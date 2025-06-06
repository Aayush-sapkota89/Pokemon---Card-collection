import React from 'react';
import PokemonGrid from '../components/pokemon/PokemonGrid';
import TypeFilter from '../components/pokemon/TypeFilter';
import Pagination from '../components/pokemon/Pagination';
import { usePokemon } from '../context/PokemonContext';
import { Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { searchTerm } = usePokemon();
  
  return (
    <div className="pokemon-bg-pattern">
      <div className="container-custom py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pokemon-red to-red-700 rounded-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                <Zap className="w-8 h-8 mr-2" />
                Pokémon Card Collection
              </h1>
              <p className="text-lg max-w-xl">
                Explore the world of Pokémon with our beautiful card collection. Search, filter, and discover all your favorite Pokémon in one place.
              </p>
            </div>
            <div className="flex-shrink-0 animate-float">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                alt="Pikachu" 
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Filters and Search Results */}
        <div className="mb-6">
          <TypeFilter />
          
          {searchTerm && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Search results for: <span className="text-pokemon-red">"{searchTerm}"</span>
              </h2>
            </div>
          )}
        </div>
        
        {/* Pokemon Grid */}
        <PokemonGrid />
        
        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;