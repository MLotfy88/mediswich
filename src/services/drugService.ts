import { Drug, Alternative, SearchQuery } from "@/types";

const drugsData: Drug[] = [
  {
    id: "1",
    name: "Paracetamol",
    nameEn: "Paracetamol",
    company: "Sigma",
    price: 25,
    country: "Egypt",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "Paracetamol",
    activeIngredientEn: "Paracetamol",
    drugType: "Tablet",
    alternatives: [
      {
        id: "2",
        name: "Panadol",
        nameEn: "Panadol",
        company: "GSK",
        price: 35,
        country: "Ireland",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "Paracetamol",
        activeIngredientEn: "Paracetamol",
        drugType: "Tablet",
      },
    ],
  },
  {
    id: "3",
    name: "Ibuprofen",
    nameEn: "Ibuprofen",
    company: "Eva Pharma",
    price: 18,
    country: "Egypt",
    isEgyptian: true,
    isAvailable: false,
    activeIngredient: "Ibuprofen",
    activeIngredientEn: "Ibuprofen",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "4",
    name: "كبسولات اوميجا 3",
    nameEn: "Omega-3 Capsules",
    company: "Sedico",
    price: 40,
    country: "Egypt",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "Omega-3",
    activeIngredientEn: "Omega-3",
    drugType: "Capsule",
    alternatives: [],
  },
  {
    id: "5",
    name: "Amoxicillin",
    nameEn: "Amoxicillin",
    company: "Pfizer",
    price: 55,
    country: "USA",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Amoxicillin",
    activeIngredientEn: "Amoxicillin",
    drugType: "Capsule",
    alternatives: [],
  },
  {
    id: "6",
    name: "Lanzoprazole",
    nameEn: "Lanzoprazole",
    company: "Hikma",
    price: 30,
    country: "Jordan",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Lanzoprazole",
    activeIngredientEn: "Lanzoprazole",
    drugType: "Capsule",
    alternatives: [],
  },
  {
    id: "7",
    name: "Ciprofloxacine",
    nameEn: "Ciprofloxacine",
    company: "Sanofi",
    price: 45,
    country: "France",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Ciprofloxacine",
    activeIngredientEn: "Ciprofloxacine",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "8",
    name: "Metformin",
    nameEn: "Metformin",
    company: "Merck",
    price: 28,
    country: "Germany",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Metformin",
    activeIngredientEn: "Metformin",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "9",
    name: "Aspirin",
    nameEn: "Aspirin",
    company: "Bayer",
    price: 22,
    country: "Germany",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Aspirin",
    activeIngredientEn: "Aspirin",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "10",
    name: "Omeprazole",
    nameEn: "Omeprazole",
    company: "AstraZeneca",
    price: 38,
    country: "Sweden",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Omeprazole",
    activeIngredientEn: "Omeprazole",
    drugType: "Capsule",
    alternatives: [],
  },
  {
    id: "11",
    name: "Cetirizine",
    nameEn: "Cetirizine",
    company: "UCB",
    price: 33,
    country: "Belgium",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Cetirizine",
    activeIngredientEn: "Cetirizine",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "12",
    name: "Diazepam",
    nameEn: "Diazepam",
    company: "Roche",
    price: 50,
    country: "Switzerland",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Diazepam",
    activeIngredientEn: "Diazepam",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "13",
    name: "Simvastatin",
    nameEn: "Simvastatin",
    company: "Merck",
    price: 42,
    country: "Germany",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Simvastatin",
    activeIngredientEn: "Simvastatin",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "14",
    name: "Warfarin",
    nameEn: "Warfarin",
    company: "Bristol-Myers Squibb",
    price: 48,
    country: "USA",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Warfarin",
    activeIngredientEn: "Warfarin",
    drugType: "Tablet",
    alternatives: [],
  },
  {
    id: "15",
    name: "Levothyroxine",
    nameEn: "Levothyroxine",
    company: "Abbott",
    price: 36,
    country: "USA",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "Levothyroxine",
    activeIngredientEn: "Levothyroxine",
    drugType: "Tablet",
    alternatives: [],
  },
];

// Function to calculate savings percentage
export const calculateSavings = (drug: Drug, alternative: Alternative): number => {
  if (!drug || !alternative) {
    return 0;
  }
  const saving = drug.price - alternative.price;
  const savingsPercentage = (saving / drug.price) * 100;
  return Math.max(0, Math.round(savingsPercentage));
};

// Function to search drugs by name or active ingredient
export const searchDrugs = async (searchTerm: string): Promise<Drug[]> => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return drugsData.filter((drug) => {
    const lowerName = drug.name.toLowerCase();
    const lowerActiveIngredient = drug.activeIngredient.toLowerCase();
    return (
      lowerName.includes(lowerSearchTerm) ||
      lowerActiveIngredient.includes(lowerSearchTerm)
    );
  });
};

// Function to get all drugs
export const getAllDrugs = async (): Promise<Drug[]> => {
  return drugsData;
};

// Function to filter drugs based on criteria
export const filterDrugs = async (
  country: string | null,
  priceRange: { min: number | null; max: number | null },
  availability: string | null,
  drugType: string | null
): Promise<Drug[]> => {
  return drugsData.filter((drug) => {
    if (country && drug.country !== country) {
      return false;
    }
    if (
      priceRange.min !== null &&
      drug.price < priceRange.min
    ) {
      return false;
    }
    if (
      priceRange.max !== null &&
      drug.price > priceRange.max
    ) {
      return false;
    }
    if (
      availability === "available" &&
      !drug.isAvailable
    ) {
      return false;
    }
    if (
      availability === "unavailable" &&
      drug.isAvailable
    ) {
      return false;
    }
    if (drugType && drug.drugType !== drugType) {
      return false;
    }
    return true;
  });
};

// Update the getDrugSuggestions function to properly handle string parameters
export const getDrugSuggestions = (searchTerm: string, languageCode: 'ar' | 'en'): Array<{ id: string; name: string; nameInOtherLanguage?: string }> => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return drugsData
    .filter(drug => {
      const name = languageCode === 'ar' ? drug.name : (drug.nameEn || drug.name);
      return name.toLowerCase().includes(lowerSearchTerm);
    })
    .map(drug => ({
      id: drug.id,
      name: languageCode === 'ar' ? drug.name : (drug.nameEn || drug.name),
      nameInOtherLanguage: languageCode === 'ar' ? drug.nameEn : drug.name
    }));
};
