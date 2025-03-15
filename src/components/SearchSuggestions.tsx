
import { useState, useEffect, useRef, useContext } from 'react';
import { DrugSuggestion } from '@/types';
import { LanguageContext } from '@/App';
import { getDrugSuggestions } from '@/services/drugService';

interface SearchSuggestionsProps {
  searchTerm: string;
  onSuggestionClick: (suggestion: DrugSuggestion) => void;
  position?: 'bottom' | 'top';
  maxHeight?: string;
  alternativesFor?: string; // ID of drug to find alternatives for
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchTerm,
  onSuggestionClick,
  position = 'bottom',
  maxHeight = '300px',
  alternativesFor
}) => {
  const [suggestions, setSuggestions] = useState<DrugSuggestion[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useContext(LanguageContext);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      setIsVisible(false);
      return;
    }

    try {
      // Get suggestions using the updated getDrugSuggestions function from drugService
      console.log(`Fetching suggestions for "${searchTerm}" in ${language.code}`);
      const fetchedSuggestions = getDrugSuggestions(searchTerm, language.code);
      
      setSuggestions(fetchedSuggestions);
      setIsVisible(fetchedSuggestions.length > 0);
      console.log(`Found ${fetchedSuggestions.length} suggestions`);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setIsVisible(false);
    }
  }, [searchTerm, language.code]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={suggestionsRef}
      className={`absolute w-full bg-white shadow-lg rounded-md z-10 border border-gray-200 ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
      style={{ maxHeight, overflowY: 'auto' }}
      dir={language.direction}
    >
      <ul className="py-1">
        {suggestions.map((suggestion) => (
          <li 
            key={suggestion.id}
            className="px-4 py-2 hover:bg-pharma-secondary/20 cursor-pointer"
            onClick={() => {
              console.log("Suggestion clicked:", suggestion.name);
              onSuggestionClick(suggestion);
              setIsVisible(false);
            }}
          >
            <div className="flex flex-col">
              <div className="font-medium">
                {language.code === 'ar' ? suggestion.name : (suggestion.nameEn || suggestion.name)}
                {suggestion.nameInOtherLanguage && (
                  <span className="mx-1 text-sm text-gray-500">({suggestion.nameInOtherLanguage})</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {language.code === 'ar' ? suggestion.activeIngredient : (suggestion.activeIngredientEn || suggestion.activeIngredient)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
