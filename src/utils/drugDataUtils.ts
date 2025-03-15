import { Drug, Alternative } from '@/types';

// Function to format and validate drug data from CSV
export function processDrugData(data: any[]): (Drug | Alternative)[] {
  return data.map((item: any) => {
    // Basic validation and defaults
    const drug: Drug | Alternative = {
      id: item.id || generateId(),
      name: item.name || '',
      nameEn: item.nameEn || item.name_en || '',
      company: item.company || '',
      price: parseFloat(item.price) || 0,
      country: item.country || 'Egypt',
      isEgyptian: item.isEgyptian !== undefined ? item.isEgyptian : (item.country === 'Egypt'),
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      activeIngredient: item.activeIngredient || item.active_ingredient || '',
      activeIngredientEn: item.activeIngredientEn || item.active_ingredient_en || '',
      drugType: item.drugType || item.drug_type || '',
      manufacturer: item.manufacturer || item.company || '',
    };

    // If it's a drug with alternatives, process them
    if ('alternatives' in item && Array.isArray(item.alternatives)) {
      (drug as Drug).alternatives = item.alternatives.map((alt: any) => ({
        id: alt.id || generateId(),
        name: alt.name || '',
        nameEn: alt.nameEn || alt.name_en || '',
        company: alt.company || '',
        price: parseFloat(alt.price) || 0,
        country: alt.country || 'Egypt',
        isEgyptian: alt.isEgyptian !== undefined ? alt.isEgyptian : (alt.country === 'Egypt'),
        isAvailable: alt.isAvailable !== undefined ? alt.isAvailable : true,
        activeIngredient: alt.activeIngredient || alt.active_ingredient || drug.activeIngredient,
        activeIngredientEn: alt.activeIngredientEn || alt.active_ingredient_en || drug.activeIngredientEn,
        drugType: alt.drugType || alt.drug_type || drug.drugType,
        manufacturer: alt.manufacturer || alt.company || '',
      }));
    } else if (!('alternatives' in drug)) {
      (drug as Drug).alternatives = [];
    }

    return drug;
  });
}

