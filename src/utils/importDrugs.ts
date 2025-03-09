
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
  // Check if file is valid
  if (!file || file.type !== 'text/csv') {
    onError('Please upload a valid CSV file.');
    return;
  }

  // Parse the CSV file using PapaParse
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
        
        // Check if we have valid data
        if (!results.data || results.data.length === 0) {
          onError('The CSV file does not contain any valid data.');
          return;
        }
        
        // Map the CSV data to our Drug interface
        const mappedData = mapCsvToDrugModel(results.data);
        
        // Merge with existing drugs data
        const updatedDrugs = mergeDrugData(existingDrugs, mappedData);
        
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

// Function to map CSV data to our Drug model
function mapCsvToDrugModel(csvData: any[]): Drug[] {
  return csvData.map((item) => {
    // Generate a unique ID
    const id = `drug-${Math.random().toString(36).substring(2, 9)}`;
    
    // Map CSV fields to Drug fields
    const drug: Drug = {
      id,
      name: item.trade_name || item.name || '',
      nameEn: item.english_name || item.nameEn || item.trade_name || '',
      company: item.company || '',
      price: parseFloat(item.price || item.old_price || '0') || 0,
      country: item.country || 'Egypt',
      isEgyptian: true, // Default to true for imported data
      isAvailable: item.active === undefined ? true : item.active === 'yes' || item.active === 'true' || item.active === '1',
      activeIngredient: item.active_ingredient || item.activeIngredient || item.active || '',
      activeIngredientEn: item.active_ingredient_en || item.activeIngredientEn || '',
      drugType: item.category || item.main_category || item.dosage_form || item.drugType || '',
      manufacturer: item.company || item.manufacturer || '',
      alternatives: [], // Initially empty, will be populated if needed
    };
    
    // Optional: Map Arabic fields if available
    if (item.arabic_name) {
      drug.name = item.arabic_name;
      drug.nameEn = item.trade_name || '';
    }
    
    // If there's a category_ar field and our interface supports it
    // (would need to extend the Drug interface)
    // drug.categoryAr = item.category_ar || item.main_category_ar || '';
    
    return drug;
  });
}

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
