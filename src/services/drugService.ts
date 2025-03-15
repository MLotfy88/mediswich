
import { Drug } from "@/types";
import { drugsData } from "./data/mockDrugs";
import { calculateSavings } from "./calculationService";
import { filterDrugs } from "./drugFilterService";

const DRUG_STORAGE_KEY = "mediswitch_drugs_database";

// Initialize drugs database from localStorage or use mock data as fallback
const initDrugsDatabase = (): Drug[] => {
  try {
    const storedDrugs = localStorage.getItem(DRUG_STORAGE_KEY);
    if (storedDrugs) {
      console.log("Loading drugs from localStorage");
      return JSON.parse(storedDrugs);
    }
  } catch (error) {
    console.error("Error loading drugs from localStorage:", error);
  }
  
  console.log("Using mock data as initial database");
  return [...drugsData];
};

// Local variable to store drugs data
let drugsDatabase: Drug[] = initDrugsDatabase();

// Function to get all drugs 
export const getAllDrugs = (): Drug[] => {
  console.log(`Returning ${drugsDatabase.length} drugs from database`);
  return drugsDatabase;
};

// Function to save drugs to the database and localStorage
export const saveDrugs = (drugs: Drug[]): void => {
  console.log(`Saving ${drugs.length} drugs to database and localStorage`);
  
  // Make a deep copy to avoid reference issues
  drugsDatabase = JSON.parse(JSON.stringify(drugs));
  
  // Save to localStorage
  try {
    localStorage.setItem(DRUG_STORAGE_KEY, JSON.stringify(drugsDatabase));
    console.log('Drugs saved successfully to localStorage');
  } catch (error) {
    console.error('Error saving drugs to localStorage:', error);
    // If localStorage is full, we might need to handle that specifically
    if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      console.error('localStorage quota exceeded. Consider using a different storage solution.');
    }
  }
  
  console.log('Total drugs in database:', drugsDatabase.length);
};

// Function to search drugs by name or active ingredient
export const searchDrugs = (searchTerm: string): Drug[] => {
  console.log(`Searching for "${searchTerm}" in ${drugsDatabase.length} drugs`);
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  const results = drugsDatabase.filter((drug) => {
    // Handle null or undefined values with fallback to empty strings
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
      
      // For Arabic search, specifically check the Arabic name
      if (languageCode === 'ar') {
        return (drug.name || '').toLowerCase().includes(lowerSearchTerm);
      }
      
      // For English search, check both English and Arabic (as a fallback)
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
