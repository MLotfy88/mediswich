
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppLanguage } from "@/types";
import { LanguageContext } from "@/App";

interface FooterProps {
  currentLanguage?: AppLanguage;
}

const Footer = () => {
  const { language } = useContext(LanguageContext);
  
  return (
    <footer className="bg-pharma-primary py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div dir={language.direction}>
            <h3 className="text-xl font-bold mb-4">
              {language.code === 'ar' ? 'ميدي سويتش' : 'MediSwitch'}
            </h3>
            <p className="text-white/80">
              {language.code === 'ar' 
                ? 'البحث عن بدائل للأدوية وأسعارها في مصر'
                : 'Find medication alternatives and prices in Egypt'}
            </p>
          </div>
          
          <div dir={language.direction}>
            <h3 className="text-xl font-bold mb-4">
              {language.code === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  {language.code === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/calculator/dosage" className="text-white/80 hover:text-white transition-colors">
                  {language.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/calculator/equivalent" className="text-white/80 hover:text-white transition-colors">
                  {language.code === 'ar' ? 'حاسبة الجرعات المتكافئة' : 'Equivalent Calculator'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div dir={language.direction}>
            <h3 className="text-xl font-bold mb-4">
              {language.code === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <p className="text-white/80">
              {language.code === 'ar' 
                ? 'البريد الإلكتروني: info@mediswitch.eg'
                : 'Email: info@mediswitch.eg'}
            </p>
            <p className="text-white/80 mt-2">
              {language.code === 'ar' 
                ? 'هاتف: +20 123 456 7890'
                : 'Phone: +20 123 456 7890'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/20 text-center">
          <p className="text-white/60" dir={language.direction}>
            {language.code === 'ar' 
              ? '© 2023 ميدي سويتش. جميع الحقوق محفوظة.'
              : '© 2023 MediSwitch. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
