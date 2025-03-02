
import { Drug } from "@/types";
import { convertCSVToDrugs } from "@/utils/importDrugs";

// فئة الأدوية المستوردة
export const importedDrugs: Drug[] = [];

/**
 * استيراد الأدوية من ملف CSV وإضافتها إلى مجموعة الأدوية المستوردة
 * @param csvContent محتوى ملف CSV
 * @returns مصفوفة الأدوية المستوردة بعد الإضافة
 */
export const importDrugsFromCSV = (csvContent: string): Drug[] => {
  try {
    // تحويل محتوى CSV إلى أدوية
    const drugs = convertCSVToDrugs(csvContent);
    
    // إضافة الأدوية الجديدة إلى المصفوفة
    // استخدام Set للحصول على معرفات فريدة وتجنب التكرار
    const existingIds = new Set(importedDrugs.map(drug => drug.id));
    
    // إضافة الأدوية الجديدة فقط
    drugs.forEach(drug => {
      if (!existingIds.has(drug.id)) {
        importedDrugs.push(drug);
      }
    });
    
    console.log(`تم استيراد ${drugs.length} دواء من ملف CSV`);
    return importedDrugs;
  } catch (error) {
    console.error("حدث خطأ أثناء استيراد البيانات:", error);
    throw error;
  }
};

