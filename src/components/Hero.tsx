
import { useContext } from "react";
import { LanguageContext } from "@/App";

const Hero = () => {
  const { language } = useContext(LanguageContext);
  
  return (
    <section className="relative bg-gradient-to-r from-pharma-primary to-pharma-accent py-20 md:py-32 overflow-hidden">
      {/* Background pattern decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-white text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-6"
            dir={language.direction}
          >
            {language.code === 'ar' 
              ? 'اعثر على البديل المناسب لدوائك بسهولة'
              : 'Find the Right Alternative for Your Medication Easily'}
          </h1>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mb-8 text-white/80"
            dir={language.direction}
          >
            {language.code === 'ar' 
              ? 'أداة ذكية لمساعدتك في العثور على بدائل الأدوية بأسعار مناسبة في مصر'
              : 'Smart tool to help you find medication alternatives at reasonable prices in Egypt'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#search"
              className="bg-white text-pharma-primary hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-colors"
            >
              {language.code === 'ar' ? 'ابدأ البحث' : 'Start Searching'}
            </a>
            <a 
              href="/calculator/dosage"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors"
            >
              {language.code === 'ar' ? 'حاسبة الجرعات' : 'Dosage Calculator'}
            </a>
          </div>
          
          <div className="mt-12 md:mt-16 bg-white/10 backdrop-blur-sm py-4 px-6 rounded-xl">
            <p 
              className="text-white/90 text-sm md:text-base"
              dir={language.direction}
            >
              {language.code === 'ar' 
                ? '🔍 قاعدة بيانات تضم أكثر من 500 دواء وبديل متاح في مصر'
                : '🔍 Database of over 500 medications and alternatives available in Egypt'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
