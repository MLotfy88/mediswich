
import { useState, useEffect, useRef, useContext } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Search, Filter } from "lucide-react";
import { getDrugSuggestions } from "@/services/drugService";
import { AppLanguage } from "@/types";
import { LanguageContext } from "@/App";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  currentLanguage?: AppLanguage;
  onFilterToggle?: () => void;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  onFilterToggle 
}: SearchBarProps) => {
  const { language } = useContext(LanguageContext);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; nameInOtherLanguage?: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue.trim()) {
      const fetchSuggestions = async () => {
        // Fix the type mismatch by ensuring language.code is passed correctly
        const suggestionResults = getDrugSuggestions(searchValue, language.code);
        setSuggestions(suggestionResults);
      };
      
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchValue, language.code]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative" ref={commandRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onFocus={() => searchValue.trim() && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-16 rounded-full border-2 border-pharma-primary focus:outline-none focus:border-pharma-accent transition-colors bg-white text-gray-800"
            dir={language.direction}
          />
          <button
            type="submit"
            className="absolute flex items-center pl-3 text-pharma-primary"
            style={{ 
              left: language.direction === 'rtl' ? 'auto' : '0', 
              right: language.direction === 'rtl' ? '0' : 'auto' 
            }}
          >
            <Search className="h-6 w-6" />
          </button>
          
          {onFilterToggle && (
            <Button
              type="button"
              className="absolute rtl:left-3 ltr:right-3 bg-transparent hover:bg-pharma-primary/10 p-2"
              variant="ghost"
              onClick={onFilterToggle}
            >
              <Filter className="text-pharma-primary h-5 w-5" />
            </Button>
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-md bg-white z-50 overflow-hidden">
          <Command>
            <CommandList className="max-h-64 overflow-auto">
              <CommandGroup>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={() => handleSuggestionClick(suggestion.name)}
                    className="px-4 py-2 hover:bg-pharma-secondary cursor-pointer focus:bg-pharma-secondary"
                  >
                    <div className="flex flex-col w-full" dir={language.direction}>
                      <span className="font-medium">{suggestion.name}</span>
                      {suggestion.nameInOtherLanguage && (
                        <span className="text-xs text-gray-500">
                          {suggestion.nameInOtherLanguage}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
