import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  else if (size < 1073741824) return `${(size / 1048576).toFixed(2)} MB`;
  else return `${(size / 1073741824).toFixed(2)} GB`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
