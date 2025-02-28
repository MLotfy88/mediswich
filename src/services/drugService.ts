
import { Drug } from "@/types";
import { mockDrugs } from "@/data/mockDrugs";

// البحث عن الأدوية باللغتين العربية والإنجليزية
export const searchDrugs = (query: string): Drug[] => {
  if (!query.trim()) return [];
  
  console.log("Searching for:", query);
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // قاموس ترجمة الأسماء الشائعة بين الإنجليزية والعربية
  const englishToArabic: Record<string, string> = {
    "paracetamol": "باراسيتامول",
    "amoxicillin": "أموكسيسيللين",
    "omeprazole": "أوميبرازول",
    "lisinopril": "ليزينوبريل",
    "citalopram": "سيتالوبرام",
    "atorvastatin": "أتورفاستاتين",
    "metformin": "ميتفورمين",
    "loratadine": "لوراتادين",
    "amlodipine": "أملوديبين",
    "azithromycin": "أزيثروميسين",
    "diclofenac": "ديكلوفيناك",
    "fluoxetine": "فلوكستين",
    "mebeverine": "ميبيفيرين",
    "ciprofloxacin": "سيبروفلوكساسين",
    "simvastatin": "سيمفاستاتين",
    "doxycycline": "دوكسيسيكلين",
    "cetirizine": "سيتيريزين",
    "chlorpheniramine": "كلورفينيرامين",
    "ibuprofen": "إيبوبروفين",
    "ranitidine": "رانيتيدين",
    "dimra": "ديمرا",
    "insulin": "إنسولين",
    "levitra": "ليفيترا",
    "concor": "كونكور",
    "xanax": "زاناكس",
    "augmentin": "أوجمنتين",
    "nexium": "نيكسيوم",
    "viagra": "فياجرا",
    "voltaren": "فولتارين",
    "lipitor": "ليبيتور",
    "claritine": "كلاريتين",
    "norvasc": "نورفاسك",
    "yasmin": "ياسمين",
    "zantac": "زانتاك",
    "advil": "أديفيل",
    "betadine": "بيتادين",
    "brufen": "بروفين",
    "panadol": "بنادول",
    "duphaston": "دوفاستون",
    "tamiflu": "تاميفلو",
    "telfast": "تلفاست",
    "daflon": "دافلون",
    "actifed": "آكتيفيد",
    "actos": "أكتوس",
    "aldactone": "أداكتون",
    "intal": "إنتال",
    "bupropion": "بوبروبيون",
    "warfarin": "وارفارين",
    "digoxin": "ديجوكسين",
    "furosemide": "فوروسيميد",
    "captopril": "كابتوبريل",
    "enalapril": "إينالابريل",
    "ramipril": "راميبريل",
    "valsartan": "فالسارتان",
    "losartan": "لوسارتان",
    "propranolol": "بروبرانولول",
    "atenolol": "أتينولول",
    "bisoprolol": "بيسوبرولول",
    "hydrochlorothiazide": "هيدروكلوروثيازيد",
    "spironolactone": "سبيرونولاكتون",
    "amiodarone": "أميودارون",
    "simvastatin": "سيمفاستاتين",
    "atorvastatin": "أتورفاستاتين",
    "rosuvastatin": "روسوفاستاتين",
    "fenofibrate": "فينوفيبرات",
    "aspirin": "أسبرين",
    "clopidogrel": "كلوبيدوجريل",
    "rivaroxaban": "ريفاروكسابان",
    "heparin": "هيبارين",
    "metformin": "ميتفورمين",
    "gliclazide": "جليكلازيد",
    "glimepiride": "جليميبيريد",
    "insulin": "إنسولين",
    "levothyroxine": "ليفوثيروكسين",
    "carbimazole": "كاربيمازول",
    "prednisolone": "بريدنيزولون",
    "hydrocortisone": "هيدروكورتيزون",
    "methotrexate": "ميثوتريكسات",
    "azathioprine": "أزاثيوبرين",
    "hydroxychloroquine": "هيدروكسي كلوروكوين",
    "sulfasalazine": "سلفاسالازين",
    "penicillin": "بنسلين",
    "amoxicillin": "أموكسيسيلين",
    "ampicillin": "أمبيسيلين",
    "flucloxacillin": "فلوكلوكساسيلين",
    "cefalexin": "سيفاليكسين",
    "cefuroxime": "سيفوروكسيم",
    "ceftriaxone": "سيفترياكسون",
    "ciprofloxacin": "سيبروفلوكساسين",
    "levofloxacin": "ليفوفلوكساسين",
    "moxifloxacin": "موكسيفلوكساسين",
    "clarithromycin": "كلاريثروميسين",
    "erythromycin": "إريثروميسين",
    "tetracycline": "تتراسيكلين",
    "doxycycline": "دوكسيسيكلين",
    "metronidazole": "ميترونيدازول",
    "nitrofurantoin": "نيتروفورانتوين",
    "fluconazole": "فلوكونازول",
    "aciclovir": "أسيكلوفير",
    "ranitidine": "رانيتيدين",
    "omeprazole": "أوميبرازول",
    "lansoprazole": "لانسوبرازول",
    "esomeprazole": "إيزوميبرازول",
    "pantoprazole": "بانتوبرازول",
    "domperidone": "دومبيريدون",
    "loperamide": "لوبيراميد",
    "mebeverine": "ميبيفيرين",
    "hyoscine": "هيوسين",
    "diazepam": "ديازيبام",
    "lorazepam": "لورازيبام",
    "alprazolam": "ألبرازولام",
    "zopiclone": "زوبيكلون",
    "zolpidem": "زولبيديم",
    "amitriptyline": "أميتريبتيلين",
    "fluoxetine": "فلوكستين",
    "sertraline": "سيرترالين",
    "paroxetine": "باروكستين",
    "citalopram": "سيتالوبرام",
    "olanzapine": "أولانزابين",
    "risperidone": "ريسبيريدون",
    "haloperidol": "هالوبيريدول",
    "levodopa": "ليفودوبا",
    "carbidopa": "كاربيدوبا",
    "gabapentin": "جابابنتين",
    "pregabalin": "بريجابالين",
    "carbamazepine": "كاربامازيبين",
    "phenytoin": "فينيتوين",
    "sodium valproate": "صوديوم فالبروات",
    "lamotrigine": "لاموتريجين",
    "salbutamol": "سالبوتامول",
    "ventolin": "فينتولين",
    "symbicort": "سيمبيكورت",
    "seretide": "سيريتايد",
    "budesonide": "بوديزونيد",
    "fluticasone": "فلوتيكازون",
    "montelukast": "مونتيلوكاست",
    "loratadine": "لوراتادين",
    "cetirizine": "سيتيريزين",
    "fexofenadine": "فيكسوفينادين",
    "chlorphenamine": "كلورفينامين",
    "allopurinol": "ألوبيورينول",
    "colchicine": "كولشيسين",
    "tamsulosin": "تامسولوسين",
    "finasteride": "فيناستيرايد",
    "sildenafil": "سيلدينافيل",
    "tadalafil": "تادالافيل"
  };
  
  // إنشاء قاموس عكسي من العربية إلى الإنجليزية
  const arabicToEnglish: Record<string, string> = {};
  Object.entries(englishToArabic).forEach(([eng, ar]) => {
    arabicToEnglish[ar] = eng;
  });
  
  // البحث في الأدوية
  const results = mockDrugs.filter(drug => {
    // البحث في اسم الدواء
    const nameMatch = drug.name.toLowerCase().includes(normalizedQuery);
    
    // البحث في الشركة المصنعة
    const companyMatch = drug.company.toLowerCase().includes(normalizedQuery);
    
    // البحث في المادة الفعالة
    const activeIngredientMatch = drug.activeIngredient.toLowerCase().includes(normalizedQuery);
    
    // البحث في الترجمات
    let translatedMatch = false;
    
    // البحث بالإنجليزية والترجمة للعربية
    for (const [engTerm, arTerm] of Object.entries(englishToArabic)) {
      if (engTerm.includes(normalizedQuery) || normalizedQuery.includes(engTerm)) {
        if (drug.name.toLowerCase().includes(arTerm.toLowerCase()) || 
            drug.activeIngredient.toLowerCase().includes(arTerm.toLowerCase())) {
          translatedMatch = true;
          break;
        }
      }
    }
    
    // البحث بالعربية والترجمة للإنجليزية
    if (!translatedMatch) {
      for (const [arTerm, engTerm] of Object.entries(arabicToEnglish)) {
        if (arTerm.includes(normalizedQuery) || normalizedQuery.includes(arTerm)) {
          if (drug.name.toLowerCase().includes(engTerm.toLowerCase()) || 
              drug.activeIngredient.toLowerCase().includes(engTerm.toLowerCase())) {
            translatedMatch = true;
            break;
          }
        }
      }
    }
    
    // البحث في البدائل
    const alternativesMatch = drug.alternatives.some(alt => 
      alt.name.toLowerCase().includes(normalizedQuery) || 
      alt.company.toLowerCase().includes(normalizedQuery) ||
      alt.activeIngredient.toLowerCase().includes(normalizedQuery)
    );
    
    return nameMatch || companyMatch || activeIngredientMatch || translatedMatch || alternativesMatch;
  });
  
  console.log("Search results:", results.length);
  return results;
};

