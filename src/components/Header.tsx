
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import MediSwitchLogo from "./MediSwitchLogo";
import { AppLanguage } from "@/types";
import { UserCircle, LogIn, UserPlus, ChevronDown, Calculator, Search, Info, Mail, Menu } from "lucide-react";

interface HeaderProps {
  onLanguageChange: (language: AppLanguage) => void;
  currentLanguage?: AppLanguage;
}

export default function Header({ onLanguageChange, currentLanguage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const authMenuRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setShowAuthMenu(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const translations = {
    search: currentLanguage?.code === 'en' ? 'Search' : 'البحث',
    calculator: currentLanguage?.code === 'en' ? 'Dosage Calculator' : 'حاسبة الجرعات',
    weightCalculator: currentLanguage?.code === 'en' ? 'Weight Calculator' : 'حاسبة الوزن',
    equivalentCalculator: currentLanguage?.code === 'en' ? 'Equivalent Calculator' : 'حاسبة المكافئات',
    about: currentLanguage?.code === 'en' ? 'About' : 'عن التطبيق',
    contact: currentLanguage?.code === 'en' ? 'Contact' : 'اتصل بنا',
    login: currentLanguage?.code === 'en' ? 'Login' : 'تسجيل الدخول',
    register: currentLanguage?.code === 'en' ? 'Register' : 'إنشاء حساب جديد',
    menu: currentLanguage?.code === 'en' ? 'Menu' : 'القائمة'
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Navigation Menu Button */}
        <div className="flex-1 flex justify-start">
          <div className="relative" ref={navMenuRef}>
            <button 
              onClick={() => setShowNavMenu(!showNavMenu)}
              className={`
                flex items-center space-x-1 px-3 py-2 rounded-full
                ${showNavMenu 
                  ? 'bg-pharma-primary text-white' 
                  : 'bg-pharma-primary/10 text-pharma-primary hover:bg-pharma-primary/20'
                } 
                transition-all duration-200
              `}
              aria-label={translations.menu}
            >
              <Menu size={22} />
              <ChevronDown size={16} className={`transform transition-transform ${showNavMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Navigation Menu Dropdown */}
            {showNavMenu && (
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                <div className="py-2">
                  <Link 
                    to="/"
                    className={`flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors ${
                      location.pathname === '/' ? 'bg-pharma-primary/5 font-medium' : ''
                    }`}
                    onClick={() => setShowNavMenu(false)}
                  >
                    <Search className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>{translations.search}</span>
                  </Link>
                  <Link 
                    to="/calculator/dosage"
                    className={`flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors ${
                      location.pathname === '/calculator/dosage' ? 'bg-pharma-primary/5 font-medium' : ''
                    }`}
                    onClick={() => setShowNavMenu(false)}
                  >
                    <Calculator className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>{translations.weightCalculator}</span>
                  </Link>
                  <Link 
                    to="/calculator/equivalent"
                    className={`flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors ${
                      location.pathname === '/calculator/equivalent' ? 'bg-pharma-primary/5 font-medium' : ''
                    }`}
                    onClick={() => setShowNavMenu(false)}
                  >
                    <Calculator className="mr-2 h-5 w-5 text-pharma-accent" />
                    <span>{translations.equivalentCalculator}</span>
                  </Link>
                  <Link 
                    to="/about"
                    className={`flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors ${
                      location.pathname === '/about' ? 'bg-pharma-primary/5 font-medium' : ''
                    }`}
                    onClick={() => setShowNavMenu(false)}
                  >
                    <Info className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>{translations.about}</span>
                  </Link>
                  <Link 
                    to="/contact"
                    className={`flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors ${
                      location.pathname === '/contact' ? 'bg-pharma-primary/5 font-medium' : ''
                    }`}
                    onClick={() => setShowNavMenu(false)}
                  >
                    <Mail className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>{translations.contact}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center flex-1">
          <Link to="/">
            <MediSwitchLogo size="md" />
          </Link>
        </div>
        
        <div className="flex items-center justify-end space-x-4 flex-1">
          <LanguageSwitcher onLanguageChange={onLanguageChange} currentLanguage={currentLanguage} />
          
          {/* Auth Menu Button */}
          <div className="relative" ref={authMenuRef}>
            <button 
              onClick={() => setShowAuthMenu(!showAuthMenu)}
              className={`
                flex items-center space-x-1 px-3 py-2 rounded-full
                ${showAuthMenu 
                  ? 'bg-pharma-primary text-white' 
                  : 'bg-pharma-primary/10 text-pharma-primary hover:bg-pharma-primary/20'
                } 
                transition-all duration-200
              `}
              aria-label="قائمة المستخدم"
            >
              <UserCircle size={22} />
              <ChevronDown size={16} className={`transform transition-transform ${showAuthMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Auth Dropdown Menu - fixed styling */}
            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2">
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <LogIn className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>{translations.login}</span>
                  </button>
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <UserPlus className="mr-2 h-5 w-5 text-pharma-accent" />
                    <span>{translations.register}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
