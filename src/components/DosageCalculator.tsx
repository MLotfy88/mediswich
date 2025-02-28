
import { useState, useEffect, useRef } from "react";
import { DosageCalculation, AppLanguage } from "@/types";
import { searchDrugSuggestions } from "@/services/drugService";
import { v4 as uuidv4 } from "uuid";

interface DosageCalculatorProps {
  onCalculate?: (calculation: any) => void;
  currentLanguage?: AppLanguage;
}

export default function DosageCalculator({ onCalculate, currentLanguage }: DosageCalculatorProps) {
  const [patientWeight, setPatientWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [drugName, setDrugName] = useState<string>("");
  const [dosagePerKg, setDosagePerKg] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("1");
  const [duration, setDuration] = useState<string>("7");
  
  const [calculatedResult, setCalculatedResult] = useState<{
    singleDose: number;
    dailyDose: number;
    totalDose: number;
    unit: string;
  } | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  // للاقتراحات الدوائية
  const [drugSuggestions, setDrugSuggestions] = useState<{name: string, type: 'drug' | 'ingredient'}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // البحث عن اقتراحات الأدوية أثناء الكتابة
  useEffect(() => {
    if (drugName.length < 2) {
      setDrugSuggestions([]);
      return;
    }

    const suggestions = searchDrugSuggestions(drugName);
    setDrugSuggestions(suggestions);
  }, [drugName]);

  // إغلاق الاقتراحات عند النقر خارج حقل البحث
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDrugSuggestionClick = (suggestion: string) => {
    setDrugName(suggestion);
    setShowSuggestions(false);
  };
  
  const calculateDosage = () => {
    if (!patientWeight || !drugName || !dosagePerKg) {
      setError(currentLanguage?.code === 'en' ? 
        "Please enter all required data" : 
        "يرجى إدخال جميع البيانات المطلوبة");
      return;
    }
    
    try {
      // تحويل المدخلات إلى أرقام
      const weightValue = parseFloat(patientWeight);
      const dosageValue = parseFloat(dosagePerKg);
      const frequencyValue = parseInt(frequency);
      const durationValue = parseInt(duration);
      
      if (isNaN(weightValue) || isNaN(dosageValue) || isNaN(frequencyValue) || isNaN(durationValue)) {
        throw new Error(currentLanguage?.code === 'en' ? 
          "Make sure to enter valid numbers" : 
          "تأكد من إدخال أرقام صحيحة");
      }
      
      if (weightValue <= 0 || dosageValue <= 0 || frequencyValue <= 0 || durationValue <= 0) {
        throw new Error(currentLanguage?.code === 'en' ? 
          "All values must be positive" : 
          "يجب أن تكون جميع القيم موجبة");
      }
      
      // تحويل الوزن إلى كجم إذا لزم الأمر
      const weightInKg = weightUnit === "lb" ? weightValue * 0.45359237 : weightValue;
      
      // حساب الجرعة
      const singleDose = weightInKg * dosageValue;
      const dailyDose = singleDose * frequencyValue;
      const totalDose = dailyDose * durationValue;
      
      const result = {
        singleDose: Math.round(singleDose * 100) / 100,
        dailyDose: Math.round(dailyDose * 100) / 100,
        totalDose: Math.round(totalDose * 100) / 100,
        unit: "mg" // الوحدة الافتراضية، يمكن تعديلها لاحقًا
      };

      setCalculatedResult(result);
      
      // إضافة العملية إلى السجل إذا كانت الدالة موجودة
      if (onCalculate) {
        onCalculate({
          id: uuidv4(),
          drugName,
          patientWeight: weightValue,
          weightUnit,
          dosagePerKg: dosageValue,
          frequency: frequencyValue,
          duration: durationValue,
          singleDose: result.singleDose,
          dailyDose: result.dailyDose,
          totalDose: result.totalDose,
          timestamp: new Date()
        });
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : currentLanguage?.code === 'en' ? 
        "An error occurred during calculation" : 
        "حدث خطأ أثناء الحساب");
      setCalculatedResult(null);
    }
  };
  
  const resetCalculator = () => {
    setPatientWeight("");
    setWeightUnit("kg");
    setDrugName("");
    setDosagePerKg("");
    setFrequency("1");
    setDuration("7");
    setCalculatedResult(null);
    setError(null);
  };

  // الترجمات حسب اللغة
  const translations = {
    title: currentLanguage?.code === 'en' ? 'Medication Dosage Calculator' : 'حاسبة جرعة الدواء',
    patientWeight: currentLanguage?.code === 'en' ? 'Patient Weight' : 'وزن المريض',
    drugName: currentLanguage?.code === 'en' ? 'Medication Name' : 'اسم الدواء',
    enterDrugName: currentLanguage?.code === 'en' ? 'Enter medication name' : 'أدخل اسم الدواء',
    dosagePerKg: currentLanguage?.code === 'en' ? 'Dosage per kilogram (mg/kg)' : 'الجرعة لكل كيلوجرام (مجم / كجم)',
    frequencyDaily: currentLanguage?.code === 'en' ? 'Dosage frequency per day' : 'عدد مرات الجرعة يوميا',
    once: currentLanguage?.code === 'en' ? 'Once daily' : 'مرة واحدة يوميا',
    twice: currentLanguage?.code === 'en' ? 'Twice daily' : 'مرتين يوميا',
    thrice: currentLanguage?.code === 'en' ? 'Three times daily' : 'ثلاث مرات يوميا',
    fourTimes: currentLanguage?.code === 'en' ? 'Four times daily' : 'أربع مرات يوميا',
    treatmentDuration: currentLanguage?.code === 'en' ? 'Treatment Duration (days)' : 'مدة العلاج (بالأيام)',
    calculate: currentLanguage?.code === 'en' ? 'Calculate Dosage' : 'حساب الجرعة',
    reset: currentLanguage?.code === 'en' ? 'Reset' : 'إعادة تعيين',
    results: currentLanguage?.code === 'en' ? 'Calculation Results:' : 'نتائج الحساب:',
    singleDose: currentLanguage?.code === 'en' ? 'Single Dose:' : 'الجرعة المفردة:',
    dailyDose: currentLanguage?.code === 'en' ? 'Daily Dose:' : 'الجرعة اليومية:',
    totalDose: currentLanguage?.code === 'en' ? 'Total Treatment Dose:' : 'الجرعة الإجمالية للفترة العلاجية:',
    note: currentLanguage?.code === 'en' ? 'Note:' : 'ملاحظة:',
    warning: currentLanguage?.code === 'en' ? 
      'These results are for guidance only. Always consult the treating physician or pharmacist before taking any action.' :
      'هذه النتائج استرشادية فقط. يرجى دائما مراجعة الطبيب المعالج أو الصيدلي قبل اتخاذ أي إجراء.',
    kg: currentLanguage?.code === 'en' ? 'kg' : 'كجم',
    lb: currentLanguage?.code === 'en' ? 'lb' : 'رطل'
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
      <h2 
        className="text-xl font-bold mb-6 text-pharma-primary" 
        dir={currentLanguage?.direction || "rtl"}
      >
        {translations.title}
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="patientWeight" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.patientWeight}
            </label>
            <div className="flex">
              <input
                id="patientWeight"
                type="number"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                className="flex-1 rounded-l-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
                placeholder="0"
                min="0"
                step="0.1"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as "kg" | "lb")}
                className="bg-gray-100 border border-gray-300 rounded-r-md px-2 py-2 focus:outline-none"
              >
                <option value="kg">{translations.kg}</option>
                <option value="lb">{translations.lb}</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <label 
              htmlFor="drugName" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.drugName}
            </label>
            <input
              ref={inputRef}
              id="drugName"
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              onFocus={() => drugSuggestions.length > 0 && setShowSuggestions(true)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
              placeholder={translations.enterDrugName}
            />
            
            {/* اقتراحات الأدوية */}
            {showSuggestions && drugSuggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200"
              >
                <ul className="py-1">
                  {drugSuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-pharma-primary/10 cursor-pointer"
                      onClick={() => handleDrugSuggestionClick(suggestion.name)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="dosagePerKg" 
            className="block text-sm font-medium text-gray-700 mb-1" 
            dir={currentLanguage?.direction || "rtl"}
          >
            {translations.dosagePerKg}
          </label>
          <input
            id="dosagePerKg"
            type="number"
            value={dosagePerKg}
            onChange={(e) => setDosagePerKg(e.target.value)}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
            placeholder="0"
            min="0"
            step="0.1"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="frequency" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.frequencyDaily}
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
              dir={currentLanguage?.direction || "rtl"}
            >
              <option value="1">{translations.once}</option>
              <option value="2">{translations.twice}</option>
              <option value="3">{translations.thrice}</option>
              <option value="4">{translations.fourTimes}</option>
            </select>
          </div>
          
          <div>
            <label 
              htmlFor="duration" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.treatmentDuration}
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
              placeholder="7"
              min="1"
            />
          </div>
        </div>
        
        <div className="flex space-x-4 pt-2">
          <button
            onClick={calculateDosage}
            className="flex-1 bg-pharma-primary text-white py-2 px-4 rounded-md hover:bg-pharma-primary-dark transition-colors"
          >
            {translations.calculate}
          </button>
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            {translations.reset}
          </button>
        </div>
      </div>
      
      {error && (
        <div 
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-md" 
          dir={currentLanguage?.direction || "rtl"}
        >
          {error}
        </div>
      )}
      
      {calculatedResult && (
        <div className="mt-6 p-4 border border-pharma-primary/20 rounded-md bg-pharma-primary/5">
          <h3 
            className="text-lg font-bold mb-3 text-pharma-primary" 
            dir={currentLanguage?.direction || "rtl"}
          >
            {translations.results}
          </h3>
          <div 
            className="space-y-2 text-gray-700" 
            dir={currentLanguage?.direction || "rtl"}
          >
            <div className="flex justify-between">
              <span>{translations.singleDose}</span>
              <span className="font-medium">{calculatedResult.singleDose} {calculatedResult.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>{translations.dailyDose}</span>
              <span className="font-medium">{calculatedResult.dailyDose} {calculatedResult.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>{translations.totalDose}</span>
              <span className="font-medium">{calculatedResult.totalDose} {calculatedResult.unit}</span>
            </div>
          </div>
          
          <div 
            className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm" 
            dir={currentLanguage?.direction || "rtl"}
          >
            <strong>{translations.note}</strong> {translations.warning}
          </div>
        </div>
      )}
    </div>
  );
}
