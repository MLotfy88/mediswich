
import { useContext } from "react";
import { Drug } from "@/types";
import { Pill } from "lucide-react";
import { LanguageContext } from "@/App";
import DrugCard from "../DrugCard";

interface MainDrugSectionProps {
  mainDrug: Drug;
}

export default function MainDrugSection({ mainDrug }: MainDrugSectionProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    mainDrug: language.code === 'ar' ? "الدواء الرئيسي" : "Main Drug"
  };

  return (
    <div className="mb-8">
      <h3 
        className="text-lg font-bold text-pharma-primary mb-4 flex items-center"
        dir={language.direction}
      >
        <Pill className={language.direction === 'rtl' ? 'ml-2' : 'mr-2'} size={18} />
        {translations.mainDrug}
      </h3>
      
      <DrugCard drug={mainDrug} isMain={true} />
    </div>
  );
}
