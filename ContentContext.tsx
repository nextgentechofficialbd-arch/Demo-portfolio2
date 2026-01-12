import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioContent } from '../types';
import { INITIAL_CONTENT } from '../constants';

interface ContentContextType {
  content: PortfolioContent;
  updateContent: (newContent: PortfolioContent) => void;
  resetContent: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<PortfolioContent>(INITIAL_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching or loading from local storage
    const stored = localStorage.getItem('portfolio_content');
    if (stored) {
      try {
        setContent(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored content", e);
      }
    }
    setIsLoading(false);
  }, []);

  const updateContent = (newContent: PortfolioContent) => {
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(INITIAL_CONTENT);
    localStorage.removeItem('portfolio_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
