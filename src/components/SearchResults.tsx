
import { useEffect, useState, useContext } from "react";
import { Drug, FilterOptions, AppLanguage } from "@/types";
import { filterDrugs, calculateSavings } from "@/services/drugService";
import { Pill, ShieldCheck, Stethoscope } from "lucide-react";
import NoResults from "./NoResults";
import { LanguageContext } from "@/App";

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
  const { language } = useContext(LanguageContext);
  const [filteredResults, setFilteredResults] = useState<Drug[]>([]);
  const [mainDrug, setMainDrug] = useState<Drug | null>(null);
  const [alternatives, setAlternatives] = useState<Drug[]>([]);

  // الترجمات حسب اللغة
  const translations = {
    resultsFor: language.code === 'ar' ? "نتائج البحث عن" : "Search results for",
    mainDrug: language.code === 'ar' ? "الدواء الرئيسي" : "Main Drug",
    alternatives: language.code === 'ar' ? "البدائل المتاحة" : "Available Alternatives",
    emptyResultsTitle: language.code === 'ar' ? "لم يتم العثور على نتائج" : "No Results Found",
    emptyResultsDesc: language.code === 'ar' 
      ? "لم نتمكن من العثور على أدوية تطابق استعلام البحث الخاص بك. يرجى تجربة كلمات رئيسية مختلفة."
      : "We couldn't find any medications matching your search query. Please try different keywords.",
    price: language.code === 'ar' ? "السعر" : "Price",
    egp: language.code === 'ar' ? "ج.م" : "EGP",
    save: language.code === 'ar' ? "توفير" : "Save",
    available: language.code === 'ar' ? "متوفر" : "Available",
    unavailable: language.code === 'ar' ? "غير متوفر" : "Unavailable",
    compareTo: language.code === 'ar' ? "بالمقارنة مع" : "compared to",
    origin: language.code === 'ar' ? "المنشأ" : "Origin",
    egyptian: language.code === 'ar' ? "مصري" : "Egyptian",
    activeIngredient: language.code === 'ar' ? "المادة الفعالة" : "Active Ingredient",
    company: language.code === 'ar' ? "الشركة" : "Company"
  };

  // فلترة النتائج وفقًا للمرشحات المحددة
  useEffect(() => {
    const applyFilters = () => {
      const filtered = filterDrugs(
        results, 
        filterOptions.country, 
        filterOptions.priceRange, 
        filterOptions.availability
      );
      
      setFilteredResults(filtered);
      
      // تحديد الدواء الرئيسي والبدائل
      if (filtered.length > 0) {
        setMainDrug(filtered[0]);
        setAlternatives(filtered.slice(1));
      } else {
        setMainDrug(null);
        setAlternatives([]);
      }
    };
    
    applyFilters();
  }, [results, filterOptions]);

  if (!isVisible) return null;
  
  if (filteredResults.length === 0) {
    return <NoResults 
      title={translations.emptyResultsTitle}
      description={translations.emptyResultsDesc}
    />;
  }

  return (
    <div>
      <h2 
        className="text-xl font-bold text-pharma-primary mb-6"
        dir={language.direction}
      >
        {translations.resultsFor} "{searchQuery}" ({filteredResults.length})
      </h2>
      
      {/* الدواء الرئيسي */}
      {mainDrug && (
        <div className="mb-8">
          <h3 
            className="text-lg font-bold text-pharma-primary mb-4 flex items-center"
            dir={language.direction}
          >
            <Pill className="mr-2" size={18} />
            {translations.mainDrug}
          </h3>
          
          <div 
            className={`bg-white p-6 rounded-xl shadow-sm border border-pharma-primary/20 hover:shadow-md transition-all ${
              mainDrug.isEgyptian ? "egyptian-card" : ""
            }`}
            dir={language.direction}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-pharma-primary">
                  {language.code === 'ar' ? mainDrug.name : (mainDrug.nameEn || mainDrug.name)}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {translations.company}: {mainDrug.company}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-pharma-accent">
                  {mainDrug.price} {translations.egp}
                </div>
                {calculateSavings(mainDrug) > 0 && (
                  <div className="text-xs text-pharma-save font-medium mt-1">
                    {translations.save} {calculateSavings(mainDrug)}% {translations.compareTo} {mainDrug.alternatives[0].name}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-pharma-primary/10 rounded-full flex items-center justify-center mr-2">
                  <ShieldCheck size={12} className="text-pharma-primary" />
                </div>
                <span className="text-sm">
                  {translations.origin}: {mainDrug.isEgyptian ? translations.egyptian : mainDrug.country}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-pharma-primary/10 rounded-full flex items-center justify-center mr-2">
                  <Stethoscope size={12} className="text-pharma-primary" />
                </div>
                <span className="text-sm">
                  {translations.activeIngredient}: {language.code === 'ar' 
                    ? mainDrug.activeIngredient 
                    : (mainDrug.activeIngredientEn || mainDrug.activeIngredient)}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span 
                className={`text-xs px-2 py-1 rounded-full ${
                  mainDrug.isAvailable 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}
              >
                {mainDrug.isAvailable ? translations.available : translations.unavailable}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* البدائل المتاحة */}
      {alternatives.length > 0 && (
        <div>
          <h3 
            className="text-lg font-bold text-pharma-accent mb-4 flex items-center"
            dir={language.direction}
          >
            <Pill className="mr-2" size={18} />
            {translations.alternatives}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternatives.map((drug) => (
              <div 
                key={drug.id}
                className={`bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all ${
                  drug.isEgyptian ? "egyptian-card" : ""
                }`}
                dir={language.direction}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-pharma-primary">
                      {language.code === 'ar' ? drug.name : (drug.nameEn || drug.name)}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {translations.company}: {drug.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-pharma-accent">
                      {drug.price} {translations.egp}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  <div className="flex items-center">
                    <div className="w-3.5 h-3.5 bg-pharma-secondary rounded-full flex items-center justify-center mr-1.5">
                      <ShieldCheck size={10} className="text-pharma-primary" />
                    </div>
                    <span className="text-xs">
                      {translations.origin}: {drug.isEgyptian ? translations.egyptian : drug.country}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span 
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      drug.isAvailable 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {drug.isAvailable ? translations.available : translations.unavailable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