// Function to merge drug data without duplicates
export function mergeDrugData(existingDrugs: Drug[], newDrugs: Drug[]): Drug[] {
  console.log(`Merging ${existingDrugs.length} existing drugs with ${newDrugs.length} new drugs`);
  
  if (newDrugs.length === 0) {
    console.log("No new drugs to merge");
    return existingDrugs;
  }
  
  // Create a deep copy of existing drugs to avoid mutation issues
  const result = JSON.parse(JSON.stringify(existingDrugs));
  const existingIds = new Set(existingDrugs.map(drug => drug.id));
  const existingNameMap = new Map();
  
  // Create map of existing drugs by name for faster lookup
  existingDrugs.forEach(drug => {
    if (drug.name) existingNameMap.set(drug.name.toLowerCase(), drug.id);
    if (drug.nameEn) existingNameMap.set(drug.nameEn.toLowerCase(), drug.id);
  });
  
  // Track new drugs added
  let newDrugsAdded = 0;
  let drugsUpdated = 0;
  
  newDrugs.forEach(newDrug => {
    // Check if drug already exists by ID
    if (existingIds.has(newDrug.id)) {
      // Update existing drug
      const index = result.findIndex(drug => drug.id === newDrug.id);
      if (index >= 0) {
        // Merge the properties, keeping existing data if new data is empty
        result[index] = {
          ...result[index],
          name: newDrug.name || result[index].name,
          nameEn: newDrug.nameEn || result[index].nameEn,
          company: newDrug.company || result[index].company,
          price: newDrug.price || result[index].price,
          country: newDrug.country || result[index].country,
          isEgyptian: newDrug.isEgyptian !== undefined ? newDrug.isEgyptian : result[index].isEgyptian,
          isAvailable: newDrug.isAvailable !== undefined ? newDrug.isAvailable : result[index].isAvailable,
          activeIngredient: newDrug.activeIngredient || result[index].activeIngredient,
          activeIngredientEn: newDrug.activeIngredientEn || result[index].activeIngredientEn,
          drugType: newDrug.drugType || result[index].drugType,
          manufacturer: newDrug.manufacturer || result[index].manufacturer,
        };
        drugsUpdated++;
      }
    } 
    // Check if drug exists by name
    else if (
      (newDrug.name && existingNameMap.has(newDrug.name.toLowerCase())) || 
      (newDrug.nameEn && existingNameMap.has(newDrug.nameEn.toLowerCase()))
    ) {
      // Get ID of existing drug with same name
      const existingId = newDrug.name ? 
        existingNameMap.get(newDrug.name.toLowerCase()) : 
        existingNameMap.get(newDrug.nameEn.toLowerCase());
      
      const index = result.findIndex(drug => drug.id === existingId);
      if (index >= 0) {
        // Update with new data where available
        result[index] = {
          ...result[index],
          nameEn: newDrug.nameEn || result[index].nameEn,
          name: newDrug.name || result[index].name,
          company: newDrug.company || result[index].company,
          price: newDrug.price || result[index].price,
          activeIngredient: newDrug.activeIngredient || result[index].activeIngredient,
          activeIngredientEn: newDrug.activeIngredientEn || result[index].activeIngredientEn,
          drugType: newDrug.drugType || result[index].drugType,
        };
        drugsUpdated++;
      }
    }
    else {
      // Add new drug
      result.push({
        ...newDrug,
        alternatives: newDrug.alternatives || []
      });
      existingIds.add(newDrug.id);
      if (newDrug.name) existingNameMap.set(newDrug.name.toLowerCase(), newDrug.id);
      if (newDrug.nameEn) existingNameMap.set(newDrug.nameEn.toLowerCase(), newDrug.id);
      newDrugsAdded++;
    }
  });
  
  console.log(`Merge complete: Added ${newDrugsAdded} new drugs, updated ${drugsUpdated} existing drugs`);
  console.log(`Total drugs after merge: ${result.length}`);
  
  return result;
}

// Helper function to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Function to find a drug by name or active ingredient
export function findDrugByNameOrIngredient(drugs: Drug[], term: string): Drug[] {
  if (!term || term.trim() === '') return [];
  
  const normalizedTerm = term.toLowerCase().trim();
  
  return drugs.filter(drug => 
    (drug.name && drug.name.toLowerCase().includes(normalizedTerm)) ||
    (drug.nameEn && drug.nameEn.toLowerCase().includes(normalizedTerm)) ||
    (drug.activeIngredient && drug.activeIngredient.toLowerCase().includes(normalizedTerm)) ||
    (drug.activeIngredientEn && drug.activeIngredientEn.toLowerCase().includes(normalizedTerm))
  );
}

// Function to find alternatives for a specific drug
export function findAlternativesForDrug(drugs: Drug[], drugId: string): Alternative[] {
  const drug = drugs.find(d => d.id === drugId);
  return drug ? drug.alternatives : [];
}

// Function to extract unique drug types from the database
export function getUniqueDrugTypes(drugs: Drug[]): string[] {
  const typesSet = new Set<string>();
  
  drugs.forEach(drug => {
    if (drug.drugType) typesSet.add(drug.drugType);
    
    drug.alternatives.forEach(alt => {
      if (alt.drugType) typesSet.add(alt.drugType);
    });
  });
  
  return Array.from(typesSet);
}

// Function to extract unique countries from the database
export function getUniqueCountries(drugs: Drug[]): string[] {
  const countriesSet = new Set<string>();
  
  drugs.forEach(drug => {
    if (drug.country) countriesSet.add(drug.country);
    
    drug.alternatives.forEach(alt => {
      if (alt.country) countriesSet.add(alt.country);
    });
  });
  
  return Array.from(countriesSet);
}
