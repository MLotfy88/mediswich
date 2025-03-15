
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileUp, AlertTriangle } from 'lucide-react';

interface FileUploadFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  isDisabled: boolean;
  translations: {
    selectFile: string;
    fileSelected: string;
    dragAndDropHint: string;
  };
  language: {
    direction: string;
  };
  error?: string | null;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onChange,
  file,
  isDisabled,
  translations,
  language,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <div className={`border-2 border-dashed rounded-lg p-4 transition-colors 
                   ${file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-pharma-primary'} 
                   ${error ? 'border-red-400 bg-red-50' : ''}`}>
        
        <div className="flex flex-col items-center justify-center space-y-3">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={onChange}
            className="hidden"
            aria-label={translations.selectFile}
            disabled={isDisabled}
          />
          
          {!file && !error && (
            <>
              <FileUp className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500" dir={language.direction}>
                {translations.dragAndDropHint}
              </p>
            </>
          )}
          
          {file && (
            <div className="text-sm text-gray-600 flex items-center gap-1" dir={language.direction}>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">{translations.fileSelected}</span> {file.name}
            </div>
          )}
          
          {error && (
            <div className="text-sm text-red-600 flex items-center gap-1" dir={language.direction}>
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          
          <Button 
            type="button" 
            onClick={handleButtonClick} 
            variant={file ? "outline" : "default"}
            disabled={isDisabled}
            className={file ? "border-green-500 text-green-700" : ""}
          >
            {translations.selectFile}
          </Button>
        </div>
      </div>
    </div>
  );
};
