import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePokemon } from '../../context/PokemonContext';

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = usePokemon();
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full ${
            currentPage === i 
              ? 'bg-pokemon-red text-white font-bold' 
              : 'bg-white text-pokemon-gray-dark hover:bg-pokemon-gray-light'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pageNumbers;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          currentPage === 1 
            ? 'bg-pokemon-gray-light text-pokemon-gray cursor-not-allowed' 
            : 'bg-white text-pokemon-gray-dark hover:bg-pokemon-gray-light'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {renderPageNumbers()}
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          currentPage === totalPages 
            ? 'bg-pokemon-gray-light text-pokemon-gray cursor-not-allowed' 
            : 'bg-white text-pokemon-gray-dark hover:bg-pokemon-gray-light'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;