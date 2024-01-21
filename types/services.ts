import {Prisma} from "@prisma/client";
import prisma from "@/prisma/client";

export const fullServiceArticleIncludeArgs = {
    image: true,
    Mentors: true,
    Service: {
        include: {
            Banner: true
        }
    }
}

export const fullServiceIncludeArgs = {
    Banner: {
        include: {
            image: true
        }
    },
    Articles: {
        include: fullServiceArticleIncludeArgs
    }
}

export type ServiceParams = {
    params: {
        articleId: string, 
        serviceId: string
    }
}

async function getFullService () {
    const service = await prisma.service.findFirstOrThrow({
    })

    return service
}
async function getFullServiceArticle () {
    const service = await prisma.article.findFirstOrThrow({

    })

    return service
}

export type FullService = Prisma.PromiseReturnType<typeof getFullService>
export type FullServiceArticle = Prisma.PromiseReturnType<typeof getFullServiceArticle>