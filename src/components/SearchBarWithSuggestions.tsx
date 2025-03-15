
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { LanguageContext } from '@/App';
import SearchSuggestions from './SearchSuggestions';
import { DrugSuggestion, SearchQuery } from '@/types';

interface SearchBarWithSuggestionsProps {
  onSearch: (query: SearchQuery) => void;
  placeholder?: string;
  searchQuery: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  alternativesFor?: string;
}

const SearchBarWithSuggestions: React.FC<SearchBarWithSuggestionsProps> = ({
  onSearch,
  placeholder,
  searchQuery,
  setSearchQuery,
  alternativesFor
}) => {
  const { language } = useContext(LanguageContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({
      ...searchQuery,
      term: e.target.value
    });
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.term.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: DrugSuggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setIsSelectingSuggestion(true);
    
    // Set the search term to the selected suggestion's name
    const newQuery = {
      ...searchQuery,
      term: suggestion.name || ''
    };
    
    // Update the search query state
    setSearchQuery(newQuery);
    
    // Hide suggestions immediately
    setShowSuggestions(false);
    
    // Automatically trigger search with the new query after a short delay
    // to ensure the UI updates first
    setTimeout(() => {
      console.log("Triggering search with suggestion:", newQuery.term);
      onSearch(newQuery);
      setIsSelectingSuggestion(false);
    }, 100);
  };

  const clearSearch = () => {
    setSearchQuery({
      ...searchQuery,
      term: ''
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const translatedPlaceholder = placeholder || 
    (language.code === 'ar' ? 'ابحث عن الأدوية أو المادة الفعالة...' : 'Search for medications or active ingredients...');

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="relative flex items-center w-full">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery.term}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={translatedPlaceholder}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pharma-primary focus:border-transparent"
            dir={language.direction}
          />
          
          {searchQuery.term && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 rtl:left-12 rtl:right-auto text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-4 rtl:left-4 rtl:right-auto text-pharma-primary hover:text-pharma-primary/80"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      
      {showSuggestions && searchQuery.term.trim().length >= 2 && !isSelectingSuggestion && (
        <SearchSuggestions
          searchTerm={searchQuery.term}
          onSuggestionClick={handleSuggestionClick}
          alternativesFor={alternativesFor}
          position="bottom"
        />
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
