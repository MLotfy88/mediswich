
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Drug, Alternative } from '@/types';
import { processDrugData, mergeDrugData } from './drugDataUtils';

// Function to import drugs from CSV or XLSX
export const importDrugsFromFile = (
  file: File, 
  existingDrugs: Drug[], 
  onSuccess: (updatedDrugs: Drug[]) => void, 
  onError: (error: string) => void
) => {
  // Check if file is valid
  if (!file) {
    onError('Please upload a valid file.');
    return;
  }

  const fileType = file.type;
  console.log("File type:", fileType);
  
  // Handle CSV files
  if (fileType === 'text/csv') {
    importCSV(file, existingDrugs, onSuccess, onError);
  } 
  // Handle Excel files (.xlsx, .xls)
  else if (
    fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
    fileType === 'application/vnd.ms-excel' ||
    file.name.endsWith('.xlsx') ||
    file.name.endsWith('.xls')
  ) {
    importExcel(file, existingDrugs, onSuccess, onError);
  } 
  else {
    onError('Unsupported file format. Please upload a CSV or Excel file (.xlsx, .xls).');
  }
};

// Function to import CSV files
const importCSV = (
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
        
        // Check if we have valid data
        if (!results.data || results.data.length === 0) {
          onError('The CSV file does not contain any valid data.');
          return;
        }
        
        // Map the CSV data to our Drug interface
        const mappedData = mapDataToDrugModel(results.data);
        
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

// Function to import Excel files
const importExcel = (
  file: File,
  existingDrugs: Drug[],
  onSuccess: (updatedDrugs: Drug[]) => void,
  onError: (error: string) => void
) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = e.target?.result;
      if (!data) {
        onError('Failed to read Excel file.');
        return;
      }
      
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Excel import data:", jsonData);
      
      if (!jsonData || jsonData.length === 0) {
        onError('The Excel file does not contain any valid data.');
        return;
      }
      
      // Map the Excel data to our Drug interface
      const mappedData = mapDataToDrugModel(jsonData);
      
      // Merge with existing drugs data
      const updatedDrugs = mergeDrugData(existingDrugs, mappedData);
      
      // Call the success callback with the updated drug list
      onSuccess(updatedDrugs);
    } catch (error) {
      console.error("Error processing Excel data:", error);
      onError(`Error processing Excel data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  reader.onerror = () => {
    onError('Error reading Excel file.');
  };
  
  reader.readAsBinaryString(file);
};

// Function to map data to Drug model
function mapDataToDrugModel(data: any[]): Drug[] {
  return data.map((item) => {
    // Generate a unique ID
    const id = `drug-${Math.random().toString(36).substring(2, 9)}`;
    
    // Explicitly map the expected columns to our Drug model
    const drug: Drug = {
      id,
      name: item.arabic_name || item.trade_name || '',
      nameEn: item.trade_name || item.english_name || '',
      company: item.company || '',
      price: parseFloat(item.price || item.old_price || '0') || 0,
      country: item.country || 'Egypt',
      isEgyptian: true, // Default to true for imported data
      isAvailable: item.active === undefined ? true : item.active === 'yes' || item.active === 'true' || item.active === '1',
      activeIngredient: item.active_ingredient || item.active || '',
      activeIngredientEn: item.active_ingredient_en || '',
      drugType: item.dosage_form || item.dosage_form_ar || item.category || item.main_category || '',
      manufacturer: item.company || '',
      alternatives: [], // Initially empty, will be populated if needed
    };
    
    // Process additional fields if available
    if (item.description) {
      console.log(`Processing drug with description: ${item.description}`);
    }
    
    if (item.usage || item.usage_ar) {
      console.log(`Drug ${drug.name} has usage information`);
    }
    
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

// For backward compatibility
export const importDrugsFromCSV = importDrugsFromFile;
