
import { useState, useEffect, useContext } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DosageCalculator from '@/components/DosageCalculator';
import { AppLanguage } from '@/types';
import { LanguageContext } from '@/App';

export default function DosageCalculatorPage() {
  const { language, setLanguage } = useContext(LanguageContext);
  
  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
  };

  // ترجمات حسب اللغة
  const translations = {
    title: language.code === 'en' ? 'Medication Dosage Calculator' : 'حاسبة جرعة الدواء',
    description: language.code === 'en' 
      ? 'An accurate tool to help doctors and pharmacists calculate appropriate dosages based on patient weight.'
      : 'أداة دقيقة لمساعدة الأطباء والصيادلة في حساب الجرعات المناسبة بناءً على وزن المريض.',
    sources: language.code === 'en' ? 'Dosage Data Sources' : 'مصادر بيانات الجرعات',
    egyptianSources: language.code === 'en' ? 'Egyptian Sources' : 'مصادر مصرية',
    globalSources: language.code === 'en' ? 'Global Sources' : 'مصادر عالمية',
    warning: language.code === 'en' 
      ? 'Important Warning: The calculators available here are assistance tools only and do not substitute professional medical opinion. Always consult your doctor or pharmacist before making any medical decisions.'
      : 'تنبيه هام: الحاسبات المتوفرة هنا هي أدوات مساعدة فقط ولا تغني عن الرأي الطبي المتخصص. يجب دائمًا مراجعة الطبيب أو الصيدلي قبل اتخاذ أي قرار طبي.'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLanguageChange={handleLanguageChange} currentLanguage={language} />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" 
              dir={language.direction}
            >
              {translations.title}
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto" 
              dir={language.direction}
            >
              {translations.description}
            </p>
          </div>
          
          <div className="mb-16">
            <DosageCalculator />
          </div>
          
          {/* مصادر البيانات */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
            <h2 
              className="text-xl font-bold mb-6 text-pharma-primary" 
              dir={language.direction}
            >
              {translations.sources}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 
                  className="text-lg font-semibold mb-3" 
                  dir={language.direction}
                >
                  {translations.egyptianSources}
                </h3>
                <ul 
                  className="list-disc list-inside space-y-1 text-gray-700" 
                  dir={language.direction}
                >
                  <li>دستور الأدوية المصري</li>
                  <li>الإرشادات العلاجية لوزارة الصحة المصرية</li>
                  <li>بروتوكولات المستشفيات الجامعية المصرية</li>
                </ul>
              </div>
              
              <div>
                <h3 
                  className="text-lg font-semibold mb-3" 
                  dir={language.direction}
                >
                  {translations.globalSources}
                </h3>
                <ul 
                  className="list-disc list-inside space-y-1 text-gray-700" 
                  dir={language.direction}
                >
                  <li>BNF (British National Formulary)</li>
                  <li>FDA (Food and Drug Administration)</li>
                  <li>WHO (World Health Organization)</li>
                  <li>Lexicomp & Micromedex</li>
                </ul>
              </div>
            </div>
            
            <div 
              className="mt-6 p-3 bg-pharma-primary/10 rounded-md text-pharma-primary text-sm" 
              dir={language.direction}
            >
              <strong>{language.code === 'en' ? 'Important Warning:' : 'تنبيه هام:'}</strong> {translations.warning}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
