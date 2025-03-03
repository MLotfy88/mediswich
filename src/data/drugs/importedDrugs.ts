
import { Drug } from "@/types";
import { convertCSVToDrugs, mergeDrugsWithExisting } from "@/utils/importDrugs";
import { antibiotics } from "./antibiotics";
import { painRelievers } from "./painRelievers";
import { cholesterolLowering } from "./cholesterolLowering";
import { cardiovascular } from "./cardiovascular";
import { psychotropics } from "./psychotropics";
import { hormones } from "./hormones";
import { gastrointestinal } from "./gastrointestinal";
import { antiallergic } from "./antiallergic";
import { antidiabetic } from "./antidiabetic";
import { specialMedications } from "./specialMedications";
import { webTebMedications } from "./webTebMedications";
import { altibbiMedications } from "./altibbiMedications";
import { edaMedications } from "./edaMedications";

// فئة الأدوية المستوردة
export const importedDrugs: Drug[] = [];

// جمع كل الأدوية من جميع المصادر
const getAllExistingDrugs = (): Drug[] => {
  return [
    ...antibiotics,
    ...painRelievers,
    ...cholesterolLowering,
    ...cardiovascular,
    ...psychotropics,
    ...hormones,
    ...gastrointestinal,
    ...antiallergic,
    ...antidiabetic,
    ...specialMedications,
    ...webTebMedications, 
    ...altibbiMedications,
    ...edaMedications,
    ...importedDrugs
  ];
};

/**
 * استيراد الأدوية من ملف CSV وإضافتها إلى مجموعة الأدوية المستوردة
 * @param csvContent محتوى ملف CSV
 * @returns مصفوفة الأدوية المستوردة بعد الإضافة
 */
export const importDrugsFromCSV = (csvContent: string): Drug[] => {
  try {
    console.log("Starting import process");
    // تحويل محتوى CSV إلى أدوية
    const newDrugs = convertCSVToDrugs(csvContent);
    
    if (newDrugs.length === 0) {
      throw new Error("لم يتم العثور على أي أدوية صالحة في الملف");
    }
    
    console.log(`Converted ${newDrugs.length} drugs from CSV`);
    
    // الحصول على جميع الأدوية الموجودة حاليًا
    const allExistingDrugs = getAllExistingDrugs();
    
    // مسح مصفوفة الأدوية المستوردة الحالية
    importedDrugs.length = 0;
    
    // دمج الأدوية الجديدة مع الأدوية الموجودة
    const mergedDrugs = mergeDrugsWithExisting(newDrugs, allExistingDrugs);
    
    // تحديث قائمة الأدوية المستوردة
    newDrugs.forEach(drug => {
      importedDrugs.push(drug);
    });
    
    console.log(`Successfully imported ${importedDrugs.length} drugs`);
    return importedDrugs;
  } catch (error) {
    console.error("حدث خطأ أثناء استيراد البيانات:", error);
    throw error;
  }
};

// تعيين البدائل للأدوية
export const setAlternativesForDrugs = () => {
  const allDrugs = getAllExistingDrugs();
  
  // تحديث البدائل للأدوية المستوردة
  importedDrugs.forEach(drug => {
    // البحث عن الأدوية الأخرى التي تحتوي على نفس المادة الفعالة
    const alternatives = allDrugs.filter(alt => 
      alt.id !== drug.id && 
      alt.activeIngredient.toLowerCase() === drug.activeIngredient.toLowerCase()
    );
    
    if (alternatives.length > 0) {
      drug.alternatives = alternatives.map(alt => ({
        id: alt.id,
        name: alt.name,
        nameEn: alt.nameEn,
        company: alt.company,
        price: alt.price,
        country: alt.country,
        isEgyptian: alt.isEgyptian,
        isAvailable: alt.isAvailable,
        activeIngredient: alt.activeIngredient,
        activeIngredientEn: alt.activeIngredientEn,
        drugType: alt.drugType
      }));
    }
  });
};
