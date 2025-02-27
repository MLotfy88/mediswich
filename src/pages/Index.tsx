
import { useState, useEffect } from "react";
import { Drug, FilterOptions } from "@/types";
import { searchDrugs, getAllDrugs } from "@/services/drugService";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    country: null,
    priceRange: {
      min: null,
      max: null
    }
  });
  const [isSearching, setIsSearching] = useState(false);
  const [featuredDrugs, setFeaturedDrugs] = useState<Drug[]>([]);
  const { toast } = useToast();

  // Load some featured drugs on initial load
  useEffect(() => {
    const allDrugs = getAllDrugs();
    // Get random 6 drugs for featured section
    const randomDrugs = [...allDrugs]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    
    setFeaturedDrugs(randomDrugs);
  }, []);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate loading delay
    setTimeout(() => {
      const results = searchDrugs(query);
      setSearchResults(results);
      setIsSearching(false);
      
      // Show toast for search results
      if (results.length > 0) {
        toast({
          title: "تم العثور على نتائج",
          description: `تم العثور على ${results.length} نتيجة لـ "${query}"`,
        });
      } else {
        toast({
          title: "لا توجد نتائج",
          description: `لم يتم العثور على نتائج لـ "${query}"`,
          variant: "destructive",
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-pharma-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 
                className="text-3xl font-bold text-pharma-primary mb-4"
                dir="rtl"
              >
                ابحث عن دوائك الآن
              </h2>
              <p 
                className="text-gray-600"
                dir="rtl"
              >
                أدخل اسم الدواء للبحث عن البدائل المتاحة وأسعارها في السوق المصري والعالمي
              </p>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            {(searchResults.length > 0 || searchQuery) && (
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <FilterPanel onFilterChange={setFilterOptions} />
                </div>
                
                <div className="lg:col-span-3">
                  {isSearching ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="w-16 h-16 border-4 border-pharma-primary/20 border-t-pharma-primary rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <SearchResults 
                      results={searchResults} 
                      filterOptions={filterOptions}
                      searchQuery={searchQuery}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Featured Drugs Section - shown when no search is performed */}
            {!searchQuery && featuredDrugs.length > 0 && (
              <div className="mt-16">
                <h2 
                  className="text-2xl font-bold text-pharma-primary mb-8 text-center"
                  dir="rtl"
                >
                  أدوية شائعة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {featuredDrugs.map((drug) => (
                    <div 
                      key={drug.id}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                      dir="rtl"
                      onClick={() => {
                        setSearchQuery(drug.name);
                        handleSearch(drug.name);
                      }}
                    >
                      <h3 className="text-lg font-medium text-pharma-primary">
                        {drug.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {drug.company} - {drug.country}
                      </p>
                      <p className="text-pharma-accent font-medium mt-2">
                        {drug.price} جنيه
                      </p>
                      <p className="text-xs text-gray-400 mt-3">
                        اضغط للبحث عن البدائل
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 
                className="text-3xl font-bold text-pharma-primary mb-4"
                dir="rtl"
              >
                لماذا تستخدم فارما فايندر جلوبال؟
              </h2>
              <p 
                className="text-gray-600"
                dir="rtl"
              >
                نوفر لك أسهل طريقة للعثور على بدائل للأدوية بأسعار مناسبة مع التركيز على جودة المنتج
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-pharma-secondary rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-pharma-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3 text-pharma-primary"
                  dir="rtl"
                >
                  بدائل متعددة
                </h3>
                <p 
                  className="text-gray-600"
                  dir="rtl"
                >
                  نوفر قائمة شاملة من البدائل لكل دواء بناءً على المادة الفعالة والتركيبة الدوائية
                </p>
              </div>
              
              <div className="bg-pharma-secondary rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-pharma-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3 text-pharma-primary"
                  dir="rtl"
                >
                  توفير المال
                </h3>
                <p 
                  className="text-gray-600"
                  dir="rtl"
                >
                  اعثر على بدائل أقل تكلفة ومنتجة محلياً بنفس الجودة وبأسعار أفضل
                </p>
              </div>
              
              <div className="bg-pharma-secondary rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-pharma-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3 text-pharma-primary"
                  dir="rtl"
                >
                  جودة موثوقة
                </h3>
                <p 
                  className="text-gray-600"
                  dir="rtl"
                >
                  نقدم معلومات عن الأدوية المعتمدة من هيئة الدواء المصرية والهيئات الدولية
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
