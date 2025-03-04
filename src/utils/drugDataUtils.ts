
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
export function mergeDrugData(existingDrugs: Drug[], newDrugs: (Drug | Alternative)[]): Drug[] {
  const result = [...existingDrugs];
  const existingIds = new Set(existingDrugs.map(drug => drug.id));

  newDrugs.forEach(newDrug => {
    if ('alternatives' in newDrug) {
      // It's a drug with alternatives
      if (existingIds.has(newDrug.id)) {
        // Update existing drug
        const index = result.findIndex(drug => drug.id === newDrug.id);
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
          // Merge alternatives
          alternatives: [...result[index].alternatives, ...newDrug.alternatives.filter(alt => 
            !result[index].alternatives.some(existingAlt => existingAlt.id === alt.id)
          )]
        };
      } else {
        // Add new drug
        result.push(newDrug as Drug);
        existingIds.add(newDrug.id);
      }
    } else {
      // It's an alternative, try to find a matching drug by active ingredient
      const matchingDrugIndex = result.findIndex(drug => 
        drug.activeIngredient === newDrug.activeIngredient || 
        drug.activeIngredientEn === newDrug.activeIngredientEn
      );

      if (matchingDrugIndex >= 0) {
        // Add as alternative if not already exists
        const existingAltIndex = result[matchingDrugIndex].alternatives.findIndex(
          alt => alt.id === newDrug.id
        );

        if (existingAltIndex < 0) {
          result[matchingDrugIndex].alternatives.push(newDrug as Alternative);
        } else {
          // Update existing alternative
          result[matchingDrugIndex].alternatives[existingAltIndex] = {
            ...result[matchingDrugIndex].alternatives[existingAltIndex],
            ...newDrug
          };
        }
      } else {
        // Create a new drug entry with this as the main drug
        const newDrugEntry: Drug = {
          ...(newDrug as Alternative),
          alternatives: []
        };
        result.push(newDrugEntry);
        existingIds.add(newDrugEntry.id);
      }
    }
  });

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
    drug.name.toLowerCase().includes(normalizedTerm) ||
    (drug.nameEn && drug.nameEn.toLowerCase().includes(normalizedTerm)) ||
    drug.activeIngredient.toLowerCase().includes(normalizedTerm) ||
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
