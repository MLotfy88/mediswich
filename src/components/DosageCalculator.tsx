
import { useState, useEffect, useRef, useContext } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDrugSuggestions } from "@/services/drugService";
import { useToast } from "@/hooks/use-toast";
import { LanguageContext } from "@/App";

type DosageRecord = {
  id: string;
  drugName: string;
  weight: number;
  dosage: number;
  date: Date;
};

const DosageCalculator = () => {
  const { language } = useContext(LanguageContext);
  const [drugName, setDrugName] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; nameInOtherLanguage?: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [weight, setWeight] = useState<number | "">("");
  const [result, setResult] = useState<number | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<DosageRecord[]>([]);
  const commandRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load calculation history from local storage
    const savedHistory = localStorage.getItem("dosageCalculationHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setCalculationHistory(parsedHistory.map((record: any) => ({
          ...record,
          date: new Date(record.date)
        })));
      } catch (error) {
        console.error("Failed to parse history from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (drugName.trim()) {
      const fetchSuggestions = async () => {
        const suggestionResults = getDrugSuggestions(drugName, language.code);
        setSuggestions(suggestionResults);
      };
      
      fetchSuggestions();
    } else {
      setSuggestions([]);
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

  const calculateDosage = () => {
    if (!drugName.trim()) {
      toast({
        title: language.code === 'ar' ? "خطأ" : "Error",
        description: language.code === 'ar' 
          ? "يرجى إدخال اسم الدواء" 
          : "Please enter a medication name",
        variant: "destructive",
      });
      return;
    }

    if (weight === "" || isNaN(Number(weight)) || Number(weight) <= 0) {
      toast({
        title: language.code === 'ar' ? "خطأ" : "Error",
        description: language.code === 'ar' 
          ? "يرجى إدخال وزن صحيح (بالكيلوجرام)" 
          : "Please enter a valid weight (in kg)",
        variant: "destructive",
      });
      return;
    }

    // Simple dosage calculation (for demonstration)
    // In a real app, this would use more sophisticated formulas and drug-specific data
    const weightNum = Number(weight);
    const calculatedDosage = Math.round((weightNum * 0.5) * 10) / 10; // Just a sample calculation

    setResult(calculatedDosage);

    // Add to history
    const newRecord: DosageRecord = {
      id: Date.now().toString(),
      drugName,
      weight: weightNum,
      dosage: calculatedDosage,
      date: new Date()
    };

    const updatedHistory = [newRecord, ...calculationHistory].slice(0, 10); // Keep only the last 10 records
    setCalculationHistory(updatedHistory);

    // Save to local storage
    localStorage.setItem("dosageCalculationHistory", JSON.stringify(updatedHistory));

    toast({
      title: language.code === 'ar' ? "تم الحساب" : "Calculation Complete",
      description: language.code === 'ar' 
        ? `الجرعة المحسوبة لـ "${drugName}" هي ${calculatedDosage} مجم` 
        : `Calculated dosage for "${drugName}" is ${calculatedDosage} mg`,
    });
  };

  const handleDrugNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDrugName(value);
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setDrugName(suggestion);
    setShowSuggestions(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language.code === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Tabs defaultValue="calculator" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="calculator">
          {language.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language.code === 'ar' ? 'السجل' : 'History'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calculator" className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>{language.code === 'ar' ? 'حاسبة جرعة الدواء' : 'Medication Dosage Calculator'}</CardTitle>
            <CardDescription>
              {language.code === 'ar'
                ? 'أدخل اسم الدواء ووزن المريض لحساب الجرعة المناسبة'
                : 'Enter medication name and patient weight to calculate the appropriate dosage'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drugName">
                {language.code === 'ar' ? 'اسم الدواء' : 'Medication Name'}
              </Label>
              <div ref={commandRef} className="relative">
                <Input
                  id="drugName"
                  placeholder={language.code === 'ar' ? 'ادخل اسم الدواء' : 'Enter medication name'}
                  value={drugName}
                  onChange={handleDrugNameChange}
                  onFocus={() => drugName.trim() && setShowSuggestions(true)}
                  className="w-full"
                  dir={language.direction}
                />

                {showSuggestions && suggestions.length > 0 && (
                  <Command className="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-md bg-white z-50">
                    <CommandList>
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
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">
                {language.code === 'ar' ? 'وزن المريض (كجم)' : 'Patient Weight (kg)'}
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={language.code === 'ar' ? 'ادخل الوزن' : 'Enter weight'}
                value={weight}
                onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full"
                min="0"
                step="0.1"
                dir="ltr" // Numbers are always left-to-right
              />
            </div>

            {result !== null && (
              <div className="p-4 bg-pharma-secondary/50 rounded-lg mt-4">
                <p className="font-medium text-center" dir={language.direction}>
                  {language.code === 'ar'
                    ? `الجرعة المناسبة: ${result} مجم`
                    : `Appropriate Dosage: ${result} mg`}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={calculateDosage} 
              className="w-full"
            >
              {language.code === 'ar' ? 'حساب الجرعة' : 'Calculate Dosage'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>{language.code === 'ar' ? 'سجل الحسابات' : 'Calculation History'}</CardTitle>
            <CardDescription>
              {language.code === 'ar'
                ? 'عرض آخر 10 حسابات للجرعات'
                : 'View the last 10 dosage calculations'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {calculationHistory.length === 0 ? (
              <p className="text-center text-gray-500 my-8" dir={language.direction}>
                {language.code === 'ar'
                  ? 'لا توجد حسابات سابقة'
                  : 'No previous calculations'}
              </p>
            ) : (
              <div className="space-y-4">
                {calculationHistory.map((record) => (
                  <div 
                    key={record.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    dir={language.direction}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{record.drugName}</h4>
                        <p className="text-sm text-gray-500">
                          {language.code === 'ar'
                            ? `الوزن: ${record.weight} كجم`
                            : `Weight: ${record.weight} kg`}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-pharma-primary font-medium">
                          {language.code === 'ar'
                            ? `${record.dosage} مجم`
                            : `${record.dosage} mg`}
                        </span>
                        <p className="text-xs text-gray-400">{formatDate(record.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DosageCalculator;
