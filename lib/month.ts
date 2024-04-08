import { months } from "@/types/months";

export const getMonthString = (month: number): string => {
  return months[month - 1];
};
