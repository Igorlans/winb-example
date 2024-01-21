import { Locale } from "@/i18n.config";

export * from "./event";
export * from "./region";
export * from "./member";
export * from "./service";
export * from "./article";
export * from "./business";
export * from "./banner"

export type LocaleObjectValues<T> = Record<Locale,T>
export type ClientLocaleDataObject<T> = {
    textFields: T
}
export type LocalePageParams = {
    params: { locale: Locale }
}
export function relationIncludeArgs(args: { [key: string]: boolean }, relation: string) {
    delete args[relation]
    return args
}