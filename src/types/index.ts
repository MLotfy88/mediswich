
export interface Alternative {
  id: string;
  name: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
  isAvailable: boolean;
}

export interface Drug {
  id: string;
  name: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
  isAvailable: boolean;
  alternatives: Alternative[];
}

export interface FilterOptions {
  country: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  availability?: string | null;
}

export interface AppLanguage {
  code: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
}
