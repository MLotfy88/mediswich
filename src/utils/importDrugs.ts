
import Papa from 'papaparse';
import { Drug, Alternative } from '@/types';
import { processDrugData, mergeDrugData } from './drugDataUtils';

// Function to import drugs from CSV
export const importDrugsFromCSV = (
  file: File, 
  existingDrugs: Drug[], 
  onSuccess: (updatedDrugs: Drug[]) => void, 
  onError: (error: string) => void
) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        if (results.errors && results.errors.length > 0) {
          console.error("CSV parsing errors:", results.errors);
          onError(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }
        
        console.log("CSV import data:", results.data);
        
        // Process the data to conform to our Drug/Alternative interface
        const processedData = processDrugData(results.data);
        
        // Merge with existing drugs data
        const updatedDrugs = mergeDrugData(existingDrugs, processedData);
        
        // Call the success callback with the updated drug list
        onSuccess(updatedDrugs);
      } catch (error) {
        console.error("Error processing drug data:", error);
        onError(`Error processing data: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
    error: (error) => {
      console.error("CSV parsing error:", error);
      onError(`Error reading CSV file: ${error.message}`);
    }
  });
};

// Helper function to parse alternative drugs from CSV
export const parseAlternativesFromCSV = (
  csvData: string[], 
  mainDrugId: string
): Alternative[] => {
  if (!csvData || csvData.length === 0) return [];
  
  return csvData.map((row) => {
    const fields = row.split(',').map(field => field.trim());
    
    // Basic mapping assuming CSV format: name,company,price,country
    return {
      id: `alt-${mainDrugId}-${Math.random().toString(36).substring(2, 9)}`,
      name: fields[0] || '',
      nameEn: fields[1] || '',
      company: fields[2] || '',
      price: parseFloat(fields[3]) || 0,
      country: fields[4] || 'Egypt',
      isEgyptian: fields[4] === 'Egypt',
      isAvailable: true, // Default to true
      activeIngredient: fields[5] || '', // Active ingredient
      activeIngredientEn: fields[6] || '', // Active ingredient in English
      drugType: fields[7] || '', // Drug type
      manufacturer: fields[8] || '', // Manufacturer
    };
  });
};
