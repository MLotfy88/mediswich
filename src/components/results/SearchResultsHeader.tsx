
import { useContext } from "react";
import { LanguageContext } from "@/App";
import { SearchQuery } from "@/types";

interface SearchResultsHeaderProps {
  searchQuery: SearchQuery;
  resultsCount: number;
}

export default function SearchResultsHeader({ 
  searchQuery, 
  resultsCount 
}: SearchResultsHeaderProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    resultsFor: language.code === 'ar' ? "نتائج البحث عن" : "Search results for"
  };

  return (
    <h2 
      className="text-xl font-bold text-pharma-primary mb-6"
      dir={language.direction}
    >
      {translations.resultsFor} "{searchQuery.term}" ({resultsCount})
    </h2>
  );
}
