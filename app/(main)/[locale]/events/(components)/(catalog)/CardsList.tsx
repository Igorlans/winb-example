import EventCard from "@/components/eventCard/EventCard";
import {FC} from "react";
import prisma from "@/prisma/client";
import { fullEventIncludeArgs, LocalePageParams } from "@/types";
import { transformEventData } from "@/utils/event";
import { Locale } from "@/i18n.config";

interface CardsListProps {
    params: {[key: string]: string | undefined} & {
        city?: string;
        from?: string;
        to?: string;
        sort?: string;
    };
    locale: Locale;
    isArchive: boolean
}

const CardsList: FC<CardsListProps> = async ({params, locale, isArchive}) => {

    const currentDate = new Date();

    let from = params?.from;
    let to = params?.to;

    console.log(params)
    if (isArchive && !from && !to) {
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() - 1);
        to = String(nextDay.getTime())
    } else if (!isArchive && !from && !to) {
        from = String(currentDate.getTime())
    }

    const events = await prisma.event.findMany({
        where: {
            regionId: params?.city,
            date: {
                gte: from,
                lte: to,
            },
        },
        ...fullEventIncludeArgs
    });



    events.sort((a, b) => {
        const dateA = Number(a.date);
        const dateB = Number(b.date);
        if (params?.sort === 'asc') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    const clientEvent = transformEventData(events, locale)

    return (
        <div className="grid grid-cols-2 gap-3.5 md:gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {clientEvent.map((event) => (
                <EventCard event={event} key={event.id}/>
            ))}
        </div>
    );
};

export default CardsList;
