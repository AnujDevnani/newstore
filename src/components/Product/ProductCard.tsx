import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Tilt from 'react-tilt';

interface Product {
  id: string;
  name: string;
  price: string;
  currency: string;
  images: string[];
  club: string;
  year: string;
  player: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const tiltOptions = {
    max: 10,
    scale: 1.03,
    speed: 200,
    glare: true,
    "max-glare": 0.2,
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Tilt.Tilt options={tiltOptions} className="card h-full">
        <div className="relative overflow-hidden group">
          <div className="aspect-[3/4] overflow-hidden">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Overlay with product details on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs mb-1">{product.club} • {product.year}</p>
              <h3 className="text-white font-bold text-lg truncate">{product.name}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <p className="text-text-secondary text-sm">{product.club}</p>
            </div>
            <p className="text-accent font-bold">{product.currency} {product.price}</p>
          </div>
          <div className="mt-3">
            <motion.button
              className="w-full py-2 text-center border-2 border-accent text-accent font-medium rounded hover:bg-accent hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </Tilt.Tilt>
    </Link>
  );
};

export default ProductCard;