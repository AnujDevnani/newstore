import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [isNameCustomizationOpen, setIsNameCustomizationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // If product not found or ID changed, update product
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Reset states
      setCurrentImageIndex(0);
      setSelectedSize('');
      setCustomName('');
      setCustomNumber('');
      setIsNameCustomizationOpen(false);
    } else {
      // Product not found, redirect to catalog
      navigate('/catalog');
    }
  }, [id, navigate]);

  if (!product) {
    return null; // Will redirect in useEffect
  }

  const sizes = product.sizes.split(', ');
  
  const handlePrevImage = () => {
    setCurrentImageIndex(current => 
      current === 0 ? product.images.length - 1 : current - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(current => 
      current === product.images.length - 1 ? 0 : current + 1
    );
  };

  const toggleNameCustomization = () => {
    setIsNameCustomizationOpen(!isNameCustomizationOpen);
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in ordering:
    To, 
Name:
Address: 

District: 
State:
Pincode:
Contact no. 1.: 
2.: \n\n` +

      `Product: ${product.name}\n` +
      `Size: ${selectedSize}\n` +
      `${customName ? `Name: ${customName}\n` : ''}` +
      `${customNumber ? `Number: ${customNumber}\n` : ''}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916269064255?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    `Product: 
Size:`
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
        <Link 
          to="/catalog" 
          className="inline-flex items-center text-text-secondary hover:text-accent mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="relative">
            <div className="relative aspect-[3/4] bg-card rounded-lg overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-md overflow-hidden transition-all ${
                      idx === currentImageIndex 
                        ? 'ring-2 ring-accent scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center text-text-secondary mb-4">
                <span>{product.club}</span>
                <span className="mx-2">•</span>
                <span>{product.year}</span>
              </div>
              <p className="text-accent text-2xl font-bold">{product.currency} {product.price}</p>
            </div>
            
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-text-secondary whitespace-pre-line">{product.description}</p>
              </div>
              
              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
                        selectedSize === size 
                          ? 'border-accent bg-accent/10 text-accent' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Name & Number Customization */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Customization</h3>
                  <button 
                    onClick={toggleNameCustomization}
                    className="text-accent text-sm font-medium"
                  >
                    {isNameCustomizationOpen ? 'Cancel' : 'Add Name & Number'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {isNameCustomizationOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="customName" className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            id="customName"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                            placeholder="e.g. RONALDO"
                            className="input"
                            maxLength={12}
                          />
                        </div>
                        <div>
                          <label htmlFor="customNumber" className="block text-sm font-medium mb-1">Number</label>
                          <input
                            type="number"
                            id="customNumber"
                            value={customNumber}
                            onChange={(e) => setCustomNumber(e.target.value.substring(0, 2))}
                            placeholder="e.g. 7"
                            className="input"
                            min={1}
                            max={99}
                          />
                        </div>
                      </div>
                      <div className="flex bg-gray-100 dark:bg-slate-800 p-4 rounded-md mb-4 items-center justify-center">
                        <div className="text-center">
                          {customName && (
                            <p className="font-bold text-xl">{customName}</p>
                          )}
                          {customNumber && (
                            <p className="font-bold text-4xl">{customNumber}</p>
                          )}
                          {!customName && !customNumber && (
                            <p className="text-text-secondary">Enter name and number above</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  className="btn btn-primary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order Now
                </motion.button>
                
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How To Order</h3>
                <p className="text-text-secondary whitespace-pre-line"> 1. Click on order now above.</p>
                <p className="text-text-secondary whitespace-pre-line"> 2. DM on whatsapp +916269064255 (with your size and name of product). </p>
                <p className="text-text-secondary whitespace-pre-line"> 4. DM on Instagram <a href="https://instagram.com/offside1940" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@offside1940</a> (with your size and name of product) for orders.</p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;