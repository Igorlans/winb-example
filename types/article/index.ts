import {
    ClientMember,
    ClientService,
    fullMemberIncludeArgs,
    fullServiceIncludeArgs,
    LocaleObjectValues
} from "@/types";
import { ArticleTextFieldsValue } from "@/app/(admin)/adminpanel/services/formSchema";
import { Prisma } from "@prisma/client";

export const fullArticleIncludeArgs = {
    include: {
        Service: fullServiceIncludeArgs,
        Mentors: fullMemberIncludeArgs,
        requests: {
            include: {
                Member: true
            }
        }
    }
}

export type Article = Prisma.ArticleGetPayload<typeof fullArticleIncludeArgs>

export type ArticleTextField = LocaleObjectValues<ArticleTextFieldsValue>
export type ClientArticle = Article & {
    textFields: ArticleTextFieldsValue;
    service: ClientService;
    mentors: ClientMember[];
    requests: {
        member: ClientMember
    }[]
}