
import { useState, useEffect, useRef, useContext } from 'react';
import { Drug, DrugSuggestion } from '@/types';
import { LanguageContext } from '@/App';
import { getAllDrugs } from '@/services/drugService';

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

    // Use an async function inside useEffect to properly handle the Promise
    const fetchSuggestions = async () => {
      try {
        const allDrugs = getAllDrugs();  // Now returns directly an array
        let filteredSuggestions: DrugSuggestion[] = [];

        if (alternativesFor) {
          // If we're searching for alternatives, find the drug and get its alternatives
          const drug = allDrugs.find(d => d.id === alternativesFor);
          if (drug && drug.alternatives) {
            filteredSuggestions = drug.alternatives
              .filter(alt => 
                (alt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 (alt.nameEn && alt.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
                 alt.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 (alt.activeIngredientEn && alt.activeIngredientEn.toLowerCase().includes(searchTerm.toLowerCase())))
              )
              .map(alt => ({
                id: alt.id,
                name: alt.name,
                nameEn: alt.nameEn,
                activeIngredient: alt.activeIngredient,
                activeIngredientEn: alt.activeIngredientEn
              }));
          }
        } else {
          // Normal drug search
          filteredSuggestions = allDrugs
            .filter(drug => 
              (drug.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               (drug.nameEn && drug.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
               drug.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (drug.activeIngredientEn && drug.activeIngredientEn.toLowerCase().includes(searchTerm.toLowerCase())))
            )
            .map(drug => ({
              id: drug.id,
              name: drug.name,
              nameEn: drug.nameEn,
              activeIngredient: drug.activeIngredient,
              activeIngredientEn: drug.activeIngredientEn
            }));
        }

        // Limit to top 10 suggestions
        setSuggestions(filteredSuggestions.slice(0, 10));
        setIsVisible(filteredSuggestions.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setIsVisible(false);
      }
    };

    // Call the async function
    fetchSuggestions();
  }, [searchTerm, alternativesFor]);

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
      className={`absolute w-full bg-white shadow-lg rounded-md z-10 ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
      style={{ maxHeight, overflowY: 'auto' }}
      dir={language.direction}
    >
      <ul className="py-1">
        {suggestions.map((suggestion) => (
          <li 
            key={suggestion.id}
            className="px-4 py-2 hover:bg-pharma-secondary/20 cursor-pointer"
            onClick={() => {
              onSuggestionClick(suggestion);
              setIsVisible(false);
            }}
          >
            <div className="flex flex-col">
              <div className="font-medium">
                {language.code === 'ar' ? suggestion.name : (suggestion.nameEn || suggestion.name)}
                {suggestion.nameEn && language.code === 'ar' && (
                  <span className="mx-1 text-sm text-gray-500">({suggestion.nameEn})</span>
                )}
                {suggestion.name && language.code === 'en' && !suggestion.nameEn && (
                  <span className="mx-1 text-sm text-gray-500">({suggestion.name})</span>
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
