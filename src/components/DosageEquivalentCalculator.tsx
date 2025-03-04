import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDrugSuggestions, getAlternativeSuggestions } from "@/services/drugSearchService";
import { useToast } from "@/hooks/use-toast";
import { LanguageContext } from "@/App";

type EquivalentRecord = {
  id: string;
  drugId1: string;
  drugName1: string;
  dose1: number;
  drugId2: string;
  drugName2: string;
  dose2: number;
  date: Date;
};

const DosageEquivalentCalculator = () => {
  const { language } = useContext(LanguageContext);
  const [drugId1, setDrugId1] = useState("");
  const [drugId2, setDrugId2] = useState("");
  const [drugName1, setDrugName1] = useState("");
  const [drugName2, setDrugName2] = useState("");
  const [dose1, setDose1] = useState<number | "">("");
  const [dose2, setDose2] = useState<number | null>(null);
  const [activeDrug, setActiveDrug] = useState<"drug1" | "drug2" | null>(null);
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; nameInOtherLanguage?: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<EquivalentRecord[]>([]);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load calculation history from local storage
    const savedHistory = localStorage.getItem("equivalentCalculationHistory");
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
    if (activeDrug) {
      if (activeDrug === "drug1") {
        if (drugName1.trim().length < 2) {
          setSuggestions([]);
          return;
        }
        
        // Fetch general drug suggestions for drug1
        const drugSuggestions = getDrugSuggestions(drugName1, language.code);
        setSuggestions(drugSuggestions);
        setShowSuggestions(drugSuggestions.length > 0);
      } else if (activeDrug === "drug2") {
        if (drugName2.trim().length < 2) {
          setSuggestions([]);
          return;
        }
        
        // If we have a first drug selected, show its alternatives
        if (drugId1) {
          const altSuggestions = getAlternativeSuggestions(drugId1, drugName2, language.code);
          setSuggestions(altSuggestions);
          setShowSuggestions(altSuggestions.length > 0);
        } else {
          // Otherwise show general drug suggestions
          const drugSuggestions = getDrugSuggestions(drugName2, language.code);
          setSuggestions(drugSuggestions);
          setShowSuggestions(drugSuggestions.length > 0);
        }
      }
    }
  }, [drugName1, drugName2, drugId1, activeDrug, language.code]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setActiveDrug(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateEquivalentDose = () => {
    if (!drugName1.trim() || !drugName2.trim()) {
      toast({
        title: language.code === 'ar' ? "خطأ" : "Error",
        description: language.code === 'ar' 
          ? "يرجى إدخال اسم الدوائين" 
          : "Please enter both medication names",
        variant: "destructive",
      });
      return;
    }

    if (dose1 === "" || isNaN(Number(dose1)) || Number(dose1) <= 0) {
      toast({
        title: language.code === 'ar' ? "خطأ" : "Error",
        description: language.code === 'ar' 
          ? "يرجى إدخال جرعة صحيحة للدواء الأول" 
          : "Please enter a valid dose for the first medication",
        variant: "destructive",
      });
      return;
    }

    // Simple equivalent dose calculation (for demonstration)
    // In a real app, this would use drug-specific conversion factors
    const dose1Num = typeof dose1 === 'number' ? dose1 : Number(dose1);
    
    // Sample calculation - in a real app this would use a database of conversion factors
    const conversionFactor = 1.2; // Just a sample factor
    const calculatedDose = Math.round((dose1Num * conversionFactor) * 10) / 10;

    setDose2(calculatedDose);

    // Add to history
    const newRecord: EquivalentRecord = {
      id: Date.now().toString(),
      drugId1,
      drugName1,
      dose1: dose1Num,
      drugId2,
      drugName2,
      dose2: calculatedDose,
      date: new Date()
    };

    const updatedHistory = [newRecord, ...calculationHistory].slice(0, 10); // Keep only the last 10 records
    setCalculationHistory(updatedHistory);

    // Save to local storage
    localStorage.setItem("equivalentCalculationHistory", JSON.stringify(updatedHistory));

    toast({
      title: language.code === 'ar' ? "تم الحساب" : "Calculation Complete",
      description: language.code === 'ar' 
        ? `الجرعة المكافئة من "${drugName2}" هي ${calculatedDose} مجم` 
        : `Equivalent dose of "${drugName2}" is ${calculatedDose} mg`,
    });
  };

  const handleDrugNameChange = (e: React.ChangeEvent<HTMLInputElement>, drugField: "drug1" | "drug2") => {
    const value = e.target.value;
    if (drugField === "drug1") {
      setDrugName1(value);
    } else {
      setDrugName2(value);
    }
    
    setActiveDrug(drugField);
    
    if (value.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { id: string; name: string }) => {
    if (activeDrug === "drug1") {
      setDrugName1(suggestion.name);
      setDrugId1(suggestion.id);
    } else if (activeDrug === "drug2") {
      setDrugName2(suggestion.name);
      setDrugId2(suggestion.id);
    }
    setShowSuggestions(false);
    setActiveDrug(null);
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
          {language.code === 'ar' ? 'حاسبة الجرعات المتكافئة' : 'Equivalent Calculator'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language.code === 'ar' ? 'السجل' : 'History'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calculator" className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language.code === 'ar' ? 'حاسبة الجرعات المتكافئة للأدوية' : 'Medication Equivalent Dose Calculator'}
            </CardTitle>
            <CardDescription>
              {language.code === 'ar'
                ? 'أدخل اسم الدوائين وجرعة الدواء الأول لحساب الجرعة المكافئة للدواء الثاني'
                : 'Enter two medications and the dose of the first one to calculate the equivalent dose of the second'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2 relative">
                <Label htmlFor="drugName1">
                  {language.code === 'ar' ? 'الدواء الأول' : 'First Medication'}
                </Label>
                <div className="relative">
                  <Input
                    id="drugName1"
                    ref={inputRef1}
                    placeholder={language.code === 'ar' ? 'ادخل اسم الدواء الأول' : 'Enter first medication name'}
                    value={drugName1}
                    onChange={(e) => handleDrugNameChange(e, "drug1")}
                    onFocus={() => {
                      setActiveDrug("drug1");
                      drugName1.trim().length >= 2 && setShowSuggestions(true);
                    }}
                    className="w-full"
                    dir={language.direction}
                  />
                </div>
                
                {activeDrug === "drug1" && showSuggestions && suggestions.length > 0 && (
                  <div 
                    ref={suggestionsRef}
                    className="absolute z-50 mt-1 w-full bg-white rounded-lg border shadow-md"
                  >
                    <ul className="py-1 max-h-64 overflow-auto">
                      {suggestions.map((suggestion) => (
                        <li 
                          key={suggestion.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{suggestion.name}</span>
                            {suggestion.nameInOtherLanguage && (
                              <span className="text-xs text-gray-500">
                                ({suggestion.nameInOtherLanguage})
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dose1">
                  {language.code === 'ar' ? 'جرعة الدواء الأول (مجم)' : 'First Medication Dose (mg)'}
                </Label>
                <Input
                  id="dose1"
                  type="number"
                  placeholder={language.code === 'ar' ? 'ادخل الجرعة' : 'Enter dose'}
                  value={dose1}
                  onChange={(e) => setDose1(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full"
                  min="0"
                  step="0.1"
                  dir="ltr" // Numbers are always left-to-right
                />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="drugName2">
                  {language.code === 'ar' ? 'الدواء الثاني' : 'Second Medication'}
                </Label>
                <div className="relative">
                  <Input
                    id="drugName2"
                    ref={inputRef2}
                    placeholder={language.code === 'ar' ? 'ادخل اسم الدواء الثاني' : 'Enter second medication name'}
                    value={drugName2}
                    onChange={(e) => handleDrugNameChange(e, "drug2")}
                    onFocus={() => {
                      setActiveDrug("drug2");
                      drugName2.trim().length >= 2 && setShowSuggestions(true);
                    }}
                    className="w-full"
                    dir={language.direction}
                  />
                </div>
                
                {activeDrug === "drug2" && showSuggestions && suggestions.length > 0 && (
                  <div 
                    ref={suggestionsRef}
                    className="absolute z-50 mt-1 w-full bg-white rounded-lg border shadow-md"
                  >
                    <ul className="py-1 max-h-64 overflow-auto">
                      {suggestions.map((suggestion) => (
                        <li 
                          key={suggestion.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{suggestion.name}</span>
                            {suggestion.nameInOtherLanguage && (
                              <span className="text-xs text-gray-500">
                                ({suggestion.nameInOtherLanguage})
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {dose2 !== null && (
                <div className="p-4 bg-pharma-secondary/50 rounded-lg mt-4">
                  <p className="font-medium text-center" dir={language.direction}>
                    {language.code === 'ar'
                      ? `الجرعة المكافئة للدواء الثاني: ${dose2} مجم`
                      : `Equivalent Dose of Second Medication: ${dose2} mg`}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={calculateEquivalentDose} 
              className="w-full"
            >
              {language.code === 'ar' ? 'حساب الجرعة المكافئة' : 'Calculate Equivalent Dose'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language.code === 'ar' ? 'سجل حسابات الجرعات المتكافئة' : 'Equivalent Dose Calculation History'}
            </CardTitle>
            <CardDescription>
              {language.code === 'ar'
                ? 'عرض آخر 10 حسابات للجرعات المتكافئة'
                : 'View the last 10 equivalent dose calculations'}
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">{record.drugName1}</h4>
                        <p className="text-pharma-primary font-medium">
                          {language.code === 'ar'
                            ? `${record.dose1} مجم`
                            : `${record.dose1} mg`}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">{record.drugName2}</h4>
                        <p className="text-pharma-primary font-medium">
                          {language.code === 'ar'
                            ? `${record.dose2} مجم`
                            : `${record.dose2} mg`}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">
                      {formatDate(record.date)}
                    </p>
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

export default DosageEquivalentCalculator;
