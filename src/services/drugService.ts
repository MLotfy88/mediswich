
import { Drug, FilterOptions, AppLanguage } from "@/types";
import { antibiotics } from "@/data/drugs/antibiotics";
import { painRelievers } from "@/data/drugs/painRelievers";
import { cholesterolLowering } from "@/data/drugs/cholesterolLowering";
import { cardiovascular } from "@/data/drugs/cardiovascular";
import { psychotropics } from "@/data/drugs/psychotropics";
import { hormones } from "@/data/drugs/hormones";
import { gastrointestinal } from "@/data/drugs/gastrointestinal";
import { antiallergic } from "@/data/drugs/antiallergic";
import { antidiabetic } from "@/data/drugs/antidiabetic";
import { specialMedications } from "@/data/drugs/specialMedications";
import { webTebMedications } from "@/data/drugs/webTebMedications";
import { altibbiMedications } from "@/data/drugs/altibbiMedications";
import { edaMedications } from "@/data/drugs/edaMedications";

// مجموعة شاملة من الأدوية من كافة الفئات
const allDrugs: Drug[] = [
  ...antibiotics,
  ...painRelievers,
  ...cholesterolLowering,
  ...cardiovascular,
  ...psychotropics,
  ...hormones,
  ...gastrointestinal,
  ...antiallergic,
  ...antidiabetic,
  ...specialMedications,
  ...webTebMedications, 
  ...altibbiMedications,
  ...edaMedications
];

// البحث عن البدائل في البيانات
export const searchDrugs = (query: string, lang: string = 'ar'): Drug[] => {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase();
  
  // البحث في الأسماء الإنجليزية إذا كانت اللغة إنجليزية، وإلا البحث في الأسماء العربية
  const searchResults = allDrugs.filter(drug => {
    if (lang === 'en') {
      // البحث في البيانات الإنجليزية
      return (drug.nameEn || drug.name).toLowerCase().includes(normalizedQuery) || 
             (drug.activeIngredientEn || drug.activeIngredient).toLowerCase().includes(normalizedQuery);
    } else {
      // البحث في البيانات العربية
      return drug.name.toLowerCase().includes(normalizedQuery) || 
             (drug.activeIngredient && drug.activeIngredient.toLowerCase().includes(normalizedQuery));
    }
  });

  return searchResults;
};

// حساب نسبة التوفير بالمقارنة مع السعر الأعلى
export const calculateSavings = (drug: Drug): number => {
  if (!drug.alternatives || drug.alternatives.length === 0) return 0;
  
  // Find the most expensive alternative
  const mostExpensiveAlt = drug.alternatives.reduce((prev, current) => 
    prev.price > current.price ? prev : current
  );
  
  if (mostExpensiveAlt.price <= drug.price) return 0;
  
  // Calculate the savings percentage
  const savingsPercentage = Math.round(((mostExpensiveAlt.price - drug.price) / mostExpensiveAlt.price) * 100);
  return savingsPercentage;
};

// تطبيق المرشحات المحددة على نتائج البحث
export const filterDrugs = (
  drugs: Drug[], 
  country?: string | null, 
  priceRange?: { min: number | null; max: number | null },
  availability?: string | null
): Drug[] => {
  let filtered = [...drugs];

  // فلترة حسب بلد المنشأ
  if (country && country !== 'all') {
    if (country === 'egypt' || country === 'egyptian') {
      filtered = filtered.filter(drug => drug.isEgyptian === true);
    } else if (country === 'international') {
      filtered = filtered.filter(drug => drug.isEgyptian === false);
    } else {
      filtered = filtered.filter(drug => drug.country === country);
    }
  }

  // فلترة حسب نطاق السعر
  if (priceRange && priceRange.min !== null && priceRange.max !== null) {
    filtered = filtered.filter(drug => 
      drug.price >= (priceRange.min || 0) && 
      drug.price <= (priceRange.max || Number.MAX_SAFE_INTEGER)
    );
  }

  // فلترة حسب التوافر
  if (availability !== null && availability !== undefined) {
    if (availability === 'available') {
      filtered = filtered.filter(drug => drug.isAvailable === true);
    } else if (availability === 'unavailable') {
      filtered = filtered.filter(drug => drug.isAvailable === false);
    }
  }

  return filtered;
};

// الحصول على اقتراحات للأدوية أثناء الكتابة
export const getDrugSuggestions = (
  query: string,
  language: string = 'ar'
): Array<{ id: string; name: string; nameInOtherLanguage?: string }> => {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase();
  const results: Array<{ id: string; name: string; nameInOtherLanguage?: string }> = [];
  const foundDrugs = new Set<string>(); // لتجنب التكرار

  allDrugs.forEach(drug => {
    const nameToSearch = language === 'ar' ? drug.name : (drug.nameEn || drug.name);
    const nameInOtherLanguage = language === 'ar' ? (drug.nameEn || drug.name) : drug.name;
    
    if (nameToSearch.toLowerCase().includes(normalizedQuery) && !foundDrugs.has(nameToSearch)) {
      foundDrugs.add(nameToSearch);
      results.push({
        id: drug.id,
        name: nameToSearch,
        nameInOtherLanguage: nameInOtherLanguage !== nameToSearch ? nameInOtherLanguage : undefined
      });
    }
  });

  return results.slice(0, 7); // إرجاع حد أقصى 7 اقتراحات
};
