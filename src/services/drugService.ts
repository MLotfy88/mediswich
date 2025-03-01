
import { Drug, FilterOptions } from "@/types";
import { mockDrugs, englishTranslations } from "@/data/mockDrugs";

// Get all drugs
export const getAllDrugs = () => {
  return mockDrugs;
};

// Search for drugs by name
export const searchDrugs = (query: string, language: string = 'ar'): Drug[] => {
  if (!query || query.trim() === "") {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return mockDrugs.filter((drug) => {
    const drugName = drug.name.toLowerCase();
    
    // For English language, check English translations
    if (language === 'en') {
      const translatedName = getEnglishName(drug.name) || '';
      return translatedName.toLowerCase().includes(normalizedQuery);
    }
    
    // Default to Arabic search
    return drugName.includes(normalizedQuery);
  });
};

// Get drug suggestions based on partial name
export const getDrugSuggestions = (partialName: string, language: string = 'ar'): { id: string; name: string; nameInOtherLanguage?: string }[] => {
  if (!partialName || partialName.trim() === "") {
    return [];
  }

  const normalizedPartialName = partialName.toLowerCase().trim();
  
  const suggestions = mockDrugs
    .filter((drug) => {
      if (language === 'en') {
        const translatedName = getEnglishName(drug.name) || '';
        return translatedName.toLowerCase().includes(normalizedPartialName);
      }
      
      return drug.name.toLowerCase().includes(normalizedPartialName);
    })
    .slice(0, 7) // Limit to 7 suggestions
    .map((drug) => {
      // Return bilingual names
      if (language === 'en') {
        return {
          id: drug.id,
          name: getEnglishName(drug.name) || drug.name,
          nameInOtherLanguage: drug.name // Original Arabic name
        };
      } else {
        return {
          id: drug.id,
          name: drug.name,
          nameInOtherLanguage: getEnglishName(drug.name) // English translation
        };
      }
    });

  return suggestions;
};

// Get a drug by ID
export const getDrugById = (id: string): Drug | undefined => {
  return mockDrugs.find((drug) => drug.id === id);
};

// Get alternatives for a drug
export const getDrugAlternatives = (drugId: string): Drug[] => {
  const drug = getDrugById(drugId);
  if (!drug || !drug.alternatives) {
    return [];
  }
  
  return drug.alternatives.map(alt => {
    const fullDrug = getDrugById(alt.id);
    return fullDrug || alt as Drug;
  });
};

// Filter drugs based on provided filter options
export const filterDrugs = (drugs: Drug[], filterOptions: FilterOptions): Drug[] => {
  return drugs.filter((drug) => {
    // Country filter
    if (filterOptions.country && drug.country !== filterOptions.country) {
      return false;
    }
    
    // Price range filter
    if (filterOptions.priceRange) {
      if (
        (filterOptions.priceRange.min !== null && drug.price < filterOptions.priceRange.min) ||
        (filterOptions.priceRange.max !== null && drug.price > filterOptions.priceRange.max)
      ) {
        return false;
      }
    }
    
    // Availability filter
    if (filterOptions.availability !== null && drug.isAvailable !== filterOptions.availability) {
      return false;
    }
    
    return true;
  });
};

// Get English translation of drug name
export const getEnglishName = (arabicName: string): string | undefined => {
  return englishTranslations[arabicName]?.name;
};

// Get English translation of active ingredient
export const getEnglishActiveIngredient = (arabicActiveIngredient: string): string | undefined => {
  return englishTranslations[arabicActiveIngredient]?.activeIngredient;
};

// Translate drug object to English
export const translateDrugToEnglish = (drug: Drug): Drug => {
  const translatedDrug = { ...drug };
  
  // Translate drug name
  translatedDrug.name = getEnglishName(drug.name) || drug.name;
  
  // Translate active ingredient
  translatedDrug.activeIngredient = getEnglishActiveIngredient(drug.activeIngredient) || drug.activeIngredient;
  
  // Translate country if needed (could be added to translations)
  
  // Translate alternatives
  if (drug.alternatives && drug.alternatives.length > 0) {
    translatedDrug.alternatives = drug.alternatives.map(alt => {
      const translatedAlt = { ...alt };
      translatedAlt.name = getEnglishName(alt.name) || alt.name;
      translatedAlt.activeIngredient = getEnglishActiveIngredient(alt.activeIngredient) || alt.activeIngredient;
      return translatedAlt;
    });
  }
  
  return translatedDrug;
};

// Search all drug properties for a keyword
export const searchAllDrugProperties = (query: string, language: string = 'ar'): Drug[] => {
  if (!query || query.trim() === "") {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return mockDrugs.filter((drug) => {
    // For English language, check English translations
    if (language === 'en') {
      const translatedName = getEnglishName(drug.name) || '';
      const translatedActiveIngredient = getEnglishActiveIngredient(drug.activeIngredient) || '';
      
      return (
        translatedName.toLowerCase().includes(normalizedQuery) ||
        translatedActiveIngredient.toLowerCase().includes(normalizedQuery) ||
        drug.company.toLowerCase().includes(normalizedQuery)
      );
    }
    
    // For Arabic language
    return (
      drug.name.toLowerCase().includes(normalizedQuery) ||
      drug.activeIngredient.toLowerCase().includes(normalizedQuery) ||
      drug.company.toLowerCase().includes(normalizedQuery)
    );
  });
};
