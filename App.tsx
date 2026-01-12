import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { ContentProvider } from './context/ContentContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

const NavLink = ({ href, children, mobile, onClick }: { href: string; children?: React.ReactNode; mobile?: boolean; onClick?: () => void }) => {
  const baseClasses = "text-sm font-medium transition-colors cursor-pointer hover:text-primary";
  const mobileClasses = "block text-lg py-2 text-gray-300";
  const desktopClasses = "text-gray-300";

  return (
    <a 
      href={href} 
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

const PortfolioLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold font-display tracking-tighter">
            ONYX<span className="text-primary">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Work</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/admin" className="p-2 text-gray-500 hover:text-white transition-colors" title="Admin Dashboard">
                <Shield size={18} />
             </Link>
             <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <NavLink href="#home" mobile onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink href="#about" mobile onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink href="#skills" mobile onClick={() => setIsMenuOpen(false)}>Skills</NavLink>
            <NavLink href="#projects" mobile onClick={() => setIsMenuOpen(false)}>Work</NavLink>
            <NavLink href="#contact" mobile onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;