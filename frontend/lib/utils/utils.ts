import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === "cs" ? "cs-CZ" : "en-US");
}

export function formatPrice(price: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale === "cs" ? "cs-CZ" : "en-US", {
    style: "currency",
    currency,
  }).format(price);
}
