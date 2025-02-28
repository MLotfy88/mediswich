
import { Drug } from "@/types";

// الأدوية المستخرجة من الهيئة المصرية للدواء (EDA)
export const edaMedications: Drug[] = [
  {
    id: "eda-1",
    name: "ألتروكسين 50",
    company: "الحكمة",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ليفوثيروكسين",
    alternatives: [
      {
        id: "eda-2",
        name: "يوثيروكس",
        company: "ميرك",
        price: 45,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ليفوثيروكسين",
      }
    ]
  },
  {
    id: "eda-3",
    name: "كابوتين 25",
    company: "البيروني",
    price: 14,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "كابتوبريل",
    alternatives: [
      {
        id: "eda-4",
        name: "كابوزيد",
        company: "بريستول مايرز سكويب",
        price: 35,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "كابتوبريل",
      }
    ]
  },
  {
    id: "eda-5",
    name: "ألدوميت 250",
    company: "ممفيس",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ميثيل دوبا",
    alternatives: [
      {
        id: "eda-6",
        name: "ألدوميت",
        company: "ميرك",
        price: 48,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "ميثيل دوبا",
      }
    ]
  },
  {
    id: "eda-7",
    name: "تينورمين 50",
    company: "أسترازينيكا",
    price: 30,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أتينولول",
    alternatives: [
      {
        id: "eda-8",
        name: "أتينول",
        company: "إيبيكو",
        price: 12,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أتينولول",
      }
    ]
  },
  {
    id: "eda-9",
    name: "ريفادين 300",
    company: "سانوفي",
    price: 120,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ريفامبيسين",
    alternatives: [
      {
        id: "eda-10",
        name: "ريفامبين",
        company: "أمون",
        price: 80,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ريفامبيسين",
      }
    ]
  },
  {
    id: "eda-11",
    name: "أميكان 500",
    company: "الحكمة",
    price: 65,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أميكاسين",
    alternatives: [
      {
        id: "eda-12",
        name: "أميكين",
        company: "بريستول مايرز سكويب",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "أميكاسين",
      }
    ]
  },
  {
    id: "eda-13",
    name: "جليمز 2",
    company: "نوفارتس",
    price: 45,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "جليميبريد",
    alternatives: [
      {
        id: "eda-14",
        name: "أماريل",
        company: "سانوفي",
        price: 55,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "جليميبريد",
      },
      {
        id: "eda-15",
        name: "جليميز",
        company: "ممفيس",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "جليميبريد",
      }
    ]
  },
  {
    id: "eda-16",
    name: "ايزومك 40",
    company: "ممفيس",
    price: 55,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "إيزوميبرازول",
    alternatives: [
      {
        id: "eda-17",
        name: "نكسيوم",
        company: "أسترازينيكا",
        price: 95,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "إيزوميبرازول",
      }
    ]
  },
  {
    id: "eda-18",
    name: "سيباستول",
    company: "فايزر",
    price: 145,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيفوتاكسيم",
    alternatives: [
      {
        id: "eda-19",
        name: "سيفوتاكس",
        company: "إيبيكو",
        price: 85,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيفوتاكسيم",
      }
    ]
  },
  {
    id: "eda-20",
    name: "ديان",
    company: "جانسن",
    price: 140,
    country: "بلجيكا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيبروهبتادين",
    alternatives: [
      {
        id: "eda-21",
        name: "أبيتيت",
        company: "مركز",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيبروهبتادين",
      }
    ]
  },
  {
    id: "eda-22",
    name: "حنفي-إم",
    company: "إيبيكو",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ميبيفيرين",
    alternatives: [
      {
        id: "eda-23",
        name: "كولوفاك",
        company: "ميرك",
        price: 40,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ميبيفيرين",
      }
    ]
  },
  {
    id: "eda-24",
    name: "كلافوكس",
    company: "جلاكسو سميث كلاين",
    price: 75,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أموكسيسيلين + كلافولانيك أسيد",
    alternatives: [
      {
        id: "eda-25",
        name: "أوجمنتين",
        company: "جلاكسو سميث كلاين",
        price: 85,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أموكسيسيلين + كلافولانيك أسيد",
      },
      {
        id: "eda-26",
        name: "ميجاموكس",
        company: "سيد",
        price: 55,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أموكسيسيلين + كلافولانيك أسيد",
      }
    ]
  },
  {
    id: "eda-27",
    name: "فلوكسيتين",
    company: "سيد",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "فلوكستين",
    alternatives: [
      {
        id: "eda-28",
        name: "بروزاك",
        company: "إيلي ليلي",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "فلوكستين",
      }
    ]
  },
  {
    id: "eda-29",
    name: "فيفادول",
    company: "سيد",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "eda-30",
        name: "بانادول",
        company: "جلاكسو سميث كلاين",
        price: 25,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "eda-31",
    name: "ألتروفان",
    company: "أكتاليس",
    price: 38,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ألوبيورينول",
    alternatives: [
      {
        id: "eda-32",
        name: "زيلوريك",
        company: "جلاكسو سميث كلاين",
        price: 65,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "ألوبيورينول",
      }
    ]
  },
  {
    id: "eda-33",
    name: "ليبيكس",
    company: "نوفارتس",
    price: 40,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فينوفايبرات",
    alternatives: [
      {
        id: "eda-34",
        name: "فينوجريك",
        company: "أمون",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فينوفايبرات",
      }
    ]
  },
  {
    id: "eda-35",
    name: "سيتالوبرام",
    company: "إيبيكو",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سيتالوبرام",
    alternatives: [
      {
        id: "eda-36",
        name: "سيليكسا",
        company: "فورست لابوراتوريز",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "سيتالوبرام",
      }
    ]
  },
  {
    id: "eda-37",
    name: "سيروكسات",
    company: "جلاكسو سميث كلاين",
    price: 75,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "باروكسيتين",
    alternatives: [
      {
        id: "eda-38",
        name: "باكستين",
        company: "إيفا فارما",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "باروكسيتين",
      }
    ]
  }
];
