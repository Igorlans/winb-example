import prisma from "@/prisma/client";
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import PageTitle from "@/components/adminpanel/PageTitle";
import {Breadcrumb} from "@/types/types";
import EventTicketTable from "@/app/(admin)/adminpanel/events/[id]/tickets/_components/EventTicketTable";
import {notFound} from "next/navigation";
import {LuTicket} from "react-icons/lu";
import { fullEventIncludeArgs, fullEventTicketIncludeArgs, Ticket } from "@/types";
import { transformEventData, transformEventTicketData } from "@/utils/event";

const getEventTickets = async (eventId: string): Promise<Ticket[]> => {
    try {
        const tickets = await prisma.eventTicket.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
              eventId
            },
            ...fullEventTicketIncludeArgs
        })

        const idArr = tickets.map(request => request.id)

        await prisma.notification.updateMany({
            where: {
                EventTicketNotification: {
                    EventTicket: {
                        id: {
                            in: idArr
                        }
                    }
                }
            },
            data: {
                status: "READ"
            }
        })
        return tickets.sort((a, b) => (a.verified === b.verified) ? 0 : a.verified ? -1 : 1);
    } catch (e) {
        console.log(e)
        return []
    }
}

const Page = async ({params}: {params: {id: string}}) => {
    const tickets = await getEventTickets(params.id)
    const event = await prisma.event.findUnique({
        where: {id: params.id},
        ...fullEventIncludeArgs
    })

    if (!event) {
        return notFound()
    }

    const clientTicket = transformEventTicketData(tickets, "uk")
    const clientEvent = transformEventData(event, "uk")

    const breadCrumbs: Breadcrumb[] = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Події', href: '/adminpanel/events'},
        {text: clientEvent.textFields.title, href: `/adminpanel/events/${event.id}`},
        {text: 'Квитки', href: `/adminpanel/events/${event.id}/tickets`},
    ]

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<LuTicket className={'text-3xl'} />} title={'Квитки'} description={`Список усіх квитків на подію "${clientEvent.textFields.title}"`} />
            <div className={'mt-8'}>
                <EventTicketTable tickets={clientTicket || []} />
            </div>

        </div>
    );
};

export default Page;