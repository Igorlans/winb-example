import {z} from "zod"
import {imageInput} from "@/types/types"
import { Locale, Locales } from "@/i18n.config";

const textFields = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    cityTitle: z.string(),
    cityDescription: z.string(),
})

const formSchema = z.object({
    id: z.string(),
    video: z.string().optional(),
    banner: z.string(),
    images: z.array(imageInput),
    isActive: z.boolean().default(false),
    textFields: z.object({
        [Locales.uk]: textFields,
        [Locales.en]: textFields,
        [Locales.pl]: textFields
    })
})

export function useRegionFormSchema(locale: Locale) {
    const regionFormSchema = formSchema
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].name.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.name`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].title.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.title`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].description.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.description`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].cityTitle.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.cityTitle`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].cityDescription.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.cityDescription`] })
    .refine(data => data.banner.length !== 0 || !data.isActive, {
        message: "Додайте банер або позначте регіон як неактивний",
        path: ["banner"]
    })

    return {
        regionFormSchema
    }
}

export type RegionFormValues = z.infer<typeof formSchema>
export type RegionTextFieldsValues = z.infer<typeof textFields>