
import { Drug, Alternative } from '@/types';

// Function to map data to Drug model
export function mapDataToDrugModel(data: Record<string, string>[]): Drug[] {
  if (!data || data.length === 0) {
    console.warn('No data to map');
    return [];
  }
  
  console.log('Mapping data, first 3 rows:', data.slice(0, 3));
  console.log(`Total rows to map: ${data.length}`);
  
  // Create a batch processing function to avoid browser freezing
  const batchSize = 500;
  const totalBatches = Math.ceil(data.length / batchSize);
  let result: Drug[] = [];
  
  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const start = batchIndex * batchSize;
    const end = Math.min(start + batchSize, data.length);
    const batch = data.slice(start, end);
    
    console.log(`Processing batch ${batchIndex + 1}/${totalBatches}, items ${start} to ${end}`);
    
    const mappedBatch = batch.map((item) => {
      // Generate a unique ID
      const id = `drug-${Math.random().toString(36).substring(2, 9)}`;
      
      // Check if we have the necessary data
      if (!item.trade_name && !item.arabic_name) {
        console.warn('Missing essential drug data (name):', item);
      }
      
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
      
      return drug;
    });
    
    result = result.concat(mappedBatch);
  }
  
  console.log(`Successfully mapped ${result.length} drugs from data`);
  return result;
}
