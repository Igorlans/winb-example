import { Article, ArticleTextField, ClientArticle, Member, Service } from "@/types";
import { Locale } from "@/i18n.config";
import { transformMemberData } from "@/utils/member";
import { transformServiceData } from "@/utils/service";
import { textFieldsTransformCatch } from "@/utils";

export function transformArticleData(data: Article, locale: Locale): ClientArticle;
export function transformArticleData(data: Article[], locale: Locale): ClientArticle[];
export function transformArticleData(
    data: Article | Article[], locale: Locale
): ClientArticle | ClientArticle[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const articleTextField = JSON.parse(item.textFields as string) as ArticleTextField;
                return {
                    ...item,
                    textFields: articleTextField[locale],
                    service: transformServiceData(item.Service as Service, locale),
                    mentors: transformMemberData(item.Mentors, locale),
                    requests: item.requests ?
                        item.requests.map(request => ({
                            ...request,
                            member: transformMemberData(request.Member as Member, locale)
                        })) : []
                }
            })
        } else {
            const articleTextField = JSON.parse(data.textFields as string) as ArticleTextField;
            return {
                ...data,
                textFields: articleTextField[locale],
                service: transformServiceData(data.Service as Service, locale),
                mentors: transformMemberData(data.Mentors, locale),
                requests: data.requests ?
                    data.requests.map(request => ({
                        ...request,
                        member: transformMemberData(request.Member as Member, locale)
                    })) : []
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}