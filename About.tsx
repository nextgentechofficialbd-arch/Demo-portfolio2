import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="w-full md:w-1/2">
             <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-20 blur-lg"></div>
               <img 
                 src={about.image} 
                 alt="About Me" 
                 className="relative w-full h-[500px] object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
               />
             </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              {about.title}
            </h2>
            <div className="h-1 w-20 bg-primary mb-8"></div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {about.bio}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {about.stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
