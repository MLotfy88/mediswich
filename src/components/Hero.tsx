
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = heroRef.current?.getBoundingClientRect();
      
      if (!rect) return;
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      const moveX = x * 20 - 10;
      const moveY = y * 20 - 10;
      
      const bg = heroRef.current?.querySelector('.hero-bg') as HTMLElement;
      if (bg) {
        bg.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
      }
    };
    
    heroRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[600px] w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-pharma-secondary via-white to-pharma-primary/5 -z-10 transition-transform duration-[1.5s] ease-out"></div>
      
      <div className="container mx-auto px-4 text-center z-10 relative animate-fade-in">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pharma-primary to-pharma-primary/80 bg-clip-text text-transparent"
          dir="rtl"
        >
          ابحث عن بديل لدوائك بأفضل سعر
        </h1>
        
        <p 
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
          dir="rtl"
        >
          منصة مُتكاملة تساعدك على إيجاد بدائل للأدوية بأسعار مناسبة، مع تركيز خاص على المنتجات المصرية عالية الجودة
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button className="btn-pharma-primary px-6 py-3 text-base">
            ابدأ البحث الآن
          </button>
          <button className="btn-pharma-outline px-6 py-3 text-base">
            تعرف على المزيد
          </button>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="animate-bounce w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md">
            <svg
              className="w-6 h-6 text-pharma-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
