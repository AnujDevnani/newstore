import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award, Shirt } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Shirt className="h-10 w-10 text-accent" />,
      title: 'Premium Quality',
      description: 'Our jerseys feature sublimation quality printing and premium materials for comfort and durability.'
    },
    {
      icon: <Award className="h-10 w-10 text-accent" />,
      title: 'Authentic Design',
      description: 'Each jersey is meticulously designed to capture the essence of the original kits worn by legends.'
    },
    {
      icon: <Check className="h-10 w-10 text-accent" />,
      title: 'Attention to Detail',
      description: 'From embroidery to special edition designs, we ensure every detail is perfect.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About offside1940</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We're passionate about football heritage and bringing iconic jerseys to true fans.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://2chat-user-data.s3.amazonaws.com/w/p/919645921914/28653288467602772_1" 
                  alt="About offside1940" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-black p-4 rounded shadow-lg font-bold">
                Est. 1940
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Our Story</h3>
            <p className="text-text-secondary mb-6">
              Founded by football enthusiasts, offside1940 began with a simple mission: to provide fans with high-quality jerseys that celebrate football heritage and legendary players who defined eras.
            </p>
            <p className="text-text-secondary mb-8">
              We specialize in iconic Real Madrid kits and other legendary club jerseys, carefully recreating the designs that made history on the pitch.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                    <p className="text-text-secondary">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;