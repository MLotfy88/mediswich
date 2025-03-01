
import { Drug } from "@/types";
import { painRelievers } from "./drugs/painRelievers";
import { antibiotics } from "./drugs/antibiotics";
import { cardiovascular } from "./drugs/cardiovascular";
import { antiallergic } from "./drugs/antiallergic";
import { antidiabetic } from "./drugs/antidiabetic";
import { gastrointestinal } from "./drugs/gastrointestinal";
import { cholesterolLowering } from "./drugs/cholesterolLowering";
import { psychotropics } from "./drugs/psychotropics";
import { hormones } from "./drugs/hormones";
import { specialMedications } from "./drugs/specialMedications";
import { altibbiMedications } from "./drugs/altibbiMedications";
import { webTebMedications } from "./drugs/webTebMedications";
import { edaMedications } from "./drugs/edaMedications";

// إضافة بيانات الترجمات الإنجليزية للأدوية
// Add English translations for all medications
export const englishTranslations: Record<string, { name: string, activeIngredient: string, company?: string, country?: string }> = {
  // Pain relievers / مسكنات الألم
  "باراسيتامول": { name: "Paracetamol", activeIngredient: "Paracetamol" },
  "بانادول أزرق": { name: "Panadol Blue", activeIngredient: "Paracetamol" },
  "فيفادول": { name: "Fevadol", activeIngredient: "Paracetamol" },
  "ديكلوفيناك": { name: "Diclofenac", activeIngredient: "Diclofenac" },
  "كاتافلام": { name: "Cataflam", activeIngredient: "Diclofenac" },
  "فولتارين": { name: "Voltaren", activeIngredient: "Diclofenac" },
  "إيبوبروفين": { name: "Ibuprofen", activeIngredient: "Ibuprofen" },
  "أدفيل": { name: "Advil", activeIngredient: "Ibuprofen" },
  "بروفين": { name: "Brufen", activeIngredient: "Ibuprofen" },
  "أسبرين": { name: "Aspirin", activeIngredient: "Acetylsalicylic acid" },
  "جويك": { name: "Jusprin", activeIngredient: "Acetylsalicylic acid" },
  "أسبوكيد": { name: "Aspocid", activeIngredient: "Acetylsalicylic acid" },
  
  // Antibiotics / المضادات الحيوية
  "أموكسيسيللين": { name: "Amoxicillin", activeIngredient: "Amoxicillin" },
  "أوجمنتين": { name: "Augmentin", activeIngredient: "Amoxicillin/Clavulanate" },
  "هيكساموكس": { name: "Hexamox", activeIngredient: "Amoxicillin" },
  "أزيثروميسين": { name: "Azithromycin", activeIngredient: "Azithromycin" },
  "زيثروماكس": { name: "Zithromax", activeIngredient: "Azithromycin" },
  "أزيثرال": { name: "Azithral", activeIngredient: "Azithromycin" },
  "سيبروفلوكساسين": { name: "Ciprofloxacin", activeIngredient: "Ciprofloxacin" },
  "سيبروباي": { name: "Ciprobay", activeIngredient: "Ciprofloxacin" },
  "سيفروتيك": { name: "Ciprotic", activeIngredient: "Ciprofloxacin" },
  "دوكسيسيكلين": { name: "Doxycycline", activeIngredient: "Doxycycline" },
  "فيبراميسين": { name: "Vibramycin", activeIngredient: "Doxycycline" },
  "دوكسيتاب": { name: "Doxitab", activeIngredient: "Doxycycline" },
  "أوجمنتين 1g": { name: "Augmentin 1g", activeIngredient: "Amoxicillin/Clavulanate" },
  "ميجاموكس": { name: "Megamox", activeIngredient: "Amoxicillin/Clavulanate" },
  "كلافوكسين": { name: "Clavoxin", activeIngredient: "Amoxicillin/Clavulanate" },
  "سيفترياكسون": { name: "Ceftriaxone", activeIngredient: "Ceftriaxone" },
  "سيفازون": { name: "Cefazone", activeIngredient: "Ceftriaxone" },
  "لونجاسيف": { name: "Longacef", activeIngredient: "Ceftriaxone" },
  
  // Cardiovascular / أدوية القلب والأوعية الدموية
  "ليزينوبريل": { name: "Lisinopril", activeIngredient: "Lisinopril" },
  "زيستريل": { name: "Zestril", activeIngredient: "Lisinopril" },
  "ليزينوبريل مصري": { name: "Lisinopril Egyptian", activeIngredient: "Lisinopril" },
  "أملوديبين": { name: "Amlodipine", activeIngredient: "Amlodipine" },
  "نورفاسك": { name: "Norvasc", activeIngredient: "Amlodipine" },
  "فازوكور": { name: "Vasocor", activeIngredient: "Amlodipine" },
  "كونكور": { name: "Concor", activeIngredient: "Bisoprolol" },
  "بيسوكور": { name: "Bisocor", activeIngredient: "Bisoprolol" },
  "بيسوبرولول": { name: "Bisoprolol", activeIngredient: "Bisoprolol" },
  "أتينولول": { name: "Atenolol", activeIngredient: "Atenolol" },
  "تينورمين": { name: "Tenormin", activeIngredient: "Atenolol" },
  "أتينول": { name: "Atenol", activeIngredient: "Atenolol" },
  "إناللدوم": { name: "Enaldom", activeIngredient: "Enalapril" },
  "رينيتك": { name: "Renitec", activeIngredient: "Enalapril" },
  "إنابريل": { name: "Enapril", activeIngredient: "Enalapril" },
  
  // Antiallergics / مضادات الحساسية
  "لوراتادين": { name: "Loratadine", activeIngredient: "Loratadine" },
  "كلاريتين": { name: "Claritine", activeIngredient: "Loratadine" },
  "هيستازين": { name: "Histazine", activeIngredient: "Loratadine" },
  "سيتيريزين": { name: "Cetirizine", activeIngredient: "Cetirizine" },
  "زيرتك": { name: "Zyrtec", activeIngredient: "Cetirizine" },
  "أليرتيك": { name: "Allertec", activeIngredient: "Cetirizine" },
  "كلورفينيرامين": { name: "Chlorpheniramine", activeIngredient: "Chlorpheniramine" },
  "بيريتون": { name: "Piriton", activeIngredient: "Chlorpheniramine" },
  "هيستوب": { name: "Histop", activeIngredient: "Chlorpheniramine" },
  "ديسلوراتادين": { name: "Desloratadine", activeIngredient: "Desloratadine" },
  "إيريوس": { name: "Aerius", activeIngredient: "Desloratadine" },
  "ديزالير": { name: "Desalir", activeIngredient: "Desloratadine" },
  
  // Antidiabetics / أدوية السكري
  "ميتفورمين": { name: "Metformin", activeIngredient: "Metformin" },
  "جلوكوفاج": { name: "Glucophage", activeIngredient: "Metformin" },
  "ديابيتكس": { name: "Diabetex", activeIngredient: "Metformin" },
  "ديمرا": { name: "Dimra", activeIngredient: "Glimepiride" },
  "ميثالورا": { name: "Methalora", activeIngredient: "Glimepiride" },
  "لوراميث": { name: "Lorameth", activeIngredient: "Glimepiride" },
  "إنسولين لانتوس": { name: "Insulin Lantus", activeIngredient: "Insulin Glargine" },
  "توجيو": { name: "Toujeo", activeIngredient: "Insulin Glargine" },
  "باسل إنسولين": { name: "Basel Insulin", activeIngredient: "Insulin Glargine" },
  "جانوفيا": { name: "Januvia", activeIngredient: "Sitagliptin" },
  "جوبتا": { name: "Jupta", activeIngredient: "Sitagliptin" },
  "سيتاجليب": { name: "Sitaglip", activeIngredient: "Sitagliptin" },
  
  // Gastrointestinal / أدوية الجهاز الهضمي
  "أومبيرازول": { name: "Omeprazole", activeIngredient: "Omeprazole" },
  "بريلوسيك": { name: "Prilosec", activeIngredient: "Omeprazole" },
  "نيكسيوم": { name: "Nexium", activeIngredient: "Esomeprazole" },
  "ميبيفيرين": { name: "Mebeverine", activeIngredient: "Mebeverine" },
  "دوسباتالين": { name: "Duspatalin", activeIngredient: "Mebeverine" },
  "كولوفيرين": { name: "Coloferin", activeIngredient: "Mebeverine" },
  "رانيتيدين": { name: "Ranitidine", activeIngredient: "Ranitidine" },
  "زانتاك": { name: "Zantac", activeIngredient: "Ranitidine" },
  "رانتيدول": { name: "Rantidol", activeIngredient: "Ranitidine" },
  "انتينال": { name: "Antinal", activeIngredient: "Nifuroxazide" },
  "ايميدول": { name: "Imedol", activeIngredient: "Nifuroxazide" },
  "لوبراميد": { name: "Loperamide", activeIngredient: "Loperamide" },
  "نيكسيوم 40mg": { name: "Nexium 40mg", activeIngredient: "Esomeprazole" },
  "إيزوميبرازول": { name: "Esomeprazole", activeIngredient: "Esomeprazole" },
  "إزوبرال": { name: "Ezopral", activeIngredient: "Esomeprazole" },
  "موتيليوم": { name: "Motilium", activeIngredient: "Domperidone" },
  "دومبي": { name: "Dompy", activeIngredient: "Domperidone" },
  "موتينورم": { name: "Motinorm", activeIngredient: "Domperidone" },
  
  // Cholesterol Lowering / خافضات الكوليسترول
  "أتورفاستاتين": { name: "Atorvastatin", activeIngredient: "Atorvastatin" },
  "ليبيتور": { name: "Lipitor", activeIngredient: "Atorvastatin" },
  "أتوركس": { name: "Atorex", activeIngredient: "Atorvastatin" },
  "سيمفاستاتين": { name: "Simvastatin", activeIngredient: "Simvastatin" },
  "زوكور": { name: "Zocor", activeIngredient: "Simvastatin" },
  "سيمفاكور": { name: "Simvacor", activeIngredient: "Simvastatin" },
  "روزوفاستاتين": { name: "Rosuvastatin", activeIngredient: "Rosuvastatin" },
  "كريستور": { name: "Crestor", activeIngredient: "Rosuvastatin" },
  "روزيتا": { name: "Rozita", activeIngredient: "Rosuvastatin" },
  
  // Psychotropics / الأدوية النفسية
  "سيتالوبرام": { name: "Citalopram", activeIngredient: "Citalopram" },
  "سيليكسا": { name: "Celexa", activeIngredient: "Citalopram" },
  "سيبرام": { name: "Cipram", activeIngredient: "Citalopram" },
  "فلوكستين": { name: "Fluoxetine", activeIngredient: "Fluoxetine" },
  "بروزاك": { name: "Prozac", activeIngredient: "Fluoxetine" },
  "فلوتين": { name: "Flutine", activeIngredient: "Fluoxetine" },
  "زاناكس": { name: "Xanax", activeIngredient: "Alprazolam" },
  "كازوليكس": { name: "Cazolix", activeIngredient: "Alprazolam" },
  "ألبرازولام": { name: "Alprazolam", activeIngredient: "Alprazolam" },
  "إسيتالوبرام": { name: "Escitalopram", activeIngredient: "Escitalopram" },
  "ليكسابرو": { name: "Lexapro", activeIngredient: "Escitalopram" },
  "سبرالو": { name: "Spiralo", activeIngredient: "Escitalopram" },
  "كيتيابين": { name: "Quetiapine", activeIngredient: "Quetiapine" },
  "سيروكيل": { name: "Seroquel", activeIngredient: "Quetiapine" },
  "كيوتيك": { name: "Qotic", activeIngredient: "Quetiapine" },
  
  // Hormones / الهرمونات
  "دوفاستون": { name: "Duphaston", activeIngredient: "Dydrogesterone" },
  "ديدروجيستيرون": { name: "Dydrogesterone", activeIngredient: "Dydrogesterone" },
  "يوتروجستان": { name: "Utrogestan", activeIngredient: "Progesterone" },
  "كلوميد": { name: "Clomid", activeIngredient: "Clomiphene Citrate" },
  "سيروفين": { name: "Serophene", activeIngredient: "Clomiphene Citrate" },
  "كلوميفين": { name: "Clomiphene", activeIngredient: "Clomiphene Citrate" },
  "ليفوثيروكسين": { name: "Levothyroxine", activeIngredient: "Levothyroxine" },
  "يوثيروكس": { name: "Euthyrox", activeIngredient: "Levothyroxine" },
  "إلتروكسين": { name: "Eltroxin", activeIngredient: "Levothyroxine" },
  
  // Special Medications / الأدوية الخاصة
  "ليفيترا": { name: "Levitra", activeIngredient: "Vardenafil" },
  "فياجرا": { name: "Viagra", activeIngredient: "Sildenafil" },
  "سيلدينافيل": { name: "Sildenafil", activeIngredient: "Sildenafil" },
  "زوكسان": { name: "Zoxan", activeIngredient: "Rituximab" },
  "ريتوكسان": { name: "Rituxan", activeIngredient: "Rituximab" },
  "زوكسيماب": { name: "Zoximab", activeIngredient: "Rituximab" },
  "تاموكسيفين": { name: "Tamoxifen", activeIngredient: "Tamoxifen" },
  "نولفاديكس": { name: "Nolvadex", activeIngredient: "Tamoxifen" },
  "تامو": { name: "Tamo", activeIngredient: "Tamoxifen" },
  "سيدنافيل": { name: "Sildenafil", activeIngredient: "Sildenafil" },
  "فياجيك": { name: "Viagic", activeIngredient: "Sildenafil" },
  
  // Altibbi medications / أدوية طبيبي
  "أتينول Atenol": { name: "Atenol", activeIngredient: "Atenolol" },
  "تينورمين Tenormin": { name: "Tenormin", activeIngredient: "Atenolol" },
  "بروزاك Prozac": { name: "Prozac", activeIngredient: "Fluoxetine" },
  "فلوكسين Floxin": { name: "Floxin", activeIngredient: "Fluoxetine" },
  "سيمبيكور Symbicort": { name: "Symbicort", activeIngredient: "Budesonide/Formoterol" },
  "فوسيكورت Foscort": { name: "Foscort", activeIngredient: "Budesonide/Formoterol" },
  "ليريكا Lyrica": { name: "Lyrica", activeIngredient: "Pregabalin" },
  "بريجابالين Pregabalin": { name: "Pregabalin", activeIngredient: "Pregabalin" },
  "نوفالجين Novalgin": { name: "Novalgin", activeIngredient: "Metamizole" },
  "دبيتامين Dipetamine": { name: "Dipetamine", activeIngredient: "Metamizole" },
  
  // EDA medications / أدوية هيئة الدواء المصرية
  "ألتروكسين 50": { name: "Eltroxin 50", activeIngredient: "Levothyroxine" },
  "كابوتين 25": { name: "Capoten 25", activeIngredient: "Captopril" },
  "كابوزيد": { name: "Capozide", activeIngredient: "Captopril" },
  "ألدوميت 250": { name: "Aldomet 250", activeIngredient: "Methyldopa" },
  "ألدوميت": { name: "Aldomet", activeIngredient: "Methyldopa" },
  "ريفادين 300": { name: "Rifadin 300", activeIngredient: "Rifampicin" },
  "ريفامبين": { name: "Rifampicin", activeIngredient: "Rifampicin" },
  
  // WebTeb medications / أدوية ويب طب
  "هيوسين": { name: "Hyoscine", activeIngredient: "Butylscopolamine" },
  "بوسكوبان": { name: "Buscopan", activeIngredient: "Butylscopolamine" },
  "فورتيكور": { name: "Forticor", activeIngredient: "Diclofenac + Vitamin B" },
  "فيكتوزا": { name: "Victoza", activeIngredient: "Liraglutide" },
  "ساكسندا": { name: "Saxenda", activeIngredient: "Liraglutide" },
  "تروفادا": { name: "Truvada", activeIngredient: "Emtricitabine + Tenofovir" },
  "دسكوفي": { name: "Descovy", activeIngredient: "Emtricitabine + Tenofovir Alafenamide" }
};

// تجميع كل الأدوية من جميع الفئات في مصفوفة واحدة
export const mockDrugs: Drug[] = [
  ...painRelievers,
  ...antibiotics,
  ...cardiovascular,
  ...antiallergic,
  ...antidiabetic,
  ...gastrointestinal,
  ...cholesterolLowering,
  ...psychotropics,
  ...hormones,
  ...specialMedications,
  ...altibbiMedications,
  ...webTebMedications,
  ...edaMedications
];
