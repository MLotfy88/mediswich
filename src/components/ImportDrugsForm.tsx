
import React, { useState, useContext } from 'react';
import { LanguageContext } from '@/App';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { importDrugsFromFile } from '@/utils/importDrugs';
import { getAllDrugs } from '@/services/drugService';
import { Drug } from '@/types';
import { FormatInfoBox } from './import/FormatInfoBox';
import { FileUploadField } from './import/FileUploadField';
import { ProgressBar } from './import/ProgressBar';
import { getImportTranslations } from './import/importTranslations';

interface ImportDrugsFormProps {
  onImportSuccess: (updatedDrugs: Drug[]) => void;
}

const ImportDrugsForm: React.FC<ImportDrugsFormProps> = ({ onImportSuccess }) => {
  const { language } = useContext(LanguageContext);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<number>(0);
  const [importedCount, setImportedCount] = useState<number | null>(null);

  const translations = getImportTranslations(language.code, language.direction);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setFile(null);
      return;
    }

    const selectedFile = files[0];
    const fileType = selectedFile.type;
    const fileName = selectedFile.name.toLowerCase();

    // Check if file type is valid (CSV or Excel)
    if (
      fileType === 'text/csv' ||
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel' ||
      fileName.endsWith('.csv') ||
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls')
    ) {
      setFile(selectedFile);
      console.log('File selected:', selectedFile.name);

      toast({
        title: translations.fileSelected + selectedFile.name,
        description: fileType || fileName,
      });
    } else {
      toast({
        title: translations.invalidFileType,
        variant: 'destructive',
      });
      setFile(null);
      // Reset the input field
      event.target.value = '';
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: translations.noFileSelected,
        variant: 'destructive',
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportedCount(null);

    // Show initial toast for processing
    toast({
      title: translations.processing,
      description: file.name,
    });

    try {
      // Fetch the existing drugs
      const existingDrugs = getAllDrugs();
      console.log(`Starting import with ${existingDrugs.length} existing drugs`);

      // Call importDrugsFromFile with all required arguments and progress callback
      importDrugsFromFile(
        file,
        existingDrugs,
        (updatedDrugs) => {
          setImportProgress(100);

          const importedDrugsCount = updatedDrugs.length - existingDrugs.length;
          setImportedCount(importedDrugsCount);

          onImportSuccess(updatedDrugs);

          // Show success message with count
          toast({
            title: translations.importSuccess,
            description: translations.drugsImported.replace('{count}', importedDrugsCount.toString()),
            variant: 'default',
          });

          setIsImporting(false);
          // Reset the file input
          setFile(null);
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        },
        (error) => {
          console.error('Import error:', error);
          toast({
            title: translations.importError,
            description: error,
            variant: 'destructive',
          });
          setIsImporting(false);
          setImportProgress(0);
        },
        // Progress callback
        (progress) => {
          setImportProgress(progress);
        }
      );
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: translations.importError,
        variant: 'destructive',
      });
      setIsImporting(false);
      setImportProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <FormatInfoBox 
        translations={translations} 
        language={language} 
      />
      
      <FileUploadField
        onChange={handleFileChange}
        file={file}
        isDisabled={isImporting}
        translations={translations}
        language={language}
      />
      
      <ProgressBar
        progress={importProgress}
        importedCount={importedCount}
        isImporting={isImporting}
        translations={translations}
        language={language}
      />
      
      <Button 
        onClick={handleImport} 
        className="w-full" 
        disabled={!file || isImporting}
      >
        {isImporting ? translations.importing : translations.import}
        {isImporting && (
          <span className="ml-2 animate-spin">&#9696;</span>
        )}
      </Button>
    </div>
  );
};

export default ImportDrugsForm;
