
import { Drug, FilterOptions, SearchQuery, Alternative, DrugSuggestion } from '@/types';
import * as mockDrugs from '@/data/mockDrugs';
import { findDrugByNameOrIngredient } from '@/utils/drugDataUtils';

// In-memory store for imported drugs
let customDrugs: Drug[] = [];

// Get all drugs from all sources
export const getAllDrugs = (): Drug[] => {
  // Combine all drug sources available as exports from mockDrugs
  const allMockDrugs = Object.values(mockDrugs)
    .filter(value => Array.isArray(value))
    .flat() as Drug[];
  
  return [...allMockDrugs, ...customDrugs];
};

// Update custom drugs (for imported data)
export const updateCustomDrugs = (drugs: Drug[]): void => {
  customDrugs = drugs;
};

// Retrieve drug suggestions based on search term
export const getDrugSuggestions = (
  searchTerm: string,
  limit: number = 10
): DrugSuggestion[] => {
  if (!searchTerm || searchTerm.trim() === '') return [];
  
  const normalizedTerm = searchTerm.toLowerCase().trim();
  const allDrugs = getAllDrugs();
  
  return allDrugs
    .filter(drug => 
      drug.name.toLowerCase().includes(normalizedTerm) ||
      (drug.nameEn && drug.nameEn.toLowerCase().includes(normalizedTerm)) ||
      drug.activeIngredient.toLowerCase().includes(normalizedTerm) ||
      (drug.activeIngredientEn && drug.activeIngredientEn.toLowerCase().includes(normalizedTerm))
    )
    .slice(0, limit)
    .map(drug => ({
      id: drug.id,
      name: drug.name,
      nameEn: drug.nameEn,
      activeIngredient: drug.activeIngredient,
      activeIngredientEn: drug.activeIngredientEn
    }));
};

// Get alternative drug suggestions for a specific drug
export const getAlternativeDrugSuggestions = (
  drugId: string,
  searchTerm: string,
  limit: number = 10
): DrugSuggestion[] => {
  const drug = getDrugById(drugId);
  if (!drug) return [];
  
  // Find drugs with the same active ingredient
  const allDrugs = getAllDrugs();
  const drugsByIngredient = allDrugs.filter(d => 
    d.id !== drugId && (
      d.activeIngredient === drug.activeIngredient ||
      d.activeIngredientEn === drug.activeIngredientEn
    )
  );
  
  // If there's a search term, filter by it
  let result = drugsByIngredient;
  if (searchTerm && searchTerm.trim() !== '') {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    result = result.filter(d => 
      d.name.toLowerCase().includes(normalizedTerm) ||
      (d.nameEn && d.nameEn.toLowerCase().includes(normalizedTerm))
    );
  }
  
  return result.slice(0, limit).map(drug => ({
    id: drug.id,
    name: drug.name,
    nameEn: drug.nameEn,
    activeIngredient: drug.activeIngredient,
    activeIngredientEn: drug.activeIngredientEn
  }));
};

// Calculate price savings between original and alternative drug
export const calculateSavings = (originalDrug: Drug, alternativeDrug: Drug | Alternative): { amount: number, percentage: number } => {
  if (originalDrug.price <= 0 || alternativeDrug.price <= 0) {
    return { amount: 0, percentage: 0 };
  }
  
  const savingsAmount = originalDrug.price - alternativeDrug.price;
  const savingsPercentage = (savingsAmount / originalDrug.price) * 100;
  
  return {
    amount: savingsAmount > 0 ? savingsAmount : 0,
    percentage: savingsPercentage > 0 ? savingsPercentage : 0
  };
};

// Filter drugs based on criteria
export const filterDrugs = (drugs: Drug[], filters: FilterOptions): Drug[] => {
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

// Search drugs by name or active ingredient
export const searchDrugs = async (
  query: SearchQuery,
  filterOptions?: FilterOptions
): Promise<Drug[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get all drugs
  let allDrugs = getAllDrugs();
  
  // Search by name or active ingredient based on the query type
  let results: Drug[] = [];
  
  if (!query.term || query.term.trim() === '') {
    return [];
  }
  
  switch (query.by) {
    case 'name':
      results = allDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.term.toLowerCase()) ||
        (drug.nameEn && drug.nameEn.toLowerCase().includes(query.term.toLowerCase()))
      );
      break;
    case 'activeIngredient':
      results = allDrugs.filter(drug => 
        drug.activeIngredient.toLowerCase().includes(query.term.toLowerCase()) ||
        (drug.activeIngredientEn && drug.activeIngredientEn.toLowerCase().includes(query.term.toLowerCase()))
      );
      break;
    case 'all':
    default:
      results = findDrugByNameOrIngredient(allDrugs, query.term);
      break;
  }
  
  // Apply filters if provided
  if (filterOptions) {
    results = filterDrugs(results, filterOptions);
  }
  
  return results;
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
