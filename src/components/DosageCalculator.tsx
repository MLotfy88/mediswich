
import { useState, useContext, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageContext } from "@/App";
import { getDrugSuggestions } from "@/services/drugService";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

export default function DosageCalculator() {
  const { language } = useContext(LanguageContext);
  const { toast } = useToast();
  
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [drugName, setDrugName] = useState("");
  const [dosagePerKg, setDosagePerKg] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<string | null>(null);

  // للتعامل مع مقترحات الأدوية
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; nameInOtherLanguage?: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drugName.trim()) {
      const fetchSuggestions = async () => {
        // Convert drugName to string explicitly and pass language code
        const suggestionResults = getDrugSuggestions(drugName, language.code);
        setSuggestions(suggestionResults);
      };
      
      fetchSuggestions();
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [drugName, language.code]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setDrugName(suggestion);
    setShowSuggestions(false);
  };
  
  const calculateDosage = () => {
    if (!weight || !drugName || !dosagePerKg || !frequency || !duration) {
      toast({
        title: language.code === 'ar' ? "حقول مفقودة" : "Missing fields",
        description: language.code === 'ar' 
          ? "يرجى ملء جميع الحقول المطلوبة" 
          : "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const weightValue = parseFloat(weight);
    const dosageValue = parseFloat(dosagePerKg);
    const frequencyValue = parseFloat(frequency);
    const durationValue = parseFloat(duration);
    
    if (isNaN(weightValue) || isNaN(dosageValue) || isNaN(frequencyValue) || isNaN(durationValue)) {
      toast({
        title: language.code === 'ar' ? "قيم غير صالحة" : "Invalid values",
        description: language.code === 'ar' 
          ? "يرجى التأكد من إدخال أرقام صالحة" 
          : "Please make sure to enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    // تحويل الوزن إلى كجم إذا كان بالرطل
    const weightInKg = weightUnit === "kg" ? weightValue : weightValue * 0.45359237;
    
    // حساب الجرعة
    const dosagePerDay = weightInKg * dosageValue;
    const dosagePerTime = dosagePerDay / frequencyValue;
    const totalDosage = dosagePerDay * durationValue;
    
    // تنسيق النتيجة
    const resultText = language.code === 'ar'
      ? `الجرعة المحسوبة لـ "${drugName}":
        الجرعة اليومية: ${dosagePerDay.toFixed(2)} مجم
        الجرعة لكل مرة: ${dosagePerTime.toFixed(2)} مجم (${frequencyValue} مرات يوميًا)
        إجمالي الجرعة للمدة كاملة: ${totalDosage.toFixed(2)} مجم (${durationValue} أيام)`
      : `Calculated dosage for "${drugName}":
        Daily dosage: ${dosagePerDay.toFixed(2)} mg
        Dosage per time: ${dosagePerTime.toFixed(2)} mg (${frequencyValue} times per day)
        Total dosage for full duration: ${totalDosage.toFixed(2)} mg (${durationValue} days)`;
    
    setResult(resultText);
    
    toast({
      title: language.code === 'ar' ? "تم حساب الجرعة" : "Dosage calculated",
      description: language.code === 'ar' 
        ? `الجرعة اليومية: ${dosagePerDay.toFixed(2)} مجم` 
        : `Daily dosage: ${dosagePerDay.toFixed(2)} mg`,
    });
  };
  
  // الترجمات
  const translations = {
    title: language.code === 'ar' ? "حاسبة جرعة الدواء" : "Medication Dosage Calculator",
    description: language.code === 'ar' 
      ? "قم بحساب جرعة الدواء بناءً على وزن المريض والجرعة الموصى بها لكل كيلوجرام."
      : "Calculate medication dosage based on patient weight and recommended dosage per kilogram.",
    patientWeight: language.code === 'ar' ? "وزن المريض" : "Patient Weight",
    kg: language.code === 'ar' ? "كجم" : "kg",
    lb: language.code === 'ar' ? "رطل" : "lb",
    drugName: language.code === 'ar' ? "اسم الدواء" : "Medication Name",
    dosagePerKg: language.code === 'ar' ? "الجرعة لكل كجم (مجم)" : "Dosage per kg (mg)",
    frequency: language.code === 'ar' ? "عدد مرات الجرعة يوميًا" : "Dosage frequency per day",
    duration: language.code === 'ar' ? "مدة العلاج (بالأيام)" : "Treatment duration (days)",
    calculate: language.code === 'ar' ? "حساب الجرعة" : "Calculate Dosage",
    calculatedDosage: language.code === 'ar' ? "الجرعة المحسوبة" : "Calculated Dosage",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto" dir={language.direction}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-pharma-primary" size={24} />
        <h2 className="text-xl font-bold text-pharma-primary">{translations.title}</h2>
      </div>
      
      <p className="text-gray-600 mb-6">{translations.description}</p>
      
      <div className="space-y-6">
        {/* وزن المريض */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.patientWeight}
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full"
              />
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={() => setWeightUnit("kg")}
                className={`px-3 py-2 text-sm font-medium ${
                  weightUnit === "kg"
                    ? "bg-pharma-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } rounded-l-md transition-colors border border-r-0 border-gray-300`}
              >
                {translations.kg}
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit("lb")}
                className={`px-3 py-2 text-sm font-medium ${
                  weightUnit === "lb"
                    ? "bg-pharma-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } rounded-r-md transition-colors border border-gray-300`}
              >
                {translations.lb}
              </button>
            </div>
          </div>
        </div>
        
        {/* اسم الدواء */}
        <div className="relative" ref={commandRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.drugName}
          </label>
          <Input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Paracetamol"
            className="w-full"
            onFocus={() => drugName.trim() && setShowSuggestions(true)}
          />
          
          {/* اقتراحات الأدوية */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-md bg-white z-50 overflow-hidden">
              <Command>
                <CommandList className="max-h-64 overflow-auto">
                  <CommandGroup>
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.id}
                        onSelect={() => handleSuggestionClick(suggestion.name)}
                        className="px-4 py-2 hover:bg-pharma-secondary cursor-pointer focus:bg-pharma-secondary"
                      >
                        <div className="flex flex-col w-full" dir={language.direction}>
                          <span className="font-medium">{suggestion.name}</span>
                          {suggestion.nameInOtherLanguage && (
                            <span className="text-xs text-gray-500">
                              {suggestion.nameInOtherLanguage}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
        
        {/* الجرعة لكل كجم */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.dosagePerKg}
          </label>
          <Input
            type="number"
            value={dosagePerKg}
            onChange={(e) => setDosagePerKg(e.target.value)}
            placeholder="10"
            className="w-full"
          />
        </div>
        
        {/* عدد مرات الجرعة يوميًا */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.frequency}
          </label>
          <Input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="3"
            className="w-full"
          />
        </div>
        
        {/* مدة العلاج */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.duration}
          </label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="5"
            className="w-full"
          />
        </div>
        
        {/* زر حساب الجرعة */}
        <Button
          onClick={calculateDosage}
          className="w-full bg-pharma-primary hover:bg-pharma-primary/90"
        >
          {translations.calculate}
        </Button>
        
        {/* النتيجة */}
        {result && (
          <div className="mt-6 p-4 bg-pharma-secondary rounded-lg">
            <h3 className="font-medium text-pharma-primary mb-2">
              {translations.calculatedDosage}
            </h3>
            <div className="whitespace-pre-line text-gray-700">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
