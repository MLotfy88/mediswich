
import { useState, useContext } from "react";
import { LanguageContext } from "@/App";

interface OriginFilterProps {
  country: string | null;
  onChange: (country: string | null) => void;
}

export function OriginFilter({ country, onChange }: OriginFilterProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    origin: language.code === 'ar' ? "مصدر الدواء" : "Medication Origin",
    all: language.code === 'ar' ? "الكل" : "All",
    egyptian: language.code === 'ar' ? "مصري" : "Egyptian",
    international: language.code === 'ar' ? "عالمي" : "International",
  };

  return (
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
            onChange={() => onChange(null)}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.all}</span>
        </label>
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="country"
            checked={country === "egyptian"}
            onChange={() => onChange("egyptian")}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.egyptian}</span>
        </label>
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="country"
            checked={country === "international"}
            onChange={() => onChange("international")}
            className="text-pharma-primary focus:ring-pharma-primary"
          />
          <span>{translations.international}</span>
        </label>
      </div>
    </div>
  );
}
