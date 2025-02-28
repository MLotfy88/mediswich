
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DosageCalculator from '@/components/DosageCalculator';
import DosageEquivalentCalculator from '@/components/DosageEquivalentCalculator';
import { AppLanguage } from '@/types';

export default function CalculatorPage() {
  const [language, setLanguage] = useState<AppLanguage>({
    code: 'ar',
    direction: 'rtl'
  });

  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage.direction;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLanguageChange={handleLanguageChange} />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" 
              dir="rtl"
            >
              حاسبات الجرعات الدوائية
            </h1>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto" 
              dir="rtl"
            >
              أدوات دقيقة لمساعدة الأطباء والصيادلة في حساب الجرعات المناسبة وتحويل الجرعات بين الأدوية المختلفة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <DosageCalculator />
            <DosageEquivalentCalculator />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
            <h2 className="text-xl font-bold mb-6 text-pharma-primary" dir="rtl">مصادر بيانات الجرعات</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3" dir="rtl">مصادر مصرية</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700" dir="rtl">
                  <li>دستور الأدوية المصري</li>
                  <li>الإرشادات العلاجية لوزارة الصحة المصرية</li>
                  <li>بروتوكولات المستشفيات الجامعية المصرية</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3" dir="rtl">مصادر عالمية</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700" dir="rtl">
                  <li>BNF (British National Formulary)</li>
                  <li>FDA (Food and Drug Administration)</li>
                  <li>WHO (World Health Organization)</li>
                  <li>Lexicomp & Micromedex</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-pharma-primary/10 rounded-md text-pharma-primary text-sm" dir="rtl">
              <strong>تنبيه هام:</strong> الحاسبات المتوفرة هنا هي أدوات مساعدة فقط ولا تغني عن الرأي الطبي المتخصص. يجب دائمًا مراجعة الطبيب أو الصيدلي قبل اتخاذ أي قرار طبي.
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
