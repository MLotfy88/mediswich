
import { useState, useEffect, useContext } from "react";
import { FilterOptions, AppLanguage } from "@/types";
import { LanguageContext } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function FilterPanel({ 
  onFilterChange, 
  onClose,
  isVisible = true 
}: FilterPanelProps) {
  const { language } = useContext(LanguageContext);
  const [country, setCountry] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [availability, setAvailability] = useState<string | null>(null);

  // الترجمات حسب اللغة
  const translations = {
    filters: language.code === 'ar' ? "تصفية النتائج" : "Filter Results",
    origin: language.code === 'ar' ? "مصدر الدواء" : "Medication Origin",
    all: language.code === 'ar' ? "الكل" : "All",
    egyptian: language.code === 'ar' ? "مصري" : "Egyptian",
    international: language.code === 'ar' ? "عالمي" : "International",
    priceRange: language.code === 'ar' ? "نطاق السعر" : "Price Range",
    minPrice: language.code === 'ar' ? "السعر الأدنى" : "Min Price",
    maxPrice: language.code === 'ar' ? "السعر الأقصى" : "Max Price",
    availability: language.code === 'ar' ? "التوافر" : "Availability",
    available: language.code === 'ar' ? "متوفر" : "Available",
    unavailable: language.code === 'ar' ? "غير متوفر" : "Unavailable",
    applyFilters: language.code === 'ar' ? "تطبيق الفلاتر" : "Apply Filters",
    resetFilters: language.code === 'ar' ? "إعادة تعيين" : "Reset Filters",
    close: language.code === 'ar' ? "إغلاق" : "Close"
  };

  // تحديث الفلاتر عند تغيير أي منها
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
        {/* فلتر البلد */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {translations.origin}
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="country"
                checked={country === null}
                onChange={() => setCountry(null)}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.all}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="country"
                checked={country === "egyptian"}
                onChange={() => setCountry("egyptian")}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.egyptian}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="country"
                checked={country === "international"}
                onChange={() => setCountry("international")}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.international}</span>
            </label>
          </div>
        </div>
        
        {/* فلتر السعر */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {translations.priceRange}
          </h4>
          <form onSubmit={handlePriceFilter} className="space-y-3">
            <div>
              <label className="sr-only">{translations.minPrice}</label>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
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
                onChange={(e) => setMaxPrice(e.target.value)}
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
        
        {/* فلتر التوافر */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {translations.availability}
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="availability"
                checked={availability === null}
                onChange={() => setAvailability(null)}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.all}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="availability"
                checked={availability === "available"}
                onChange={() => setAvailability("available")}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.available}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="radio"
                name="availability"
                checked={availability === "unavailable"}
                onChange={() => setAvailability("unavailable")}
                className="text-pharma-primary focus:ring-pharma-primary"
              />
              <span>{translations.unavailable}</span>
            </label>
          </div>
        </div>
        
        {/* زر إعادة التعيين */}
        <div className="pt-2">
          <Button
            onClick={resetFilters}
            className="w-full text-sm bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            {translations.resetFilters}
          </Button>
        </div>
      </div>
    </div>
  );
}
