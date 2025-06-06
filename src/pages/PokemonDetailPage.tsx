import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';
import { usePokemon } from '../context/PokemonContext';
import TypeBadge from '../components/pokemon/TypeBadge';
import { Pokemon, PokemonSpecies } from '../types/pokemon';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = usePokemon();
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const favorite = id ? isFavorite(parseInt(id)) : false;
  
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!id) return;
        
        // Fetch Pokemon details
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonResponse.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);
        
        // Fetch species data
        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok) {
          throw new Error('Failed to fetch species details');
        }
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
        
      } catch (err) {
        setError('Failed to load Pokémon details. Please try again later.');
        console.error('Error fetching Pokémon details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemonDetail();
  }, [id]);
  
  const handleFavoriteClick = () => {
    if (id) {
      toggleFavorite(parseInt(id));
    }
  };
  
  const getEnglishFlavorText = () => {
    if (!species) return '';
    
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
  };
  
  const getEnglishGenus = () => {
    if (!species) return '';
    
    const englishGenus = species.genera.find(
      entry => entry.language.name === 'en'
    );
    
    return englishGenus ? englishGenus.genus : '';
  };
  
  const formatStatName = (statName: string) => {
    switch (statName) {
      case 'hp': return 'HP';
      case 'attack': return 'Attack';
      case 'defense': return 'Defense';
      case 'special-attack': return 'Sp. Atk';
      case 'special-defense': return 'Sp. Def';
      case 'speed': return 'Speed';
      default: return statName;
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 w-1/4 mb-8 rounded"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="h-8 bg-gray-200 w-1/2 mb-4 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/3 mb-6 rounded"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !pokemon) {
    return (
      <div className="container-custom py-8">
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <Info className="w-16 h-16 text-pokemon-red mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-pokemon-gray-dark mb-6">{error || 'Pokemon not found'}</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  return (
    <div className="pokemon-bg-pattern">
      <div className="container-custom py-8">
        <Link to="/" className="inline-flex items-center text-pokemon-gray-dark hover:text-pokemon-red mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to all Pokémon
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div 
            className="p-6 flex justify-between items-center"
            style={{
              background: `linear-gradient(90deg, var(--tw-color-type-${pokemon.types[0].type.name}, #A8A878) 0%, rgba(255,255,255,0.8) 100%)`,
            }}
          >
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">{capitalizedName}</h1>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map(typeInfo => (
                  <TypeBadge 
                    key={typeInfo.type.name} 
                    type={typeInfo.type.name} 
                    size="md"
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-xl font-bold drop-shadow-sm">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
              <button
                onClick={handleFavoriteClick}
                className="mt-2 inline-flex items-center bg-white/90 hover:bg-white px-3 py-1.5 rounded-full transition-colors"
              >
                <Heart className={`w-5 h-5 mr-1.5 ${favorite ? 'fill-pokemon-red text-pokemon-red' : 'text-pokemon-gray'}`} />
                <span>{favorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Left column - Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-pokemon-gray-light rounded-xl p-6 w-full flex justify-center items-center">
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  className="w-64 h-64 object-contain animate-float"
                />
              </div>
            </div>
            
            {/* Right column - Details */}
            <div className="w-full md:w-2/3">
              {/* Pokémon description */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-bold">About</h2>
                  {getEnglishGenus() && (
                    <span className="ml-2 text-pokemon-gray text-sm bg-pokemon-gray-light px-2 py-0.5 rounded">
                      {getEnglishGenus()}
                    </span>
                  )}
                </div>
                <p className="text-pokemon-gray-dark">
                  {getEnglishFlavorText() || 'No description available for this Pokémon.'}
                </p>
              </div>
              
              {/* Physical attributes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-pokemon-gray-light rounded-lg p-4">
                  <span className="text-sm text-pokemon-gray">Height</span>
                  <p className="font-semibold">{pokemon.height / 10} m</p>
                </div>
                <div className="bg-pokemon-gray-light rounded-lg p-4">
                  <span className="text-sm text-pokemon-gray">Weight</span>
                  <p className="font-semibold">{pokemon.weight / 10} kg</p>
                </div>
                <div className="bg-pokemon-gray-light rounded-lg p-4">
                  <span className="text-sm text-pokemon-gray">Abilities</span>
                  <p className="font-semibold">
                    {pokemon.abilities.map(ability => (
                      ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1).replace('-', ' ')
                    )).join(', ')}
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Base Stats</h2>
                <div className="space-y-3">
                  {pokemon.stats.map(stat => {
                    const percentage = (stat.base_stat / 255) * 100;
                    let color = 'bg-pokemon-red';
                    
                    if (stat.base_stat >= 50) color = 'bg-pokemon-orange';
                    if (stat.base_stat >= 80) color = 'bg-pokemon-yellow';
                    if (stat.base_stat >= 100) color = 'bg-pokemon-green';
                    
                    return (
                      <div key={stat.stat.name} className="flex items-center">
                        <div className="w-24 text-sm font-medium">
                          {formatStatName(stat.stat.name)}
                        </div>
                        <div className="w-12 text-right mr-3 font-semibold">
                          {stat.base_stat}
                        </div>
                        <div className="flex-grow bg-pokemon-gray-light rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${color}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;