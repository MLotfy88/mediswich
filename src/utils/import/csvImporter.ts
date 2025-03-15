
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
  
  // Check if file is empty
  if (file.size === 0) {
    onError('الملف فارغ. الرجاء تحديد ملف صالح.');
    return;
  }
  
  let rowsProcessed = 0;
  let totalRows = 0;
  let headerParsed = false;
  
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    chunkSize: 1024 * 1024, // Process in 1MB chunks for larger files
    beforeFirstChunk: function() {
      if (onProgress) onProgress(15);
    },
    step: (results, parser) => {
      // This function is called for each chunk of the file being processed
      if (!headerParsed && results.meta && results.meta.fields) {
        headerParsed = true;
        console.log("CSV Headers:", results.meta.fields);
        
        // Check if we have required fields
        const requiredFields = ['trade_name', 'arabic_name', 'price'];
        const missingFields = requiredFields.filter(field => 
          !results.meta.fields.some(f => 
            f.toLowerCase().includes(field.toLowerCase()) || 
            f.toLowerCase().replace(/_/g, '').includes(field.toLowerCase().replace(/_/g, ''))
          )
        );
        
        if (missingFields.length > 0) {
          parser.abort();
          onError(`حقول مطلوبة مفقودة: ${missingFields.join(', ')}`);
          return;
        }
      }
      
      if (results.errors && results.errors.length > 0) {
        console.warn("Parsing warning in row:", rowsProcessed, results.errors);
      }
      
      rowsProcessed++;
      
      // Update progress every 100 rows
      if (rowsProcessed % 100 === 0 && totalRows > 0) {
        const currentProgress = Math.min(20 + Math.round((rowsProcessed / totalRows) * 50), 70);
        if (onProgress) onProgress(currentProgress);
      }
    },
    complete: (results) => {
      try {
        // Update progress
        if (onProgress) onProgress(75);
        
        if (results.errors && results.errors.length > 0) {
          // If there are non-fatal errors, log them but continue
          console.error("CSV parsing warnings:", results.errors);
        }
        
        // Log the first few rows for debugging
        console.log("CSV import data (first 3 rows):", results.data.slice(0, 3));
        console.log(`Total rows in CSV: ${results.data.length}`);
        
        // Check if we have valid data
        if (!results.data || results.data.length === 0) {
          onError('الملف CSV لا يحتوي على أي بيانات صالحة.');
          return;
        }
        
        totalRows = results.data.length;
        
        // Verify data structure - check if we have basic columns
        const sampleRow = results.data[0] as Record<string, string>;
        console.log("Sample row headers:", Object.keys(sampleRow));
        
        // Update progress
        if (onProgress) onProgress(80);
        
        // Map the CSV data to our Drug interface
        console.log("Starting data mapping...");
        const mappedData = mapDataToDrugModel(results.data as Record<string, string>[]);
        console.log(`Mapped ${mappedData.length} drugs from CSV data`);
        
        if (mappedData.length === 0) {
          onError('لم يتم العثور على أي بيانات صالحة للأدوية في الملف.');
          return;
        }
        
        // Update progress
        if (onProgress) onProgress(85);
        
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
        onError(`خطأ في معالجة البيانات: ${error instanceof Error ? error.message : String(error)}`);
        // Reset progress on error
        if (onProgress) onProgress(0);
      }
    },
    error: (error) => {
      console.error("CSV parsing error:", error);
      onError(`خطأ في قراءة ملف CSV: ${error.message}`);
      // Reset progress on error
      if (onProgress) onProgress(0);
    }
  });
};
