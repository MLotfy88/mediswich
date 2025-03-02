
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { importDrugsFromCSV } from "@/data/drugs/importedDrugs";
import { useToast } from "@/hooks/use-toast";

export default function ImportDrugsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      // قراءة محتوى الملف
      const content = await file.text();
      
      // استدعاء وظيفة الاستيراد
      const importedDrugs = importDrugsFromCSV(content);
      
      toast({
        title: "تم الاستيراد بنجاح",
        description: `تم استيراد ${importedDrugs.length} دواء إلى قاعدة البيانات`,
        variant: "default",
      });
      
    } catch (error) {
      console.error("خطأ في استيراد البيانات:", error);
      toast({
        title: "فشل الاستيراد",
        description: `حدث خطأ أثناء استيراد البيانات: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      
      // إعادة تعيين حقل الملف
      if (event.target) {
        event.target.value = "";
      }
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4" dir="rtl">استيراد بيانات الأدوية</h3>
      
      <div className="space-y-4" dir="rtl">
        <p className="text-sm text-gray-600">
          قم بتحميل ملف CSV يحتوي على بيانات الأدوية لإضافتها إلى قاعدة البيانات.
        </p>
        
        <p className="text-xs text-gray-500">
          تنسيق CSV المتوقع: <br />
          id,name,nameEn,company,price,country,isEgyptian,isAvailable,activeIngredient,activeIngredientEn
        </p>
        
        <div className="flex items-center space-x-2">
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
          <label
            htmlFor="csvFile"
            className={`py-2 px-4 rounded-md text-white font-medium cursor-pointer bg-pharma-primary hover:bg-pharma-primary/90 transition-colors
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "جاري الاستيراد..." : "اختر ملف CSV"}
          </label>
        </div>
      </div>
    </div>
  );
}
