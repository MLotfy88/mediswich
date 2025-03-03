
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
import { importedDrugs, setAlternativesForDrugs } from "@/data/drugs/importedDrugs";

// الحصول على جميع الأدوية من كافة المصادر
export const getAllDrugs = (): Drug[] => {
  // تحديث البدائل للأدوية المستوردة
  setAlternativesForDrugs();
  
  // مجموعة شاملة من الأدوية من كافة الفئات
  return [
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
    ...edaMedications,
    ...importedDrugs
  ];
};

// البحث عن الأدوية والبدائل في البيانات
export const searchDrugs = (query: string, lang: string = 'ar'): Drug[] => {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const allDrugs = getAllDrugs();
  
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

// البحث عن بدائل محددة لدواء معين
export const findAlternativesForDrug = (drugId: string): Drug[] => {
  const allDrugs = getAllDrugs();
  const drug = allDrugs.find(d => d.id === drugId);
  
  if (!drug) return [];
  
  // البحث عن الأدوية التي تحتوي على نفس المادة الفعالة
  return allDrugs.filter(d => 
    d.id !== drug.id && 
    d.activeIngredient.toLowerCase() === drug.activeIngredient.toLowerCase()
  );
};

// الحصول على بدائل محددة لدواء معين
export const getAlternativesForDrug = (drugName: string): Drug[] => {
  const allDrugs = getAllDrugs();
  const drug = allDrugs.find(d => 
    d.name.toLowerCase() === drugName.toLowerCase() || 
    (d.nameEn && d.nameEn.toLowerCase() === drugName.toLowerCase())
  );
  
  if (!drug) return [];
  
  // البحث عن الأدوية التي تحتوي على نفس المادة الفعالة
  return allDrugs.filter(d => 
    d.id !== drug.id && 
    d.activeIngredient.toLowerCase() === drug.activeIngredient.toLowerCase()
  );
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

  const normalizedQuery = query.toLowerCase().trim();
  const results: Array<{ id: string; name: string; nameInOtherLanguage?: string }> = [];
  const foundDrugs = new Set<string>(); // لتجنب التكرار
  const allDrugs = getAllDrugs();

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

// الحصول على اقتراحات للأدوية البديلة
export const getAlternativeDrugSuggestions = (
  drugName: string,
  language: string = 'ar'
): Array<{ id: string; name: string; nameInOtherLanguage?: string }> => {
  if (!drugName || drugName.length < 2) return [];

  const alternatives = getAlternativesForDrug(drugName);
  const results: Array<{ id: string; name: string; nameInOtherLanguage?: string }> = [];
  
  alternatives.forEach(drug => {
    const nameToShow = language === 'ar' ? drug.name : (drug.nameEn || drug.name);
    const nameInOtherLanguage = language === 'ar' ? (drug.nameEn || drug.name) : drug.name;
    
    results.push({
      id: drug.id,
      name: nameToShow,
      nameInOtherLanguage: nameInOtherLanguage !== nameToShow ? nameInOtherLanguage : undefined
    });
  });

  return results.slice(0, 7); // إرجاع حد أقصى 7 اقتراحات
};
