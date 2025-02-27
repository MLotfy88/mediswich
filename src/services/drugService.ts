
import { Drug } from "@/types";

// Mock data for the drugs
const mockDrugs: Drug[] = [
  {
    id: "1",
    name: "باراسيتامول 500mg",
    company: "EIPICO",
    price: 10,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "2",
        name: "بانادول أزرق",
        company: "جلاكسو",
        price: 25,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "3",
        name: "فيفادول",
        company: "سيد",
        price: 8,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "4",
    name: "أموكسيسيللين 500mg",
    company: "المقاولون العرب",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "5",
        name: "أوجمنتين",
        company: "GSK",
        price: 60,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "6",
        name: "هيكساموكس",
        company: "EIPICO",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "7",
    name: "ليزينوبريل 10mg",
    company: "Pfizer",
    price: 50,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "8",
        name: "زيستريل",
        company: "AstraZeneca",
        price: 45,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "9",
        name: "ليزينوبريل مصري",
        company: "سيد",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "10",
    name: "أومبيرازول 20mg",
    company: "مينا فارم",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "11",
        name: "بريلوسيك",
        company: "AstraZeneca",
        price: 80,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "12",
        name: "نيكسيوم",
        company: "AstraZeneca",
        price: 120,
        country: "السويد",
        isEgyptian: false,
        isAvailable: true,
      },
    ],
  },
  {
    id: "13",
    name: "سيتالوبرام 20mg",
    company: "EIPICO",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: false,
    alternatives: [
      {
        id: "14",
        name: "سيليكسا",
        company: "Lundbeck",
        price: 150,
        country: "الدنمارك",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "15",
        name: "سيبرام",
        company: "المقاولون العرب",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "16",
    name: "أتورفاستاتين 20mg",
    company: "سيد",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "17",
        name: "ليبيتور",
        company: "Pfizer",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "18",
        name: "أتوركس",
        company: "EIPICO",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "19",
    name: "ميتفورمين 500mg",
    company: "المقاولون العرب",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "20",
        name: "جلوكوفاج",
        company: "Merck",
        price: 40,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "21",
        name: "ديابيتكس",
        company: "مينا فارم",
        price: 18,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "22",
    name: "لوراتادين 10mg",
    company: "EIPICO",
    price: 8,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "23",
        name: "كلاريتين",
        company: "Schering-Plough",
        price: 35,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "24",
        name: "هيستازين",
        company: "سيد",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "25",
    name: "أملوديبين 5mg",
    company: "مينا فارم",
    price: 20,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "26",
        name: "نورفاسك",
        company: "Pfizer",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "27",
        name: "فازوكور",
        company: "EIPICO",
        price: 18,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "28",
    name: "أزيثروميسين 500mg",
    company: "Pfizer",
    price: 75,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "29",
        name: "زيثروماكس",
        company: "Pfizer",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "30",
        name: "أزيثرال",
        company: "المقاولون العرب",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  // أدوية إضافية
  {
    id: "31",
    name: "ديكلوفيناك 50mg",
    company: "نوفارتس",
    price: 15,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "32",
        name: "كاتافلام",
        company: "نوفارتس",
        price: 25,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "33",
        name: "فولتارين",
        company: "EIPICO",
        price: 12,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "34",
    name: "فلوكستين 20mg",
    company: "Eli Lilly",
    price: 90,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "35",
        name: "بروزاك",
        company: "Eli Lilly",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "36",
        name: "فلوتين",
        company: "فاركو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "37",
    name: "ميبيفيرين 200mg",
    company: "ميرك",
    price: 45,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "38",
        name: "دوسباتالين",
        company: "Abbott",
        price: 65,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "39",
        name: "كولوفيرين",
        company: "العامرية",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "40",
    name: "سيبروفلوكساسين 500mg",
    company: "باير",
    price: 60,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: false,
    alternatives: [
      {
        id: "41",
        name: "سيبروباي",
        company: "باير",
        price: 80,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "42",
        name: "سيفروتيك",
        company: "العربية",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "43",
    name: "سيمفاستاتين 20mg",
    company: "ميرك",
    price: 85,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "44",
        name: "زوكور",
        company: "ميرك",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "45",
        name: "سيمفاكور",
        company: "مصر الدولية",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "46",
    name: "دوكسيسيكلين 100mg",
    company: "فايزر",
    price: 35,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: false,
    alternatives: [
      {
        id: "47",
        name: "فيبراميسين",
        company: "فايزر",
        price: 50,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "48",
        name: "دوكسيتاب",
        company: "طنطا للأدوية",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "49",
    name: "سيتيريزين 10mg",
    company: "UCB",
    price: 30,
    country: "بلجيكا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "50",
        name: "زيرتك",
        company: "UCB",
        price: 45,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "51",
        name: "أليرتيك",
        company: "EIPICO",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "52",
    name: "كلورفينيرامين 4mg",
    company: "جلاكسو",
    price: 8,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "53",
        name: "بيريتون",
        company: "جلاكسو",
        price: 12,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "54",
        name: "هيستوب",
        company: "النيل",
        price: 5,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "55",
    name: "إيبوبروفين 400mg",
    company: "GSK",
    price: 18,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "56",
        name: "أدفيل",
        company: "فايزر",
        price: 25,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "57",
        name: "بروفين",
        company: "فاركو",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "58",
    name: "رانيتيدين 150mg",
    company: "جلاكسو",
    price: 40,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: false,
    alternatives: [
      {
        id: "59",
        name: "زانتاك",
        company: "جلاكسو",
        price: 55,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "60",
        name: "رانتيدول",
        company: "ميمفيس",
        price: 22,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  // أدوية إضافية عالمية ومصرية
  {
    id: "61",
    name: "ديمرا 4mg",
    company: "سانوفي",
    price: 110,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "62",
        name: "ميثالورا",
        company: "ايبيكو",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "63",
        name: "لوراميث",
        company: "سيجما",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "64",
    name: "إنسولين لانتوس",
    company: "سانوفي",
    price: 350,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "65",
        name: "توجيو",
        company: "سانوفي",
        price: 380,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: false,
      },
      {
        id: "66",
        name: "باسل إنسولين",
        company: "سيدكو",
        price: 180,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "67",
    name: "ليفيترا 20mg",
    company: "باير",
    price: 120,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "68",
        name: "فياجرا",
        company: "فايزر",
        price: 110,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "69",
        name: "سيلدينافيل",
        company: "الحكمة",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "70",
    name: "كونكور 5mg",
    company: "ميرك",
    price: 95,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "71",
        name: "بيسوكور",
        company: "إيبيكو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "72",
        name: "بيسوبرولول",
        company: "فاركو",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "73",
    name: "زوكسان 50mg",
    company: "روش",
    price: 850,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: false,
    alternatives: [
      {
        id: "74",
        name: "ريتوكسان",
        company: "نوفارتس",
        price: 800,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
      },
      {
        id: "75",
        name: "زوكسيماب",
        company: "المصرية للأدوية الحيوية",
        price: 450,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "76",
    name: "دوفاستون 10mg",
    company: "أبوت",
    price: 60,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "77",
        name: "ديدروجيستيرون",
        company: "أمون",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "78",
        name: "يوتروجستان",
        company: "بيزينس",
        price: 45,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: false,
      },
    ],
  },
  {
    id: "79",
    name: "انتينال",
    company: "اكتلاب",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    alternatives: [
      {
        id: "80",
        name: "ايميدول",
        company: "مينافارم",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "81",
        name: "لوبراميد",
        company: "جانسن",
        price: 35,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: false,
      },
    ],
  },
  {
    id: "82",
    name: "Xanax 0.5mg",
    company: "Pfizer",
    price: 120,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "83",
        name: "كازوليكس",
        company: "جلوبال ناپي",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "84",
        name: "ألبرازولام",
        company: "العربية",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: "85",
    name: "Augmentin 1g",
    company: "GSK",
    price: 95,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "86",
        name: "ميجاموكس",
        company: "فاركو",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "87",
        name: "كلافوكسين",
        company: "العامرية",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
      },
    ],
  },
  {
    id: "88",
    name: "Nexium 40mg",
    company: "AstraZeneca",
    price: 180,
    country: "السويد",
    isEgyptian: false,
    isAvailable: true,
    alternatives: [
      {
        id: "89",
        name: "إيزوميبرازول",
        company: "الحكمة",
        price: 60,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
      {
        id: "90",
        name: "إزوبرال",
        company: "إيبيكو",
        price: 55,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
      },
    ],
  },
];

// Search function - supports searching in both Arabic and English
export const searchDrugs = (query: string): Drug[] => {
  if (!query.trim()) return [];
  
  console.log("Searching for:", query);
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // Mapping of common English drug names to Arabic equivalents
  const englishToArabic: Record<string, string> = {
    "paracetamol": "باراسيتامول",
    "amoxicillin": "أموكسيسيللين",
    "omeprazole": "أومبيرازول",
    "lisinopril": "ليزينوبريل",
    "citalopram": "سيتالوبرام",
    "atorvastatin": "أتورفاستاتين",
    "metformin": "ميتفورمين",
    "loratadine": "لوراتادين",
    "amlodipine": "أملوديبين",
    "azithromycin": "أزيثروميسين",
    "diclofenac": "ديكلوفيناك",
    "fluoxetine": "فلوكستين",
    "mebeverine": "ميبيفيرين",
    "ciprofloxacin": "سيبروفلوكساسين",
    "simvastatin": "سيمفاستاتين",
    "doxycycline": "دوكسيسيكلين",
    "cetirizine": "سيتيريزين",
    "chlorpheniramine": "كلورفينيرامين",
    "ibuprofen": "إيبوبروفين",
    "ranitidine": "رانيتيدين",
    "dimra": "ديمرا",
    "insulin": "إنسولين",
    "levitra": "ليفيترا",
    "concor": "كونكور",
    "xanax": "زاناكس",
    "augmentin": "أوجمنتين",
    "nexium": "نيكسيوم"
  };
  
  // Bidirectional mapping
  const arabicToEnglish: Record<string, string> = {};
  Object.entries(englishToArabic).forEach(([eng, ar]) => {
    arabicToEnglish[ar] = eng;
  });
  
  // Brand names mappings
  const brandToGeneric: Record<string, string> = {
    "بانادول": "باراسيتامول",
    "فيفادول": "باراسيتامول",
    "أوجمنتين": "أموكسيسيللين",
    "هيكساموكس": "أموكسيسيللين",
    "زيستريل": "ليزينوبريل",
    "بريلوسيك": "أومبيرازول",
    "نيكسيوم": "أومبيرازول",
    "سيليكسا": "سيتالوبرام",
    "سيبرام": "سيتالوبرام",
    "ليبيتور": "أتورفاستاتين",
    "أتوركس": "أتورفاستاتين",
    "جلوكوفاج": "ميتفورمين",
    "ديابيتكس": "ميتفورمين",
    "كلاريتين": "لوراتادين",
    "هيستازين": "لوراتادين",
    "نورفاسك": "أملوديبين",
    "فازوكور": "أملوديبين",
    "زيثروماكس": "أزيثروميسين",
    "أزيثرال": "أزيثروميسين",
    "كاتافلام": "ديكلوفيناك",
    "فولتارين": "ديكلوفيناك",
    "بروزاك": "فلوكستين",
    "فلوتين": "فلوكستين",
    "دوسباتالين": "ميبيفيرين",
    "كولوفيرين": "ميبيفيرين",
    "سيبروباي": "سيبروفلوكساسين",
    "سيفروتيك": "سيبروفلوكساسين",
    "زوكور": "سيمفاستاتين",
    "سيمفاكور": "سيمفاستاتين",
    "فيبراميسين": "دوكسيسيكلين",
    "دوكسيتاب": "دوكسيسيكلين",
    "زيرتك": "سيتيريزين",
    "أليرتيك": "سيتيريزين",
    "بيريتون": "كلورفينيرامين",
    "هيستوب": "كلورفينيرامين",
    "أدفيل": "إيبوبروفين",
    "بروفين": "إيبوبروفين",
    "زانتاك": "رانيتيدين",
    "رانتيدول": "رانيتيدين",
    "ديمرا": "glimipiride",
    "لانتوس": "insulin glargine",
    "كونكور": "bisoprolol",
    "ليفيترا": "vardenafil",
    "زاناكس": "alprazolam"
  };
  
  const results = mockDrugs.filter(drug => {
    // Check if the drug name contains the query
    const nameMatch = drug.name.toLowerCase().includes(normalizedQuery);
    
    // Check if the company name contains the query
    const companyMatch = drug.company.toLowerCase().includes(normalizedQuery);
    
    // Check if the translated drug name contains the query
    const arabicName = drug.name.toLowerCase();
    const englishSearch = englishToArabic[normalizedQuery];
    const arabicSearch = arabicToEnglish[normalizedQuery];
    
    const translatedMatch = 
      (englishSearch && arabicName.includes(englishSearch.toLowerCase())) || 
      (arabicSearch && normalizedQuery.includes(arabicSearch.toLowerCase()));
    
    // Check if any of the brand names match
    const brandMatch = Object.entries(brandToGeneric).some(([brand, generic]) => {
      return brand.toLowerCase().includes(normalizedQuery) && drug.name.toLowerCase().includes(generic.toLowerCase());
    });
    
    // Also check alternatives
    const alternativesMatch = drug.alternatives.some(alt => 
      alt.name.toLowerCase().includes(normalizedQuery) || 
      alt.company.toLowerCase().includes(normalizedQuery)
    );
    
    return nameMatch || companyMatch || translatedMatch || brandMatch || alternativesMatch;
  });
  
  console.log("Search results:", results.length);
  return results;
};

// Calculate savings compared to the most expensive alternative
export const calculateSavings = (drug: Drug): number => {
  const allPrices = [drug.price, ...drug.alternatives.map(alt => alt.price)];
  const maxPrice = Math.max(...allPrices);
  
  return maxPrice > drug.price 
    ? Math.round(((maxPrice - drug.price) / maxPrice) * 100) 
    : 0;
};

// Filter function
export const filterDrugs = (
  drugs: Drug[], 
  countryFilter: string | null, 
  priceRange: { min: number | null; max: number | null },
  availabilityFilter: string | null
): Drug[] => {
  return drugs.filter(drug => {
    // Country filter
    if (countryFilter && countryFilter !== "all") {
      if (countryFilter === "egyptian" && !drug.isEgyptian) {
        return false;
      }
      if (countryFilter === "international" && drug.isEgyptian) {
        return false;
      }
    }
    
    // Price range filter
    if (priceRange.min !== null && drug.price < priceRange.min) {
      return false;
    }
    if (priceRange.max !== null && drug.price > priceRange.max) {
      return false;
    }
    
    // Availability filter
    if (availabilityFilter === "available" && !drug.isAvailable) {
      return false;
    }
    if (availabilityFilter === "unavailable" && drug.isAvailable) {
      return false;
    }
    
    return true;
  });
};

// Export all drugs for general listing
export const getAllDrugs = (): Drug[] => {
  return mockDrugs;
};

export default {
  searchDrugs,
  calculateSavings,
  filterDrugs,
  getAllDrugs
};
