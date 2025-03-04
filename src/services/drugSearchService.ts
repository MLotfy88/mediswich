
import { Drug, SearchQuery, DrugSuggestion } from "@/types";
import { drugsData } from "./data/mockDrugs";

// Function to search drugs by name or active ingredient
export const searchDrugs = (searchTerm: string): Drug[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return drugsData.filter((drug) => {
    const lowerName = drug.name.toLowerCase();
    const lowerNameEn = drug.nameEn ? drug.nameEn.toLowerCase() : '';
    const lowerActiveIngredient = drug.activeIngredient.toLowerCase();
    const lowerActiveIngredientEn = drug.activeIngredientEn ? drug.activeIngredientEn.toLowerCase() : '';
    
    return (
      lowerName.includes(lowerSearchTerm) ||
      lowerNameEn.includes(lowerSearchTerm) ||
      lowerActiveIngredient.includes(lowerSearchTerm) ||
      lowerActiveIngredientEn.includes(lowerSearchTerm)
    );
  });
};

// Function to get drug suggestions for autocomplete
export const getDrugSuggestions = (searchTerm: string, languageCode: 'ar' | 'en'): DrugSuggestion[] => {
  if (!searchTerm || searchTerm.trim().length < 2) return [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return drugsData
    .filter(drug => {
      const nameInCurrentLang = languageCode === 'ar' ? drug.name : (drug.nameEn || drug.name);
      const nameInOtherLang = languageCode === 'ar' ? (drug.nameEn || '') : drug.name;
      const activeIngredientInCurrentLang = languageCode === 'ar' ? drug.activeIngredient : (drug.activeIngredientEn || drug.activeIngredient);
      
      return nameInCurrentLang.toLowerCase().includes(lowerSearchTerm) || 
             nameInOtherLang.toLowerCase().includes(lowerSearchTerm) ||
             activeIngredientInCurrentLang.toLowerCase().includes(lowerSearchTerm);
    })
    .map(drug => ({
      id: drug.id,
      name: languageCode === 'ar' ? drug.name : (drug.nameEn || drug.name),
      nameEn: drug.nameEn,
      nameInOtherLanguage: languageCode === 'ar' ? drug.nameEn : drug.name,
      activeIngredient: languageCode === 'ar' ? drug.activeIngredient : (drug.activeIngredientEn || drug.activeIngredient),
      activeIngredientEn: languageCode === 'ar' ? (drug.activeIngredientEn || '') : drug.activeIngredient
    }));
};

// Function to get alternative drug suggestions for a specific drug
export const getAlternativeSuggestions = (drugId: string, searchTerm: string, languageCode: 'ar' | 'en'): DrugSuggestion[] => {
  if (!drugId || !searchTerm || searchTerm.trim().length < 2) return [];
  
  // Find the drug by ID
  const drug = drugsData.find(d => d.id === drugId);
  if (!drug || !drug.alternatives || drug.alternatives.length === 0) return [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  // Filter and map alternatives
  return drug.alternatives
    .filter(alt => {
      const nameInCurrentLang = languageCode === 'ar' ? alt.name : (alt.nameEn || alt.name);
      const nameInOtherLang = languageCode === 'ar' ? (alt.nameEn || '') : alt.name;
      const activeIngredientInCurrentLang = languageCode === 'ar' ? alt.activeIngredient : (alt.activeIngredientEn || alt.activeIngredient);
      
      return nameInCurrentLang.toLowerCase().includes(lowerSearchTerm) || 
             nameInOtherLang.toLowerCase().includes(lowerSearchTerm) ||
             activeIngredientInCurrentLang.toLowerCase().includes(lowerSearchTerm);
    })
    .map(alt => ({
      id: alt.id,
      name: languageCode === 'ar' ? alt.name : (alt.nameEn || alt.name),
      nameEn: alt.nameEn,
      nameInOtherLanguage: languageCode === 'ar' ? alt.nameEn : alt.name,
      activeIngredient: languageCode === 'ar' ? alt.activeIngredient : (alt.activeIngredientEn || alt.activeIngredient),
      activeIngredientEn: languageCode === 'ar' ? (alt.activeIngredientEn || '') : alt.activeIngredient
    }));
};
