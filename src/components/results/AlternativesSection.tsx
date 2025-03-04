
import { useContext } from "react";
import { Drug } from "@/types";
import { Pill } from "lucide-react";
import { LanguageContext } from "@/App";
import DrugCard from "../DrugCard";

interface AlternativesSectionProps {
  alternatives: Drug[];
}

export default function AlternativesSection({ alternatives }: AlternativesSectionProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    alternatives: language.code === 'ar' ? "البدائل المتاحة" : "Available Alternatives"
  };

  if (alternatives.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 
        className="text-lg font-bold text-pharma-accent mb-4 flex items-center"
        dir={language.direction}
      >
        <Pill className={language.direction === 'rtl' ? 'ml-2' : 'mr-2'} size={18} />
        {translations.alternatives}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alternatives.map((drug) => (
          <DrugCard key={drug.id} drug={drug} />
        ))}
      </div>
    </div>
  );
}
