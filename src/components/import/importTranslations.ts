
export const getImportTranslations = (languageCode: string, direction: string) => {
  return {
    selectFile: languageCode === 'ar' ? 'اختر ملف' : 'Select File',
    import: languageCode === 'ar' ? 'استيراد' : 'Import',
    importing: languageCode === 'ar' ? 'جاري الاستيراد...' : 'Importing...',
    importSuccess: languageCode === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully',
    drugsImported: languageCode === 'ar' ? 'تم استيراد {count} من الأدوية بنجاح' : '{count} drugs imported successfully',
    importError: languageCode === 'ar' ? 'حدث خطأ أثناء الاستيراد' : 'An error occurred during import',
    noFileSelected: languageCode === 'ar' ? 'الرجاء تحديد ملف' : 'Please select a file',
    fileSelected: languageCode === 'ar' ? 'تم اختيار الملف: ' : 'File selected: ',
    invalidFileType: languageCode === 'ar' ? 'نوع الملف غير صالح. الرجاء تحديد ملف CSV أو Excel.' : 'Invalid file type. Please select a CSV or Excel file.',
    csvFormatTitle: languageCode === 'ar' ? 'تنسيق الملف المتوقع:' : 'Expected file format:',
    csvFormat: languageCode === 'ar'
      ? 'يجب أن يحتوي الملف على عناوين الأعمدة التالية:'
      : 'File should contain the following column headers:',
    importNote: languageCode === 'ar'
      ? 'ملاحظة: سيتم تحويل بيانات الملف تلقائيًا إلى نموذج الدواء المناسب.'
      : 'Note: File data will be automatically mapped to the appropriate drug model.',
    supportedFormats: languageCode === 'ar'
      ? 'الصيغ المدعومة: CSV, XLSX, XLS'
      : 'Supported formats: CSV, XLSX, XLS',
    processing: languageCode === 'ar'
      ? 'جاري معالجة الملف...'
      : 'Processing file...',
    dragAndDropHint: languageCode === 'ar'
      ? 'قم بسحب وإفلات الملف هنا أو انقر لاختيار ملف'
      : 'Drag and drop a file here, or click to select',
    direction
  };
};
