import { Drug } from "@/types";
import { v4 as uuidv4 } from 'uuid';

/**
 * تحويل بيانات الأدوية من CSV إلى تنسيق التطبيق
 * 
 * تنسيق CSV المتوقع:
 * اسم المنتج,Product Name,المادة الفعالة,Active Ingredient,نوع الدواء,بلد المنشأ,الشركة المصنعة,السعر (EGP)
 */
export const convertCSVToDrugs = (csvData: string): Drug[] => {
  const lines = csvData.trim().split("\n");
  
  // تحويل البيانات إلى كائنات أدوية
  const drugs: Drug[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(",");
      if (values.length < 8) continue; // تخطي الصفوف التي لا تحتوي على البيانات الكاملة
      
      // ترتيب البيانات حسب التنسيق الجديد
      const name = values[0].trim();
      const nameEn = values[1].trim();
      const activeIngredient = values[2].trim();
      const activeIngredientEn = values[3].trim();
      const drugType = values[4].trim(); // نوع الدواء (نحفظه لمعلومات إضافية)
      const country = values[5].trim();
      const company = values[6].trim();
      const priceStr = values[7].trim().replace("EGP", "").replace(" ", "");
      const price = parseFloat(priceStr);
      
      if (!name || isNaN(price)) continue; // تخطي الصفوف بدون اسم أو سعر صالح
      
      // إنشاء معرف فريد للدواء الجديد
      const id = uuidv4();
      
      // تحديد ما إذا كان الدواء مصري
      const isEgyptian = country.includes("مصر") || country.toLowerCase().includes("egypt");
      
      // إنشاء كائن الدواء
      const drug: Drug = {
        id,
        name,
        nameEn,
        company,
        price: isNaN(price) ? 0 : price,
        country,
        isEgyptian,
        isAvailable: true, // نفترض أنه متاح افتراضيًا
        activeIngredient,
        activeIngredientEn,
        alternatives: [] // بدون بدائل في البداية
      };
      
      drugs.push(drug);
    } catch (error) {
      console.error(`خطأ في سطر ${i}:`, error);
      // استمر في المعالجة رغم الأخطاء في بعض السطور
    }
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
