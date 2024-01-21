import { Locale, Locales } from "@/i18n.config";
import { z } from "zod";

const textFields = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    slogan: z.string(),
    experience: z.string(),
})
const facts = z.object({
    text: z.string(),
})
const factsSchema = z.object({
    icon: z.string(),
    [Locales.uk]: facts,
    [Locales.en]: facts,
    [Locales.pl]: facts
})

export const formSchema = z.object({
    email: z.string().email('Неправильний формат').min(1, "Поле обовʼязковe"),
    phone: z.string().min(1, "Поле обовʼязковe"),
    password: z.string().min(8, 'Мінімальна кількість символів - 8'),
    regionId: z.string(),
    businessId: z.string().optional(),
    image: z.string(),
    textFields: z.object({
        [Locales.uk]: textFields,
        [Locales.en]: textFields,
        [Locales.pl]: textFields
    }),
    additional: z.array(factsSchema),
    facts: z.array(factsSchema),
})

export function useMemberFormSchema(locale: Locale) {
    const memberFormSchema = formSchema
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].name?.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.name`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].description?.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.description`] })
    .refine(data => {
        const { textFields } = data
        return !(textFields[locale].status?.length === 0)
    }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.status`] })
    // .refine(data => {
    //     const { textFields } = data
    //     return !(textFields[locale].slogan?.length === 0)
    // }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.slogan`] })
    // .refine(data => {
    //     const { textFields } = data
    //     return !(textFields[locale].experience?.length === 0)
    // }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.experience`] })

    return {
        memberFormSchema
    }
}

export type MemberFormValues = z.infer<typeof formSchema>
export type MemberTextFieldsValues = z.infer<typeof textFields>
export type MemberFactsValues = z.infer<typeof facts>