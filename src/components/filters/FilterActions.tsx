
import { useContext } from "react";
import { LanguageContext } from "@/App";
import { Button } from "@/components/ui/button";

interface FilterActionsProps {
  onReset: () => void;
}

export function FilterActions({ onReset }: FilterActionsProps) {
  const { language } = useContext(LanguageContext);
  
  const translations = {
    resetFilters: language.code === 'ar' ? "إعادة تعيين" : "Reset Filters",
  };

  return (
    <div className="pt-2">
      <Button
        onClick={onReset}
        className="w-full text-sm bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
      >
        {translations.resetFilters}
      </Button>
    </div>
  );
}
