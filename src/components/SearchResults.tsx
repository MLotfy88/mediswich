
import { useEffect, useState, useContext } from "react";
import { Drug, FilterOptions, AppLanguage } from "@/types";
import { filterDrugs, calculateSavings } from "@/services/drugService";
import { Pill, ShieldCheck, Stethoscope } from "lucide-react";
import NoResults from "./NoResults";
import { LanguageContext } from "@/App";
import DrugCard from "./DrugCard";

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

  // معالجة النتائج وتحديد الأدوية الرئيسية والبدائل
  useEffect(() => {
    const processResults = () => {
      // فلترة النتائج وفقًا للمرشحات المحددة
      const filtered = filterDrugs(
        results, 
        filterOptions.country, 
        filterOptions.priceRange, 
        filterOptions.availability
      );
      
      setFilteredResults(filtered);
      
      // تحديد الدواء الرئيسي والبدائل
      if (filtered.length > 0) {
        const main = filtered[0];
        setMainDrug(main);
        
        // جمع البدائل من الأدوية المصفاة وإضافة البدائل من الدواء الرئيسي
        const altDrugs: Drug[] = [];
        
        // إضافة البدائل من الدواء الرئيسي إذا كانت متوفرة
        if (main.alternatives && main.alternatives.length > 0) {
          main.alternatives.forEach(alt => {
            // تحويل البديل إلى كائن دواء كامل للعرض
            const fullAlt: Drug = {
              ...alt,
              alternatives: [] // تفريغ البدائل لتجنب التكرار
            };
            
            // فحص ما إذا كان البديل موجود في النتائج المصفاة
            const isDuplicate = filtered.slice(1).some(drug => drug.id === alt.id);
            
            if (!isDuplicate) {
              altDrugs.push(fullAlt);
            }
          });
        }
        
        // إضافة باقي الأدوية من النتائج المصفاة
        filtered.slice(1).forEach(drug => {
          altDrugs.push(drug);
        });
        
        setAlternatives(altDrugs);
      } else {
        setMainDrug(null);
        setAlternatives([]);
      }
    };
    
    processResults();
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
            <Pill className={language.direction === 'rtl' ? 'ml-2' : 'mr-2'} size={18} />
            {translations.mainDrug}
          </h3>
          
          <DrugCard drug={mainDrug} isMain={true} />
        </div>
      )}
      
      {/* البدائل المتاحة */}
      {alternatives.length > 0 && (
        <div>
          <h3 
            className="text-lg font-bold text-pharma-accent mb-4 flex items-center"
            dir={language.direction}
          >
            <Pill className={language.direction === 'rtl' ? 'ml-2' : 'mr-2'} size={18} />
            {translations.alternatives}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternatives.map((drug) => (
              <DrugCard key={drug.id} drug={drug} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
