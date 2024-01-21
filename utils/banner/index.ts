import { Banner, BannerTextFields, ClientBanner } from "@/types";
import { Locale } from "@/i18n.config";
import { textFieldsTransformCatch } from "@/utils";

export function transformBannerData(data: Banner, locale: Locale): ClientBanner;
export function transformBannerData(data: Banner[], locale: Locale): ClientBanner[];
export function transformBannerData(
    data: Banner | Banner[], locale: Locale
): ClientBanner | ClientBanner[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const bannerTextFields = JSON.parse(item.textFields as string) as BannerTextFields;
                return {
                    ...item,
                    textFields: bannerTextFields[locale]
                }
            })
        } else {
            const bannerTextFields = JSON.parse(data.textFields as string) as BannerTextFields;
            return {
                ...data,
                textFields: bannerTextFields[locale]
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}