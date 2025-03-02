
import { Drug } from "@/types";

/**
 * تحويل بيانات الأدوية من CSV إلى تنسيق التطبيق
 * 
 * تنسيق CSV المتوقع:
 * id,name,nameEn,company,price,country,isEgyptian,isAvailable,activeIngredient,activeIngredientEn
 * 
 * مثال:
 * 201,باراسيتامول 500 مج,Paracetamol 500mg,فاركو,10,مصر,true,true,باراسيتامول,Paracetamol
 */
export const convertCSVToDrugs = (csvData: string): Drug[] => {
  const lines = csvData.trim().split("\n");
  const headers = lines[0].split(",");
  
  // التحقق من وجود الحقول الأساسية
  const requiredFields = ["id", "name", "company", "price", "country", "isEgyptian", "isAvailable", "activeIngredient"];
  const missingFields = requiredFields.filter(field => !headers.includes(field));
  
  if (missingFields.length > 0) {
    throw new Error(`حقول مفقودة في ملف CSV: ${missingFields.join(", ")}`);
  }
  
  // تحويل البيانات إلى كائنات أدوية
  const drugs: Drug[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length !== headers.length) continue;
    
    const drug: any = {};
    headers.forEach((header, index) => {
      if (header === "price") {
        drug[header] = parseFloat(values[index]);
      } else if (header === "isEgyptian" || header === "isAvailable") {
        drug[header] = values[index].toLowerCase() === "true";
      } else {
        drug[header] = values[index];
      }
    });
    
    // إضافة مصفوفة البدائل الفارغة إذا لم تكن موجودة
    drug.alternatives = drug.alternatives || [];
    
    drugs.push(drug);
  }
  
  return drugs;
};

/**
 * تحويل بيانات JSON إلى تنسيق التطبيق
 */
export const convertJSONToDrugs = (jsonData: string): Drug[] => {
  try {
    const parsedData = JSON.parse(jsonData);
    
    // التحقق مما إذا كانت البيانات مصفوفة
    if (!Array.isArray(parsedData)) {
      throw new Error("البيانات المقدمة ليست مصفوفة");
    }
    
    // التحقق من وجود الحقول المطلوبة في كل عنصر
    const requiredFields = ["id", "name", "company", "price", "country", "isEgyptian", "isAvailable", "activeIngredient"];
    
    parsedData.forEach((item, index) => {
      const missingFields = requiredFields.filter(field => !Object.keys(item).includes(field));
      if (missingFields.length > 0) {
        throw new Error(`حقول مفقودة في العنصر رقم ${index}: ${missingFields.join(", ")}`);
      }
      
      // التأكد من أن لدينا مصفوفة بدائل
      if (!item.alternatives) {
        item.alternatives = [];
      }
    });
    
    return parsedData;
  } catch (error) {
    console.error("خطأ في تحليل بيانات JSON:", error);
    throw error;
  }
};

/**
 * دمج الأدوية المستوردة مع قاعدة البيانات الحالية
 */
export const mergeDrugsWithExisting = (importedDrugs: Drug[], existingDrugs: Drug[]): Drug[] => {
  const existingIds = new Set(existingDrugs.map(drug => drug.id));
  const mergedDrugs = [...existingDrugs];
  
  // إضافة الأدوية الجديدة فقط (التي ليس لها معرف موجود بالفعل)
  importedDrugs.forEach(drug => {
    if (!existingIds.has(drug.id)) {
      mergedDrugs.push(drug);
    }
  });
  
  return mergedDrugs;
};

/**
 * مساعد لتصدير البيانات بتنسيق TypeScript
 */
export const generateTypeScriptDrugFile = (drugs: Drug[], categoryName: string): string => {
  return `
import { Drug } from "@/types";

// فئة ${categoryName}
export const ${categoryName.toLowerCase()}: Drug[] = ${JSON.stringify(drugs, null, 2)};
`;
};

