import prisma from "@/prisma/client";
import {Prisma} from "@prisma/client";

async function getFullArticleRequest() {
    const eventTicket = await prisma.articleRequest.findFirstOrThrow({
        include: {
            Member: true,
        }
    });
    return eventTicket;
}


export type FullArticleRequest = Prisma.PromiseReturnType<typeof getFullArticleRequest>