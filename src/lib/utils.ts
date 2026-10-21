import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// GitHub Pages serves the app under a sub-path; next/image does not prefix
// string srcs with basePath, so public assets need it added by hand.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const PLACEHOLDER_IMAGE = `${BASE_PATH}/placeholder-product.svg`;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tempshop.com";
