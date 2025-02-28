
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { searchDrugSuggestions } from "@/services/drugService";
import { AppLanguage } from "@/types";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  currentLanguage?: AppLanguage;
}

export default function SearchBar({ onSearch, placeholder = "ابحث عن دواء أو مادة فعالة...", currentLanguage }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<{name: string, type: 'drug' | 'ingredient'}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // تعيين النص التلميحي حسب اللغة
  const placeholderText = currentLanguage?.code === 'en' 
    ? "Search for medication or active ingredient..." 
    : "ابحث عن دواء أو مادة فعالة...";

  // توليد الاقتراحات بناءً على الاستعلام الحالي
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // استخدام الدالة المحسنة للبحث عن الاقتراحات
    const suggestionsResult = searchDrugSuggestions(query);
    setSuggestions(suggestionsResult);
    setShowSuggestions(suggestionsResult.length > 0);
  }, [query]);

  // إغلاق الاقتراحات عند النقر خارج حقل البحث
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
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
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // النصوص حسب اللغة
  const translations = {
    drug: currentLanguage?.code === 'en' ? 'Medication' : 'دواء',
    ingredient: currentLanguage?.code === 'en' ? 'Active Ingredient' : 'مادة فعالة',
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query.length >= 2 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || placeholderText}
          className={`search-input pr-12 ${
            isFocused ? "ring-2 ring-pharma-primary/20 shadow-lg" : ""
          }`}
          dir={currentLanguage?.direction || "rtl"}
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 hover:text-pharma-primary transition-colors"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
      </form>

      {/* قائمة الاقتراحات */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200"
          dir={currentLanguage?.direction || "rtl"}
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="px-4 py-2 hover:bg-pharma-primary/10 cursor-pointer text-right flex justify-between items-center"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                <span>{suggestion.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  suggestion.type === 'drug' 
                  ? 'bg-pharma-primary/10 text-pharma-primary' 
                  : 'bg-pharma-accent/10 text-pharma-accent'
                }`}>
                  {suggestion.type === 'drug' ? translations.drug : translations.ingredient}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
