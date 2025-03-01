import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MediSwitchLogo from "./MediSwitchLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { AppLanguage } from "@/types";
import { Menu, X } from "lucide-react";
import { LanguageContext } from "@/App";

interface HeaderProps {
  onLanguageChange?: (language: AppLanguage) => void;
  currentLanguage?: AppLanguage;
}

const Header: React.FC<HeaderProps> = ({ 
  onLanguageChange, 
  currentLanguage = { code: 'ar', direction: 'rtl' } 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLanguageChange = (newLanguage: AppLanguage) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const translations = {
    home: currentLanguage.code === 'ar' ? 'الرئيسية' : 'Home',
    dosageCalculator: currentLanguage.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator',
    equivalentCalculator: currentLanguage.code === 'ar' ? 'حاسبة الجرعات المتكافئة' : 'Equivalent Calculator',
    about: currentLanguage.code === 'ar' ? 'عن المشروع' : 'About'
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="block">
              <MediSwitchLogo />
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="flex items-center text-gray-600"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link 
              to="/" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors" 
              dir={currentLanguage.direction}
            >
              {translations.home}
            </Link>
            <Link 
              to="/calculator/dosage" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors" 
              dir={currentLanguage.direction}
            >
              {translations.dosageCalculator}
            </Link>
            <Link 
              to="/calculator/equivalent" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors" 
              dir={currentLanguage.direction}
            >
              {translations.equivalentCalculator}
            </Link>
            <LanguageSwitcher 
              onLanguageChange={handleLanguageChange} 
              currentLanguage={currentLanguage}
            />
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4" dir={currentLanguage.direction}>
            <Link 
              to="/" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.home}
            </Link>
            <Link 
              to="/calculator/dosage" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.dosageCalculator}
            </Link>
            <Link 
              to="/calculator/equivalent" 
              className="text-pharma-primary hover:text-pharma-accent transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.equivalentCalculator}
            </Link>
            <div className="pt-2">
              <LanguageSwitcher 
                onLanguageChange={handleLanguageChange} 
                currentLanguage={currentLanguage}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
