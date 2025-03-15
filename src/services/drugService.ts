
import { Drug } from "@/types";
import { drugsData } from "./data/mockDrugs";
import { calculateSavings } from "./calculationService";
import { searchDrugs, getDrugSuggestions } from "./drugSearchService";
import { filterDrugs } from "./drugFilterService";

// Local variable to store drugs data
let drugsDatabase = [...drugsData];

// Function to get all drugs 
export const getAllDrugs = (): Drug[] => {
  return drugsDatabase;
};

// Function to save drugs to the database
export const saveDrugs = (drugs: Drug[]): void => {
  console.log(`Saving ${drugs.length} drugs to database`);
  drugsDatabase = [...drugs];
  console.log('Drugs saved successfully');
};

// Re-export all services for backward compatibility
export {
  calculateSavings,
  searchDrugs,
  getDrugSuggestions,
  filterDrugs
};
