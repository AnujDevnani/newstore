import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../UI/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md py-3 shadow-md' : 'py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="z-10">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-lg font-medium hover:text-accent transition-colors ${
              pathname === '/' ? 'text-accent' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`text-lg font-medium hover:text-accent transition-colors ${
              pathname === '/catalog' ? 'text-accent' : ''
            }`}
          >
            Catalog
          </Link>
          <a 
            href="#about" 
            className="text-lg font-medium hover:text-accent transition-colors"
          >
            About
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium hover:text-accent transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4 z-10">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>
          
          <Link 
            to="/wishlist" 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="View wishlist"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-card shadow-lg md:hidden"
            >
              <div className="container-custom py-5 flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className={`text-lg font-medium hover:text-accent transition-colors ${
                    pathname === '/' ? 'text-accent' : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/catalog" 
                  className={`text-lg font-medium hover:text-accent transition-colors ${
                    pathname === '/catalog' ? 'text-accent' : ''
                  }`}
                >
                  Catalog
                </Link>
                <a 
                  href="#about" 
                  className="text-lg font-medium hover:text-accent transition-colors"
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-lg font-medium hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;