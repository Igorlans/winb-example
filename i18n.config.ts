export const i18n = {
  defaultLocale: 'uk',
  locales: ['uk', 'en', 'pl']
} as const

export enum Locales {
  "uk" = "uk",
  "en" = "en",
  "pl" = "pl"
}
export type Locale = keyof typeof Locales
