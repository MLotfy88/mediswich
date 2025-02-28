
import { Drug } from "@/types";

// الأدوية المستخرجة من موقع الطبي
export const altibbiMedications: Drug[] = [
  {
    id: "altibbi-1",
    name: "أبيدكسين Apidexin",
    company: "شركات متعددة",
    price: 120,
    country: "متعدد",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فينترمين",
    alternatives: [
      {
        id: "altibbi-2",
        name: "أديباكس Adipex",
        company: "فايزر",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "فينترمين",
      },
      {
        id: "altibbi-3",
        name: "ريدكتيل Reductil",
        company: "أبوت",
        price: 80,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيبوترامين",
      }
    ]
  },
  {
    id: "altibbi-4",
    name: "أبيروكس Aperox",
    company: "المصرية للتجارة",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سيليكوكسيب",
    alternatives: [
      {
        id: "altibbi-5",
        name: "سيليبريكس Celebrex",
        company: "فايزر",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيليكوكسيب",
      }
    ]
  },
  {
    id: "altibbi-6",
    name: "أبيفيلين Apiphylline",
    company: "أكتلاب",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ثيوفيلين",
    alternatives: [
      {
        id: "altibbi-7",
        name: "ثيوفين Theophin",
        company: "سيد",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ثيوفيلين",
      }
    ]
  },
  {
    id: "altibbi-8",
    name: "أبيميت Apimet",
    company: "المهن الطبية",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ميتوكلوبراميد",
    alternatives: [
      {
        id: "altibbi-9",
        name: "ميتوكلوبراميد Metoclopramide",
        company: "إيبيكو",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ميتوكلوبراميد",
      },
      {
        id: "altibbi-10",
        name: "بريمبران Primperan",
        company: "سانوفي",
        price: 40,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ميتوكلوبراميد",
      }
    ]
  },
  {
    id: "altibbi-11",
    name: "أسيميكس Acemex",
    company: "إيبيكو",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بيروكسيكام",
    alternatives: [
      {
        id: "altibbi-12",
        name: "فيلدين Feldene",
        company: "فايزر",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بيروكسيكام",
      }
    ]
  },
  {
    id: "altibbi-13",
    name: "أسيتوفوس Acetofos",
    company: "المهن الطبية",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "altibbi-14",
        name: "باراسيتامول Paracetamol",
        company: "فاركو",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "altibbi-15",
    name: "أوجمنتين Augmentin",
    company: "جلاكسو سميث كلاين",
    price: 95,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أموكسيسيللين/كلافولانيك أسيد",
    alternatives: [
      {
        id: "altibbi-16",
        name: "هيكساموكس Hiramox",
        company: "إيبيكو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أموكسيسيللين",
      },
      {
        id: "altibbi-17",
        name: "ميجاموكس Megamox",
        company: "فاركو",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أموكسيسيللين/كلافولانيك أسيد",
      }
    ]
  },
  {
    id: "altibbi-18",
    name: "أوميبرازول Omeprazole",
    company: "العربية",
    price: 20,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أوميبرازول",
    alternatives: [
      {
        id: "altibbi-19",
        name: "بريلوسيك Prilosec",
        company: "أسترا زينيكا",
        price: 75,
        country: "السويد",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أوميبرازول",
      },
      {
        id: "altibbi-20",
        name: "جاسيك Gasec",
        company: "مينا فارم",
        price: 18,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أوميبرازول",
      }
    ]
  },
  {
    id: "altibbi-21",
    name: "آكتيفيد Actifed",
    company: "جلاكسو سميث كلاين",
    price: 30,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "تريبرولدين/سودوإيفيدرين",
    alternatives: [
      {
        id: "altibbi-22",
        name: "كونتاك Contac",
        company: "جلاكسو سميث كلاين",
        price: 25,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "تريبرولدين/سودوإيفيدرين",
      }
    ]
  },
  {
    id: "altibbi-23",
    name: "أكتوس Actos",
    company: "تاكيدا",
    price: 350,
    country: "اليابان",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بيوجليتازون",
    alternatives: [
      {
        id: "altibbi-24",
        name: "ديابيتون Diabeton",
        company: "مينا فارم",
        price: 150,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بيوجليتازون",
      }
    ]
  },
  {
    id: "altibbi-25",
    name: "أبتيفيل Abti-Veil",
    company: "أمون",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "هيبارين",
    alternatives: [
      {
        id: "altibbi-26",
        name: "هيموكلار Hemoclar",
        company: "سيد",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "هيبارين",
      }
    ]
  },
  {
    id: "altibbi-27",
    name: "أداكتون Aldactone",
    company: "فايزر",
    price: 60,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سبيرونولاكتون",
    alternatives: [
      {
        id: "altibbi-28",
        name: "سبيرولاكتون Spirolactone",
        company: "العربية",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سبيرونولاكتون",
      }
    ]
  },
  {
    id: "altibbi-29",
    name: "أديفيل Advil",
    company: "فايزر",
    price: 25,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إيبوبروفين",
    alternatives: [
      {
        id: "altibbi-30",
        name: "بروفين Brufen",
        company: "إبن سينا",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "إيبوبروفين",
      }
    ]
  },
  {
    id: "altibbi-31",
    name: "أفيل Avil",
    company: "سانوفي",
    price: 15,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فينيرامين ماليات",
    alternatives: [
      {
        id: "altibbi-32",
        name: "هيستوب Histop",
        company: "العاشر من رمضان",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "كلورفينيرامين ماليات",
      }
    ]
  },
  {
    id: "altibbi-33",
    name: "أكسيكام Xicam",
    company: "مينا فارم",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بيروكسيكام",
    alternatives: [
      {
        id: "altibbi-34",
        name: "فيلدين Feldene",
        company: "فايزر",
        price: 80,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بيروكسيكام",
      }
    ]
  },
  {
    id: "altibbi-35",
    name: "بندول Pandol",
    company: "جلاكسو سميث كلاين",
    price: 15,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "altibbi-36",
        name: "باراسيتامول Paracetamol",
        company: "فاركو",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "altibbi-37",
    name: "بنادول Panadol",
    company: "جلاكسو سميث كلاين",
    price: 25,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "altibbi-38",
        name: "تايلينول Tylenol",
        company: "جونسون آند جونسون",
        price: 35,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "altibbi-39",
    name: "بيتادين Betadine",
    company: "مندفارما",
    price: 22,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بوفيدون يود",
    alternatives: [
      {
        id: "altibbi-40",
        name: "يودين Iodine",
        company: "الفا",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بوفيدون يود",
      }
    ]
  },
  {
    id: "altibbi-41",
    name: "بروفين Brufen",
    company: "أبوت",
    price: 20,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إيبوبروفين",
    alternatives: [
      {
        id: "altibbi-42",
        name: "أديفيل Advil",
        company: "فايزر",
        price: 25,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "إيبوبروفين",
      }
    ]
  },
  {
    id: "altibbi-43",
    name: "تاميفلو Tamiflu",
    company: "روش",
    price: 120,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أوسيلتاميفير",
    alternatives: [
      {
        id: "altibbi-44",
        name: "فلوفير Fluvir",
        company: "سيبلا",
        price: 80,
        country: "الهند",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أوسيلتاميفير",
      }
    ]
  },
  {
    id: "altibbi-45",
    name: "تلفاست Telfast",
    company: "سانوفي",
    price: 45,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فيكسوفينادين",
    alternatives: [
      {
        id: "altibbi-46",
        name: "ألليرجيكس Allergex",
        company: "إيبيكو",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فيكسوفينادين",
      }
    ]
  },
  {
    id: "altibbi-47",
    name: "دافلون Daflon",
    company: "سيرفييه",
    price: 75,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديوسمين/هسبريدين",
    alternatives: [
      {
        id: "altibbi-48",
        name: "فينوروتون Venoruton",
        company: "نوفارتس",
        price: 65,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "روتوسيد",
      }
    ]
  },
  {
    id: "altibbi-49",
    name: "دوفاستون Duphaston",
    company: "أبوت",
    price: 80,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديدروجستيرون",
    alternatives: [
      {
        id: "altibbi-50",
        name: "بروجينوفا Proginova",
        company: "باير",
        price: 70,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "إستراديول فاليرات",
      }
    ]
  },
  {
    id: "altibbi-51",
    name: "زانتاك Zantac",
    company: "جلاكسو سميث كلاين",
    price: 40,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: false,
    activeIngredient: "رانيتيدين",
    alternatives: [
      {
        id: "altibbi-52",
        name: "رانيدين Ranidine",
        company: "إيبيكو",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "رانيتيدين",
      }
    ]
  },
  {
    id: "altibbi-53",
    name: "زيثروماكس Zithromax",
    company: "فايزر",
    price: 85,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أزيثرومايسين",
    alternatives: [
      {
        id: "altibbi-54",
        name: "أزيثرال Azithral",
        company: "أمون",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أزيثرومايسين",
      }
    ]
  },
  {
    id: "altibbi-55",
    name: "سيبرو Cipro",
    company: "باير",
    price: 65,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيبروفلوكساسين",
    alternatives: [
      {
        id: "altibbi-56",
        name: "سيروبروكس Ciproflox",
        company: "العربية",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيبروفلوكساسين",
      }
    ]
  },
  {
    id: "altibbi-57",
    name: "كلاريتين Claritine",
    company: "شرينغ بلاو",
    price: 55,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "لوراتادين",
    alternatives: [
      {
        id: "altibbi-58",
        name: "الليرجيكس Allergex",
        company: "جلوبال نابي",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "لوراتادين",
      }
    ]
  },
  {
    id: "altibbi-59",
    name: "كونكور Concor",
    company: "ميرك",
    price: 75,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "بيسوبرولول",
    alternatives: [
      {
        id: "altibbi-60",
        name: "بيسوكور Bisocor",
        company: "إيبيكو",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بيسوبرولول",
      }
    ]
  },
  {
    id: "altibbi-61",
    name: "ليبيتور Lipitor",
    company: "فايزر",
    price: 130,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أتورفاستاتين",
    alternatives: [
      {
        id: "altibbi-62",
        name: "أتورزيت Atorzet",
        company: "مينا فارم",
        price: 50,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أتورفاستاتين",
      }
    ]
  },
  {
    id: "altibbi-63",
    name: "لوسيك Losec",
    company: "أسترا زينيكا",
    price: 70,
    country: "السويد",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أوميبرازول",
    alternatives: [
      {
        id: "altibbi-64",
        name: "جاسيك Gasec",
        company: "مينا فارم",
        price: 18,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أوميبرازول",
      }
    ]
  },
  {
    id: "altibbi-65",
    name: "مولتاق Voltaren",
    company: "نوفارتس",
    price: 55,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديكلوفيناك",
    alternatives: [
      {
        id: "altibbi-66",
        name: "ديكلاك Declac",
        company: "فاركو",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ديكلوفيناك",
      }
    ]
  },
  {
    id: "altibbi-67",
    name: "ميرسيلون Marvelon",
    company: "أورجانون",
    price: 55,
    country: "هولندا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديزوجستريل/إيثينيل إستراديول",
    alternatives: [
      {
        id: "altibbi-68",
        name: "جينيرا Gynera",
        company: "باير",
        price: 50,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "جيستودين/إيثينيل إستراديول",
      }
    ]
  },
  {
    id: "altibbi-69",
    name: "نيكسيوم Nexium",
    company: "أسترا زينيكا",
    price: 120,
    country: "السويد",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "إيسوميبرازول",
    alternatives: [
      {
        id: "altibbi-70",
        name: "إيزوميبرازول Esomeprazole",
        company: "إيبيكو",
        price: 45,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "إيسوميبرازول",
      }
    ]
  },
  {
    id: "altibbi-71",
    name: "نورفاسك Norvasc",
    company: "فايزر",
    price: 90,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أملوديبين",
    alternatives: [
      {
        id: "altibbi-72",
        name: "أملودار Amlodar",
        company: "دار الدواء",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أملوديبين",
      }
    ]
  },
  {
    id: "altibbi-73",
    name: "ياسمين Yasmin",
    company: "باير",
    price: 85,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "دروسبيرينون/إيثينيل إستراديول",
    alternatives: [
      {
        id: "altibbi-74",
        name: "دايان Diane",
        company: "باير",
        price: 70,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيبروتيرون/إيثينيل إستراديول",
      }
    ]
  },
  {
    id: "altibbi-75",
    name: "فياجرا Viagra",
    company: "فايزر",
    price: 160,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "سيلدينافيل",
    alternatives: [
      {
        id: "altibbi-76",
        name: "فيجورا Vigora",
        company: "إيبيكو",
        price: 80,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيلدينافيل",
      }
    ]
  },
  {
    id: "altibbi-77",
    name: "أزومالين Azomycin",
    company: "مينا فارم",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أزيثرومايسين",
    alternatives: [
      {
        id: "altibbi-78",
        name: "زيثروماكس Zithromax",
        company: "فايزر",
        price: 85,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أزيثرومايسين",
      }
    ]
  },
  {
    id: "altibbi-79",
    name: "كبتوبريل Captopril",
    company: "سيد",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "كابتوبريل",
    alternatives: [
      {
        id: "altibbi-80",
        name: "كابوتين Capoten",
        company: "ميرك",
        price: 45,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "كابتوبريل",
      }
    ]
  },
  {
    id: "altibbi-81",
    name: "ميكوجين Mucogyne",
    company: "المهن الطبية",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بوليفينول",
    alternatives: [
      {
        id: "altibbi-82",
        name: "بيتادين المهبلي Betadine Vaginal",
        company: "مندفارما",
        price: 35,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بوفيدون يود",
      }
    ]
  },
  {
    id: "altibbi-83",
    name: "إنتال Intal",
    company: "سانوفي",
    price: 40,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "كرومولين صوديوم",
    alternatives: [
      {
        id: "altibbi-84",
        name: "كرومولين Cromolin",
        company: "ميمفيس",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "كرومولين صوديوم",
      }
    ]
  }
];