// البحث عن اقتراحات للأدوية والمواد الفعالة بناءً على مدخلات المستخدم
export const searchDrugSuggestions = (query: string): {name: string, type: 'drug' | 'ingredient'}[] => {
  if (query.length < 2) return [];
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // قاموس ترجمة الأسماء الشائعة بين الإنجليزية والعربية
  const englishToArabic: Record<string, string> = {
    "paracetamol": "باراسيتامول",
    "amoxicillin": "أموكسيسيللين",
    "omeprazole": "أوميبرازول",
    // ... (use the same dictionary as in searchDrugs)
  };
  
  // إنشاء قاموس عكسي من العربية إلى الإنجليزية
  const arabicToEnglish: Record<string, string> = {};
  Object.entries(englishToArabic).forEach(([eng, ar]) => {
    arabicToEnglish[ar] = eng;
  });
  
  // مجموعات للاقتراحات الفريدة
  const drugNames = new Set<string>();
  const activeIngredients = new Set<string>();
  
  // البحث في الأدوية
  mockDrugs.forEach(drug => {
    // البحث المباشر
    if (drug.name.toLowerCase().includes(normalizedQuery)) {
      drugNames.add(drug.name);
    }
    if (drug.activeIngredient.toLowerCase().includes(normalizedQuery)) {
      activeIngredients.add(drug.activeIngredient);
    }
    
    // البحث في البدائل
    drug.alternatives.forEach(alt => {
      if (alt.name.toLowerCase().includes(normalizedQuery)) {
        drugNames.add(alt.name);
      }
      if (alt.activeIngredient.toLowerCase().includes(normalizedQuery)) {
        activeIngredients.add(alt.activeIngredient);
      }
    });
    
    // البحث في الترجمات
    // البحث بالإنجليزية
    for (const [engTerm, arTerm] of Object.entries(englishToArabic)) {
      if (engTerm.includes(normalizedQuery) || normalizedQuery.includes(engTerm)) {
        // البحث في اسم الدواء
        if (drug.name.toLowerCase().includes(arTerm.toLowerCase())) {
          drugNames.add(drug.name);
        }
        // البحث في المادة الفعالة
        if (drug.activeIngredient.toLowerCase().includes(arTerm.toLowerCase())) {
          activeIngredients.add(drug.activeIngredient);
        }
        // البحث في البدائل
        drug.alternatives.forEach(alt => {
          if (alt.name.toLowerCase().includes(arTerm.toLowerCase())) {
            drugNames.add(alt.name);
          }
          if (alt.activeIngredient.toLowerCase().includes(arTerm.toLowerCase())) {
            activeIngredients.add(alt.activeIngredient);
          }
        });
      }
    }
    
    // البحث بالعربية
    for (const [arTerm, engTerm] of Object.entries(arabicToEnglish)) {
      if (arTerm.includes(normalizedQuery) || normalizedQuery.includes(arTerm)) {
        // البحث في اسم الدواء
        if (drug.name.toLowerCase().includes(engTerm.toLowerCase())) {
          drugNames.add(drug.name);
        }
        // البحث في المادة الفعالة
        if (drug.activeIngredient.toLowerCase().includes(engTerm.toLowerCase())) {
          activeIngredients.add(drug.activeIngredient);
        }
        // البحث في البدائل
        drug.alternatives.forEach(alt => {
          if (alt.name.toLowerCase().includes(engTerm.toLowerCase())) {
            drugNames.add(alt.name);
          }
          if (alt.activeIngredient.toLowerCase().includes(engTerm.toLowerCase())) {
            activeIngredients.add(alt.activeIngredient);
          }
        });
      }
    }
  });
  
  // دمج وتحديد الاقتراحات
  const combinedSuggestions = [
    ...Array.from(drugNames).map(name => ({ name, type: 'drug' as const })),
    ...Array.from(activeIngredients).map(name => ({ name, type: 'ingredient' as const }))
  ].slice(0, 7); // تحديد عدد الاقتراحات إلى 7
  
  return combinedSuggestions;
};

