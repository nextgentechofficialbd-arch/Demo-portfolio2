import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero: React.FC = () => {
  const { content } = useContent();
  const { hero, contact } = content;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-primary font-medium tracking-wider mb-4 uppercase text-sm">
              {hero.tagline}
            </h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              {hero.name}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
              {hero.description}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
              >
                View Work
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center md:justify-start gap-6 text-gray-400">
               {contact.socials.map((social) => (
                 <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                   {social.icon === 'Github' && <Github size={24} />}
                   {social.icon === 'Linkedin' && <Linkedin size={24} />}
                   {social.icon === 'Twitter' && <Mail size={24} />} {/* Fallback icon if twitter not in lucide defaults or using X */}
                 </a>
               ))}
            </div>
          </motion.div>

          {/* Profile Image (Optional fancy blob or frame) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center md:justify-end"
          >
             <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl shadow-primary/20">
               <img 
                 src={hero.profileImage} 
                 alt={hero.name} 
                 className="w-full h-full object-cover" 
               />
             </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-gray-500" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
