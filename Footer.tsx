import React from 'react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { content } = useContent();

  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {content.hero.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
