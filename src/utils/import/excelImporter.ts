
import * as XLSX from 'xlsx';
import { Drug } from '@/types';
import { mapDataToDrugModel } from './drugDataMapper';
import { mergeDrugData } from '../drugDataUtils';
import { saveDrugs } from '@/services/drugService';

// Function to import Excel files
export const importFromExcel = (
  file: File,
  existingDrugs: Drug[],
  onSuccess: (updatedDrugs: Drug[]) => void,
  onError: (error: string) => void,
  onProgress?: (progress: number) => void
) => {
  console.log("Starting Excel import process...");
  const reader = new FileReader();
  
  // Update progress
  if (onProgress) onProgress(10);
  
  reader.onload = (e) => {
    try {
      // Update progress
      if (onProgress) onProgress(30);
      
      const data = e.target?.result;
      if (!data) {
        onError('Failed to read Excel file.');
        return;
      }
      
      console.log("Excel file read successfully, parsing workbook...");
      
      // Parse workbook
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Update progress
      if (onProgress) onProgress(50);
      
      // Convert to JSON with header: true option
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      console.log("Excel import data (first 3 rows):", jsonData.slice(0, 3));
      console.log(`Total rows in Excel: ${jsonData.length}`);
      
      if (!jsonData || jsonData.length === 0) {
        onError('The Excel file does not contain any valid data.');
        return;
      }
      
      // Verify data structure - check if we have basic columns
      const sampleRow = jsonData[0] as Record<string, string>;
      console.log("Sample row headers:", Object.keys(sampleRow));
      
      // Update progress
      if (onProgress) onProgress(70);
      
      // Map the Excel data to our Drug interface
      console.log("Starting data mapping...");
      const mappedData = mapDataToDrugModel(jsonData as Record<string, string>[]);
      console.log(`Mapped ${mappedData.length} drugs from Excel data`);
      
      // Update progress
      if (onProgress) onProgress(80);
      
      // Merge with existing drugs data
      console.log("Merging with existing drug data...");
      const updatedDrugs = mergeDrugData(existingDrugs, mappedData);
      console.log(`Total drugs after merge: ${updatedDrugs.length}`);
      
      // Update progress
      if (onProgress) onProgress(90);
      
      // Save the updated drug list to the database/storage
      console.log("Saving updated drug list...");
      saveDrugs(updatedDrugs);
      
      // Update progress to 100% on success
      if (onProgress) onProgress(100);
      
      // Call the success callback with the updated drug list
      console.log("Import process completed successfully");
      onSuccess(updatedDrugs);
    } catch (error) {
      console.error("Error processing Excel data:", error);
      onError(`Error processing Excel data: ${error instanceof Error ? error.message : String(error)}`);
      // Reset progress on error
      if (onProgress) onProgress(0);
    }
  };
  
  reader.onerror = () => {
    onError('Error reading Excel file.');
    // Reset progress on error
    if (onProgress) onProgress(0);
  };
  
  console.log("Starting to read Excel file as binary string...");
  reader.readAsBinaryString(file);
};
