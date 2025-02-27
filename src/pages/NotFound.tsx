
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pharma-secondary">
      <div className="text-center px-4 animate-fade-in">
        <h1 className="text-8xl font-bold text-pharma-primary mb-6">404</h1>
        <p className="text-2xl text-gray-600 mb-8" dir="rtl">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link 
          to="/" 
          className="btn-pharma-primary px-6 py-3 text-base inline-flex items-center"
        >
          العودة للصفحة الرئيسية
          <svg 
            className="w-5 h-5 ml-2 rtl:rotate-180" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
