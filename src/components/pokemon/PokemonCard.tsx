import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PokemonListItem } from '../../types/pokemon';
import { usePokemon } from '../../context/PokemonContext';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { toggleFavorite, isFavorite } = usePokemon();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(pokemon.id);
  };

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="card hover:translate-y-[-8px] h-full flex flex-col">
        <div className="relative p-4 bg-pokemon-gray-light flex justify-center">
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-5 h-5 ${favorite ? 'fill-pokemon-red text-pokemon-red' : 'text-pokemon-gray'}`} 
            />
          </button>
          
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="w-36 h-36 object-contain transition-transform hover:scale-110 duration-300"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-pokemon-gray-dark">{capitalizedName}</h3>
            <span className="text-sm font-semibold text-pokemon-gray">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {pokemon.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;