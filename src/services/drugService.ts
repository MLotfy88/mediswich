
import { Drug } from "@/types";
import { drugsData } from "./data/mockDrugs";
import { calculateSavings } from "./calculationService";
import { searchDrugs, getDrugSuggestions } from "./drugSearchService";
import { filterDrugs } from "./drugFilterService";

// Function to get all drugs 
export const getAllDrugs = (): Drug[] => {
  return drugsData;
};

// Re-export all services for backward compatibility
export {
  calculateSavings,
  searchDrugs,
  getDrugSuggestions,
  filterDrugs
};
