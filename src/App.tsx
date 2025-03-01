
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import DosageCalculatorPage from './pages/DosageCalculatorPage';
import EquivalentCalculatorPage from './pages/EquivalentCalculatorPage';
import { AppLanguage } from './types';

// Create context for app language
export const LanguageContext = createContext<{
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
}>({
  language: { code: 'ar', direction: 'rtl' },
  setLanguage: () => {},
});

function App() {
  const [language, setLanguage] = useState<AppLanguage>({
    code: 'ar',
    direction: 'rtl'
  });

  useEffect(() => {
    // Set the direction for the entire document
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator/dosage" element={<DosageCalculatorPage />} />
          <Route path="/calculator/equivalent" element={<EquivalentCalculatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
