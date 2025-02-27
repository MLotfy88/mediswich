
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import MediSwitchLogo from "./MediSwitchLogo";
import { AppLanguage } from "@/types";

interface HeaderProps {
  onLanguageChange: (language: AppLanguage) => void;
}

export default function Header({ onLanguageChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <MediSwitchLogo size="md" />
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-pharma-primary transition-colors">الرئيسية</a>
          <a href="#" className="text-gray-700 hover:text-pharma-primary transition-colors">البحث</a>
          <a href="#" className="text-gray-700 hover:text-pharma-primary transition-colors">عن التطبيق</a>
          <a href="#contact" className="text-gray-700 hover:text-pharma-primary transition-colors">اتصل بنا</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <LanguageSwitcher onLanguageChange={onLanguageChange} />
          <button className="btn-pharma-outline px-4 py-2 text-sm">تسجيل الدخول</button>
          <button className="btn-pharma-primary px-4 py-2 text-sm hidden md:block">إنشاء حساب</button>
        </div>
      </div>
    </header>
  );
}
