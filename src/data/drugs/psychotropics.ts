
import { Drug } from "@/types";

// فئة الأدوية النفسية
export const psychotropics: Drug[] = [
  {
    id: "13",
    name: "سيتالوبرام 20mg",
    company: "EIPICO",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: false,
    activeIngredient: "سيتالوبرام",
    alternatives: [
      {
        id: "14",
        name: "سيليكسا",
        company: "Lundbeck",
        price: 150,
        country: "الدنمارك",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيتالوبرام",
      },
      {
        id: "15",
        name: "سيبرام",
        company: "المقاولون العرب",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيتالوبرام",
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
    activeIngredient: "فلوكستين",
    alternatives: [
      {
        id: "35",
        name: "بروزاك",
        company: "Eli Lilly",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "فلوكستين",
      },
      {
        id: "36",
        name: "فلوتين",
        company: "فاركو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فلوكستين",
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
    activeIngredient: "ألبرازولام",
    alternatives: [
      {
        id: "83",
        name: "كازوليكس",
        company: "جلوبال ناپي",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ألبرازولام",
      },
      {
        id: "84",
        name: "ألبرازولام",
        company: "العربية",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ألبرازولام",
      },
    ],
  },
  {
    id: "115",
    name: "إسيتالوبرام 10mg",
    company: "لوندبيك",
    price: 120,
    country: "الدنمارك",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إسيتالوبرام",
    alternatives: [
      {
        id: "116",
        name: "ليكسابرو",
        company: "لوندبيك",
        price: 135,
        country: "الدنمارك",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "إسيتالوبرام",
      },
      {
        id: "117",
        name: "سبرالو",
        company: "إيبيكو",
        price: 50,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "إسيتالوبرام",
      },
    ],
  },
  {
    id: "118",
    name: "كيتيابين 200mg",
    company: "أسترازينيكا",
    price: 250,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "كيتيابين",
    alternatives: [
      {
        id: "119",
        name: "سيروكيل",
        company: "أسترازينيكا",
        price: 280,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "كيتيابين",
      },
      {
        id: "120",
        name: "كيوتيك",
        company: "العربية",
        price: 120,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "كيتيابين",
      },
    ],
  },
];
