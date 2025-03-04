
import { useState, useEffect, useContext } from "react";
import { FilterOptions, Drug } from "@/types";
import { LanguageContext } from "@/App";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OriginFilter } from "./filters/OriginFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { AvailabilityFilter } from "./filters/AvailabilityFilter";
import { FilterActions } from "./filters/FilterActions";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  isVisible?: boolean;
  drugs?: Drug[];
}

export default function FilterPanel({ 
  onFilterChange, 
  onClose,
  isVisible = true,
  drugs
}: FilterPanelProps) {
  const { language } = useContext(LanguageContext);
  const [country, setCountry] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [availability, setAvailability] = useState<string | null>(null);

  const translations = {
    filters: language.code === 'ar' ? "تصفية النتائج" : "Filter Results",
    close: language.code === 'ar' ? "إغلاق" : "Close"
  };

  useEffect(() => {
    applyFilters();
  }, [country, availability]);

  const applyFilters = () => {
    onFilterChange({
      country,
      priceRange: {
        min: minPrice ? Number(minPrice) : null,
        max: maxPrice ? Number(maxPrice) : null,
      },
      availability,
    });
  };

  const resetFilters = () => {
    setCountry(null);
    setMinPrice("");
    setMaxPrice("");
    setAvailability(null);
    
    onFilterChange({
      country: null,
      priceRange: {
        min: null,
        max: null,
      },
      availability: null,
    });
  };

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-border relative" 
      dir={language.direction}
    >
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 rtl:left-2 rtl:right-auto" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <h3 className="text-lg font-semibold text-pharma-primary mb-6">
        {translations.filters}
      </h3>
      
      <div className="space-y-6">
        <OriginFilter 
          country={country} 
          onChange={setCountry} 
        />
        
        <PriceRangeFilter 
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onApply={handlePriceFilter}
        />
        
        <AvailabilityFilter 
          availability={availability} 
          onChange={setAvailability} 
        />
        
        <FilterActions onReset={resetFilters} />
      </div>
    </div>
  );
}
