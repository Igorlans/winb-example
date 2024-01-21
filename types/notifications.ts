import prisma from "@/prisma/client";
import {Prisma} from "@prisma/client";
import { ClientArticle, fullArticleIncludeArgs } from "@/types/article";
import { ClientMember, fullMemberIncludeArgs } from "@/types/member";
import { ClientEvent, fullEventIncludeArgs } from "@/types/event";

export const fullNotificationInclude = {
    ServiceNotification: {
        include: {
            ArticleRequest: {
                include: {
                    Article: fullArticleIncludeArgs,
                    Member: fullMemberIncludeArgs
                }
            }
        }
    },
    EventTicketNotification: {
        include: {
            EventTicket: {
                include: {
                    Event: fullEventIncludeArgs,
                    Member: fullMemberIncludeArgs
                }
            }
        }
    },
    RegistrationRequestNotification: {
        include: {
            RegistrationRequest: true
        }
    }
}
async function getFullNotification() {
    const notification = await prisma.notification.findFirstOrThrow({
        include: fullNotificationInclude
    });
    return notification;
}


export type FullNotification = Prisma.PromiseReturnType<typeof getFullNotification>
export type ClientNotification = FullNotification & {
    ServiceNotification: {
        ArticleRequest: {
            Article: ClientArticle,
            Member: ClientMember
        }
    },
    EventTicketNotification: {
        EventTicket: {
            Event: ClientEvent,
            Member: ClientMember
        }
    },
}