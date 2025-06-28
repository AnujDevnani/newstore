import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products_bg';

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
}

export interface Filters {
  search: string;
  club: string;
  player: string;
  yearRange: [number, number];
  sortBy: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, filters }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [clubs, setClubs] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [years, setYears] = useState<[number, number]>([1980, 2026]);

  useEffect(() => {
    // Extract unique clubs and players, filtering out empty/null values
    const uniqueClubs = Array.from(
      new Set(products.filter(p => p.club).map(p => p.club))
    ).sort();
    
    const uniquePlayers = Array.from(
      new Set(products.filter(p => p.player).map(p => p.player))
    ).sort();
    
    // Get min and max years from products
    const numericYears = products
      .map(p => p.year)
      .filter(year => !isNaN(Number(year)))
      .map(year => Number(year));
    
    const minYear = Math.min(...numericYears) || new Date().getFullYear();
    const maxYear = Math.max(...numericYears) || new Date().getFullYear() + 1;
    
    setClubs(uniqueClubs);
    setPlayers(uniquePlayers);
    setYears([minYear, maxYear]);
  }, []);

  const handleReset = () => {
    onFilterChange({
      search: '',
      club: '',
      player: '',
      yearRange: years,
      sortBy: 'default'
    });
  };

  return (
    <div className="mb-8">
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={handleReset}
              className="text-text-secondary hover:text-accent text-sm font-medium"
            >
              Reset All
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={filters.search}
                  onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                  placeholder="Search jerseys..."
                  className="input pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              </div>
            </div>
            
            {/* Club Filter */}
            <div>
              <label htmlFor="club" className="block text-sm font-medium mb-2">Club</label>
              <select
                id="club"
                value={filters.club}
                onChange={(e) => onFilterChange({ ...filters, club: e.target.value })}
                className="input"
              >
                <option value="">All Clubs</option>
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>
            
            {/* Player Filter */}
            <div>
              <label htmlFor="player" className="block text-sm font-medium mb-2">Player</label>
              <select
                id="player"
                value={filters.player}
                onChange={(e) => onFilterChange({ ...filters, player: e.target.value })}
                className="input"
              >
                <option value="">All Players</option>
                {players.map(player => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium mb-2">Sort By</label>
              <select
                id="sortBy"
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                className="input"
              >
                <option value="default">Featured</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="year_newest">Year (Newest First)</option>
                <option value="year_oldest">Year (Oldest First)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Button and Simple Search */}
      <div className="md:hidden">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Search jerseys..."
              className="input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="btn btn-secondary py-2"
          >
            Filters
          </button>
        </div>
        
        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex justify-end"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsMobileFilterOpen(false);
                }
              }}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="w-4/5 max-w-md bg-card h-full overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Club Filter */}
                    <div>
                      <label htmlFor="mobile-club" className="block text-sm font-medium mb-2">Club</label>
                      <select
                        id="mobile-club"
                        value={filters.club}
                        onChange={(e) => onFilterChange({ ...filters, club: e.target.value })}
                        className="input"
                      >
                        <option value="">All Clubs</option>
                        {clubs.map(club => (
                          <option key={club} value={club}>{club}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Player Filter */}
                    <div>
                      <label htmlFor="mobile-player" className="block text-sm font-medium mb-2">Player</label>
                      <select
                        id="mobile-player"
                        value={filters.player}
                        onChange={(e) => onFilterChange({ ...filters, player: e.target.value })}
                        className="input"
                      >
                        <option value="">All Players</option>
                        {players.map(player => (
                          <option key={player} value={player}>{player}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Sort By */}
                    <div>
                      <label htmlFor="mobile-sortBy" className="block text-sm font-medium mb-2">Sort By</label>
                      <select
                        id="mobile-sortBy"
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                        className="input"
                      >
                        <option value="default">Featured</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="year_newest">Year (Newest First)</option>
                        <option value="year_oldest">Year (Oldest First)</option>
                      </select>
                    </div>
                    
                    <div className="pt-4 flex space-x-3">
                      <button 
                        onClick={handleReset}
                        className="btn btn-secondary flex-1"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="btn btn-primary flex-1"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductFilter;