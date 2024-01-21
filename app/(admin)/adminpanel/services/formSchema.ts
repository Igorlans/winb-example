import { z } from "zod"
import { Locale, Locales } from "@/i18n.config";

const textFields = z.object({
    title: z.string(),
    description: z.string(),
    text: z.string(),
    editor: z.string()
})

const formSchema = z.object({
    serviceId: z.string().optional(),
    image: z.array(z.object({
        url: z.string()
    }))
        .refine(val => val.length > 0, {
            message: "Зображення обов'язкове"
        }),
    isPaidService: z.boolean().default(false),
    mentors: z.array(z.object({
            id: z.string()
        })),
    textFields: z.object({
        [Locales.uk]: textFields,
        [Locales.en]: textFields,
        [Locales.pl]: textFields
    })
})
export function useArticleFormSchema(locale: Locale) {
    const articleFormSchema = formSchema
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].title.length === 0)
    }, { message: "Поле обов'язкове", path: [`textFields.${locale}.title`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].description.length === 0)
    }, { message: "Поле обов'язкове", path: [`textFields.${locale}.description`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].text.length === 0)
    }, { message: "Поле обов'язкове", path: [`textFields.${locale}.text`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].editor.length === 0)
    }, { message: "Поле обов'язкове", path: [`textFields.${locale}.editor`] })

    return {
        articleFormSchema
    }
}

export type ArticleFormValues = z.infer<typeof formSchema>
export type ArticleTextFieldsValue = z.infer<typeof textFields>