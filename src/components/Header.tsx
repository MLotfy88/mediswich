
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

const Header = ({ onLanguageChange }: HeaderProps) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLanguage: AppLanguage = 
      language.code === 'ar' 
        ? { code: 'en', direction: 'ltr' } 
        : { code: 'ar', direction: 'rtl' };
    
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <MediSwitchLogo className="h-10 w-auto" />
            <span className="text-pharma-primary font-semibold text-xl ms-2 hidden sm:inline">
              {language.code === 'ar' ? 'ميدي سويتش' : 'MediSwitch'}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-pharma-primary"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-pharma-primary transition-colors"
              dir={language.direction}
            >
              {language.code === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              to="/calculator/dosage" 
              className="text-gray-700 hover:text-pharma-primary transition-colors"
              dir={language.direction}
            >
              {language.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator'}
            </Link>
            <Link 
              to="/calculator/equivalent" 
              className="text-gray-700 hover:text-pharma-primary transition-colors"
              dir={language.direction}
            >
              {language.code === 'ar' ? 'حاسبة المكافئات' : 'Equivalent Calculator'}
            </Link>
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={toggleLanguage} 
            />
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2" dir={language.direction}>
              <li>
                <Link 
                  to="/" 
                  className="block py-2 text-gray-700 hover:text-pharma-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language.code === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/calculator/dosage" 
                  className="block py-2 text-gray-700 hover:text-pharma-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/calculator/equivalent" 
                  className="block py-2 text-gray-700 hover:text-pharma-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language.code === 'ar' ? 'حاسبة المكافئات' : 'Equivalent Calculator'}
                </Link>
              </li>
              <li className="pt-2 border-t">
                <div className="flex justify-start">
                  <LanguageSwitcher 
                    currentLanguage={language} 
                    onLanguageChange={toggleLanguage} 
                  />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
