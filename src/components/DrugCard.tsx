
import { useContext } from "react";
import { LanguageContext } from "@/App";
import { Drug } from "@/types";
import { calculateSavings } from "@/services/drugService";
import { ShieldCheck, Stethoscope } from "lucide-react";

interface DrugCardProps {
  drug: Drug;
  isMain?: boolean;
}

export default function DrugCard({ drug, isMain = false }: DrugCardProps) {
  const { language } = useContext(LanguageContext);

  // الترجمات حسب اللغة
  const translations = {
    price: language.code === 'ar' ? "السعر" : "Price",
    egp: language.code === 'ar' ? "ج.م" : "EGP",
    save: language.code === 'ar' ? "توفير" : "Save",
    available: language.code === 'ar' ? "متوفر" : "Available",
    unavailable: language.code === 'ar' ? "غير متوفر" : "Unavailable",
    compareTo: language.code === 'ar' ? "بالمقارنة مع" : "compared to",
    origin: language.code === 'ar' ? "المنشأ" : "Origin",
    egyptian: language.code === 'ar' ? "مصري" : "Egyptian",
    activeIngredient: language.code === 'ar' ? "المادة الفعالة" : "Active Ingredient",
    company: language.code === 'ar' ? "الشركة" : "Company"
  };

  const savings = calculateSavings(drug);

  return (
    <div 
      className={`bg-white p-${isMain ? '6' : '5'} rounded-xl shadow-sm border ${isMain ? 'border-pharma-primary/20' : 'border-gray-200'} hover:shadow-md transition-all ${
        drug.isEgyptian ? "egyptian-card" : ""
      }`}
      dir={language.direction}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`${isMain ? 'text-xl' : 'text-lg'} font-semibold text-pharma-primary`}>
            {language.code === 'ar' ? drug.name : (drug.nameEn || drug.name)}
          </h4>
          <p className="text-gray-600 text-sm mt-1">
            {translations.company}: {drug.company}
          </p>
        </div>
        <div className="text-right">
          <div className={`${isMain ? 'text-lg' : 'text-base'} font-bold text-pharma-accent`}>
            {drug.price} {translations.egp}
          </div>
          {savings > 0 && (
            <div className="text-xs text-pharma-save font-medium mt-1">
              {translations.save} {savings}% {translations.compareTo} {drug.alternatives[0]?.name}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-pharma-primary/10 rounded-full flex items-center justify-center mr-2 rtl:ml-2 rtl:mr-0">
            <ShieldCheck size={12} className="text-pharma-primary" />
          </div>
          <span className="text-sm">
            {translations.origin}: {drug.isEgyptian ? translations.egyptian : drug.country}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-pharma-primary/10 rounded-full flex items-center justify-center mr-2 rtl:ml-2 rtl:mr-0">
            <Stethoscope size={12} className="text-pharma-primary" />
          </div>
          <span className="text-sm">
            {translations.activeIngredient}: {language.code === 'ar' 
              ? drug.activeIngredient 
              : (drug.activeIngredientEn || drug.activeIngredient)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span 
          className={`text-xs px-2 py-1 rounded-full ${
            drug.isAvailable 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}
        >
          {drug.isAvailable ? translations.available : translations.unavailable}
        </span>
      </div>
    </div>
  );
}
