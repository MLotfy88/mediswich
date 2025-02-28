
import { Mail, Phone, MapPin } from "lucide-react";
import MediSwitchLogo from "./MediSwitchLogo";

export default function Footer() {
  return (
    <footer className="bg-pharma-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <MediSwitchLogo size="lg" variant="footer" />
            <p className="text-white/70 mb-6 mt-4" dir="rtl">
              منصة مُتكاملة للبحث عن بدائل الأدوية على مستوى العالم، مع تركيز خاص على السوق المصري.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4" dir="rtl">روابط سريعة</h3>
            <ul className="space-y-2" dir="rtl">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">البحث</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">عن التطبيق</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>
          
          <div id="contact">
            <h3 className="text-xl font-bold mb-4" dir="rtl">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center" dir="rtl">
                <Phone size={18} className="ml-2" />
                <span className="text-white/70">+20 123 456 7890</span>
              </div>
              <div className="flex items-center" dir="rtl">
                <Mail size={18} className="ml-2" />
                <span className="text-white/70">info@mediswitch.com</span>
              </div>
              <div className="flex items-center" dir="rtl">
                <MapPin size={18} className="ml-2" />
                <span className="text-white/70">القاهرة، مصر</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} MediSwitch. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
