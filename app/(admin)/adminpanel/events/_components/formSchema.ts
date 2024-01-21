import { z } from "zod";
import { Locales, Locale } from "@/i18n.config";

const eventGuest = z.object({
    name: z.string(),
    description: z.string(),
})
const textFields = z.object({
    title: z.string(),
    description: z.string(),
    venue: z.string(),
})

const formSchema = z.object({
    image: z.string().min(1, "Поле обовʼязковe"),
    price: z.string().regex(/^-?\d/, 'Ведіть коректне число'),
    memberPrice: z.string().regex(/^-?\d/, 'Ведіть коректне число'),
    isMemberEvent: z.boolean().default(false),
    places: z.string().regex(/^-?\d/, 'Ведіть коректне число'),
    date: z.string().min(1, "Поле обовʼязковe"),
    startTime: z.string().min(1, "Поле обовʼязковe").regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введіть коректний час'),
    endTime: z.string().min(1, "Поле обовʼязковe").regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введіть коректний час'),
    networkStatus: z.union([
        z.literal('OFFLINE'),
        z.literal('ONLINE')]
    ),
    regionId: z.string().optional(),
    eventGuest: z.object({
        [Locales.uk]: eventGuest,
        [Locales.en]: eventGuest,
        [Locales.pl]: eventGuest,
        image: z.string().min(1, "Поле обовʼязковe"),
        link: z.string().optional(),
    }),
    textFields: z.object({
        [Locales.uk]: textFields,
        [Locales.en]: textFields,
        [Locales.pl]: textFields
    })
})

export function useEventFormSchema(locale: Locale) {

    const eventFormSchema =
        formSchema
        .refine(data => {
            const { eventGuest } = data
            return !(eventGuest[locale]?.name?.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`eventGuest.${locale}.name`] })
        .refine(data => {
            const { eventGuest } = data
            return !(eventGuest[locale]?.description?.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`eventGuest.${locale}.description`] })
        .refine(data => {
            const { textFields} = data
            return !(textFields[locale].title?.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.title`] })
        .refine(data => {
            const { textFields} = data
            return !(textFields[locale].description?.length === 0)
        }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.description`] })
        .refine(data => {
            const { textFields} = data
            const isOffline = data.networkStatus === 'OFFLINE';
            const isVenueEmpty = textFields[locale].venue?.length === 0;
            return !(isOffline && isVenueEmpty);
        }, { message: 'Поле обовʼязковe', path: [`textFields.${locale}.venue`] })
        .refine(data => {
            const isOffline = data.networkStatus === 'OFFLINE';
            const isRegion = data.regionId?.length === 0
            return !(isOffline && isRegion);
        }, { message: 'Поле обовʼязковe', path: [`regionId`] })
        .transform(data => {
            if(data.isMemberEvent) return { ...data, price: "0" }
            else return data
        })
    return {
        eventFormSchema
    }
}

export type EventFormValue = z.infer<typeof formSchema>
export type EventTextFieldsValue = z.infer<typeof textFields>
export type EventGuestTextFieldsValue = z.infer<typeof eventGuest>