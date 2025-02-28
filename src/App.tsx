
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import CalculatorPage from './pages/CalculatorPage';
import { AppLanguage } from './types';

function App() {
  const [language, setLanguage] = useState<AppLanguage>({
    code: 'ar',
    direction: 'rtl'
  });

  useEffect(() => {
    // Set the direction for the entire document
    document.documentElement.dir = language.direction;
  }, [language]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
