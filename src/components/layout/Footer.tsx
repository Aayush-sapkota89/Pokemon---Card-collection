import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pokemon-gray-dark text-white py-8 mt-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">PokéCollection</h3>
            <p className="text-pokemon-gray-light text-sm">
              The ultimate Pokémon card collection viewer
            </p>
          </div>
          
          <div className="flex space-x-4 items-center">
            <a 
              href="https://github.com/pokeapi/pokeapi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pokemon-gray-light hover:text-white transition-colors flex items-center"
            >
              <Github className="w-5 h-5 mr-1" />
              <span>PokéAPI</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-pokemon-gray-light">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-pokemon-red" /> using React & Tailwind CSS
          </p>
          <p className="mt-1">
            Pokémon and Pokémon character names are trademarks of Nintendo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;