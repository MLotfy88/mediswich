
import { useState, useEffect } from "react";
import { Drug, FilterOptions } from "@/types";
import { filterDrugs } from "@/services/drugService";
import DrugCard from "./DrugCard";
import NoResults from "./NoResults";

interface SearchResultsProps {
  results: Drug[];
  filterOptions: FilterOptions;
  searchQuery: string;
  isVisible: boolean;
}

export default function SearchResults({ 
  results, 
  filterOptions, 
  searchQuery,
  isVisible
}: SearchResultsProps) {
  const [filteredResults, setFilteredResults] = useState<Drug[]>(results);
  
  // Apply filters when results or filter options change
  useEffect(() => {
    setFilteredResults(
      filterDrugs(
        results, 
        filterOptions.country, 
        filterOptions.priceRange,
        filterOptions.availability
      )
    );
  }, [results, filterOptions]);

  // If results are hidden (not visible), return null
  if (!isVisible) {
    return null;
  }

  if (results.length === 0) {
    return searchQuery ? <NoResults query={searchQuery} /> : null;
  }

  if (filteredResults.length === 0) {
    return (
      <div className="text-center p-8 animate-fade-in">
        <p className="text-gray-600" dir="rtl">
          لا توجد نتائج تطابق معايير التصفية. يرجى تعديل الفلاتر لرؤية المزيد من النتائج.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {filteredResults.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}
