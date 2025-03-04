
export const getSearchResultsTranslations = (languageCode: string) => {
  return {
    resultsFor: languageCode === 'ar' ? "نتائج البحث عن" : "Search results for",
    mainDrug: languageCode === 'ar' ? "الدواء الرئيسي" : "Main Drug",
    alternatives: languageCode === 'ar' ? "البدائل المتاحة" : "Available Alternatives",
    emptyResultsTitle: languageCode === 'ar' ? "لم يتم العثور على نتائج" : "No Results Found",
    emptyResultsDesc: languageCode === 'ar' 
      ? "لم نتمكن من العثور على أدوية تطابق استعلام البحث الخاص بك. يرجى تجربة كلمات رئيسية مختلفة."
      : "We couldn't find any medications matching your search query. Please try different keywords."
  };
};

export const getDrugCardTranslations = (languageCode: string) => {
  return {
    price: languageCode === 'ar' ? "السعر" : "Price",
    egp: languageCode === 'ar' ? "ج.م" : "EGP",
    save: languageCode === 'ar' ? "توفير" : "Save",
    available: languageCode === 'ar' ? "متوفر" : "Available",
    unavailable: languageCode === 'ar' ? "غير متوفر" : "Unavailable",
    compareTo: languageCode === 'ar' ? "بالمقارنة مع" : "compared to",
    origin: languageCode === 'ar' ? "المنشأ" : "Origin",
    egyptian: languageCode === 'ar' ? "مصري" : "Egyptian",
    activeIngredient: languageCode === 'ar' ? "المادة الفعالة" : "Active Ingredient",
    company: languageCode === 'ar' ? "الشركة" : "Company"
  };
};
