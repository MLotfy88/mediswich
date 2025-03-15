
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  importedCount: number | null;
  isImporting: boolean;
  translations: {
    drugsImported: string;
  };
  language: {
    direction: string;
  };
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  importedCount,
  isImporting,
  translations,
  language,
}) => {
  return (
    <>
      {isImporting && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-pharma-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {importedCount !== null && !isImporting && (
        <div className="text-sm text-green-600 flex items-center gap-1 mt-2" dir={language.direction}>
          <CheckCircle className="h-4 w-4" />
          {translations.drugsImported.replace('{count}', importedCount.toString())}
        </div>
      )}
    </>
  );
};
