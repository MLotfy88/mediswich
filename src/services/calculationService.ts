
import { Drug, Alternative } from "@/types";

// Function to calculate savings percentage
export const calculateSavings = (drug: Drug, alternative: Alternative): number => {
  if (!drug || !alternative) {
    return 0;
  }
  const saving = drug.price - alternative.price;
  const savingsPercentage = (saving / drug.price) * 100;
  return Math.max(0, Math.round(savingsPercentage));
};
