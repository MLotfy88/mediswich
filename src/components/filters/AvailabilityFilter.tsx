
import { useContext } from "react";
import { LanguageContext } from "@/App";

interface AvailabilityFilterProps {
  availability: string | null;
  onChange: (availability: string | null) => void;
}

export function AvailabilityFilter({ availability, onChange }: AvailabilityFilterProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    availability: language.code === 'ar' ? "التوافر" : "Availability",
    all: language.code === 'ar' ? "الكل" : "All",
    available: language.code === 'ar' ? "متوفر" : "Available",
    unavailable: language.code === 'ar' ? "غير متوفر" : "Unavailable",
  };

  return (
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
            onChange={() => onChange(null)}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.all}</span>
        </label>
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="availability"
            checked={availability === "available"}
            onChange={() => onChange("available")}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.available}</span>
        </label>
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="availability"
            checked={availability === "unavailable"}
            onChange={() => onChange("unavailable")}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.unavailable}</span>
        </label>
      </div>
    </div>
  );
}
