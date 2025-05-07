import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products';

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const items = products.filter(p => wishlistIds.includes(p.id));
      setWishlistItems(items);
    };

    loadWishlist();
    window.addEventListener('storage', loadWishlist);
    return () => window.removeEventListener('storage', loadWishlist);
  }, []);

  return (
    <motion.div
      className="pt-32 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
          <p className="text-text-secondary">Items you've saved for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-text-secondary mb-6">
              Browse our catalog and add items to your wishlist
            </p>
            <Link to="/catalog" className="btn btn-primary">
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
