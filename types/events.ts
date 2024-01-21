import {Prisma} from "@prisma/client";
import prisma from "@/prisma/client";


export const eventFullInclude = {
    Region: true,
    eventTickets: {
        select: {
            memberId: true,
            verified: true
        }
    },
    textFields: true
}

async function getEventsWithRegions() {
    const user = await prisma.event.findFirstOrThrow({
        include: eventFullInclude

    });
    return user;
}

async function getFullEventTicket() {
    const eventTicket = await prisma.eventTicket.findFirstOrThrow({
        include: {
            Event: true,
            Member: {
                include: {
                    user: {
                        select: {
                            email: true,
                            id: true
                        }
                    }
                }
            },
        }
    });
    return eventTicket;
}


export type FullEvent = Prisma.PromiseReturnType<typeof getEventsWithRegions>
export type FullEventTicket = Prisma.PromiseReturnType<typeof getFullEventTicket>
// export type FullEvent = Prisma.PromiseReturnType<typeof getUsersWithCars>
