import { v4 as uuidv4 } from 'uuid';

interface SearchHistoryItem {
  id: string;
  timestamp: number;
  userTag: string;
  status: string;
  repositoriesCount: number;
}

const searchHistoryKey = 'searchHistory';

const searchHistoryService = {
  getSearchHistory: (): SearchHistoryItem[] => {
    const storedHistory = localStorage.getItem(searchHistoryKey);
    return storedHistory ? JSON.parse(storedHistory) : [];
  },

  addSearchHistoryItem: (userTag: string, status: string, repositoriesCount: number): void => {
    console.log('Valores recebidos:', userTag, status, repositoriesCount);      
    const id = uuidv4();
    const timestamp = Date.now();
    const newSearchItem: SearchHistoryItem = { id, timestamp, userTag, status, repositoriesCount };

    const existingHistory = searchHistoryService.getSearchHistory();
    const updatedHistory = [newSearchItem, ...existingHistory];

    localStorage.setItem(searchHistoryKey, JSON.stringify(updatedHistory));
  },

  removeSearchHistoryItem: (id: string): void => {
    const existingHistory = searchHistoryService.getSearchHistory();
    const updatedHistory = existingHistory.filter((item) => item.id !== id);

    localStorage.setItem(searchHistoryKey, JSON.stringify(updatedHistory));
  },
};

export default searchHistoryService;
