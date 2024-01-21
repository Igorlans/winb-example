import { ClientNotification, FullNotification } from "@/types/notifications";
import { Locale } from "@/i18n.config";
import { Article, Member, Event } from "@/types";
import { textFieldsTransformCatch, transformArticleData } from "@/utils";
import { transformMemberData } from "@/utils/member";
import { transformEventData } from "@/utils/event";

export function transformNotificationData(data: FullNotification, locale: Locale): ClientNotification;
export function transformNotificationData(data: FullNotification[], locale: Locale): ClientNotification[];
export function transformNotificationData(
    data: FullNotification | FullNotification[], locale: Locale
): ClientNotification | ClientNotification[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const { ArticleRequest } = item.ServiceNotification!
                const { EventTicket } = item.EventTicketNotification!
                return {
                    ...item,
                    ServiceNotification: {
                        ...item.ServiceNotification!,
                        ArticleRequest: {
                            ...ArticleRequest,
                            Article: transformArticleData(ArticleRequest.Article as Article, locale),
                            Member: transformMemberData(ArticleRequest.Member as Member, locale)
                        }
                    },
                    EventTicketNotification: {
                        ...item.EventTicketNotification!,
                        EventTicket: {
                            ...EventTicket,
                            Event: transformEventData(EventTicket?.Event as Event, locale),
                            Member: transformMemberData(EventTicket.Member as Member, locale)
                        }
                    }
                }
            })
        } else {
            const { ArticleRequest } = data.ServiceNotification!
            const { EventTicket } = data.EventTicketNotification!
            return {
                ...data,
                ServiceNotification: {
                    ...data.ServiceNotification!,
                    ArticleRequest: {
                        ...ArticleRequest,
                        Article: transformArticleData(ArticleRequest.Article as Article, locale),
                        Member: transformMemberData(ArticleRequest.Member as Member, locale)
                    }
                },
                EventTicketNotification: {
                    ...data.EventTicketNotification!,
                    EventTicket: {
                        ...EventTicket,
                        Event: transformEventData(EventTicket?.Event as Event, locale),
                        Member: transformMemberData(EventTicket.Member as Member, locale)
                    }
                }
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}