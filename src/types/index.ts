
export interface Alternative {
  id: string;
  name: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
}

export interface Drug {
  id: string;
  name: string;
  company: string;
  price: number;
  country: string;
  isEgyptian: boolean;
  alternatives: Alternative[];
}

export interface FilterOptions {
  country: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
}
