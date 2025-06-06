import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pokemon, PokemonListItem } from '../types/pokemon';

interface PokemonContextType {
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeType: string;
  setActiveType: (type: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeType, setActiveType] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('pokemon-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        
        const data = await response.json();
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
        
        const results = await Promise.all(
          data.results.map(async (pokemon: { name: string, url: string }) => {
            const detailResponse = await fetch(pokemon.url);
            const pokemonDetail = await detailResponse.json();
            
            return {
              id: pokemonDetail.id,
              name: pokemonDetail.name,
              image: pokemonDetail.sprites.other['official-artwork'].front_default || 
                     pokemonDetail.sprites.front_default,
              types: pokemonDetail.types.map((type: { type: { name: string } }) => type.type.name),
            };
          })
        );
        
        setPokemonList(results);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again later.');
        console.error('Error fetching Pokémon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  const value = {
    pokemonList,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    activeType,
    setActiveType,
    favorites,
    toggleFavorite,
    isFavorite,
    currentPage,
    setCurrentPage,
    totalPages,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};