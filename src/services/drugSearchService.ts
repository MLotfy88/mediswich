
import { Drug, SearchQuery, DrugSuggestion } from "@/types";
import { drugsData } from "./data/mockDrugs";

// Function to search drugs by name or active ingredient
export const searchDrugs = (searchTerm: string): Drug[] => {
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

// Function to get drug suggestions for autocomplete
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
