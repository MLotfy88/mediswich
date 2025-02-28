
import { Search } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import FilterPanel from "./FilterPanel";
import { FilterOptions, Drug } from "@/types";
import { searchDrugs } from "@/services/drugService";

export default function Hero() {
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    country: "all",
    priceRange: {
      min: 0,
      max: 200
    },
    availability: "all"
  });

  const handleSearch = (query: string) => {
    const results = searchDrugs(query);
    setSearchResults(results);
    setSearchQuery(query);
    setShowResults(true);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  return (
    <div className="bg-gradient-to-b from-white to-pharma-secondary/20 min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" 
            dir="rtl"
          >
            المنصة الذكية الشاملة لإدارة الأدوية وتبديلها بذكاء!
          </h1>
          <p 
            className="text-lg text-gray-600 mb-8" 
            dir="rtl"
          >
            ابحث عن بدائل للأدوية، قارن الجرعات، واحسب الجرعات المناسبة حسب وزن المريض. تطبيق مصمم خصيصًا للأطباء والصيادلة في مصر والعالم.
          </p>
          
          <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="feature-btn">
              <Search size={20} className="mr-2" />
              <span>بحث بالمادة الفعالة</span>
            </button>
            <button className="feature-btn">
              <span>حاسبة الجرعات</span>
            </button>
            <button className="feature-btn">
              <span>مقارنة الأدوية</span>
            </button>
          </div>
        </div>

        {showResults && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
            <div className="md:col-span-3">
              <SearchResults 
                results={searchResults} 
                filterOptions={filterOptions} 
                searchQuery={searchQuery}
                isVisible={showResults}
              />
            </div>
          </div>
        )}

        {/* New features showcase */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="mb-4 h-12 w-12 rounded-full bg-pharma-primary/10 flex items-center justify-center">
              <Search className="text-pharma-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2" dir="rtl">البحث الذكي عن بدائل الأدوية</h3>
            <p className="text-gray-600" dir="rtl">
              دعم البحث باللغتين العربية والإنجليزية مع عرض اقتراحات تلقائية أثناء الكتابة وتصفية النتائج حسب التوفر والسعر.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="mb-4 h-12 w-12 rounded-full bg-pharma-accent/10 flex items-center justify-center">
              <svg className="text-pharma-accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4V20M18 12H6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" dir="rtl">مقارنة الجرعات المكافئة</h3>
            <p className="text-gray-600" dir="rtl">
              تحويل جرعات الأدوية إلى مكافئاتها مع دعم الوحدات المختلفة وعرض رسوم بيانية توضح نسب الفعالية والسمية.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="mb-4 h-12 w-12 rounded-full bg-pharma-save/10 flex items-center justify-center">
              <svg className="text-pharma-save" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 18C17 16.3431 14.7614 15 12 15C9.23858 15 7 16.3431 7 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" dir="rtl">حاسبة جرعة الدواء</h3>
            <p className="text-gray-600" dir="rtl">
              إدخال وزن المريض للحصول على جرعة مخصصة مع تنبيهات فورية عند تجاوز الحدود الآمنة للجرعات وإمكانية حفظ ومشاركة الحسابات.
            </p>
          </div>
        </div>

        {/* Data sources section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center" dir="rtl">قواعد البيانات المُدمجة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-pharma-primary" dir="rtl">مصادر مصرية</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-600" dir="rtl">
                <li>الهيئة المصرية للدواء (EDA)</li>
                <li>الدواء المصري (EIP)</li>
                <li>الإرشادات العلاجية لوزارة الصحة المصرية</li>
                <li>قواعد بيانات المستشفيات الجامعية</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-pharma-accent" dir="rtl">مصادر عالمية</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-600" dir="rtl">
                <li>قائمة منظمة الصحة العالمية (WHO EML)</li>
                <li>Drugs.com و RxList</li>
                <li>FDA Orange Book</li>
                <li>Micromedex و UpToDate</li>
                <li>PubMed و ClinicalTrials.gov</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Marketing tagline */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl font-bold text-pharma-primary" dir="rtl">
            MediSwitch – حيث الدقة الطبية تلتقي بالذكاء الاصطناعي لخدمة الطب المصري والعالمي! 🌍💊
          </p>
        </div>
      </div>
    </div>
  );
}
