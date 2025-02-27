
import { Drug } from "@/types";
import { calculateSavings } from "@/services/drugService";
import { Separator } from "@/components/ui/separator";
import { Flag } from "lucide-react";

interface DrugCardProps {
  drug: Drug;
  showAlternatives?: boolean;
}

export default function DrugCard({ drug, showAlternatives = true }: DrugCardProps) {
  const savings = calculateSavings(drug);
  
  return (
    <div 
      className={`bg-pharma-card rounded-xl shadow-sm overflow-hidden card-hover ${
        drug.isEgyptian ? "egyptian-card" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium text-gray-900 flex items-center" dir="rtl">
            {drug.name}
            {drug.isEgyptian && (
              <span className="mr-2 inline-flex items-center text-pharma-accent">
                <Flag size={16} className="ml-1" />
                <span className="text-xs">مصري</span>
              </span>
            )}
          </h3>
          
          {savings > 0 && (
            <span className="bg-pharma-save/10 text-pharma-save px-2 py-1 rounded-md text-sm font-medium">
              وفر {savings}%
            </span>
          )}
        </div>
        
        <div className="mt-3 flex justify-between" dir="rtl">
          <span className="text-sm text-gray-600">الشركة: {drug.company}</span>
          <span className="text-sm text-gray-600">البلد: {drug.country}</span>
        </div>
        
        <div className="mt-2" dir="rtl">
          <span className="text-lg font-medium text-pharma-primary">{drug.price} جنيه</span>
        </div>
      </div>
      
      {showAlternatives && drug.alternatives.length > 0 && (
        <>
          <Separator />
          <div className="p-4 bg-pharma-secondary/50">
            <h4 className="text-sm font-medium text-gray-700 mb-3" dir="rtl">البدائل المتاحة:</h4>
            <div className="space-y-3">
              {drug.alternatives.map((alt) => (
                <div key={alt.id} className="rounded-lg p-3 bg-white" dir="rtl">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-800 flex items-center">
                      {alt.name}
                      {alt.isEgyptian && (
                        <span className="mr-1 inline-flex items-center text-pharma-accent">
                          <Flag size={12} className="ml-1" />
                          <span className="text-xs">مصري</span>
                        </span>
                      )}
                    </h5>
                    <span className="text-sm font-medium">
                      {alt.price} جنيه
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>الشركة: {alt.company}</span>
                    <span>البلد: {alt.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
