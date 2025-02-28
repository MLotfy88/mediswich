
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import MediSwitchLogo from "./MediSwitchLogo";
import { AppLanguage } from "@/types";
import { UserCircle, LogIn, UserPlus, ChevronDown, Calculator, Search, Info, Mail } from "lucide-react";

interface HeaderProps {
  onLanguageChange: (language: AppLanguage) => void;
}

export default function Header({ onLanguageChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const authMenuRef = useRef<HTMLDivElement>(null);
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

  // Close auth menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setShowAuthMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        <div className="flex-1">
          <nav className="hidden md:flex space-x-6 justify-start">
            <Link 
              to="/" 
              className={`flex items-center text-gray-700 hover:text-pharma-primary transition-colors ${
                location.pathname === '/' ? 'text-pharma-primary font-medium' : ''
              }`}
            >
              <Search size={18} className="ml-2" />
              <span>البحث</span>
            </Link>
            <Link 
              to="/calculator" 
              className={`flex items-center text-gray-700 hover:text-pharma-primary transition-colors ${
                location.pathname === '/calculator' ? 'text-pharma-primary font-medium' : ''
              }`}
            >
              <Calculator size={18} className="ml-2" />
              <span>حاسبة الجرعات</span>
            </Link>
            <a href="#" className="flex items-center text-gray-700 hover:text-pharma-primary transition-colors">
              <Info size={18} className="ml-2" />
              <span>عن التطبيق</span>
            </a>
            <a href="#contact" className="flex items-center text-gray-700 hover:text-pharma-primary transition-colors">
              <Mail size={18} className="ml-2" />
              <span>اتصل بنا</span>
            </a>
          </nav>
        </div>
        
        <div className="flex items-center justify-center flex-1">
          <Link to="/">
            <MediSwitchLogo size="md" />
          </Link>
        </div>
        
        <div className="flex items-center justify-end space-x-4 flex-1">
          <LanguageSwitcher onLanguageChange={onLanguageChange} />
          
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
            
            {/* Dropdown Menu */}
            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                <div className="py-2">
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <LogIn className="mr-2 h-5 w-5 text-pharma-primary" />
                    <span>تسجيل الدخول</span>
                  </button>
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-pharma-primary/10 transition-colors"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <UserPlus className="mr-2 h-5 w-5 text-pharma-accent" />
                    <span>إنشاء حساب جديد</span>
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
