import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import ProductFilter, { Filters } from '../components/Catalog/ProductFilter';
import { products } from '../data/products_bg';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    club: searchParams.get('club') || '',
    player: searchParams.get('player') || '',
    yearRange: [1980, 2026],
    sortBy: searchParams.get('sortBy') || 'default'
  });

  useEffect(() => {
    // Update URL search params when filters change
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.club) params.set('club', filters.club);
    if (filters.player) params.set('player', filters.player);
    if (filters.sortBy !== 'default') params.set('sortBy', filters.sortBy);
    setSearchParams(params);

    // Apply filters
    let result = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.club?.toLowerCase().includes(searchTerm) || 
        p.player?.toLowerCase().includes(searchTerm)
      );
    }

    // Club filter
    if (filters.club) {
      result = result.filter(p => p.club === filters.club);
    }

    // Player filter
    if (filters.player) {
      result = result.filter(p => p.player === filters.player);
    }

    // Sort
    if (filters.sortBy !== 'default') {
      switch (filters.sortBy) {
        case 'name_asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'year_newest':
          result.sort((a, b) => {
            // Handle special cases like "Special Edition"
            const yearA = !isNaN(Number(a.year)) ? Number(a.year) : 0;
            const yearB = !isNaN(Number(b.year)) ? Number(b.year) : 0;
            return yearB - yearA;
          });
          break;
        case 'year_oldest':
          result.sort((a, b) => {
            const yearA = !isNaN(Number(a.year)) ? Number(a.year) : 0;
            const yearB = !isNaN(Number(b.year)) ? Number(b.year) : 0;
            return yearA - yearB;
          });
          break;
      }
    }

    setFilteredProducts(result);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <motion.div
      className="pt-32 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Jersey Catalog</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Browse our collection of premium football jerseys featuring iconic designs from legendary clubs and players.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - takes 1/4 of the width on desktop */}
          <div className="md:w-1/4">
            <ProductFilter onFilterChange={handleFilterChange} filters={filters} />
          </div>

          {/* Products Grid - takes 3/4 of the width on desktop */}
          <div className="md:w-3/4">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-text-secondary mb-6">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index % 9 * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No jerseys found</h3>
                <p className="text-text-secondary">Try changing your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalog;