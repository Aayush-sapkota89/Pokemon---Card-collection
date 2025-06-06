import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../components/pokemon/PokemonCard';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { pokemonList, favorites, loading } = usePokemon();
  
  const favoritePokemon = pokemonList.filter(pokemon => 
    favorites.includes(pokemon.id)
  );
  
  return (
    <div className="pokemon-bg-pattern">
      <div className="container-custom py-8">
        <div className="bg-gradient-to-r from-pokemon-pink to-pokemon-purple rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 mr-2 fill-white" />
            <h1 className="text-3xl font-bold">Your Favorite Pokémon</h1>
          </div>
          <p className="text-lg max-w-2xl">
            Here's your personal collection of favorite Pokémon that you've saved. Collect and organize your most beloved creatures!
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block border-4 border-pokemon-gray-light border-t-pokemon-red rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-pokemon-gray-dark">Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-pokemon-gray-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-pokemon-gray" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-pokemon-gray-dark mb-6 max-w-md mx-auto">
              You haven't added any Pokémon to your favorites. Explore the collection and click the heart icon to add Pokémon you like.
            </p>
            <Link to="/" className="btn btn-primary">
              Explore Pokémon
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-lg">
              You have <span className="font-bold text-pokemon-red">{favorites.length}</span> favorite Pokémon.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favoritePokemon.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;