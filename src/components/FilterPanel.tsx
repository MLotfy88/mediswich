
import { useState, useEffect } from "react";
import { FilterOptions, AppLanguage } from "@/types";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentLanguage?: AppLanguage;
}

export default function FilterPanel({ onFilterChange, currentLanguage = { code: 'ar', direction: 'rtl' } }: FilterPanelProps) {
  const [country, setCountry] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [availability, setAvailability] = useState<string | null>(null);

  // الترجمات حسب اللغة
  const translations = {
    filters: currentLanguage.code === 'ar' ? "تصفية النتائج" : "Filter Results",
    origin: currentLanguage.code === 'ar' ? "مصدر الدواء" : "Medication Origin",
    all: currentLanguage.code === 'ar' ? "الكل" : "All",
    egyptian: currentLanguage.code === 'ar' ? "مصري" : "Egyptian",
    international: currentLanguage.code === 'ar' ? "عالمي" : "International",
    priceRange: currentLanguage.code === 'ar' ? "نطاق السعر" : "Price Range",
    minPrice: currentLanguage.code === 'ar' ? "السعر الأدنى" : "Min Price",
    maxPrice: currentLanguage.code === 'ar' ? "السعر الأقصى" : "Max Price",
    availability: currentLanguage.code === 'ar' ? "التوافر" : "Availability",
    available: currentLanguage.code === 'ar' ? "متوفر" : "Available",
    unavailable: currentLanguage.code === 'ar' ? "غير متوفر" : "Unavailable",
    applyFilters: currentLanguage.code === 'ar' ? "تطبيق الفلاتر" : "Apply Filters",
    resetFilters: currentLanguage.code === 'ar' ? "إعادة تعيين" : "Reset Filters"
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

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-border" 
      dir={currentLanguage.direction}
    >
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
              <input
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
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={translations.maxPrice}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
                min="0"
              />
            </div>
            <button
              type="submit"
              className="w-full text-sm bg-pharma-primary/10 text-pharma-primary py-2 px-3 rounded-md hover:bg-pharma-primary/20 transition-colors"
            >
              {translations.applyFilters}
            </button>
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
          <button
            onClick={resetFilters}
            className="w-full text-sm bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            {translations.resetFilters}
          </button>
        </div>
      </div>
    </div>
  );
}
