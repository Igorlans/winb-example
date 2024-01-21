import prisma from "@/prisma/client";
import {notFound} from "next/navigation";

import { Metadata } from 'next'
import EventPage from "@/app/(main)/[locale]/events/[eventId]/(components)/EventPage";
import { NotFoundMetada } from "@/utils/NotFoundMetadata";
import { fullEventIncludeArgs, LocalePageParams } from "@/types";
import { transformEventData } from "@/utils/event";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = LocalePageParams & {
  params: {
    eventId: string
  }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: params.eventId
            },
            ...fullEventIncludeArgs
        })

        if (!event) {
            notFound()
        }

        const clientEvent = transformEventData(event, params.locale)

        const expert = clientEvent.eventGuest

        return {
            title: clientEvent.textFields.title,
            description: `Подія ${clientEvent.textFields.title} із експертом заходу ${expert.name}`,
            openGraph: {
                type: "article",
                url: `${process.env.NEXTAUTH_URL}/events/${event?.id}`,
                title: clientEvent.textFields.title,
                description: `Подія ${clientEvent.textFields.title} із експертом заходу ${expert.name}`,
                siteName: "Women in business",
                images: [
                    {url: event?.image ?? "/images/LeadMagnet.png"}
                ]
            }
        }
    } catch {
        return NotFoundMetada
    }
}

export async function generateStaticParams() {
    const events = await prisma.event.findMany({
        select: {
            id: true
        }
    })

    console.log(events)

    return events.map((event) => ({
        eventId: event.id,
    }))
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function Page ({ params }: { params: { eventId: string } } & LocalePageParams) {
    unstable_setRequestLocale(params.locale);

    const event = await prisma.event.findUnique({
        where: {
            id: params.eventId
        },
        ...fullEventIncludeArgs
    })

    if (!event) {
        notFound()
    }
    const clientEvent = transformEventData(event, params.locale)
    return (
        <EventPage
            locale={params.locale}
            event={clientEvent}
        />
    );
};
