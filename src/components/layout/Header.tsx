import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Zap } from 'lucide-react';
import { usePokemon } from '../../context/PokemonContext';

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePokemon();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="bg-pokemon-red shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-pokemon-red" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">PokéCollection</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-white hover:text-yellow-100 font-medium ${
                location.pathname === '/' ? 'border-b-2 border-white' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`text-white hover:text-yellow-100 font-medium flex items-center ${
                location.pathname === '/favorites' ? 'border-b-2 border-white' : ''
              }`}
            >
              <Heart className="w-4 h-4 mr-1" />
              Favorites
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 rounded-full bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 w-64 transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-pokemon-gray" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 rounded-full bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-pokemon-gray" />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white font-medium p-2 rounded hover:bg-red-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className="text-white font-medium p-2 rounded hover:bg-red-600 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;