import { messages } from "./messages";

export type Locale = keyof typeof messages;

export type MessagesForLocale = (typeof messages)[Locale];

export type DotPaths<T> = {
  [K in keyof T]: T[K] extends string
    ? `${Extract<K, string>}`
    : T[K] extends object
    ? `${Extract<K, string>}.${DotPaths<T[K]>}`
    : never;
}[keyof T];

export type TranslationKey = DotPaths<MessagesForLocale>;
