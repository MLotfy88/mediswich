
import { Link } from "react-router-dom";
import MediSwitchLogo from "./MediSwitchLogo";
import { AppLanguage } from "@/types";
import { Heart } from "lucide-react";

interface FooterProps {
  currentLanguage?: AppLanguage;
}

export default function Footer({ currentLanguage = { code: 'ar', direction: 'rtl' } }: FooterProps) {
  const translations = {
    links: currentLanguage.code === 'ar' ? 'روابط سريعة' : 'Quick Links',
    home: currentLanguage.code === 'ar' ? 'الرئيسية' : 'Home',
    about: currentLanguage.code === 'ar' ? 'من نحن' : 'About Us',
    contact: currentLanguage.code === 'ar' ? 'اتصل بنا' : 'Contact Us',
    privacy: currentLanguage.code === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
    terms: currentLanguage.code === 'ar' ? 'شروط الاستخدام' : 'Terms of Use',
    calculators: currentLanguage.code === 'ar' ? 'الحاسبات' : 'Calculators',
    dosage: currentLanguage.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator',
    equivalent: currentLanguage.code === 'ar' ? 'حاسبة المكافئات' : 'Equivalent Calculator',
    copyright: currentLanguage.code === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved',
    madeWith: currentLanguage.code === 'ar' ? 'صنع بـ' : 'Made with',
    in: currentLanguage.code === 'ar' ? 'في' : 'in',
    egypt: currentLanguage.code === 'ar' ? 'مصر' : 'Egypt'
  };

  return (
    <footer className="bg-pharma-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-6">
              <MediSwitchLogo variant="footer" />
            </div>
            <p 
              className="text-gray-200 mb-4"
              dir={currentLanguage.direction}
            >
              {currentLanguage.code === 'ar' 
                ? 'المنصة الذكية الشاملة لإدارة الأدوية وتبديلها بذكاء. تم تطويرها لمساعدة الأطباء والصيادلة في مصر والعالم.'
                : 'The comprehensive smart platform for medication management and intelligent switching. Developed to assist doctors and pharmacists in Egypt and worldwide.'}
            </p>
          </div>
          
          <div dir={currentLanguage.direction}>
            <h3 className="text-xl font-semibold mb-4">{translations.links}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors">
                  {translations.home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white transition-colors">
                  {translations.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">
                  {translations.contact}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-200 hover:text-white transition-colors">
                  {translations.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-200 hover:text-white transition-colors">
                  {translations.terms}
                </Link>
              </li>
            </ul>
          </div>
          
          <div dir={currentLanguage.direction}>
            <h3 className="text-xl font-semibold mb-4">{translations.calculators}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculator/dosage" className="text-gray-200 hover:text-white transition-colors">
                  {translations.dosage}
                </Link>
              </li>
              <li>
                <Link to="/calculator/equivalent" className="text-gray-200 hover:text-white transition-colors">
                  {translations.equivalent}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p dir={currentLanguage.direction}>
            &copy; {new Date().getFullYear()} MediSwitch. {translations.copyright}.
          </p>
          <p className="mt-2 flex items-center justify-center">
            {translations.madeWith} <Heart size={16} className="mx-1 text-red-400" /> {translations.in} {translations.egypt}
          </p>
        </div>
      </div>
    </footer>
  );
}
