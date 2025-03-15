
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
  
  // Check if file is empty
  if (file.size === 0) {
    onError('الملف فارغ. الرجاء تحديد ملف صالح.');
    return;
  }
  
  // Update progress
  if (onProgress) onProgress(10);
  
  reader.onload = (e) => {
    try {
      // Update progress
      if (onProgress) onProgress(30);
      
      const data = e.target?.result;
      if (!data) {
        onError('فشل في قراءة ملف Excel.');
        return;
      }
      
      console.log("Excel file read successfully, parsing workbook...");
      
      let workbook;
      try {
        // Parse workbook
        workbook = XLSX.read(data, { type: 'binary' });
      } catch (error) {
        console.error("Error parsing Excel workbook:", error);
        onError(`خطأ في تحليل ملف Excel: ${error instanceof Error ? error.message : String(error)}`);
        return;
      }
      
      if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
        onError('ملف Excel لا يحتوي على أي صفحات.');
        return;
      }
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      if (!worksheet) {
        onError(`لا يمكن العثور على صفحة "${firstSheetName}" في ملف Excel.`);
        return;
      }
      
      // Update progress
      if (onProgress) onProgress(50);
      
      // Convert to JSON with header: true option
      let jsonData;
      try {
        jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      } catch (error) {
        console.error("Error converting Excel to JSON:", error);
        onError(`خطأ في تحويل بيانات Excel: ${error instanceof Error ? error.message : String(error)}`);
        return;
      }
      
      if (jsonData && jsonData.length > 0) {
        console.log("Excel import data (first 3 rows):", jsonData.slice(0, 3));
        console.log(`Total rows in Excel: ${jsonData.length}`);
      } else {
        onError('ملف Excel لا يحتوي على أي بيانات صالحة.');
        return;
      }
      
      // Verify data structure - check if we have basic columns
      const sampleRow = jsonData[0] as Record<string, string>;
      const headers = Object.keys(sampleRow);
      console.log("Sample row headers:", headers);
      
      // Check for required fields
      const requiredFields = ['trade_name', 'arabic_name', 'price'];
      const missingFields = requiredFields.filter(field => 
        !headers.some(h => 
          h.toLowerCase().includes(field.toLowerCase()) || 
          h.toLowerCase().replace(/_/g, '').includes(field.toLowerCase().replace(/_/g, ''))
        )
      );
      
      if (missingFields.length > 0) {
        onError(`حقول مطلوبة مفقودة: ${missingFields.join(', ')}`);
        return;
      }
      
      // Update progress
      if (onProgress) onProgress(70);
      
      // Map the Excel data to our Drug interface
      console.log("Starting data mapping...");
      const mappedData = mapDataToDrugModel(jsonData as Record<string, string>[]);
      console.log(`Mapped ${mappedData.length} drugs from Excel data`);
      
      if (mappedData.length === 0) {
        onError('لم يتم العثور على أي بيانات صالحة للأدوية في الملف.');
        return;
      }
      
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
      onError(`خطأ في معالجة بيانات Excel: ${error instanceof Error ? error.message : String(error)}`);
      // Reset progress on error
      if (onProgress) onProgress(0);
    }
  };
  
  reader.onerror = (error) => {
    console.error("FileReader error:", error);
    onError('خطأ في قراءة ملف Excel.');
    // Reset progress on error
    if (onProgress) onProgress(0);
  };
  
  console.log("Starting to read Excel file as binary string...");
  reader.readAsBinaryString(file);
};
