import EventCard from "@/components/eventCard/EventCard";
import prisma from "@/prisma/client";
import { fullEventIncludeArgs, LocalePageParams } from "@/types";
import { transformEventData } from "@/utils/event";

const Events = async ({ params }: LocalePageParams) => {
    const events = await prisma.event.findMany({
        ...fullEventIncludeArgs
    })
    const clientEvent = transformEventData(events, params.locale)
    return (
        <div className="container py-24">
            <div suppressHydrationWarning={false} className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {clientEvent?.map((event) => (
                    <EventCard event={event}/>
                ))}
            </div>
        </div>
    );
};

export default Events;
