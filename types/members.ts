import prisma from "@/prisma/client";
import {Prisma} from "@prisma/client";

async function getFullUser() {
    const user = await prisma.user.findFirstOrThrow({
        include: {
            member: {
                include: {
                    tickets: true
                }
            },
        }
    });
    return user;
}

export const fullMemberInclude = {
    user: true,
    Region: true,
    Services: {
        include: {
            Service: true,
            image: true
        }
    }
}

export type FullUser = Prisma.PromiseReturnType<typeof getFullUser>