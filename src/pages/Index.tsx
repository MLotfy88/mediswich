
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@/App";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterPanel from "@/components/FilterPanel";
import SearchResults from "@/components/SearchResults";
import Hero from "@/components/Hero";
import { searchDrugs } from "@/services/drugService";
import { Drug, FilterOptions, AppLanguage } from "@/types";
import DrugCard from "@/components/DrugCard";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [popularDrugs, setPopularDrugs] = useState<Drug[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    country: 'all',
    priceRange: {
      min: 0,
      max: 1000
    },
    availability: null
  });
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
  };

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

  // ترجمات حسب اللغة الحالية
  const translations = {
    searchPlaceholder: language.code === 'ar' ? 'ابحث عن اسم الدواء أو المادة الفعالة...' : 'Search by medication name or active ingredient...',
    filters: language.code === 'ar' ? 'المرشحات' : 'Filters',
    results: language.code === 'ar' ? 'نتائج البحث' : 'Search Results',
    popularDrugs: language.code === 'ar' ? 'أدوية شائعة' : 'Popular Medications',
    exploreMedications: language.code === 'ar' ? 'استكشف الأدوية' : 'Explore Medications',
    exploreMedicationsDesc: language.code === 'ar'
      ? 'اكتشف مجموعة متنوعة من الأدوية المتاحة في مصر وبدائلها'
      : 'Discover a wide range of medications available in Egypt and their alternatives',
    howItWorks: language.code === 'ar' ? 'كيف يعمل' : 'How It Works',
    step1Title: language.code === 'ar' ? 'ابحث عن الدواء' : 'Search for Medication',
    step1Desc: language.code === 'ar'
      ? 'أدخل اسم الدواء أو المادة الفعالة في شريط البحث'
      : 'Enter the medication name or active ingredient in the search bar',
    step2Title: language.code === 'ar' ? 'استعرض البدائل' : 'Browse Alternatives',
    step2Desc: language.code === 'ar'
      ? 'استعرض قائمة البدائل المتاحة مع معلومات التسعير والتوافر'
      : 'Browse the list of available alternatives with pricing and availability information',
    step3Title: language.code === 'ar' ? 'قارن وحدد' : 'Compare and Choose',
    step3Desc: language.code === 'ar'
      ? 'قارن بين الخيارات واختر البديل المناسب لاحتياجاتك'
      : 'Compare options and choose the alternative that suits your needs',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onLanguageChange={handleLanguageChange} currentLanguage={language} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* البحث والمرشحات */}
        <section id="search" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder={translations.searchPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* مرشحات البحث */}
              <div className="lg:col-span-1">
                <h2 
                  className="text-lg font-semibold mb-4 text-pharma-primary"
                  dir={language.direction}
                >
                  {translations.filters}
                </h2>
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>

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

        {/* كيف يعمل */}
        {!showResults && (
          <section className="py-14 bg-white">
            <div className="container mx-auto px-4">
              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-pharma-primary mb-12"
                dir={language.direction}
              >
                {translations.howItWorks}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* الخطوة 1 */}
                <div 
                  className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
                  dir={language.direction}
                >
                  <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-3">{translations.step1Title}</h3>
                  <p className="text-gray-600">{translations.step1Desc}</p>
                </div>
                
                {/* الخطوة 2 */}
                <div 
                  className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
                  dir={language.direction}
                >
                  <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-3">{translations.step2Title}</h3>
                  <p className="text-gray-600">{translations.step2Desc}</p>
                </div>
                
                {/* الخطوة 3 */}
                <div 
                  className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
                  dir={language.direction}
                >
                  <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-3">{translations.step3Title}</h3>
                  <p className="text-gray-600">{translations.step3Desc}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
