import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Logo: React.FC = () => {
  const { isDarkMode } = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const logoText = "offside1940";

  return (
    <motion.div 
      ref={ref}
      className="font-['Oswald'] text-2xl md:text-3xl font-bold flex items-center"
      initial="hidden"
      animate={controls}
    >
      <div className="flex">
        {logoText.split('').map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className={i === 0 ? 'text-accent' : ''}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`ml-1 w-3 h-3 rounded-full ${isDarkMode ? 'bg-accent' : 'bg-accent'}`}
      />
    </motion.div>
  );
};

export default Logo;