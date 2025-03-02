
import { useContext } from "react";
import { LanguageContext } from "@/App";

export default function HowItWorksSection() {
  const { language } = useContext(LanguageContext);

  // ترجمات حسب اللغة الحالية
  const translations = {
    howItWorks: language.code === 'ar' ? 'كيف يعمل' : 'How It Works',
    step1Title: language.code === 'ar' ? 'ابحث عن الدواء' : 'Search for Medication',
    step1Desc: language.code === 'ar'
      ? 'أدخل اسم الدواء أو المادة الفعالة في شريط البحث'
      : 'Enter the medication name or active ingredient in the search bar',
    step2Title: language.code === 'ar' ? 'استعرض البدائل' : 'Browse Alternatives',
    step2Desc: language.code === 'ar'
      ? 'استعرض قائمة البدائل المتاحة مع معلومات التسعير والتوافر'
      : 'Browse the list of available alternatives with pricing and availability information',
    step3Title: language.code === 'ar' ? 'قارن وحدد' : 'Compare and Choose',
    step3Desc: language.code === 'ar'
      ? 'قارن بين الخيارات واختر البديل المناسب لاحتياجاتك'
      : 'Compare options and choose the alternative that suits your needs',
  };

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 
          className="text-2xl md:text-3xl font-bold text-center text-pharma-primary mb-12"
          dir={language.direction}
        >
          {translations.howItWorks}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* الخطوة 1 */}
          <div 
            className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
            dir={language.direction}
          >
            <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3">{translations.step1Title}</h3>
            <p className="text-gray-600">{translations.step1Desc}</p>
          </div>
          
          {/* الخطوة 2 */}
          <div 
            className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
            dir={language.direction}
          >
            <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-3">{translations.step2Title}</h3>
            <p className="text-gray-600">{translations.step2Desc}</p>
          </div>
          
          {/* الخطوة 3 */}
          <div 
            className="bg-slate-50 rounded-xl p-6 text-center shadow-sm"
            dir={language.direction}
          >
            <div className="w-12 h-12 bg-pharma-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-3">{translations.step3Title}</h3>
            <p className="text-gray-600">{translations.step3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
