
import { Drug } from "@/types";

// Mock data for the drugs
const mockDrugs: Drug[] = [
  {
    id: "1",
    name: "باراسيتامول 500mg",
    company: "EIPICO",
    price: 10,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "2",
        name: "بانادول أزرق",
        company: "جلاكسو",
        price: 25,
        country: "المملكة المتحدة",
        isEgyptian: false,
      },
      {
        id: "3",
        name: "فيفادول",
        company: "سيد",
        price: 8,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "4",
    name: "أموكسيسيللين 500mg",
    company: "المقاولون العرب",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "5",
        name: "أوجمنتين",
        company: "GSK",
        price: 60,
        country: "الولايات المتحدة",
        isEgyptian: false,
      },
      {
        id: "6",
        name: "هيكساموكس",
        company: "EIPICO",
        price: 20,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "7",
    name: "Lisinopril 10mg",
    company: "Pfizer",
    price: 50,
    country: "الولايات المتحدة",
    isEgyptian: false,
    alternatives: [
      {
        id: "8",
        name: "زيستريل",
        company: "AstraZeneca",
        price: 45,
        country: "المملكة المتحدة",
        isEgyptian: false,
      },
      {
        id: "9",
        name: "ليزينوبريل",
        company: "سيد",
        price: 25,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "10",
    name: "أومبيرازول 20mg",
    company: "مينا فارم",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "11",
        name: "بريلوسيك",
        company: "AstraZeneca",
        price: 80,
        country: "المملكة المتحدة",
        isEgyptian: false,
      },
      {
        id: "12",
        name: "نيكسيوم",
        company: "AstraZeneca",
        price: 120,
        country: "السويد",
        isEgyptian: false,
      },
    ],
  },
  {
    id: "13",
    name: "سيتالوبرام 20mg",
    company: "EIPICO",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "14",
        name: "سيليكسا",
        company: "Lundbeck",
        price: 150,
        country: "الدنمارك",
        isEgyptian: false,
      },
      {
        id: "15",
        name: "سيبرام",
        company: "المقاولون العرب",
        price: 30,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "16",
    name: "أتورفاستاتين 20mg",
    company: "سيد",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "17",
        name: "ليبيتور",
        company: "Pfizer",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
      },
      {
        id: "18",
        name: "أتوركس",
        company: "EIPICO",
        price: 20,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "19",
    name: "ميتفورمين 500mg",
    company: "المقاولون العرب",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "20",
        name: "جلوكوفاج",
        company: "Merck",
        price: 40,
        country: "فرنسا",
        isEgyptian: false,
      },
      {
        id: "21",
        name: "ديابيتكس",
        company: "مينا فارم",
        price: 18,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "22",
    name: "لوراتادين 10mg",
    company: "EIPICO",
    price: 8,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "23",
        name: "كلاريتين",
        company: "Schering-Plough",
        price: 35,
        country: "الولايات المتحدة",
        isEgyptian: false,
      },
      {
        id: "24",
        name: "هيستازين",
        company: "سيد",
        price: 10,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "25",
    name: "أملوديبين 5mg",
    company: "مينا فارم",
    price: 20,
    country: "مصر",
    isEgyptian: true,
    alternatives: [
      {
        id: "26",
        name: "نورفاسك",
        company: "Pfizer",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
      },
      {
        id: "27",
        name: "فازوكور",
        company: "EIPICO",
        price: 18,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
  {
    id: "28",
    name: "Azithromycin 500mg",
    company: "Pfizer",
    price: 75,
    country: "الولايات المتحدة",
    isEgyptian: false,
    alternatives: [
      {
        id: "29",
        name: "زيثروماكس",
        company: "Pfizer",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
      },
      {
        id: "30",
        name: "أزيثرال",
        company: "المقاولون العرب",
        price: 40,
        country: "مصر",
        isEgyptian: true,
      },
    ],
  },
];

// Search function - supports searching in both Arabic and English
export const searchDrugs = (query: string): Drug[] => {
  if (!query.trim()) return [];
  
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
    "azithromycin": "أزيثروميسين"
  };
  
  // Bidirectional mapping
  const arabicToEnglish: Record<string, string> = {};
  Object.entries(englishToArabic).forEach(([eng, ar]) => {
    arabicToEnglish[ar] = eng;
  });
  
  return mockDrugs.filter(drug => {
    // Check if the drug name contains the query
    const nameMatch = drug.name.toLowerCase().includes(normalizedQuery);
    
    // Check if the translated drug name contains the query
    const arabicName = drug.name.toLowerCase();
    const englishSearch = englishToArabic[normalizedQuery];
    const arabicSearch = arabicToEnglish[normalizedQuery];
    
    const translatedMatch = 
      (englishSearch && arabicName.includes(englishSearch.toLowerCase())) || 
      (arabicSearch && normalizedQuery.includes(arabicSearch.toLowerCase()));
    
    // Also check alternatives
    const alternativesMatch = drug.alternatives.some(alt => 
      alt.name.toLowerCase().includes(normalizedQuery)
    );
    
    return nameMatch || translatedMatch || alternativesMatch;
  });
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
  priceRange: { min: number | null; max: number | null }
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
    
    return true;
  });
};

export default {
  searchDrugs,
  calculateSavings,
  filterDrugs
};
