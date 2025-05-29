import { useDateFormat } from "@vueuse/core";

export const useFormats = () => {
  const formatDate = (date: string | Date, format = "MMMM D, YYYY") => {
    const value = typeof date === "string" ? new Date(date) : date;
    return useDateFormat(value, format).value;
  };

  return {
    formatDate,
  };
};
