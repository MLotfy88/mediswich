
import { Drug } from "@/types";

// الأدوية المستخرجة من موقع ويب طب (WebTeb)
export const webTebMedications: Drug[] = [
  {
    id: "webteb-1",
    name: "هيوسين",
    company: "إيبيكو",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بوتيل سكوبولامين",
    alternatives: [
      {
        id: "webteb-2",
        name: "بوسكوبان",
        company: "بوهرنجر إنجلهايم",
        price: 25,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بوتيل سكوبولامين",
      }
    ]
  },
  {
    id: "webteb-3",
    name: "فورتيكور",
    company: "مينا فارم",
    price: 42,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ديكلوفيناك + فيتامين B",
    alternatives: [
      {
        id: "webteb-4",
        name: "كاتافلام",
        company: "نوفارتس",
        price: 30,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ديكلوفيناك",
      }
    ]
  },
  {
    id: "webteb-5",
    name: "فيكتوزا",
    company: "نوفو نورديسك",
    price: 1500,
    country: "الدنمارك",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ليراجلوتيد",
    alternatives: [
      {
        id: "webteb-6",
        name: "ساكسندا",
        company: "نوفو نورديسك",
        price: 2000,
        country: "الدنمارك",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "ليراجلوتيد",
      }
    ]
  },
  {
    id: "webteb-7",
    name: "تروفادا",
    company: "جيلياد",
    price: 1200,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إمتريسيتابين + تينوفوفير",
    alternatives: [
      {
        id: "webteb-8",
        name: "دسكوفي",
        company: "جيلياد",
        price: 1500,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "إمتريسيتابين + تينوفوفير ألافيناميد",
      }
    ]
  },
  {
    id: "webteb-9",
    name: "إنفوليب",
    company: "مارسيل",
    price: 190,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "كوليستيرامين",
    alternatives: [
      {
        id: "webteb-10",
        name: "كويستران",
        company: "بريستول مايرز سكويب",
        price: 250,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "كوليستيرامين",
      }
    ]
  },
  {
    id: "webteb-11",
    name: "ديامول",
    company: "أمون",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "webteb-12",
        name: "تايلينول",
        company: "جونسون آند جونسون",
        price: 45,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "webteb-13",
    name: "انتينال",
    company: "فاركو",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "رايس-فوراميد",
    alternatives: [
      {
        id: "webteb-14",
        name: "سمكتا",
        company: "إيبسن فارما",
        price: 40,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "رايس-فوراميد",
      }
    ]
  },
  {
    id: "webteb-15",
    name: "سيرترل",
    company: "جلاكسو سميث كلاين",
    price: 80,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيرترالين",
    alternatives: [
      {
        id: "webteb-16",
        name: "لوسترال",
        company: "فايزر",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "سيرترالين",
      },
      {
        id: "webteb-17",
        name: "سيرترا",
        company: "الحكمة",
        price: 50,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيرترالين",
      }
    ]
  },
  {
    id: "webteb-18",
    name: "ملتي فيتامينز",
    company: "فايزر",
    price: 120,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فيتامينات متعددة + معادن",
    alternatives: [
      {
        id: "webteb-19",
        name: "سنترم",
        company: "GSK",
        price: 150,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "فيتامينات متعددة + معادن",
      },
      {
        id: "webteb-20",
        name: "ألفا فيت",
        company: "فاركو",
        price: 60,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فيتامينات متعددة + معادن",
      }
    ]
  },
  {
    id: "webteb-21",
    name: "أوميز",
    company: "أبوت",
    price: 60,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أوميبرازول",
    alternatives: [
      {
        id: "webteb-22",
        name: "بريلوسيك",
        company: "أسترازينيكا",
        price: 75,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "أوميبرازول",
      },
      {
        id: "webteb-23",
        name: "جاستروزول",
        company: "إيبيكو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أوميبرازول",
      }
    ]
  },
  {
    id: "webteb-24",
    name: "ريليفين",
    company: "إيفا فارما",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول + إيبوبروفين",
    alternatives: [
      {
        id: "webteb-25",
        name: "أدفيل دويل أكشن",
        company: "فايزر",
        price: 45,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "باراسيتامول + إيبوبروفين",
      }
    ]
  },
  {
    id: "webteb-26",
    name: "فيماجستين",
    company: "ميرك",
    price: 65,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بروجسترون",
    alternatives: [
      {
        id: "webteb-27",
        name: "سيكلوجست",
        company: "إيبيكو",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بروجسترون",
      }
    ]
  },
  {
    id: "webteb-28",
    name: "هيبارين ليو",
    company: "ليو فارما",
    price: 80,
    country: "الدنمارك",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "هيبارين",
    alternatives: [
      {
        id: "webteb-29",
        name: "هيباكومب",
        company: "أمون",
        price: 60,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "هيبارين",
      }
    ]
  },
  {
    id: "webteb-30",
    name: "تاميفلو",
    company: "روش",
    price: 150,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أوسيلتاميفير",
    alternatives: [
      {
        id: "webteb-31",
        name: "فلوريز",
        company: "ممفيس",
        price: 100,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أوسيلتاميفير",
      }
    ]
  },
  {
    id: "webteb-32",
    name: "تنسيلار",
    company: "سانوفي",
    price: 25,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أوكسيمثازولين",
    alternatives: [
      {
        id: "webteb-33",
        name: "نازورين",
        company: "فاركو",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أوكسيمثازولين",
      }
    ]
  },
  {
    id: "webteb-34",
    name: "أتاراكس",
    company: "فايزر",
    price: 35,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "هيدروكسيزين",
    alternatives: [
      {
        id: "webteb-35",
        name: "هستازين",
        company: "الحكمة",
        price: 22,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "هيدروكسيزين",
      }
    ]
  },
  {
    id: "webteb-36",
    name: "تلفاست",
    company: "سانوفي",
    price: 45,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فيكسوفينادين",
    alternatives: [
      {
        id: "webteb-37",
        name: "الليرجكس",
        company: "إيبيكو",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فيكسوفينادين",
      }
    ]
  },
  {
    id: "webteb-38",
    name: "سولوتريك",
    company: "أسترازينيكا",
    price: 1800,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "تيكاجريلور",
    alternatives: [
      {
        id: "webteb-39",
        name: "بريليكيس",
        company: "أمون",
        price: 1200,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "تيكاجريلور",
      }
    ]
  },
  {
    id: "webteb-40",
    name: "لانوكسين",
    company: "أسبن",
    price: 15,
    country: "جنوب أفريقيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديجوكسين",
    alternatives: [
      {
        id: "webteb-41",
        name: "ديجوستيد",
        company: "مينا فارم",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ديجوكسين",
      }
    ]
  }
];
