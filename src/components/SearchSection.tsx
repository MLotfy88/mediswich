
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@/App";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import SearchResults from "@/components/SearchResults";
import ImportDrugsForm from "@/components/ImportDrugsForm";
import { searchDrugs } from "@/services/drugService";
import { Drug, FilterOptions } from "@/types";
import DrugCard from "@/components/DrugCard";
import { useToast } from "@/hooks/use-toast";
import { X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface SearchSectionProps {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Drug[];
  setSearchResults: (results: Drug[]) => void;
}

export default function SearchSection({ 
  showResults, 
  setShowResults, 
  searchQuery, 
  setSearchQuery,
  searchResults,
  setSearchResults
}: SearchSectionProps) {
  const { language } = useContext(LanguageContext);
  const [popularDrugs, setPopularDrugs] = useState<Drug[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    country: 'all',
    priceRange: {
      min: 0,
      max: 1000
    },
    availability: null
  });
  const [showFilter, setShowFilter] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load some popular drugs for display before search
    const sampleDrugs = searchDrugs("", language.code).slice(0, 6);
    setPopularDrugs(sampleDrugs);
  }, [language.code]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      toast({
        title: language.code === 'ar' ? 'حقل البحث فارغ' : 'Empty search field',
        description: language.code === 'ar' 
          ? 'يرجى إدخال اسم دواء للبحث عنه' 
          : 'Please enter a medication name to search',
        variant: "destructive",
      });
      return;
    }

    const results = searchDrugs(query, language.code);
    setSearchQuery(query);
    setSearchResults(results);
    setShowResults(true);

    if (results.length === 0) {
      toast({
        title: language.code === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found',
        description: language.code === 'ar'
          ? `لم نتمكن من العثور على "${query}" في قاعدة البيانات`
          : `We couldn't find "${query}" in our database`,
        variant: "destructive",
      });
    } else {
      toast({
        title: language.code === 'ar' ? 'تم العثور على النتائج' : 'Results found',
        description: language.code === 'ar'
          ? `تم العثور على ${results.length} نتيجة لـ "${query}"`
          : `Found ${results.length} results for "${query}"`,
      });
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // ترجمات حسب اللغة الحالية
  const translations = {
    searchPlaceholder: language.code === 'ar' ? 'ابحث عن اسم الدواء أو المادة الفعالة...' : 'Search by medication name or active ingredient...',
    filters: language.code === 'ar' ? 'المرشحات' : 'Filters',
    popularDrugs: language.code === 'ar' ? 'أدوية شائعة' : 'Popular Medications',
    importData: language.code === 'ar' ? 'استيراد البيانات' : 'Import Data',
  };

  return (
    <section id="search" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={translations.searchPlaceholder}
            onFilterToggle={toggleFilter}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* مرشحات البحث للأجهزة الكبيرة */}
          <div className="lg:col-span-1 hidden lg:block">
            <h2 
              className="text-lg font-semibold mb-4 text-pharma-primary"
              dir={language.direction}
            >
              {translations.filters}
            </h2>
            <FilterPanel onFilterChange={handleFilterChange} />
            
            {/* إضافة مكون استيراد البيانات */}
            <div className="mt-6">
              <h2 
                className="text-lg font-semibold mb-4 text-pharma-primary"
                dir={language.direction}
              >
                {translations.importData}
              </h2>
              <ImportDrugsForm />
            </div>
          </div>

          {/* مرشحات البحث للأجهزة الصغيرة (عبر شيت جانبي) */}
          <Sheet open={showFilter} onOpenChange={setShowFilter}>
            <SheetContent side={language.direction === 'rtl' ? 'right' : 'left'} className="w-[90%] sm:w-[350px] overflow-y-auto">
              <div className="pt-8 h-full overflow-y-auto">
                <FilterPanel 
                  onFilterChange={handleFilterChange} 
                  onClose={() => setShowFilter(false)}
                />
                
                <div className="mt-6">
                  <h2 
                    className="text-lg font-semibold mb-4 text-pharma-primary"
                    dir={language.direction}
                  >
                    {translations.importData}
                  </h2>
                  <ImportDrugsForm />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* نتائج البحث */}
          <div className="lg:col-span-3">
            <SearchResults 
              results={searchResults}
              filterOptions={filterOptions}
              searchQuery={searchQuery}
              isVisible={showResults}
            />

            {/* عرض الأدوية الشائعة عندما لا تكون هناك نتائج بحث */}
            {!showResults && (
              <div>
                <h2 
                  className="text-xl font-bold text-pharma-primary mb-6"
                  dir={language.direction}
                >
                  {translations.popularDrugs}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularDrugs.map((drug) => (
                    <DrugCard key={drug.id} drug={drug} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
