
import { useState } from "react";
import { EquivalentDosage } from "@/types";

export default function DosageEquivalentCalculator() {
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
  
  // Predefined conversion table examples
  const predefinedConversions = [
    { drugA: "ميتفورمين", drugB: "جليبنكلاميد", ratio: 0.01 },
    { drugA: "إيناليدوم", drugB: "كابتوبريل", ratio: 0.5 },
    { drugA: "أتورفاستاتين", drugB: "سيمفاستاتين", ratio: 2 },
    { drugA: "كونكور", drugB: "بيسوكور", ratio: 1 },
    { drugA: "فياجرا", drugB: "سيلدينافيل", ratio: 1 },
  ];
  
  const handleSelectPredefined = (conversion: { drugA: string; drugB: string; ratio: number }) => {
    setDrugA(conversion.drugA);
    setDrugB(conversion.drugB);
    setConversionRatio(conversion.ratio.toString());
  };
  
  const calculateEquivalent = () => {
    if (!drugA || !dosageA || !drugB || !conversionRatio) {
      setError("يرجى إدخال جميع البيانات المطلوبة");
      return;
    }
    
    try {
      const dosageValue = parseFloat(dosageA);
      const ratioValue = parseFloat(conversionRatio);
      
      if (isNaN(dosageValue) || isNaN(ratioValue)) {
        throw new Error("تأكد من إدخال أرقام صحيحة");
      }
      
      if (dosageValue <= 0 || ratioValue <= 0) {
        throw new Error("يجب أن تكون جميع القيم موجبة");
      }
      
      // Calculate equivalent dosage
      const equivalentDosage = dosageValue * ratioValue;
      
      setResult({
        dosageB: Math.round(equivalentDosage * 100) / 100,
        unitB: unitA // Using the same unit for now
      });
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء الحساب");
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
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
      <h2 className="text-xl font-bold mb-6 text-pharma-accent" dir="rtl">حاسبة الجرعات المكافئة</h2>
      
      <div className="mb-6 bg-pharma-secondary/50 rounded-md p-4">
        <h3 className="text-sm font-bold mb-2 text-gray-700" dir="rtl">اختر من التحويلات الشائعة:</h3>
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
          <div>
            <label htmlFor="drugA" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              الدواء الأول
            </label>
            <input
              id="drugA"
              type="text"
              value={drugA}
              onChange={(e) => setDrugA(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
              placeholder="أدخل اسم الدواء الأول"
            />
          </div>
          
          <div>
            <label htmlFor="drugB" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              الدواء الثاني
            </label>
            <input
              id="drugB"
              type="text"
              value={drugB}
              onChange={(e) => setDrugB(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-accent focus:border-pharma-accent"
              placeholder="أدخل اسم الدواء الثاني"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label htmlFor="dosageA" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              جرعة الدواء الأول
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
                <option value="mg">مجم</option>
                <option value="mcg">ميكروجرام</option>
                <option value="g">جرام</option>
                <option value="ml">مل</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="conversionRatio" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              معامل التحويل
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
            حساب الجرعة المكافئة
          </button>
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            إعادة تعيين
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md" dir="rtl">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-6 p-4 border border-pharma-accent/20 rounded-md bg-pharma-accent/5">
          <h3 className="text-lg font-bold mb-3 text-pharma-accent" dir="rtl">نتائج الحساب:</h3>
          <div className="space-y-2" dir="rtl">
            <div className="flex items-center justify-between">
              <div className="flex-1 px-3 py-2 rounded-md bg-white border border-gray-200">
                <div className="text-sm text-gray-500">الدواء الأول</div>
                <div className="font-medium">{drugA}</div>
                <div className="text-lg font-bold">{dosageA} {unitA}</div>
              </div>
              
              <div className="px-4 text-pharma-accent">
                ◀ يعادل ▶
              </div>
              
              <div className="flex-1 px-3 py-2 rounded-md bg-white border border-gray-200">
                <div className="text-sm text-gray-500">الدواء الثاني</div>
                <div className="font-medium">{drugB}</div>
                <div className="text-lg font-bold">{result.dosageB} {result.unitB}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm" dir="rtl">
            <strong>ملاحظة:</strong> هذه النتائج استرشادية فقط. يرجى دائما مراجعة الطبيب المعالج أو الصيدلي قبل تغيير الأدوية أو الجرعات.
          </div>
        </div>
      )}
    </div>
  );
}
