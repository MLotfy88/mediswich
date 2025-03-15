
import React from 'react';

interface FormatInfoBoxProps {
  translations: {
    csvFormatTitle: string;
    csvFormat: string;
    importNote: string;
    supportedFormats: string;
  };
  language: {
    direction: string;
  };
}

export const FormatInfoBox: React.FC<FormatInfoBoxProps> = ({
  translations,
  language,
}) => {
  return (
    <div className="p-3 border border-amber-200 bg-amber-50 rounded-md" dir={language.direction}>
      <h4 className="text-sm font-medium text-amber-800 mb-1">
        {translations.csvFormatTitle}
      </h4>
      <p className="text-xs text-amber-700 mb-2">
        {translations.csvFormat}
      </p>
      <div className="my-2 p-2 bg-amber-100 rounded text-xs font-mono overflow-x-auto whitespace-nowrap">
        trade_name, arabic_name, old_price, price, active, main_category, main_category_ar, category, category_ar, company, dosage_form, dosage_form_ar, unit, usage, usage_ar, description, last_price_update
      </div>
      <p className="text-xs text-amber-600 mb-1">
        {translations.importNote}
      </p>
      <p className="text-xs font-medium text-amber-700">
        {translations.supportedFormats}
      </p>
    </div>
  );
};
