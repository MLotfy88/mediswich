
import { Drug } from "@/types";
import { mockDrugs } from "@/data/mockDrugs";

// Search function - supports searching in both Arabic and English
export const searchDrugs = (query: string): Drug[] => {
  if (!query.trim()) return [];
  
  console.log("Searching for:", query);
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // Mapping of common English drug names to Arabic equivalents
  const englishToArabic: Record<string, string> = {
    "paracetamol": "باراسيتامول",
    "amoxicillin": "أموكسيسيللين",
    "omeprazole": "أومبيرازول",
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
    "intal": "إنتال"
  };
  
  // Bidirectional mapping
  const arabicToEnglish: Record<string, string> = {};
  Object.entries(englishToArabic).forEach(([eng, ar]) => {
    arabicToEnglish[ar] = eng;
  });
  
  const results = mockDrugs.filter(drug => {
    // Check if the drug name contains the query
    const nameMatch = drug.name.toLowerCase().includes(normalizedQuery);
    
    // Check if the company name contains the query
    const companyMatch = drug.company.toLowerCase().includes(normalizedQuery);
    
    // Check if the active ingredient contains the query
    const activeIngredientMatch = drug.activeIngredient.toLowerCase().includes(normalizedQuery);
    
    // Check if the translated drug name contains the query
    const arabicName = drug.name.toLowerCase();
    const englishSearch = englishToArabic[normalizedQuery];
    const arabicSearch = arabicToEnglish[normalizedQuery];
    
    const translatedMatch = 
      (englishSearch && arabicName.includes(englishSearch.toLowerCase())) || 
      (arabicSearch && normalizedQuery.includes(arabicSearch.toLowerCase()));
    
    // Check if any of the alternatives match
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

// Calculate savings compared to the most expensive alternative
export const calculateSavings = (drug: Drug): number => {
  const allPrices = [drug.price, ...drug.alternatives.map(alt => alt.price)];
  const maxPrice = Math.max(...allPrices);
  
  return maxPrice > drug.price 
    ? Math.round(((maxPrice - drug.price) / maxPrice) * 100) 
    : 0;
};

// Filter function
export const filterDrugs = (
  drugs: Drug[], 
  countryFilter: string | null, 
  priceRange: { min: number | null; max: number | null },
  availabilityFilter: string | null
): Drug[] => {
  return drugs.filter(drug => {
    // Country filter
    if (countryFilter && countryFilter !== "all") {
      if (countryFilter === "egyptian" && !drug.isEgyptian) {
        return false;
      }
      if (countryFilter === "international" && drug.isEgyptian) {
        return false;
      }
    }
    
    // Price range filter
    if (priceRange.min !== null && drug.price < priceRange.min) {
      return false;
    }
    if (priceRange.max !== null && drug.price > priceRange.max) {
      return false;
    }
    
    // Availability filter
    if (availabilityFilter === "available" && !drug.isAvailable) {
      return false;
    }
    if (availabilityFilter === "unavailable" && drug.isAvailable) {
      return false;
    }
    
    return true;
  });
};

// Export all drugs for general listing
export const getAllDrugs = (): Drug[] => {
  return mockDrugs;
};

export default {
  searchDrugs,
  calculateSavings,
  filterDrugs,
  getAllDrugs
};
