
import { useState, useContext } from "react";
import { LanguageContext } from "@/App";
import { Drug, SearchQuery, FilterOptions } from "@/types";
import SearchResults from "./SearchResults";
import { getAllDrugs, searchDrugs } from "@/services/drugService";
import ImportDrugsForm from "./ImportDrugsForm";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import SearchBarWithSuggestions from "./SearchBarWithSuggestions";
import FilterPanel from "./FilterPanel";
import { filterDrugs } from "@/services/drugFilterService";

interface SearchSectionProps {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  searchQuery: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  searchResults: Drug[];
  setSearchResults: (results: Drug[]) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showResults,
  setShowResults,
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults
}) => {
  const { language } = useContext(LanguageContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    searchPlaceholder: language.code === 'ar' 
      ? 'ابحث عن الأدوية أو المادة الفعالة...' 
      : 'Search for medications or active ingredients...',
    filters: language.code === 'ar' ? 'الفلاتر' : 'Filters',
    noResults: language.code === 'ar' ? 'لا توجد نتائج' : 'No results found',
    importData: language.code === 'ar' ? 'استيراد بيانات الأدوية' : 'Import Drug Data',
  };

  const handleSearch = async (query: SearchQuery) => {
    if (!query.term.trim()) return;
    
    setIsLoading(true);
    try {
      console.log(`Searching for: "${query.term}"`);
      const results = searchDrugs(query.term);
      console.log(`Found ${results.length} results for "${query.term}"`);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDrugDataImport = (updatedDrugs: Drug[]) => {
    console.log(`Import callback received ${updatedDrugs.length} drugs`);
    
    if (searchQuery.term.trim()) {
      // Re-run search with current query to update results
      handleSearch(searchQuery);
    }
  };

  const handleFilterChange = async (filters: FilterOptions) => {
    try {
      const filteredResults = await filterDrugs(
        filters.country,
        filters.priceRange,
        filters.availability,
        filters.drugType
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error filtering drugs:", error);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <SearchBarWithSuggestions
                  onSearch={handleSearch}
                  placeholder={translations.searchPlaceholder}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFilter}
                  className={`ml-2 ${isFilterOpen ? 'bg-pharma-primary/10' : ''}`}
                  aria-label={translations.filters}
                >
                  <Filter size={20} />
                </Button>
              </div>
              
              {isFilterOpen && (
                <FilterPanel 
                  onFilterChange={handleFilterChange}
                  drugs={searchResults}
                />
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pharma-primary"></div>
              </div>
            ) : (
              showResults && (
                <SearchResults 
                  results={searchResults}
                  searchQuery={searchQuery}
                />
              )
            )}
            
            {!showResults && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4" dir={language.direction}>
                  {translations.importData}
                </h3>
                <ImportDrugsForm onImportSuccess={handleDrugDataImport} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
