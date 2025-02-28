
import { useState, useEffect, useRef } from "react";
import { EquivalentDosage, AppLanguage } from "@/types";
import { searchDrugSuggestions } from "@/services/drugService";
import { v4 as uuidv4 } from "uuid";

interface DosageEquivalentCalculatorProps {
  onCalculate?: (calculation: any) => void;
  currentLanguage?: AppLanguage;
}

export default function DosageEquivalentCalculator({ onCalculate, currentLanguage }: DosageEquivalentCalculatorProps) {
  const [drugA, setDrugA] = useState<string>("");
  const [dosageA, setDosageA] = useState<string>("");
  const [unitA, setUnitA] = useState<string>("mg");
  
  const [drugB, setDrugB] = useState<string>("");
  const [conversionRatio, setConversionRatio] = useState<string>("");
  
  const [result, setResult] = useState<{
    dosageB: number;
    unitB: string;
  } | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  // للاقتراحات الدوائية
  const [drugASuggestions, setDrugASuggestions] = useState<{name: string, type: 'drug' | 'ingredient'}[]>([]);
  const [showDrugASuggestions, setShowDrugASuggestions] = useState(false);
  const [drugBSuggestions, setDrugBSuggestions] = useState<{name: string, type: 'drug' | 'ingredient'}[]>([]);
  const [showDrugBSuggestions, setShowDrugBSuggestions] = useState(false);
  
  const drugAInputRef = useRef<HTMLInputElement>(null);
  const drugASuggestionsRef = useRef<HTMLDivElement>(null);
  const drugBInputRef = useRef<HTMLInputElement>(null);
  const drugBSuggestionsRef = useRef<HTMLDivElement>(null);
  
  // البحث عن اقتراحات الأدوية أثناء الكتابة
  useEffect(() => {
    if (drugA.length < 2) {
      setDrugASuggestions([]);
      return;
    }

    const suggestions = searchDrugSuggestions(drugA);
    setDrugASuggestions(suggestions);
  }, [drugA]);

  useEffect(() => {
    if (drugB.length < 2) {
      setDrugBSuggestions([]);
      return;
    }

    const suggestions = searchDrugSuggestions(drugB);
    setDrugBSuggestions(suggestions);
  }, [drugB]);

  // إغلاق الاقتراحات عند النقر خارج حقل البحث
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drugASuggestionsRef.current && 
        !drugASuggestionsRef.current.contains(event.target as Node) &&
        drugAInputRef.current &&
        !drugAInputRef.current.contains(event.target as Node)
      ) {
        setShowDrugASuggestions(false);
      }

      if (
        drugBSuggestionsRef.current && 
        !drugBSuggestionsRef.current.contains(event.target as Node) &&
        drugBInputRef.current &&
        !drugBInputRef.current.contains(event.target as Node)
      ) {
        setShowDrugBSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDrugASuggestionClick = (suggestion: string) => {
    setDrugA(suggestion);
    setShowDrugASuggestions(false);
  };

  const handleDrugBSuggestionClick = (suggestion: string) => {
    setDrugB(suggestion);
    setShowDrugBSuggestions(false);
  };
  
  // توفير تحويلات شائعة - يمكن تعديلها حسب اللغة
  const predefinedConversions = [
    { drugA: currentLanguage?.code === 'en' ? "Metformin" : "ميتفورمين", drugB: currentLanguage?.code === 'en' ? "Glibenclamide" : "جليبنكلاميد", ratio: 0.01 },
    { drugA: currentLanguage?.code === 'en' ? "Enalapril" : "إيناليدوم", drugB: currentLanguage?.code === 'en' ? "Captopril" : "كابتوبريل", ratio: 0.5 },
    { drugA: currentLanguage?.code === 'en' ? "Atorvastatin" : "أتورفاستاتين", drugB: currentLanguage?.code === 'en' ? "Simvastatin" : "سيمفاستاتين", ratio: 2 },
    { drugA: currentLanguage?.code === 'en' ? "Concor" : "كونكور", drugB: currentLanguage?.code === 'en' ? "Bisocor" : "بيسوكور", ratio: 1 },
    { drugA: currentLanguage?.code === 'en' ? "Viagra" : "فياجرا", drugB: currentLanguage?.code === 'en' ? "Sildenafil" : "سيلدينافيل", ratio: 1 },
  ];
  
  const handleSelectPredefined = (conversion: { drugA: string; drugB: string; ratio: number }) => {
    setDrugA(conversion.drugA);
    setDrugB(conversion.drugB);
    setConversionRatio(conversion.ratio.toString());
  };
  
  const calculateEquivalent = () => {
    if (!drugA || !dosageA || !drugB || !conversionRatio) {
      setError(currentLanguage?.code === 'en' ? 
        "Please enter all required data" : 
        "يرجى إدخال جميع البيانات المطلوبة");
      return;
    }
    
    try {
      const dosageValue = parseFloat(dosageA);
      const ratioValue = parseFloat(conversionRatio);
      
      if (isNaN(dosageValue) || isNaN(ratioValue)) {
        throw new Error(currentLanguage?.code === 'en' ? 
          "Make sure to enter valid numbers" : 
          "تأكد من إدخال أرقام صحيحة");
      }
      
      if (dosageValue <= 0 || ratioValue <= 0) {
        throw new Error(currentLanguage?.code === 'en' ? 
          "All values must be positive" : 
          "يجب أن تكون جميع القيم موجبة");
      }
      
      // حساب الجرعة المكافئة
      const equivalentDosage = dosageValue * ratioValue;
      
      const calculatedResult = {
        dosageB: Math.round(equivalentDosage * 100) / 100,
        unitB: unitA // استخدام نفس الوحدة حاليًا
      };

      setResult(calculatedResult);
      
      // إضافة العملية إلى السجل إذا كانت الدالة موجودة
      if (onCalculate) {
        onCalculate({
          id: uuidv4(),
          drugA,
          drugB,
          dosageA: dosageValue,
          dosageB: calculatedResult.dosageB,
          unit: unitA,
          conversionRatio: ratioValue,
          timestamp: new Date()
        });
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : currentLanguage?.code === 'en' ? 
        "An error occurred during calculation" : 
        "حدث خطأ أثناء الحساب");
      setResult(null);
    }
  };
  
  const resetCalculator = () => {
    setDrugA("");
    setDosageA("");
    setUnitA("mg");
    setDrugB("");
    setConversionRatio("");
    setResult(null);
    setError(null);
  };
  
  // الترجمات حسب اللغة
  const translations = {
    title: currentLanguage?.code === 'en' ? 'Equivalent Dosage Calculator' : 'حاسبة الجرعات المكافئة',
    commonConversions: currentLanguage?.code === 'en' ? 'Choose from common conversions:' : 'اختر من التحويلات الشائعة:',
    drugA: currentLanguage?.code === 'en' ? 'First Medication' : 'الدواء الأول',
    enterDrugA: currentLanguage?.code === 'en' ? 'Enter first medication name' : 'أدخل اسم الدواء الأول',
    drugB: currentLanguage?.code === 'en' ? 'Second Medication' : 'الدواء الثاني',
    enterDrugB: currentLanguage?.code === 'en' ? 'Enter second medication name' : 'أدخل اسم الدواء الثاني',
    dosageA: currentLanguage?.code === 'en' ? 'First Medication Dosage' : 'جرعة الدواء الأول',
    conversionRatio: currentLanguage?.code === 'en' ? 'Conversion Ratio' : 'معامل التحويل',
    calculate: currentLanguage?.code === 'en' ? 'Calculate Equivalent Dosage' : 'حساب الجرعة المكافئة',
    reset: currentLanguage?.code === 'en' ? 'Reset' : 'إعادة تعيين',
    results: currentLanguage?.code === 'en' ? 'Calculation Results:' : 'نتائج الحساب:',
    firstMed: currentLanguage?.code === 'en' ? 'First Medication' : 'الدواء الأول',
    secondMed: currentLanguage?.code === 'en' ? 'Second Medication' : 'الدواء الثاني',
    equivalent: currentLanguage?.code === 'en' ? 'is equivalent to' : 'يعادل',
    note: currentLanguage?.code === 'en' ? 'Note:' : 'ملاحظة:',
    warning: currentLanguage?.code === 'en' ? 
      'These results are for guidance only. Always consult the treating physician or pharmacist before changing medications or dosages.' :
      'هذه النتائج استرشادية فقط. يرجى دائما مراجعة الطبيب المعالج أو الصيدلي قبل تغيير الأدوية أو الجرعات.',
    mg: 'mg',
    mcg: 'mcg',
    g: 'g',
    ml: 'ml',
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
      <h2 
        className="text-xl font-bold mb-6 text-pharma-accent" 
        dir={currentLanguage?.direction || "rtl"}
      >
        {translations.title}
      </h2>
      
      <div className="mb-6 bg-pharma-secondary/50 rounded-md p-4">
        <h3 
          className="text-sm font-bold mb-2 text-gray-700" 
          dir={currentLanguage?.direction || "rtl"}
        >
          {translations.commonConversions}
        </h3>
        <div className="flex flex-wrap gap-2">
          {predefinedConversions.map((conversion, index) => (
            <button
              key={index}
              onClick={() => handleSelectPredefined(conversion)}
              className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-pharma-accent/10 hover:border-pharma-accent/30 transition-colors"
            >
              {conversion.drugA} → {conversion.drugB}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label 
              htmlFor="drugA" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.drugA}
            </label>
            <input
              ref={drugAInputRef}
              id="drugA"
              type="text"
              value={drugA}
              onChange={(e) => setDrugA(e.target.value)}
              onFocus={() => drugASuggestions.length > 0 && setShowDrugASuggestions(true)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
              placeholder={translations.enterDrugA}
            />
            
            {/* اقتراحات الدواء الأول */}
            {showDrugASuggestions && drugASuggestions.length > 0 && (
              <div 
                ref={drugASuggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200"
              >
                <ul className="py-1">
                  {drugASuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-pharma-accent/10 cursor-pointer"
                      onClick={() => handleDrugASuggestionClick(suggestion.name)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="relative">
            <label 
              htmlFor="drugB" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.drugB}
            </label>
            <input
              ref={drugBInputRef}
              id="drugB"
              type="text"
              value={drugB}
              onChange={(e) => setDrugB(e.target.value)}
              onFocus={() => drugBSuggestions.length > 0 && setShowDrugBSuggestions(true)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
              placeholder={translations.enterDrugB}
            />
            
            {/* اقتراحات الدواء الثاني */}
            {showDrugBSuggestions && drugBSuggestions.length > 0 && (
              <div 
                ref={drugBSuggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200"
              >
                <ul className="py-1">
                  {drugBSuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-pharma-accent/10 cursor-pointer"
                      onClick={() => handleDrugBSuggestionClick(suggestion.name)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label 
              htmlFor="dosageA" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.dosageA}
            </label>
            <div className="flex">
              <input
                id="dosageA"
                type="number"
                value={dosageA}
                onChange={(e) => setDosageA(e.target.value)}
                className="flex-1 rounded-l-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
                placeholder="0"
                min="0"
                step="0.1"
              />
              <select
                value={unitA}
                onChange={(e) => setUnitA(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-r-md px-2 py-2 focus:outline-none"
              >
                <option value="mg">{translations.mg}</option>
                <option value="mcg">{translations.mcg}</option>
                <option value="g">{translations.g}</option>
                <option value="ml">{translations.ml}</option>
              </select>
            </div>
          </div>
          
          <div>
            <label 
              htmlFor="conversionRatio" 
              className="block text-sm font-medium text-gray-700 mb-1" 
              dir={currentLanguage?.direction || "rtl"}
            >
              {translations.conversionRatio}
            </label>
            <input
              id="conversionRatio"
              type="number"
              value={conversionRatio}
              onChange={(e) => setConversionRatio(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
              placeholder="1.0"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="flex space-x-4 pt-2">
          <button
            onClick={calculateEquivalent}
            className="flex-1 bg-pharma-accent text-white py-2 px-4 rounded-md hover:bg-pharma-accent/90 transition-colors"
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
      
      {result && (
        <div className="mt-6 p-4 border border-pharma-accent/20 rounded-md bg-pharma-accent/5">
          <h3 
            className="text-lg font-bold mb-3 text-pharma-accent" 
            dir={currentLanguage?.direction || "rtl"}
          >
            {translations.results}
          </h3>
          <div className="space-y-2" dir={currentLanguage?.direction || "rtl"}>
            <div className="flex items-center justify-between">
              <div className="flex-1 px-3 py-2 rounded-md bg-white border border-gray-200">
                <div className="text-sm text-gray-500">{translations.firstMed}</div>
                <div className="font-medium">{drugA}</div>
                <div className="text-lg font-bold">{dosageA} {unitA}</div>
              </div>
              
              <div className="px-4 text-pharma-accent">
                {currentLanguage?.direction === 'rtl' ? '◀ يعادل ▶' : '◀ equals ▶'}
              </div>
              
              <div className="flex-1 px-3 py-2 rounded-md bg-white border border-gray-200">
                <div className="text-sm text-gray-500">{translations.secondMed}</div>
                <div className="font-medium">{drugB}</div>
                <div className="text-lg font-bold">{result.dosageB} {result.unitB}</div>
              </div>
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
