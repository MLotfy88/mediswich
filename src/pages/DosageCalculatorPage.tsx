
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DosageCalculator from '@/components/DosageCalculator';
import { AppLanguage } from '@/types';

// تعريف نموذج للعمليات السابقة
interface CalculationHistory {
  id: string;
  drugName: string;
  patientWeight: number;
  weightUnit: 'kg' | 'lb';
  dosagePerKg: number;
  frequency: number;
  duration: number;
  singleDose: number;
  dailyDose: number;
  totalDose: number;
  timestamp: Date;
}

export default function DosageCalculatorPage() {
  const [language, setLanguage] = useState<AppLanguage>({
    code: 'ar',
    direction: 'rtl'
  });
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);

  // تحميل سجل العمليات من التخزين المحلي عند تحميل الصفحة
  useEffect(() => {
    const savedHistory = localStorage.getItem('dosageCalculationHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setCalculationHistory(parsedHistory);
      } catch (error) {
        console.error('Failed to parse saved history:', error);
      }
    }
  }, []);

  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage.direction;
  };

  // إضافة عملية جديدة إلى السجل
  const addToHistory = (calculation: CalculationHistory) => {
    const updatedHistory = [calculation, ...calculationHistory].slice(0, 10); // الاحتفاظ بآخر 10 عمليات فقط
    setCalculationHistory(updatedHistory);
    localStorage.setItem('dosageCalculationHistory', JSON.stringify(updatedHistory));
  };

  // ترجمات حسب اللغة
  const translations = {
    title: language.code === 'en' ? 'Medication Dosage Calculator' : 'حاسبة جرعة الدواء',
    description: language.code === 'en' 
      ? 'An accurate tool to help doctors and pharmacists calculate appropriate dosages based on patient weight.'
      : 'أداة دقيقة لمساعدة الأطباء والصيادلة في حساب الجرعات المناسبة بناءً على وزن المريض.',
    history: language.code === 'en' ? 'Calculation History' : 'سجل العمليات',
    noHistory: language.code === 'en' ? 'No calculation history found' : 'لا يوجد سجل للعمليات السابقة',
    date: language.code === 'en' ? 'Date' : 'التاريخ',
    medication: language.code === 'en' ? 'Medication' : 'الدواء',
    weight: language.code === 'en' ? 'Weight' : 'الوزن',
    dosage: language.code === 'en' ? 'Dosage' : 'الجرعة',
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
            <DosageCalculator 
              onCalculate={addToHistory} 
              currentLanguage={language} 
            />
          </div>
          
          {/* سجل العمليات السابقة */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-border mb-16">
            <h2 
              className="text-xl font-bold mb-6 text-pharma-primary" 
              dir={language.direction}
            >
              {translations.history}
            </h2>
            
            {calculationHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3" dir={language.direction}>{translations.date}</th>
                      <th scope="col" className="px-6 py-3" dir={language.direction}>{translations.medication}</th>
                      <th scope="col" className="px-6 py-3" dir={language.direction}>{translations.weight}</th>
                      <th scope="col" className="px-6 py-3" dir={language.direction}>{translations.dosage}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculationHistory.map((calc) => (
                      <tr key={calc.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4" dir={language.direction}>
                          {new Date(calc.timestamp).toLocaleDateString(language.code === 'en' ? 'en-US' : 'ar-EG')}
                        </td>
                        <td className="px-6 py-4 font-medium" dir={language.direction}>
                          {calc.drugName}
                        </td>
                        <td className="px-6 py-4" dir={language.direction}>
                          {calc.patientWeight} {calc.weightUnit}
                        </td>
                        <td className="px-6 py-4" dir={language.direction}>
                          {calc.singleDose} mg ({calc.frequency}x/day)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p 
                className="text-center text-gray-500 py-4" 
                dir={language.direction}
              >
                {translations.noHistory}
              </p>
            )}
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
