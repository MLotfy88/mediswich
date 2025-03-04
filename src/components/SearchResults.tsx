
import { useEffect, useState, useContext } from "react";
import { Drug, SearchQuery } from "@/types";
import { LanguageContext } from "@/App";
import NoResults from "./NoResults";
import SearchResultsHeader from "./results/SearchResultsHeader";
import MainDrugSection from "./results/MainDrugSection";
import AlternativesSection from "./results/AlternativesSection";

interface SearchResultsProps {
  results: Drug[];
  searchQuery: SearchQuery;
}

export default function SearchResults({ 
  results, 
  searchQuery
}: SearchResultsProps) {
  const { language } = useContext(LanguageContext);
  const [filteredResults, setFilteredResults] = useState<Drug[]>([]);
  const [mainDrug, setMainDrug] = useState<Drug | null>(null);
  const [alternatives, setAlternatives] = useState<Drug[]>([]);

  // الترجمات حسب اللغة
  const translations = {
    emptyResultsTitle: language.code === 'ar' ? "لم يتم العثور على نتائج" : "No Results Found",
    emptyResultsDesc: language.code === 'ar' 
      ? "لم نتمكن من العثور على أدوية تطابق استعلام البحث الخاص بك. يرجى تجربة كلمات رئيسية مختلفة."
      : "We couldn't find any medications matching your search query. Please try different keywords."
  };

  // معالجة النتائج وتحديد الأدوية الرئيسية والبدائل
  useEffect(() => {
    const processResults = () => {
      if (results.length === 0) {
        setFilteredResults([]);
        setMainDrug(null);
        setAlternatives([]);
        return;
      }
      
      // Use results directly as they're already filtered by the searchDrugs function
      setFilteredResults(results);
      
      // تحديد الدواء الرئيسي والبدائل
      const main = results[0];
      setMainDrug(main);
      
      // جمع البدائل من الأدوية المصفاة
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
          const isDuplicate = results.slice(1).some(drug => drug.id === alt.id);
          
          if (!isDuplicate) {
            altDrugs.push(fullAlt);
          }
        });
      }
      
      // إضافة باقي الأدوية من النتائج المصفاة
      results.slice(1).forEach(drug => {
        altDrugs.push(drug);
      });
      
      setAlternatives(altDrugs);
    };
    
    processResults();
  }, [results]);

  if (filteredResults.length === 0) {
    return <NoResults 
      title={translations.emptyResultsTitle}
      description={translations.emptyResultsDesc}
    />;
  }

  return (
    <div>
      <SearchResultsHeader 
        searchQuery={searchQuery} 
        resultsCount={filteredResults.length} 
      />
      
      {mainDrug && <MainDrugSection mainDrug={mainDrug} />}
      
      {alternatives.length > 0 && <AlternativesSection alternatives={alternatives} />}
    </div>
  );
}
