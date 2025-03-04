
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MediSwitchLogo from "./MediSwitchLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { AppLanguage } from "@/types";
import { Menu, X, Pill, Calculator, Info, GitCompare } from "lucide-react";
import { LanguageContext } from "@/App";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";

interface HeaderProps {
  onLanguageChange?: (language: AppLanguage) => void;
  currentLanguage?: AppLanguage;
}

const Header: React.FC<HeaderProps> = ({ 
  onLanguageChange, 
  currentLanguage = { code: 'ar', direction: 'rtl' } 
}) => {
  const { language } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLanguageChange = (newLanguage: AppLanguage) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const translations = {
    home: currentLanguage.code === 'ar' ? 'بحث عن بدائل' : 'Find Alternatives',
    dosageCalculator: currentLanguage.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator',
    equivalentCalculator: currentLanguage.code === 'ar' ? 'حاسبة الجرعات المتكافئة' : 'Equivalent Calculator',
    about: currentLanguage.code === 'ar' ? 'عن المشروع' : 'About',
    menu: currentLanguage.code === 'ar' ? 'القائمة' : 'Menu'
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GitCompare className="text-pharma-primary h-8 w-8 mr-2 rtl:ml-2 rtl:mr-0" />
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher 
              onLanguageChange={handleLanguageChange} 
              currentLanguage={language}
            />
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-pharma-primary p-2 rounded-md hover:bg-pharma-primary/10 transition-colors"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              
              <SheetContent
                side={language.direction === 'rtl' ? 'right' : 'left'}
                className="w-[250px] sm:w-[300px]"
              >
                <SheetHeader>
                  <SheetTitle dir={language.direction} className="text-pharma-primary">
                    {translations.menu}
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col mt-6" dir={language.direction}>
                  <Link 
                    to="/" 
                    className="flex items-center py-3 px-2 text-gray-700 hover:bg-pharma-secondary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <GitCompare className={language.direction === 'rtl' ? 'ml-3' : 'mr-3'} size={20} />
                    {translations.home}
                  </Link>
                  
                  <Link 
                    to="/calculator/dosage" 
                    className="flex items-center py-3 px-2 text-gray-700 hover:bg-pharma-secondary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calculator className={language.direction === 'rtl' ? 'ml-3' : 'mr-3'} size={20} />
                    {translations.dosageCalculator}
                  </Link>
                  
                  <Link 
                    to="/calculator/equivalent" 
                    className="flex items-center py-3 px-2 text-gray-700 hover:bg-pharma-secondary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calculator className={language.direction === 'rtl' ? 'ml-3' : 'mr-3'} size={20} />
                    {translations.equivalentCalculator}
                  </Link>
                  
                  <Link 
                    to="/about" 
                    className="flex items-center py-3 px-2 text-gray-700 hover:bg-pharma-secondary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Info className={language.direction === 'rtl' ? 'ml-3' : 'mr-3'} size={20} />
                    {translations.about}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
