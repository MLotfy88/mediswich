
export interface Alternative {
  id: string;
  name: string;
  nameEn?: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
  isAvailable: boolean;
  activeIngredient: string;
  activeIngredientEn?: string;
  drugType?: string;
  manufacturer?: string;
}

export interface Drug {
  id: string;
  name: string;
  nameEn?: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
  isAvailable: boolean;
  activeIngredient: string;
  activeIngredientEn?: string;
  drugType?: string;
  manufacturer?: string;
  alternatives: Alternative[];
}

export interface FilterOptions {
  country: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  availability?: string | null;
  drugType?: string | null;
}

export interface AppLanguage {
  code: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
}

export interface DosageCalculation {
  patientWeight: number;
  weightUnit: 'kg' | 'lb';
  drugName: string;
  dosagePerKg: number;
  frequency: number;
  duration: number;
}

export interface EquivalentDosage {
  drugA: {
    name: string;
    dosage: number;
    unit: string;
  };
  drugB: {
    name: string;
    dosage: number;
    unit: string;
  };
  conversionRatio: number;
}

export interface DrugSuggestion {
  id: string;
  name: string;
  nameEn?: string;
  nameInOtherLanguage?: string;
  activeIngredient: string;
  activeIngredientEn?: string;
}

export interface SearchQuery {
  term: string;
  by: 'name' | 'activeIngredient' | 'all';
}
