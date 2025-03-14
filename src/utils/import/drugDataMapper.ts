
import { Drug, Alternative } from '@/types';

// Function to map data to Drug model
export function mapDataToDrugModel(data: any[]): Drug[] {
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
