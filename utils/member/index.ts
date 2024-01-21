import { Article, ClientMember, Member, MemberFactsTextField, MemberTextField, Region } from "@/types";
import { Locale } from "@/i18n.config";
import { textFieldsTransformCatch, transformArticleData, transformRegionData } from "@/utils";

export function transformMemberData(data: Member, locale: Locale): ClientMember;
export function transformMemberData(data: Member[], locale: Locale): ClientMember[];
export function transformMemberData(
    data: Member | Member[], locale: Locale
): ClientMember | ClientMember[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const textFields = JSON.parse(item?.textFields as string) as MemberTextField;
                const factsTextField = JSON.parse(item?.facts as string) as MemberFactsTextField[];
                const additionTextField = JSON.parse(item?.additional as string) as MemberFactsTextField[]
                return {
                    ...item,
                    textFields: textFields[locale],
                    facts: factsTextField.map(item => ({
                        ...item,
                        ...item[locale]
                    })),
                    addition: additionTextField.map(item => ({
                        ...item,
                        ...item[locale]
                    })),
                    services: transformArticleData(item.services as Article[], locale),
                    region: transformRegionData(item.region as Region, locale)
                }
            })
        } else {
            const textFields = JSON.parse(data?.textFields as string) as MemberTextField;
            const factsTextField = JSON.parse(data?.facts as string) as MemberFactsTextField[];
            const additionTextField = JSON.parse(data?.additional as string) as MemberFactsTextField[]
            return {
                ...data,
                textFields: textFields[locale],
                facts: factsTextField.map(item => ({
                    ...item,
                    ...item[locale]
                })),
                addition: additionTextField.map(item => ({
                    ...item,
                    ...item[locale]
                })),
                services: transformArticleData(data.services as Article[], locale),
                region: transformRegionData(data.region as Region, locale)
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}