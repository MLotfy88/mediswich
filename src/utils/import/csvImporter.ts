
import Papa from 'papaparse';
import { Drug } from '@/types';
import { mapDataToDrugModel } from './drugDataMapper';
import { mergeDrugData } from '../drugDataUtils';
import { saveDrugs } from '@/services/drugService';

// Function to import CSV files
export const importFromCSV = (
  file: File,
  existingDrugs: Drug[],
  onSuccess: (updatedDrugs: Drug[]) => void,
  onError: (error: string) => void,
  onProgress?: (progress: number) => void
) => {
  console.log("Starting CSV import process...");
  
  // Update progress
  if (onProgress) onProgress(10);
  
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    step: (results, parser) => {
      // This function is called for each chunk of the file being processed
      // We could use it to provide more detailed progress updates
    },
    complete: (results) => {
      try {
        // Update progress
        if (onProgress) onProgress(30);
        
        if (results.errors && results.errors.length > 0) {
          console.error("CSV parsing errors:", results.errors);
          onError(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }
        
        console.log("CSV import data (first 3 rows):", results.data.slice(0, 3));
        console.log(`Total rows in CSV: ${results.data.length}`);
        
        // Check if we have valid data
        if (!results.data || results.data.length === 0) {
          onError('The CSV file does not contain any valid data.');
          return;
        }
        
        // Verify data structure - check if we have basic columns
        const sampleRow = results.data[0] as Record<string, string>;
        console.log("Sample row headers:", Object.keys(sampleRow));
        
        // Update progress
        if (onProgress) onProgress(50);
        
        // Map the CSV data to our Drug interface
        console.log("Starting data mapping...");
        const mappedData = mapDataToDrugModel(results.data as Record<string, string>[]);
        console.log(`Mapped ${mappedData.length} drugs from CSV data`);
        
        // Update progress
        if (onProgress) onProgress(70);
        
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
        console.error("Error processing drug data:", error);
        onError(`Error processing data: ${error instanceof Error ? error.message : String(error)}`);
        // Reset progress on error
        if (onProgress) onProgress(0);
      }
    },
    error: (error) => {
      console.error("CSV parsing error:", error);
      onError(`Error reading CSV file: ${error.message}`);
      // Reset progress on error
      if (onProgress) onProgress(0);
    }
  });
};
