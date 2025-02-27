
import { Info } from "lucide-react";

interface NoResultsProps {
  query: string;
}

export default function NoResults({ query }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm border border-border text-center animate-fade-in max-w-md mx-auto">
      <Info className="text-pharma-primary mb-4" size={32} />
      <h3 className="text-xl font-medium text-gray-900 mb-2" dir="rtl">
        لا توجد نتائج لـ "{query}"
      </h3>
      <p className="text-gray-600 mb-4" dir="rtl">
        هل تبحث عن دواء مصري؟ تواصل مع خدمة العملاء لدينا للمساعدة.
      </p>
      <button 
        className="btn-pharma-primary px-4 py-2"
        onClick={() => window.location.href = "#contact"}
      >
        تواصل معنا
      </button>
    </div>
  );
}