// حساب نسبة التوفير مقارنة بأغلى بديل
export const calculateSavings = (drug: Drug): number => {
  const allPrices = [drug.price, ...drug.alternatives.map(alt => alt.price)];
  const maxPrice = Math.max(...allPrices);
  
  return maxPrice > drug.price 
    ? Math.round(((maxPrice - drug.price) / maxPrice) * 100) 
    : 0;
};

// وظيفة التصفية
export const filterDrugs = (
  drugs: Drug[], 
  countryFilter: string | null, 
  priceRange: { min: number | null; max: number | null },
  availabilityFilter: string | null
): Drug[] => {
  return drugs.filter(drug => {
    // تصفية حسب البلد
    if (countryFilter && countryFilter !== "all") {
      if (countryFilter === "egyptian" && !drug.isEgyptian) {
        return false;
      }
      if (countryFilter === "international" && drug.isEgyptian) {
        return false;
      }
    }
    
    // تصفية حسب نطاق السعر
    if (priceRange.min !== null && drug.price < priceRange.min) {
      return false;
    }
    if (priceRange.max !== null && drug.price > priceRange.max) {
      return false;
    }
    
    // تصفية حسب التوفر
    if (availabilityFilter === "available" && !drug.isAvailable) {
      return false;
    }
    if (availabilityFilter === "unavailable" && drug.isAvailable) {
      return false;
    }
    
    return true;
  });
};

// استخراج جميع الأدوية للقوائم العامة
export const getAllDrugs = (): Drug[] => {
  return mockDrugs;
};

export default {
  searchDrugs,
  searchDrugSuggestions,
  calculateSavings,
  filterDrugs,
  getAllDrugs
};
