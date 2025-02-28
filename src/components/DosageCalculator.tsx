
import { useState } from "react";
import { DosageCalculation } from "@/types";

export default function DosageCalculator() {
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
  
  const calculateDosage = () => {
    if (!patientWeight || !drugName || !dosagePerKg) {
      setError("يرجى إدخال جميع البيانات المطلوبة");
      return;
    }
    
    try {
      // Convert inputs to numbers
      const weightValue = parseFloat(patientWeight);
      const dosageValue = parseFloat(dosagePerKg);
      const frequencyValue = parseInt(frequency);
      const durationValue = parseInt(duration);
      
      if (isNaN(weightValue) || isNaN(dosageValue) || isNaN(frequencyValue) || isNaN(durationValue)) {
        throw new Error("تأكد من إدخال أرقام صحيحة");
      }
      
      if (weightValue <= 0 || dosageValue <= 0 || frequencyValue <= 0 || durationValue <= 0) {
        throw new Error("يجب أن تكون جميع القيم موجبة");
      }
      
      // Convert weight to kg if needed
      const weightInKg = weightUnit === "lb" ? weightValue * 0.45359237 : weightValue;
      
      // Calculate dosage
      const singleDose = weightInKg * dosageValue;
      const dailyDose = singleDose * frequencyValue;
      const totalDose = dailyDose * durationValue;
      
      setCalculatedResult({
        singleDose: Math.round(singleDose * 100) / 100,
        dailyDose: Math.round(dailyDose * 100) / 100,
        totalDose: Math.round(totalDose * 100) / 100,
        unit: "mg" // Default unit, could be parameterized later
      });
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء الحساب");
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
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
      <h2 className="text-xl font-bold mb-6 text-pharma-primary" dir="rtl">حاسبة جرعة الدواء</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="patientWeight" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              وزن المريض
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
                <option value="kg">كجم</option>
                <option value="lb">رطل</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              اسم الدواء
            </label>
            <input
              id="drugName"
              type="text"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
              placeholder="أدخل اسم الدواء"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="dosagePerKg" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
            الجرعة لكل كيلوجرام (مجم / كجم)
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
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              عدد مرات الجرعة يوميا
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-pharma-primary focus:border-pharma-primary"
            >
              <option value="1">مرة واحدة يوميا</option>
              <option value="2">مرتين يوميا</option>
              <option value="3">ثلاث مرات يوميا</option>
              <option value="4">أربع مرات يوميا</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              مدة العلاج (بالأيام)
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
            حساب الجرعة
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
      
      {calculatedResult && (
        <div className="mt-6 p-4 border border-pharma-primary/20 rounded-md bg-pharma-primary/5">
          <h3 className="text-lg font-bold mb-3 text-pharma-primary" dir="rtl">نتائج الحساب:</h3>
          <div className="space-y-2 text-gray-700" dir="rtl">
            <div className="flex justify-between">
              <span>الجرعة المفردة:</span>
              <span className="font-medium">{calculatedResult.singleDose} {calculatedResult.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>الجرعة اليومية:</span>
              <span className="font-medium">{calculatedResult.dailyDose} {calculatedResult.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>الجرعة الإجمالية للفترة العلاجية:</span>
              <span className="font-medium">{calculatedResult.totalDose} {calculatedResult.unit}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm" dir="rtl">
            <strong>ملاحظة:</strong> هذه النتائج استرشادية فقط. يرجى دائما مراجعة الطبيب المعالج أو الصيدلي قبل اتخاذ أي إجراء.
          </div>
        </div>
      )}
    </div>
  );
}
