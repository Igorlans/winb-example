import { z } from "zod"

import { $Enums } from "@prisma/client"
import { Locale, Locales } from "@/i18n.config";

const textFields = z.object({
    title: z.string(),
    subtitle: z.string()
})
const schema = z.object({
    type: z.union([
        z.literal($Enums.BannerType.MAIN),
        z.literal($Enums.BannerType.EVENT),
        z.literal($Enums.BannerType.MEMBER),
        z.literal($Enums.BannerType.REGION),
        z.literal($Enums.BannerType.SERVICE),
    ]),
    textFields: z.object({
        [Locales.uk]: textFields,
        [Locales.en]: textFields,
        [Locales.pl]: textFields
    }),
    link: z.string().or(z.undefined()),
    image: z.string().min(1, "Поле обовʼязкове")
})

export function useBannerFormSchema(locale: Locale) {
    const bannerFormSchema =
        schema
        .refine(data => {
            const { textFields } = data
            return !(textFields[locale].title.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.title`] })
        .refine(data => {
            const { textFields } = data
            return !(textFields[locale].subtitle.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.subtitle`] })
        .refine(val => (val.type !== "MAIN" || val.link !== ""), {
            message: "Поле обов'язкове",
            path: ["link"]
        })

    return {
        bannerFormSchema
    }
}
export type BannerFormValue = z.infer<typeof schema>
export type BannerTextFieldsValue = z.infer<typeof textFields>