
import { Drug } from "@/types";

// الأدوية المستخرجة من موقع طبيبي (Altibbi)
export const altibbiMedications: Drug[] = [
  {
    id: "altibbi-1",
    name: "أتينول Atenol",
    company: "الحكمة",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتينولول",
    alternatives: [
      {
        id: "altibbi-2",
        name: "تينورمين Tenormin",
        company: "أسترازينيكا",
        price: 60,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أتينولول",
      }
    ]
  },
  {
    id: "altibbi-3",
    name: "بروزاك Prozac",
    company: "إيلي ليلي",
    price: 120,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فلوكستين",
    alternatives: [
      {
        id: "altibbi-4",
        name: "فلوكسين Floxin",
        company: "أمون",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فلوكستين",
      }
    ]
  },
  {
    id: "altibbi-5",
    name: "سيمبيكور Symbicort",
    company: "أسترازينيكا",
    price: 180,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بوديزونيد/فورموتيرول",
    alternatives: [
      {
        id: "altibbi-6",
        name: "فوسيكورت Foscort",
        company: "مينا فارم",
        price: 90,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بوديزونيد/فورموتيرول",
      }
    ]
  },
  {
    id: "altibbi-7",
    name: "ليريكا Lyrica",
    company: "فايزر",
    price: 150,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بريجابالين",
    alternatives: [
      {
        id: "altibbi-8",
        name: "بريجابالين Pregabalin",
        company: "إيبيكو",
        price: 60,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بريجابالين",
      }
    ]
  },
  {
    id: "altibbi-9",
    name: "نوفالجين Novalgin",
    company: "سانوفي",
    price: 45,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ميتاميزول",
    alternatives: [
      {
        id: "altibbi-10",
        name: "دبيتامين Dipetamine",
        company: "سيد",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ميتاميزول",
      }
    ]
  },
  {
    id: "altibbi-11",
    name: "كونكور Concor",
    company: "ميرك",
    price: 85,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بيسوبرولول",
    alternatives: [
      {
        id: "altibbi-12",
        name: "بيسوكور Bisocor",
        company: "جلوبال نابي",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بيسوبرولول",
      }
    ]
  },
  {
    id: "altibbi-13",
    name: "نكسيوم Nexium",
    company: "أسترازينيكا",
    price: 95,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إيزوميبرازول",
    alternatives: [
      {
        id: "altibbi-14",
        name: "إيزومك Izomac",
        company: "ممفيس",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "إيزوميبرازول",
      }
    ]
  },
  {
    id: "altibbi-15",
    name: "فياجرا Viagra",
    company: "فايزر",
    price: 110,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيلدينافيل",
    alternatives: [
      {
        id: "altibbi-16",
        name: "فياجيك Viagic",
        company: "إيبيكو",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيلدينافيل",
      }
    ]
  },
  {
    id: "altibbi-17",
    name: "زولوفت Zoloft",
    company: "فايزر",
    price: 130,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيرترالين",
    alternatives: [
      {
        id: "altibbi-18",
        name: "سيرترال Sertral",
        company: "إيفا فارما",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيرترالين",
      }
    ]
  },
  {
    id: "altibbi-19",
    name: "زاناكس Xanax",
    company: "فايزر",
    price: 95,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ألبرازولام",
    alternatives: [
      {
        id: "altibbi-20",
        name: "زولام Zolam",
        company: "إيبيكو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ألبرازولام",
      }
    ]
  }
];
