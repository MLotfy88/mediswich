
import React, { useState, useContext } from 'react';
import { LanguageContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { importDrugsFromFile } from '@/utils/importDrugs';
import { getAllDrugs } from '@/services/drugService';
import { Drug } from '@/types';
import { AlertCircle, CheckCircle } from 'lucide-react';

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

  const translations = {
    selectFile: language.code === 'ar' ? 'اختر ملف CSV أو Excel' : 'Select CSV or Excel File',
    import: language.code === 'ar' ? 'استيراد' : 'Import',
    importing: language.code === 'ar' ? 'جاري الاستيراد...' : 'Importing...',
    importSuccess: language.code === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully',
    drugsImported: language.code === 'ar' ? 'تم استيراد {count} من الأدوية بنجاح' : '{count} drugs imported successfully',
    importError: language.code === 'ar' ? 'حدث خطأ أثناء الاستيراد' : 'An error occurred during import',
    noFileSelected: language.code === 'ar' ? 'الرجاء تحديد ملف' : 'Please select a file',
    fileSelected: language.code === 'ar' ? 'تم اختيار الملف: ' : 'File selected: ',
    invalidFileType: language.code === 'ar' ? 'نوع الملف غير صالح. الرجاء تحديد ملف CSV أو Excel.' : 'Invalid file type. Please select a CSV or Excel file.',
    csvFormatTitle: language.code === 'ar' ? 'تنسيق الملف المتوقع:' : 'Expected file format:',
    csvFormat: language.code === 'ar' 
      ? 'يجب أن يحتوي الملف على عناوين الأعمدة التالية:'
      : 'File should contain the following column headers:',
    importNote: language.code === 'ar'
      ? 'ملاحظة: سيتم تحويل بيانات الملف تلقائيًا إلى نموذج الدواء المناسب.'
      : 'Note: File data will be automatically mapped to the appropriate drug model.',
    supportedFormats: language.code === 'ar'
      ? 'الصيغ المدعومة: CSV, XLSX, XLS'
      : 'Supported formats: CSV, XLSX, XLS',
    processing: language.code === 'ar'
      ? 'جاري معالجة الملف...'
      : 'Processing file...',
  };

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
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setImportProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90; // Cap at 90% until complete
          }
          return newProgress;
        });
      }, 500);
      
      // Call importDrugsFromFile with all required arguments
      importDrugsFromFile(
        file,
        existingDrugs,
        (updatedDrugs) => {
          clearInterval(progressInterval);
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
          clearInterval(progressInterval);
          console.error('Import error:', error);
          toast({
            title: translations.importError,
            description: error,
            variant: 'destructive',
          });
          setIsImporting(false);
          setImportProgress(0);
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
      
      <div className="space-y-2">
        <Input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="w-full"
          aria-label={translations.selectFile}
          disabled={isImporting}
        />
        
        {file && (
          <div className="text-sm text-gray-600 flex items-center gap-1" dir={language.direction}>
            <CheckCircle className="h-4 w-4 text-green-500" />
            {translations.fileSelected} {file.name}
          </div>
        )}
        
        {isImporting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-pharma-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${importProgress}%` }}
            ></div>
          </div>
        )}
        
        {importedCount !== null && !isImporting && (
          <div className="text-sm text-green-600 flex items-center gap-1 mt-2" dir={language.direction}>
            <CheckCircle className="h-4 w-4" />
            {translations.drugsImported.replace('{count}', importedCount.toString())}
          </div>
        )}
      </div>
      
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
