
import React, { useState, useContext } from 'react';
import { LanguageContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { importDrugsFromCSV } from '@/utils/importDrugs';
import { getAllDrugs } from '@/services/drugService';
import { Drug } from '@/types';
import { AlertCircle } from 'lucide-react';

interface ImportDrugsFormProps {
  onImportSuccess: (updatedDrugs: Drug[]) => void;
}

const ImportDrugsForm: React.FC<ImportDrugsFormProps> = ({ onImportSuccess }) => {
  const { language } = useContext(LanguageContext);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);

  const translations = {
    selectFile: language.code === 'ar' ? 'اختر ملف CSV' : 'Select CSV File',
    import: language.code === 'ar' ? 'استيراد' : 'Import',
    importing: language.code === 'ar' ? 'جاري الاستيراد...' : 'Importing...',
    importSuccess: language.code === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully',
    importError: language.code === 'ar' ? 'حدث خطأ أثناء الاستيراد' : 'An error occurred during import',
    noFileSelected: language.code === 'ar' ? 'الرجاء تحديد ملف CSV' : 'Please select a CSV file',
    fileSelected: language.code === 'ar' ? 'تم اختيار الملف: ' : 'File selected: ',
    invalidFileType: language.code === 'ar' ? 'نوع الملف غير صالح. الرجاء تحديد ملف CSV.' : 'Invalid file type. Please select a CSV file.',
    csvFormatTitle: language.code === 'ar' ? 'تنسيق الملف المتوقع:' : 'Expected CSV format:',
    csvFormat: language.code === 'ar' 
      ? 'يجب أن يحتوي الملف على عناوين الأعمدة التالية: trade_name، arabic_name، price، active، category، company، إلخ.'
      : 'File should contain columns: trade_name, arabic_name, price, active, category, company, etc.',
    importNote: language.code === 'ar'
      ? 'ملاحظة: سيتم تحويل بيانات CSV تلقائيًا إلى نموذج الدواء المناسب.'
      : 'Note: CSV data will be automatically mapped to the appropriate drug model.',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setCsvFile(null);
      return;
    }
    
    const file = files[0];
    if (file.type !== 'text/csv') {
      toast({
        title: translations.invalidFileType,
        variant: 'destructive',
      });
      setCsvFile(null);
      // Reset the input field
      event.target.value = '';
      return;
    }
    
    setCsvFile(file);
    console.log('File selected:', file.name);
  };

  const handleImport = async () => {
    if (!csvFile) {
      toast({
        title: translations.noFileSelected,
        variant: 'destructive',
      });
      return;
    }

    setIsImporting(true);

    try {
      // Fetch the existing drugs 
      const existingDrugs = getAllDrugs();
      
      // Call importDrugsFromCSV with all required arguments
      importDrugsFromCSV(
        csvFile,
        existingDrugs,
        (updatedDrugs) => {
          onImportSuccess(updatedDrugs);
          toast({
            title: translations.importSuccess,
          });
          setIsImporting(false);
          // Reset the file input
          setCsvFile(null);
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
        }
      );
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: translations.importError,
        variant: 'destructive',
      });
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 border border-amber-200 bg-amber-50 rounded-md" dir={language.direction}>
        <h4 className="text-sm font-medium text-amber-800 mb-1">
          {translations.csvFormatTitle}
        </h4>
        <p className="text-xs text-amber-700 mb-2">
          {translations.csvFormat}
        </p>
        <p className="text-xs text-amber-600">
          {translations.importNote}
        </p>
      </div>
      
      <div className="space-y-2">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full"
          aria-label={translations.selectFile}
        />
        
        {csvFile && (
          <div className="text-sm text-gray-600" dir={language.direction}>
            {translations.fileSelected} {csvFile.name}
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleImport} 
        className="w-full" 
        disabled={!csvFile || isImporting}
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
