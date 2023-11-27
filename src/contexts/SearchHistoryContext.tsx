// SearchHistoryContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import searchHistoryService, { SearchHistoryItem } from '@/services/searchHistoryService';

interface SearchHistoryContextProps {
  searchHistory: SearchHistoryItem[];
  addSearchHistoryItem: (userTag: string, status: string, repositoriesCount: number) => void;
  removeSearchHistoryItem: (id: string) => void;
  setSearchHistory: React.Dispatch<React.SetStateAction<SearchHistoryItem[]>>;
}


const SearchHistoryContext = createContext<SearchHistoryContextProps | undefined>(undefined);

interface SearchHistoryProviderProps {
  children: ReactNode;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedSearchHistory = searchHistoryService.getSearchHistory();
    setSearchHistory(loadedSearchHistory);
    setLoading(false);
  }, []);

  const addSearchHistoryItem = (userTag: string, status: string, repositoriesCount: number) => {
    searchHistoryService.addSearchHistoryItem(userTag, status, repositoriesCount);
    setSearchHistory(searchHistoryService.getSearchHistory());
  };

  const removeSearchHistoryItem = (id: string) => {
    searchHistoryService.removeSearchHistoryItem(id);
    setSearchHistory(searchHistoryService.getSearchHistory());
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        addSearchHistoryItem,
        removeSearchHistoryItem,
        setSearchHistory, 
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};


export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);

  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }

  return context;
};
