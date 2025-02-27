
import { useState, useEffect } from "react";
import { FilterOptions } from "@/types";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [country, setCountry] = useState<string | null>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  
  // Update parent component with filter changes
  useEffect(() => {
    onFilterChange({
      country,
      priceRange: {
        min: priceRange[0],
        max: priceRange[1]
      }
    });
  }, [country, priceRange, onFilterChange]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-in">
      <h3 className="text-lg font-medium mb-4 text-pharma-primary">تصفية النتائج</h3>
      
      <div className="space-y-6">
        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block" dir="rtl">دولة التصنيع</label>
          <Select
            value={country || "all"}
            onValueChange={(value) => setCountry(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="كل الدول" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الدول</SelectItem>
              <SelectItem value="egyptian">مصر فقط</SelectItem>
              <SelectItem value="international">دولي فقط</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range Filter */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700" dir="rtl">نطاق السعر (جنيه مصري)</label>
            <span className="text-sm text-gray-500 ltr:text-left rtl:text-right">
              {priceRange[0]} - {priceRange[1]}
            </span>
          </div>
          
          <Slider
            defaultValue={[0, 200]}
            min={0}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
}
