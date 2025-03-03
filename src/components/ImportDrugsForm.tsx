
import React, { useState } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { importDrugsFromCSV } from '@/utils/importDrugs';
import { getAllDrugs } from '@/services/drugService';
import { Drug } from '@/types';

interface ImportDrugsFormProps {
  onImportSuccess: (updatedDrugs: Drug[]) => void;
}

const ImportDrugsForm: React.FC<ImportDrugsFormProps> = ({ onImportSuccess }) => {
  const { language } = useContext(LanguageContext);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const translations = {
    selectFile: language.code === 'ar' ? 'اختر ملف CSV' : 'Select CSV File',
    import: language.code === 'ar' ? 'استيراد' : 'Import',
    importSuccess: language.code === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully',
    importError: language.code === 'ar' ? 'حدث خطأ أثناء الاستيراد' : 'An error occurred during import',
    noFileSelected: language.code === 'ar' ? 'الرجاء تحديد ملف CSV' : 'Please select a CSV file',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setCsvFile(file || null);
  };

  const handleImport = async () => {
    if (!csvFile) {
      toast({
        title: translations.noFileSelected,
        variant: 'destructive',
      });
      return;
    }

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
        },
        (error) => {
          console.error('Import error:', error);
          toast({
            title: translations.importError,
            variant: 'destructive',
          });
        }
      );
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: translations.importError,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full"
      />
      <Button onClick={handleImport} className="w-full" disabled={!csvFile}>
        {translations.import}
      </Button>
    </div>
  );
};

export default ImportDrugsForm;
