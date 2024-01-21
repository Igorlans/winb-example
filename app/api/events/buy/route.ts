import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {BuyEventFormValues} from "@/app/(main)/[locale]/events/[eventId]/(components)/BuyEventForm";

export async function POST(req: Request) {
    try {
        const body: BuyEventFormValues & {memberId?: string} = await req.json();


        const event = await prisma.event.findUnique({
            where: {
                id: body.eventId
            },
            select: {
                id: true,
                eventTickets: true,
                places: true,
                date: true,
                isMemberEvent: true
            }
        })

        if (!event) {
            return NextResponse.json({message: 'Івенту не існує'}, {
                status: 400
            })
        }

        const isUnavailable = Number(event.date) < Date.now();

        if (isUnavailable) {
            return NextResponse.json({message: 'На жаль, подія недоступна'}, {
                status: 400
            })
        }

        const freePlaces = event.places - event.eventTickets.filter(ticket => ticket.verified).length;

        if (freePlaces <= 0) {
            return NextResponse.json({message: 'На жаль, немає вільних місць'}, {
                status: 400
            })
        }

        if (isUnavailable) {
            return NextResponse.json({message: 'На жаль, подія недоступна'}, {
                status: 400
            })
        }

        const isFailedMemberOnly = event.isMemberEvent && !body?.memberId;

        if (isFailedMemberOnly) {
            return NextResponse.json({message: 'Подія доступна тільки для членкинь'}, {
                status: 400
            })
        }


        const newTicket = await prisma.eventTicket.create({
            data: {
                ...body,
                notification: {
                    create: {
                        Notification: {
                            create: {
                                type: 'EVENT',
                                createdAt: String(Date.now()),
                            }
                        }
                    }
                }
            },
            include: {
                Member: true,
                Event: true,
            },
        })

        return NextResponse.json({message: 'Білет створено', data: newTicket}, {
            status: 201
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}