
import { Drug } from "@/types";

// فئة مضادات الحساسية
export const antiallergic: Drug[] = [
  {
    id: "22",
    name: "لوراتادين 10mg",
    company: "EIPICO",
    price: 8,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "لوراتادين",
    alternatives: [
      {
        id: "23",
        name: "كلاريتين",
        company: "Schering-Plough",
        price: 35,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "لوراتادين",
      },
      {
        id: "24",
        name: "هيستازين",
        company: "سيد",
        price: 10,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "لوراتادين",
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
    activeIngredient: "سيتيريزين",
    alternatives: [
      {
        id: "50",
        name: "زيرتك",
        company: "UCB",
        price: 45,
        country: "بلجيكا",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيتيريزين",
      },
      {
        id: "51",
        name: "أليرتيك",
        company: "EIPICO",
        price: 15,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيتيريزين",
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
    activeIngredient: "كلورفينيرامين",
    alternatives: [
      {
        id: "53",
        name: "بيريتون",
        company: "جلاكسو",
        price: 12,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: false,
        activeIngredient: "كلورفينيرامين",
      },
      {
        id: "54",
        name: "هيستوب",
        company: "النيل",
        price: 5,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "كلورفينيرامين",
      },
    ],
  },
  {
    id: "103",
    name: "ديسلوراتادين 5mg",
    company: "شيرينج-بلاو",
    price: 55,
    country: "الولايات المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "ديسلوراتادين",
    alternatives: [
      {
        id: "104",
        name: "إيريوس",
        company: "شيرينج-بلاو",
        price: 65,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "ديسلوراتادين",
      },
      {
        id: "105",
        name: "ديزالير",
        company: "مينا فارم",
        price: 25,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "ديسلوراتادين",
      },
    ],
  },
];
