
import * as XLSX from 'xlsx';
import { Drug } from '@/types';
import { mapDataToDrugModel } from './drugDataMapper';
import { mergeDrugData } from '../drugDataUtils';

// Function to import Excel files
export const importFromExcel = (
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
