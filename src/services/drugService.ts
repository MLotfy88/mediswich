
import { Drug } from "@/types";
import { drugsData } from "./data/mockDrugs";
import { calculateSavings } from "./calculationService";
import { filterDrugs } from "./drugFilterService";

// Local variable to store drugs data - initialize with mock data
let drugsDatabase: Drug[] = [...drugsData];

// Function to get all drugs 
export const getAllDrugs = (): Drug[] => {
  console.log(`Returning ${drugsDatabase.length} drugs from database`);
  return drugsDatabase;
};

// Function to save drugs to the database
export const saveDrugs = (drugs: Drug[]): void => {
  console.log(`Saving ${drugs.length} drugs to database`);
  // Make a deep copy to avoid reference issues
  drugsDatabase = JSON.parse(JSON.stringify(drugs));
  console.log('Drugs saved successfully. Total drugs in database:', drugsDatabase.length);
};

// Function to search drugs by name or active ingredient
export const searchDrugs = (searchTerm: string): Drug[] => {
  console.log(`Searching for "${searchTerm}" in ${drugsDatabase.length} drugs`);
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  const results = drugsDatabase.filter((drug) => {
    const lowerName = (drug.name || '').toLowerCase();
    const lowerNameEn = (drug.nameEn || '').toLowerCase();
    const lowerActiveIngredient = (drug.activeIngredient || '').toLowerCase();
    const lowerActiveIngredientEn = (drug.activeIngredientEn || '').toLowerCase();
    
    return (
      lowerName.includes(lowerSearchTerm) ||
      lowerNameEn.includes(lowerSearchTerm) ||
      lowerActiveIngredient.includes(lowerSearchTerm) ||
      lowerActiveIngredientEn.includes(lowerSearchTerm)
    );
  });
  
  console.log(`Found ${results.length} results for "${searchTerm}"`);
  return results;
};

// Function to get drug suggestions for autocomplete
export const getDrugSuggestions = (searchTerm: string, languageCode: 'ar' | 'en'): any[] => {
  if (!searchTerm || searchTerm.trim().length < 2) return [];
  
  console.log(`Getting suggestions for "${searchTerm}" in ${languageCode} from ${drugsDatabase.length} drugs`);
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  const suggestions = drugsDatabase
    .filter(drug => {
      const nameInCurrentLang = languageCode === 'ar' ? (drug.name || '') : (drug.nameEn || drug.name || '');
      const nameInOtherLang = languageCode === 'ar' ? (drug.nameEn || '') : (drug.name || '');
      const activeIngredientInCurrentLang = languageCode === 'ar' ? 
        (drug.activeIngredient || '') : 
        (drug.activeIngredientEn || drug.activeIngredient || '');
      
      return nameInCurrentLang.toLowerCase().includes(lowerSearchTerm) || 
             nameInOtherLang.toLowerCase().includes(lowerSearchTerm) ||
             activeIngredientInCurrentLang.toLowerCase().includes(lowerSearchTerm);
    })
    .slice(0, 10) // Limit to 10 suggestions for performance
    .map(drug => ({
      id: drug.id,
      name: languageCode === 'ar' ? (drug.name || '') : (drug.nameEn || drug.name || ''),
      nameEn: drug.nameEn || '',
      nameInOtherLanguage: languageCode === 'ar' ? (drug.nameEn || '') : (drug.name || ''),
      activeIngredient: languageCode === 'ar' ? 
        (drug.activeIngredient || '') : 
        (drug.activeIngredientEn || drug.activeIngredient || ''),
      activeIngredientEn: drug.activeIngredientEn || ''
    }));
    
  console.log(`Found ${suggestions.length} suggestions`);
  return suggestions;
};

// Re-export calculationService for backward compatibility
export { calculateSavings, filterDrugs };
