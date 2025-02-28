
import { Drug } from "@/types";

// الأدوية المستخرجة من موقع ويب طب وغيره من المصادر
export const webTebMedications: Drug[] = [
  {
    id: "webteb-1",
    name: "أبريكس Aprecox",
    company: "مينا فارم",
    price: 65,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سليكوكسيب",
    alternatives: [
      {
        id: "webteb-2",
        name: "سيليبريكس Celebrex",
        company: "فايزر",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سليكوكسيب",
      }
    ]
  },
  {
    id: "webteb-3",
    name: "أبيدون Apidone",
    company: "سيدكو",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "دومبيريدون",
    alternatives: [
      {
        id: "webteb-4",
        name: "موتيليوم Motilium",
        company: "جانسن",
        price: 70,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "دومبيريدون",
      }
    ]
  },
  {
    id: "webteb-5",
    name: "أبيترام Apetrame",
    company: "العاشر من رمضان",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سيبروهيبتادين",
    alternatives: [
      {
        id: "webteb-6",
        name: "بيريكتول Periactin",
        company: "ميرك",
        price: 50,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "سيبروهيبتادين",
      }
    ]
  },
  {
    id: "webteb-7",
    name: "أبيسول Apisol",
    company: "الإسكندرية",
    price: 28,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "webteb-8",
        name: "بنادول Panadol",
        company: "جلاكسو سميث كلاين",
        price: 40,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "باراسيتامول",
      }
    ]
  },
  {
    id: "webteb-9",
    name: "إبيديرم Epiderm",
    company: "ممفيس",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بيتاميثازون",
    alternatives: [
      {
        id: "webteb-10",
        name: "بيتاديرم Betaderm",
        company: "فاركو",
        price: 38,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "بيتاميثازون",
      }
    ]
  },
  {
    id: "webteb-11",
    name: "إبيفورين Epiforin",
    company: "العربية",
    price: 27,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "إيبينيفرين",
    alternatives: [
      {
        id: "webteb-12",
        name: "إيبينيفرين Epinephrine",
        company: "هوسبيرا",
        price: 60,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "إيبينيفرين",
      }
    ]
  },
  {
    id: "webteb-13",
    name: "أتينول Atenol",
    company: "الحكمة",
    price: 20,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتينولول",
    alternatives: [
      {
        id: "webteb-14",
        name: "تينورمين Tenormin",
        company: "أسترازينيكا",
        price: 65,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أتينولول",
      }
    ]
  },
  {
    id: "webteb-15",
    name: "أتورستات Atorstat",
    company: "أكتوفارما",
    price: 42,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتورفاستاتين",
    alternatives: [
      {
        id: "webteb-16",
        name: "ليبيتور Lipitor",
        company: "فايزر",
        price: 130,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أتورفاستاتين",
      }
    ]
  },
  {
    id: "webteb-17",
    name: "أتورفا Atorva",
    company: "سيد",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتورفاستاتين",
    alternatives: [
      {
        id: "webteb-18",
        name: "أتورزيت Atorzet",
        company: "مينا فارم",
        price: 52,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أتورفاستاتين",
      }
    ]
  },
  {
    id: "webteb-19",
    name: "أجيبت Agept",
    company: "أمون",
    price: 55,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "جينكو بيلوبا",
    alternatives: [
      {
        id: "webteb-20",
        name: "تاناكان Tanakan",
        company: "إيبسن",
        price: 85,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "جينكو بيلوبا",
      }
    ]
  },
  {
    id: "webteb-21",
    name: "أزاتيم Azathym",
    company: "مصر للكيماويات الدوائية",
    price: 62,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أزاثيوبرين",
    alternatives: [
      {
        id: "webteb-22",
        name: "إميوران Imuran",
        company: "أستيلاس",
        price: 150,
        country: "اليابان",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "أزاثيوبرين",
      }
    ]
  },
  {
    id: "webteb-23",
    name: "أقراص فوار سريع المفعول",
    company: "إيبيكو",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول/فيتامين سي",
    alternatives: [
      {
        id: "webteb-24",
        name: "بنادول جو Panadol Go",
        company: "جلاكسو سميث كلاين",
        price: 35,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "باراسيتامول/كافيين",
      }
    ]
  },
  {
    id: "webteb-25",
    name: "أكسيال Accial",
    company: "جلوبال نابي",
    price: 38,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سيتريزين",
    alternatives: [
      {
        id: "webteb-26",
        name: "زيرتك Zyrtec",
        company: "يو سي بي",
        price: 75,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيتريزين",
      }
    ]
  },
  {
    id: "webteb-27",
    name: "ألبيزول Alpizol",
    company: "أمون",
    price: 40,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "فلوكونازول",
    alternatives: [
      {
        id: "webteb-28",
        name: "ديفلوكان Diflucan",
        company: "فايزر",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "فلوكونازول",
      }
    ]
  },
  {
    id: "webteb-29",
    name: "ألبيندازول Albendazole",
    company: "مصر الدولية",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ألبيندازول",
    alternatives: [
      {
        id: "webteb-30",
        name: "زينتل Zentel",
        company: "جلاكسو سميث كلاين",
        price: 65,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ألبيندازول",
      }
    ]
  },
  {
    id: "webteb-31",
    name: "ألتام Altam",
    company: "مركز الدواء المصري",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سفترياكسون",
    alternatives: [
      {
        id: "webteb-32",
        name: "روسيفين Rocephin",
        company: "روش",
        price: 110,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سفترياكسون",
      }
    ]
  },
  {
    id: "webteb-33",
    name: "ألجينال Alginal",
    company: "الإسكندرية",
    price: 28,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ألجينيك أسيد",
    alternatives: [
      {
        id: "webteb-34",
        name: "جافيسكون Gaviscon",
        company: "ريكيت بنكيزر",
        price: 75,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ألجينيك أسيد",
      }
    ]
  },
  {
    id: "webteb-35",
    name: "ألدومين Aldomin",
    company: "مينا فارم",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ميثيل دوبا",
    alternatives: [
      {
        id: "webteb-36",
        name: "ألدوميت Aldomet",
        company: "ميرك",
        price: 75,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ميثيل دوبا",
      }
    ]
  },
  {
    id: "webteb-37",
    name: "أمالجيزيك Amalgesic",
    company: "الشرق الأوسط",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "webteb-38",
        name: "كيتوفين Ketofene",
        company: "جلوبال نابي",
        price: 28,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "كيتوبروفين",
      }
    ]
  },
  {
    id: "webteb-39",
    name: "أمبروكس Ambrox",
    company: "مصر الدولية",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أمبروكسول",
    alternatives: [
      {
        id: "webteb-40",
        name: "موكوسولفان Mucosolvan",
        company: "بورنجر إنجلهايم",
        price: 65,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أمبروكسول",
      }
    ]
  },
  {
    id: "webteb-41",
    name: "أمبيسين Ampicin",
    company: "سيد",
    price: 12,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أمبيسيلين",
    alternatives: [
      {
        id: "webteb-42",
        name: "أومنيبين Omnipen",
        company: "جلاكسو سميث كلاين",
        price: 45,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "أمبيسيلين",
      }
    ]
  },
  {
    id: "webteb-43",
    name: "أميبيزيم Amebezim",
    company: "القاهرة",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "متروندازول",
    alternatives: [
      {
        id: "webteb-44",
        name: "فلاجيل Flagyl",
        company: "سانوفي",
        price: 55,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "متروندازول",
      }
    ]
  },
  {
    id: "webteb-45",
    name: "أميتريبتيلين Amitriptyline",
    company: "الشرق الأوسط",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أميتريبتيلين",
    alternatives: [
      {
        id: "webteb-46",
        name: "إيلافيل Elavil",
        company: "أسترازينيكا",
        price: 85,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "أميتريبتيلين",
      }
    ]
  },
  {
    id: "webteb-47",
    name: "أميكاسين Amikacin",
    company: "مينا فارم",
    price: 65,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أميكاسين",
    alternatives: [
      {
        id: "webteb-48",
        name: "أميكين Amikin",
        company: "بريستول مايرز سكويب",
        price: 130,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أميكاسين",
      }
    ]
  },
  {
    id: "webteb-49",
    name: "أنتينال Antinal",
    company: "المهن الطبية",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "نيفوروكسازيد",
    alternatives: [
      {
        id: "webteb-50",
        name: "دايسميد Diarsmid",
        company: "أكتوفارما",
        price: 22,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "نيفوروكسازيد",
      }
    ]
  },
  {
    id: "webteb-51",
    name: "أنجيوكور Angiocor",
    company: "جلوبال نابي",
    price: 55,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ترايميثازيدين",
    alternatives: [
      {
        id: "webteb-52",
        name: "فاستوم Vastum",
        company: "ميناركو",
        price: 50,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ترايميثازيدين",
      }
    ]
  },
  {
    id: "webteb-53",
    name: "بروفينال Brofinal",
    company: "أكتوفارما",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بروميكسين",
    alternatives: [
      {
        id: "webteb-54",
        name: "بستاسين Bisolvon",
        company: "بورنجر إنجلهايم",
        price: 75,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بروميكسين",
      }
    ]
  },
  {
    id: "webteb-55",
    name: "بريمولوت Primolut",
    company: "باير",
    price: 65,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "نورإيثيستيرون",
    alternatives: [
      {
        id: "webteb-56",
        name: "نوريثيميت Norethimite",
        company: "مينا فارم",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "نورإيثيستيرون",
      }
    ]
  },
  {
    id: "webteb-57",
    name: "بريستيم Bristem",
    company: "الأهرام",
    price: 40,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "تاموكسيفين",
    alternatives: [
      {
        id: "webteb-58",
        name: "نولفاديكس Nolvadex",
        company: "أسترازينيكا",
        price: 110,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "تاموكسيفين",
      }
    ]
  },
  {
    id: "webteb-59",
    name: "بكتام Bactam",
    company: "سيد",
    price: 28,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "سلبكتام/أمبيسيلين",
    alternatives: [
      {
        id: "webteb-60",
        name: "يونازين Unasyn",
        company: "فايزر",
        price: 85,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سلبكتام/أمبيسيلين",
      }
    ]
  },
  {
    id: "webteb-61",
    name: "بنزكس Benzex",
    company: "القاهرة",
    price: 15,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بيروكسيد البنزويل",
    alternatives: [
      {
        id: "webteb-62",
        name: "بنزاك Benzac",
        company: "جالديرما",
        price: 65,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بيروكسيد البنزويل",
      }
    ]
  },
  {
    id: "webteb-63",
    name: "بيزوكور Bisocor",
    company: "إيبيكو",
    price: 42,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "بيسوبرولول",
    alternatives: [
      {
        id: "webteb-64",
        name: "كونكور Concor",
        company: "ميرك",
        price: 95,
        country: "ألمانيا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بيسوبرولول",
      }
    ]
  },
  {
    id: "webteb-65",
    name: "تايلينول Tylenol",
    company: "جونسون آند جونسون",
    price: 35,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "باراسيتامول",
    alternatives: [
      {
        id: "webteb-66",
        name: "بنادول Panadol",
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
    id: "webteb-67",
    name: "تاوام Tawam",
    company: "أكتوفارما",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أملوديبين/تيلميسارتان",
    alternatives: [
      {
        id: "webteb-68",
        name: "إكسفورج Exforge",
        company: "نوفارتس",
        price: 120,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أملوديبين/فالسارتان",
      }
    ]
  },
  {
    id: "webteb-69",
    name: "تراست Trust",
    company: "سيد",
    price: 26,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "رابيبرازول",
    alternatives: [
      {
        id: "webteb-70",
        name: "باريت Pariet",
        company: "جانسن",
        price: 85,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "رابيبرازول",
      }
    ]
  },
  {
    id: "webteb-71",
    name: "تريتاس Tritace",
    company: "سانوفي",
    price: 75,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "راميبريل",
    alternatives: [
      {
        id: "webteb-72",
        name: "راميبريل Ramipril",
        company: "مينا فارم",
        price: 35,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "راميبريل",
      }
    ]
  },
  {
    id: "webteb-73",
    name: "تريفاتين Trevatin",
    company: "ممفيس",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتورفاستاتين",
    alternatives: [
      {
        id: "webteb-74",
        name: "ليبيتور Lipitor",
        company: "فايزر",
        price: 130,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أتورفاستاتين",
      }
    ]
  },
  {
    id: "webteb-75",
    name: "تيميك Temik",
    company: "مينا فارم",
    price: 35,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "تيمولول",
    alternatives: [
      {
        id: "webteb-76",
        name: "بيتوبتيك Betoptic",
        company: "نوفارتس",
        price: 85,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "بيتاكسولول",
      }
    ]
  },
  {
    id: "webteb-77",
    name: "تينسار Tensar",
    company: "إيفا فارما",
    price: 55,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "لوسارتان",
    alternatives: [
      {
        id: "webteb-78",
        name: "كوزار Cozaar",
        company: "ميرك",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "لوسارتان",
      }
    ]
  },
  {
    id: "webteb-79",
    name: "جلوفار Glofer",
    company: "جلوبال نابي",
    price: 30,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "حديد",
    alternatives: [
      {
        id: "webteb-80",
        name: "فيروجراد Ferograd",
        company: "أبوت",
        price: 65,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "حديد",
      }
    ]
  },
  {
    id: "webteb-81",
    name: "جاسيك Gasec",
    company: "مينا فارم",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أوميبرازول",
    alternatives: [
      {
        id: "webteb-82",
        name: "لوسيك Losec",
        company: "أسترازينيكا",
        price: 75,
        country: "السويد",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أوميبرازول",
      }
    ]
  },
  {
    id: "webteb-83",
    name: "جينيرا Gynera",
    company: "باير",
    price: 55,
    country: "ألمانيا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "جيستودين/إيثينيل إستراديول",
    alternatives: [
      {
        id: "webteb-84",
        name: "فيموفيت Femovit",
        company: "سيد",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ديزوجستريل/إيثينيل إستراديول",
      }
    ]
  },
  {
    id: "webteb-85",
    name: "داسيت Dacite",
    company: "مينا فارم",
    price: 65,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "كلانيثروميسين",
    alternatives: [
      {
        id: "webteb-86",
        name: "كلاسيد Klacid",
        company: "أبوت",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "كلانيثروميسين",
      }
    ]
  },
  {
    id: "webteb-87",
    name: "داناسيد Danacid",
    company: "مصر الدولية",
    price: 18,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ألمنيوم/ماغنيسيوم",
    alternatives: [
      {
        id: "webteb-88",
        name: "مالوكس Maalox",
        company: "سانوفي",
        price: 42,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ألمنيوم/ماغنيسيوم",
      }
    ]
  },
  {
    id: "webteb-89",
    name: "داونيت Donit",
    company: "أمون",
    price: 22,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "دومبيريدون",
    alternatives: [
      {
        id: "webteb-90",
        name: "موتيليوم Motilium",
        company: "جانسن",
        price: 65,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "دومبيريدون",
      }
    ]
  },
  {
    id: "webteb-91",
    name: "دريتين Drytin",
    company: "سيجما",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ديسموبريسين",
    alternatives: [
      {
        id: "webteb-92",
        name: "مينيرين Minirin",
        company: "فيرينج",
        price: 120,
        country: "سويسرا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ديسموبريسين",
      }
    ]
  },
  {
    id: "webteb-93",
    name: "ديباكين Depakine",
    company: "سانوفي",
    price: 75,
    country: "فرنسا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "فالبروات الصوديوم",
    alternatives: [
      {
        id: "webteb-94",
        name: "إيبيفال Epival",
        company: "إيبيكو",
        price: 40,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "فالبروات الصوديوم",
      }
    ]
  },
  {
    id: "webteb-95",
    name: "ديفيرين Differin",
    company: "جالديرما",
    price: 95,
    country: "سويسرا",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "أدابالين",
    alternatives: [
      {
        id: "webteb-96",
        name: "أدابالين Adapalene",
        company: "مينا فارم",
        price: 55,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "أدابالين",
      }
    ]
  },
  {
    id: "webteb-97",
    name: "ديوريل Duril",
    company: "مصر الدولية",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "فوروسيميد",
    alternatives: [
      {
        id: "webteb-98",
        name: "لازيكس Lasix",
        company: "سانوفي",
        price: 65,
        country: "فرنسا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "فوروسيميد",
      }
    ]
  },
  {
    id: "webteb-99",
    name: "زولام Zolam",
    company: "أمون",
    price: 45,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "ألبرازولام",
    alternatives: [
      {
        id: "webteb-100",
        name: "زاناكس Xanax",
        company: "فايزر",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ألبرازولام",
      }
    ]
  }
];
