
import { Drug, FilterOptions, SearchQuery } from '@/types';
import { 
  painRelievers, antibiotics, cardiovascular, gastrointestinal, 
  psychotropics, cholesterolLowering, antiallergic, antidiabetic, 
  hormones, specialMedications, importedDrugs
} from '@/data/mockDrugs';
import { findDrugByNameOrIngredient } from '@/utils/drugDataUtils';

// In-memory store for imported drugs
let customDrugs: Drug[] = [];

// Get all drugs from all sources
export const getAllDrugs = (): Drug[] => {
  // Combine all drug sources
  return [
    ...painRelievers,
    ...antibiotics, 
    ...cardiovascular,
    ...gastrointestinal,
    ...psychotropics,
    ...cholesterolLowering,
    ...antiallergic,
    ...antidiabetic,
    ...hormones,
    ...specialMedications,
    ...importedDrugs,
    ...customDrugs
  ];
};

// Update custom drugs (for imported data)
export const updateCustomDrugs = (drugs: Drug[]): void => {
  customDrugs = drugs;
};

// Search drugs by name or active ingredient
export const searchDrugs = async (
  searchTerm: string,
  filterOptions?: FilterOptions
): Promise<Drug[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get all drugs
  let allDrugs = getAllDrugs();
  
  // Search by name or active ingredient
  let results = findDrugByNameOrIngredient(allDrugs, searchTerm);
  
  // Apply filters if provided
  if (filterOptions) {
    results = applyFilters(results, filterOptions);
  }
  
  return results;
};

// Apply filters to drug results
const applyFilters = (drugs: Drug[], filters: FilterOptions): Drug[] => {
  return drugs.filter(drug => {
    // Country filter
    if (filters.country && drug.country !== filters.country) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange.min !== null && drug.price < filters.priceRange.min) {
      return false;
    }
    if (filters.priceRange.max !== null && drug.price > filters.priceRange.max) {
      return false;
    }
    
    // Availability filter
    if (filters.availability === 'available' && !drug.isAvailable) {
      return false;
    }
    if (filters.availability === 'unavailable' && drug.isAvailable) {
      return false;
    }
    
    // Drug type filter
    if (filters.drugType && drug.drugType !== filters.drugType) {
      return false;
    }
    
    return true;
  });
};

// Get a single drug by ID
export const getDrugById = (id: string): Drug | undefined => {
  return getAllDrugs().find(drug => drug.id === id);
};

// Get drug alternatives
export const getDrugAlternatives = (drugId: string): Drug[] => {
  const drug = getDrugById(drugId);
  if (!drug) return [];
  
  // Convert alternatives to Drug type for consistency
  return drug.alternatives.map(alt => ({
    ...alt,
    alternatives: []
  }));
};

// Get drugs by type
export const getDrugsByType = (type: string): Drug[] => {
  return getAllDrugs().filter(drug => drug.drugType === type);
};

// Get all drug types
export const getAllDrugTypes = (): string[] => {
  const types = new Set<string>();
  getAllDrugs().forEach(drug => {
    if (drug.drugType) {
      types.add(drug.drugType);
    }
  });
  return Array.from(types);
};

// Get all countries
export const getAllCountries = (): string[] => {
  const countries = new Set<string>();
  getAllDrugs().forEach(drug => {
    if (drug.country) {
      countries.add(drug.country);
    }
  });
  return Array.from(countries);
};
