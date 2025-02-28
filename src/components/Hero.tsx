
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLanguage } from "@/types";

interface HeroProps {
  appLanguage?: AppLanguage;
}

export default function Hero({ appLanguage = { code: 'ar', direction: 'rtl' } }: HeroProps) {
  // الترجمات حسب اللغة
  const translations = {
    title: appLanguage.code === 'ar' 
      ? "المنصة الذكية الشاملة لإدارة الأدوية وتبديلها بذكاء!"
      : "The Comprehensive Smart Platform for Medication Management and Intelligent Switching!",
    description: appLanguage.code === 'ar'
      ? "ابحث عن بدائل للأدوية، قارن الجرعات، واحسب الجرعات المناسبة حسب وزن المريض. تطبيق مصمم خصيصًا للأطباء والصيادلة في مصر والعالم."
      : "Search for medication alternatives, compare dosages, and calculate appropriate doses based on patient weight. An application specially designed for doctors and pharmacists in Egypt and worldwide.",
    searchByIngredient: appLanguage.code === 'ar' ? "بحث بالمادة الفعالة" : "Search by Active Ingredient",
    dosageCalculator: appLanguage.code === 'ar' ? "حاسبة الجرعات" : "Dosage Calculator",
    equivalentCalculator: appLanguage.code === 'ar' ? "مقارنة الأدوية" : "Compare Medications"
  };

  return (
    <div className="bg-gradient-to-b from-white to-pharma-secondary/20 min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" 
            dir={appLanguage.direction}
          >
            {translations.title}
          </h1>
          <p 
            className="text-lg text-gray-600 mb-8" 
            dir={appLanguage.direction}
          >
            {translations.description}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link to="/" className="feature-btn">
              <Search size={20} className={appLanguage.direction === 'rtl' ? "ml-2" : "mr-2"} />
              <span>{translations.searchByIngredient}</span>
            </Link>
            <Link to="/calculator/dosage" className="feature-btn">
              <span>{translations.dosageCalculator}</span>
            </Link>
            <Link to="/calculator/equivalent" className="feature-btn">
              <span>{translations.equivalentCalculator}</span>
            </Link>
          </div>
        </div>

        {/* Data sources section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center" dir={appLanguage.direction}>
            {appLanguage.code === 'ar' ? 'قواعد البيانات المُدمجة' : 'Integrated Databases'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-pharma-primary" dir={appLanguage.direction}>
                {appLanguage.code === 'ar' ? 'مصادر مصرية' : 'Egyptian Sources'}
              </h3>
              <ul className="space-y-2 list-disc list-inside text-gray-600" dir={appLanguage.direction}>
                <li>{appLanguage.code === 'ar' ? 'الهيئة المصرية للدواء (EDA)' : 'Egyptian Drug Authority (EDA)'}</li>
                <li>{appLanguage.code === 'ar' ? 'الدواء المصري (EIP)' : 'Egyptian Pharmaceutical Index (EIP)'}</li>
                <li>{appLanguage.code === 'ar' ? 'الإرشادات العلاجية لوزارة الصحة المصرية' : 'Ministry of Health Therapeutic Guidelines'}</li>
                <li>{appLanguage.code === 'ar' ? 'قواعد بيانات المستشفيات الجامعية' : 'University Hospitals Databases'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-pharma-accent" dir={appLanguage.direction}>
                {appLanguage.code === 'ar' ? 'مصادر عالمية' : 'Global Sources'}
              </h3>
              <ul className="space-y-2 list-disc list-inside text-gray-600" dir={appLanguage.direction}>
                <li>{appLanguage.code === 'ar' ? 'قائمة منظمة الصحة العالمية (WHO EML)' : 'WHO Essential Medicines List (WHO EML)'}</li>
                <li>Drugs.com {appLanguage.code === 'ar' ? 'و' : '&'} RxList</li>
                <li>FDA Orange Book</li>
                <li>Micromedex {appLanguage.code === 'ar' ? 'و' : '&'} UpToDate</li>
                <li>PubMed {appLanguage.code === 'ar' ? 'و' : '&'} ClinicalTrials.gov</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Marketing tagline */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl font-bold text-pharma-primary" dir={appLanguage.direction}>
            {appLanguage.code === 'ar' 
              ? 'MediSwitch – حيث الدقة الطبية تلتقي بالذكاء الاصطناعي لخدمة الطب المصري والعالمي! 🌍💊'
              : 'MediSwitch – Where Medical Precision Meets Artificial Intelligence for Egyptian and Global Medicine! 🌍💊'}
          </p>
        </div>
      </div>
    </div>
  );
}
