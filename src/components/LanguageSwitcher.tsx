
import { useState } from 'react';
import { AppLanguage } from '@/types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  onLanguageChange: (language: AppLanguage) => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<AppLanguage>({ code: 'ar', direction: 'rtl' });

  const toggleLanguage = () => {
    const newLang: AppLanguage = 
      currentLang.code === 'ar' 
        ? { code: 'en', direction: 'ltr' } 
        : { code: 'ar', direction: 'rtl' };
    
    setCurrentLang(newLang);
    onLanguageChange(newLang);
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      className="inline-flex items-center space-x-1 px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
      title={currentLang.code === 'ar' ? 'Switch to English' : 'التبديل للغة العربية'}
    >
      <Globe size={18} />
      <span>{currentLang.code === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
}
