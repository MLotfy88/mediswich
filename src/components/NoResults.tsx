
import { Search } from "lucide-react";
import { AppLanguage } from "@/types";

interface NoResultsProps {
  title?: string;
  description?: string;
  currentLanguage?: AppLanguage;
}

export default function NoResults({ 
  title, 
  description,
  currentLanguage = { code: 'ar', direction: 'rtl' }
}: NoResultsProps) {
  const defaultTitle = currentLanguage.code === 'ar' 
    ? "لم يتم العثور على نتائج" 
    : "No Results Found";
  
  const defaultDescription = currentLanguage.code === 'ar'
    ? "لم نتمكن من العثور على أدوية تطابق استعلام البحث الخاص بك. يرجى تجربة كلمات رئيسية مختلفة."
    : "We couldn't find any medications matching your search query. Please try different keywords.";

  return (
    <div 
      className="flex flex-col items-center justify-center text-center py-16"
      dir={currentLanguage.direction}
    >
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-gray-500 max-w-md">
        {description || defaultDescription}
      </p>
    </div>
  );
}
