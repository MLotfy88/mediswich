
import { Drug } from "@/types";
import { drugsData } from "./data/mockDrugs";

// Function to filter drugs based on criteria
export const filterDrugs = async (
  country: string | null,
  priceRange: { min: number | null; max: number | null },
  availability: string | null,
  drugType: string | null
): Promise<Drug[]> => {
  return drugsData.filter((drug) => {
    if (country && drug.country !== country) {
      return false;
    }
    if (
      priceRange.min !== null &&
      drug.price < priceRange.min
    ) {
      return false;
    }
    if (
      priceRange.max !== null &&
      drug.price > priceRange.max
    ) {
      return false;
    }
    if (
      availability === "available" &&
      !drug.isAvailable
    ) {
      return false;
    }
    if (
      availability === "unavailable" &&
      drug.isAvailable
    ) {
      return false;
    }
    if (drugType && drug.drugType !== drugType) {
      return false;
    }
    return true;
  });
};
