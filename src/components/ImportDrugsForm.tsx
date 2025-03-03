
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { importDrugsFromCSV } from "@/data/drugs/importedDrugs";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, FileText } from "lucide-react";

export default function ImportDrugsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // حفظ اسم الملف المحدد للعرض
    setSelectedFile(file);
  };
  
  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        title: "لم يتم اختيار ملف",
        description: "الرجاء اختيار ملف CSV أولاً",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // قراءة محتوى الملف
      const content = await selectedFile.text();
      console.log("Imported CSV content (first 100 chars):", content.substring(0, 100) + "...");
      
      // استدعاء وظيفة الاستيراد
      const importedDrugs = importDrugsFromCSV(content);
      
      toast({
        title: "تم الاستيراد بنجاح",
        description: `تم استيراد ${importedDrugs.length} دواء إلى قاعدة البيانات`,
        variant: "default",
      });
      
      // إعادة تعيين الملف المحدد بعد النجاح
      setSelectedFile(null);
      
    } catch (error) {
      console.error("خطأ في استيراد البيانات:", error);
      toast({
        title: "فشل الاستيراد",
        description: `حدث خطأ أثناء استيراد البيانات: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          اسم المنتج,Product Name,المادة الفعالة,Active Ingredient,نوع الدواء,بلد المنشأ,الشركة المصنعة,السعر (EGP)
        </p>
        
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
              className={`flex items-center py-2 px-4 rounded-md text-white font-medium cursor-pointer bg-pharma-primary hover:bg-pharma-primary/90 transition-colors
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <FileText className="ml-2 rtl:mr-2 rtl:ml-0" size={18} />
              اختر ملف CSV
            </label>
          </div>
          
          {/* عرض اسم الملف المحدد */}
          {selectedFile && (
            <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md flex items-center">
              <FileText className="ml-2 text-gray-500" size={16} />
              الملف المحدد: {selectedFile.name}
            </div>
          )}
          
          {/* زر رفع الملف */}
          <Button
            onClick={handleImport}
            disabled={!selectedFile || isLoading}
            className="bg-pharma-primary hover:bg-pharma-primary/90 w-full flex items-center justify-center"
          >
            <UploadCloud className="ml-2 rtl:mr-2 rtl:ml-0" size={18} />
            {isLoading ? "جاري الاستيراد..." : "رفع الملف وتحديث البيانات"}
          </Button>
        </div>
      </div>
    </div>
  );
}
