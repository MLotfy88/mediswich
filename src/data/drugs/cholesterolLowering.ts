
import { Drug } from "@/types";

// فئة خافضات الكوليسترول
export const cholesterolLowering: Drug[] = [
  {
    id: "16",
    name: "أتورفاستاتين 20mg",
    company: "سيد",
    price: 25,
    country: "مصر",
    isEgyptian: true,
    isAvailable: true,
    activeIngredient: "أتورفاستاتين",
    alternatives: [
      {
        id: "17",
        name: "ليبيتور",
        company: "Pfizer",
        price: 120,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "أتورفاستاتين",
      },
      {
        id: "18",
        name: "أتوركس",
        company: "EIPICO",
        price: 20,
        country: "مصر",
        isEgyptian: true,
        isAvailable: false,
        activeIngredient: "أتورفاستاتين",
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
    activeIngredient: "سيمفاستاتين",
    alternatives: [
      {
        id: "44",
        name: "زوكور",
        company: "ميرك",
        price: 95,
        country: "الولايات المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "سيمفاستاتين",
      },
      {
        id: "45",
        name: "سيمفاكور",
        company: "مصر الدولية",
        price: 30,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "سيمفاستاتين",
      },
    ],
  },
  {
    id: "112",
    name: "روزوفاستاتين 10mg",
    company: "أسترازينيكا",
    price: 180,
    country: "المملكة المتحدة",
    isEgyptian: false,
    isAvailable: true,
    activeIngredient: "روزوفاستاتين",
    alternatives: [
      {
        id: "113",
        name: "كريستور",
        company: "أسترازينيكا",
        price: 200,
        country: "المملكة المتحدة",
        isEgyptian: false,
        isAvailable: true,
        activeIngredient: "روزوفاستاتين",
      },
      {
        id: "114",
        name: "روزيتا",
        company: "إيبيكو",
        price: 70,
        country: "مصر",
        isEgyptian: true,
        isAvailable: true,
        activeIngredient: "روزوفاستاتين",
      },
    ],
  },
];
