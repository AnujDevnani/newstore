import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 football-field-pattern opacity-5 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Legendary<br />
              <span className="text-accent">Football Jerseys</span><br />
              Reimagined
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg">
              Discover our premium collection of iconic football kits, featuring Real Madrid legends and other football giants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="btn btn-primary">
                Browse Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#featured" className="btn btn-secondary">
                Featured Jerseys
              </a>
            </div>
          </motion.div>
          
          <motion.div 
  className="lg:w-1/2 relative w-full"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <div className="relative h-[400px] md:h-[450px] w-full">
    <div className="absolute top-0 right-0 w-4/5 md:w-3/5 h-3/5 rounded-lg overflow-hidden shadow-2xl">
      <img 
        src="https://2chat-user-data.s3.amazonaws.com/w/p/919645921914/9543989735669036_1" 
        alt="Featured Jersey" 
        className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
      />
    </div>
    <div className="absolute bottom-0 left-0 w-4/5 md:w-3/5 h-3/5 rounded-lg overflow-hidden shadow-2xl">
      <img 
        src="https://2chat-user-data.s3.amazonaws.com/w/p/919645921914/24409719375295113_1" 
        alt="Featured Jersey" 
        className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
      />
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;