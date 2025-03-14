import { Drug, Alternative } from '@/types';
import { importFromCSV } from './import/csvImporter';
import { importFromExcel } from './import/excelImporter';
import { mapDataToDrugModel } from './import/drugDataMapper';

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
    importFromCSV(file, existingDrugs, onSuccess, onError);
  } 
  // Handle Excel files (.xlsx, .xls)
  else if (
    fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
    fileType === 'application/vnd.ms-excel' ||
    file.name.endsWith('.xlsx') ||
    file.name.endsWith('.xls')
  ) {
    importFromExcel(file, existingDrugs, onSuccess, onError);
  } 
  else {
    onError('Unsupported file format. Please upload a CSV or Excel file (.xlsx, .xls).');
  }
};

// Helper function to parse alternative drugs from CSV - keeping this here for backward compatibility
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

// Re-export the mapper for direct access if needed
export { mapDataToDrugModel };
