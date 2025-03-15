
import React from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';

interface FileUploadFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  isDisabled: boolean;
  translations: {
    selectFile: string;
    fileSelected: string;
  };
  language: {
    direction: string;
  };
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onChange,
  file,
  isDisabled,
  translations,
  language,
}) => {
  return (
    <div className="space-y-2">
      <Input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={onChange}
        className="w-full"
        aria-label={translations.selectFile}
        disabled={isDisabled}
      />
      
      {file && (
        <div className="text-sm text-gray-600 flex items-center gap-1" dir={language.direction}>
          <CheckCircle className="h-4 w-4 text-green-500" />
          {translations.fileSelected} {file.name}
        </div>
      )}
    </div>
  );
};
