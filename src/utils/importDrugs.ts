
import { Drug } from "@/types";
import { v4 as uuidv4 } from 'uuid';

/**
 * تحويل بيانات الأدوية من CSV إلى تنسيق التطبيق
 * 
 * تنسيق CSV المتوقع:
 * اسم المنتج,Product Name,المادة الفعالة,Active Ingredient,نوع الدواء,بلد المنشأ,الشركة المصنعة,السعر (EGP)
 */
export const convertCSVToDrugs = (csvData: string): Drug[] => {
  console.log("Processing CSV data:", csvData.substring(0, 100) + "...");
  const lines = csvData.trim().split("\n");
  
  // تحويل البيانات إلى كائنات أدوية
  const drugs: Drug[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(",");
      if (values.length < 8) {
        console.warn(`Skipping line ${i}: insufficient data (${values.length} columns)`, values);
        continue; // تخطي الصفوف التي لا تحتوي على البيانات الكاملة
      }
      
      // ترتيب البيانات حسب التنسيق الجديد
      const name = values[0].trim();
      const nameEn = values[1].trim();
      const activeIngredient = values[2].trim();
      const activeIngredientEn = values[3].trim();
      const drugType = values[4].trim(); // نوع الدواء
      const country = values[5].trim();
      const company = values[6].trim();
      const priceStr = values[7].trim().replace("EGP", "").replace(" ", "");
      const price = parseFloat(priceStr);
      
      if (!name || isNaN(price)) {
        console.warn(`Skipping line ${i}: invalid name or price`, { name, price: priceStr });
        continue; // تخطي الصفوف بدون اسم أو سعر صالح
      }
      
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
        drugType,
        alternatives: [] // بدون بدائل في البداية
      };
      
      drugs.push(drug);
      console.log(`Processed drug: ${name}, Price: ${price}`);
    } catch (error) {
      console.error(`خطأ في سطر ${i}:`, error);
      // استمر في المعالجة رغم الأخطاء في بعض السطور
    }
  }
  
  console.log(`Processed ${drugs.length} drugs from CSV`);
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
 * محدث ليقوم بتحديث الأدوية الموجودة وإضافة الجديدة
 */
export const mergeDrugsWithExisting = (importedDrugs: Drug[], existingDrugs: Drug[]): Drug[] => {
  const mergedDrugs = [...existingDrugs];
  const existingDrugMap = new Map<string, number>();
  
  // إنشاء خريطة للأدوية الموجودة
  existingDrugs.forEach((drug, index) => {
    existingDrugMap.set(drug.name.toLowerCase(), index);
    // إضافة البحث بالاسم الإنجليزي أيضًا إذا كان موجودًا
    if (drug.nameEn) {
      existingDrugMap.set(drug.nameEn.toLowerCase(), index);
    }
  });
  
  // تحديث الأدوية الموجودة وإضافة الجديدة
  importedDrugs.forEach(newDrug => {
    // البحث عن الدواء في القاعدة الحالية
    const existingIndexByName = existingDrugMap.get(newDrug.name.toLowerCase());
    const existingIndexByNameEn = newDrug.nameEn ? existingDrugMap.get(newDrug.nameEn.toLowerCase()) : undefined;
    const existingIndex = existingIndexByName !== undefined ? existingIndexByName : existingIndexByNameEn;
    
    if (existingIndex !== undefined) {
      // تحديث الدواء الموجود مع الاحتفاظ بالبدائل
      const existingAlternatives = mergedDrugs[existingIndex].alternatives;
      mergedDrugs[existingIndex] = {
        ...newDrug,
        id: mergedDrugs[existingIndex].id, // الاحتفاظ بالمعرف الأصلي
        alternatives: existingAlternatives // الاحتفاظ بالبدائل
      };
      console.log(`Updated existing drug: ${newDrug.name}`);
    } else {
      // إضافة دواء جديد
      mergedDrugs.push(newDrug);
      console.log(`Added new drug: ${newDrug.name}`);
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
