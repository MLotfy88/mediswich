
import { Drug } from '@/types';
import { importFromCSV } from './import/csvImporter';
import { importFromExcel } from './import/excelImporter';
import { mapDataToDrugModel } from './import/drugDataMapper';
import { getAllDrugs } from '@/services/drugService';

// Function to import drugs from CSV or XLSX
export const importDrugsFromFile = (
  file: File, 
  existingDrugs: Drug[], 
  onSuccess: (updatedDrugs: Drug[]) => void, 
  onError: (error: string) => void,
  onProgress?: (progress: number) => void
) => {
  // Check if file is valid
  if (!file) {
    onError('Please upload a valid file.');
    return;
  }

  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  console.log("File type:", fileType, "File name:", fileName);
  
  // Validate file size (limit to 100MB)
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size > maxSize) {
    onError(`File is too large. Maximum size is 100MB.`);
    return;
  }
  
  // Update progress to indicate we're starting
  if (onProgress) onProgress(5);
  
  try {
    console.log("Starting import process with", existingDrugs.length, "existing drugs");
    
    // Handle CSV files
    if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      console.log("Processing as CSV file");
      importFromCSV(file, existingDrugs, onSuccess, onError, onProgress);
    } 
    // Handle Excel files (.xlsx, .xls)
    else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      fileType === 'application/vnd.ms-excel' ||
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls')
    ) {
      console.log("Processing as Excel file");
      importFromExcel(file, existingDrugs, onSuccess, onError, onProgress);
    } 
    else {
      onError('Unsupported file format. Please upload a CSV or Excel file (.xlsx, .xls).');
    }
  } catch (error) {
    console.error("Error during import:", error);
    onError(`Import error: ${error instanceof Error ? error.message : String(error)}`);
    // Update progress to indicate error
    if (onProgress) onProgress(0);
  }
};

// Re-export the mapper for direct access if needed
export { mapDataToDrugModel };
