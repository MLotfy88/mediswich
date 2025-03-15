
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  importedCount: number | null;
  isImporting: boolean;
  error: string | null;
  translations: {
    drugsImported: string;
    processing: string;
  };
  language: {
    direction: string;
  };
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  importedCount,
  isImporting,
  error,
  translations,
  language,
}) => {
  return (
    <>
      {isImporting && (
        <div className="w-full space-y-2 my-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              {translations.processing}
            </span>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      {importedCount !== null && !isImporting && !error && (
        <div className="text-sm text-green-600 flex items-center gap-1 mt-2" dir={language.direction}>
          <CheckCircle className="h-4 w-4" />
          {translations.drugsImported.replace('{count}', importedCount.toString())}
        </div>
      )}
      
      {error && !isImporting && (
        <div className="text-sm text-red-600 flex items-center gap-1 mt-2" dir={language.direction}>
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}
    </>
  );
};
