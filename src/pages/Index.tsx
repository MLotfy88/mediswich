
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@/App";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { Drug, AppLanguage } from "@/types";

export default function Index() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onLanguageChange={handleLanguageChange} currentLanguage={language} />

      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <Hero />

        {/* البحث والمرشحات */}
        <SearchSection 
          showResults={showResults}
          setShowResults={setShowResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />

        {/* كيف يعمل */}
        {!showResults && <HowItWorksSection />}
      </main>

      <Footer />
    </div>
  );
}
