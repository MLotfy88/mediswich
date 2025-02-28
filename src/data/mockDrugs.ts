
import { Drug } from "@/types";
import { painRelievers } from "./drugs/painRelievers";
import { antibiotics } from "./drugs/antibiotics";
import { cardiovascular } from "./drugs/cardiovascular";
import { antiallergic } from "./drugs/antiallergic";
import { antidiabetic } from "./drugs/antidiabetic";
import { gastrointestinal } from "./drugs/gastrointestinal";
import { cholesterolLowering } from "./drugs/cholesterolLowering";
import { psychotropics } from "./drugs/psychotropics";
import { hormones } from "./drugs/hormones";
import { specialMedications } from "./drugs/specialMedications";
import { altibbiMedications } from "./drugs/altibbiMedications";

// تجميع كل الأدوية من جميع الفئات في مصفوفة واحدة
export const mockDrugs: Drug[] = [
  ...painRelievers,
  ...antibiotics,
  ...cardiovascular,
  ...antiallergic,
  ...antidiabetic,
  ...gastrointestinal,
  ...cholesterolLowering,
  ...psychotropics,
  ...hormones,
  ...specialMedications,
  ...altibbiMedications
];
