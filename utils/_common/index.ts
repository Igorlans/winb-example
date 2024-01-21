import { ClientMember, LocaleObjectValues, MemberTextField } from "@/types";
import { i18n, Locale } from "@/i18n.config"
import { formLocaleMemberStatus } from "@/lib/memberTypes";
const locales = i18n.locales

export function createLocaleDefaultValues<T>(entries: Required<T>): LocaleObjectValues<Required<T>> {
    let obj = {} as LocaleObjectValues<Required<T>>
    locales.forEach(item => {
        obj = {
            ...obj,
            [item]: entries
        }
    })

    return obj
}

export function textFieldsTransformCatch(data: unknown, e: any): [] | null {
    // console.log(e)
    if(Array.isArray(data)) {
        return []
    } else {
        return null
    }
}

function isClientMember(data: ClientMember[]): data is ClientMember[] {
    return !!data.find(item => "userId" in item)
}
export function orderSort(data: ClientMember[], order: string[]): ClientMember[] {
    if(isClientMember(data)) {
        return data.sort((a, b) =>
            order.indexOf(a.textFields.status) - order.indexOf(b.textFields.status)
        );
    } else return []
}

export const createLocaleMemberStatus = (textFields: MemberTextField): Record<Locale, string> => {
    const status = textFields.uk.status;
    const en = formLocaleMemberStatus.en.find(item => item.label === status)?.value ?? "Mentor";
    const pl = formLocaleMemberStatus.pl.find(item => item.label === status)?.value ?? "Mentor";

    return { uk: status, en, pl }
}