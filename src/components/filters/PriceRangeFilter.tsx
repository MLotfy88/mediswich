
import { useContext } from "react";
import { LanguageContext } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onApply: (e: React.FormEvent) => void;
}

export function PriceRangeFilter({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange,
  onApply 
}: PriceRangeFilterProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    priceRange: language.code === 'ar' ? "نطاق السعر" : "Price Range",
    minPrice: language.code === 'ar' ? "السعر الأدنى" : "Min Price",
    maxPrice: language.code === 'ar' ? "السعر الأقصى" : "Max Price",
    applyFilters: language.code === 'ar' ? "تطبيق الفلاتر" : "Apply Filters",
  };

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        {translations.priceRange}
      </h4>
      <form onSubmit={onApply} className="space-y-3">
        <div>
          <label className="sr-only">{translations.minPrice}</label>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder={translations.minPrice}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
            min="0"
          />
        </div>
        <div>
          <label className="sr-only">{translations.maxPrice}</label>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder={translations.maxPrice}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
            min="0"
          />
        </div>
        <Button
          type="submit"
          className="w-full text-sm bg-pharma-primary/10 text-pharma-primary py-2 px-3 rounded-md hover:bg-pharma-primary/20 transition-colors"
        >
          {translations.applyFilters}
        </Button>
      </form>
    </div>
  );
}
