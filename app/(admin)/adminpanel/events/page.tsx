import prisma from "@/prisma/client";
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import PageTitle from "@/components/adminpanel/PageTitle";
import {BsCalendarEvent} from "react-icons/bs";
import Link from "next/link";
import IconButton from "@/components/adminpanel/IconButton";
import {AiOutlinePlus} from "react-icons/ai";
import {Breadcrumb} from "@/types/types";
import EventTable from "@/app/(admin)/adminpanel/events/_components/EventTable";
import { fullEventIncludeArgs } from "@/types";
import { transformEventData } from "@/utils/event";



const Page = async () => {
    const events = await prisma.event.findMany({
        ...fullEventIncludeArgs
    })

    const clientEvents = transformEventData(events, "uk")

    const breadCrumbs: Breadcrumb[] = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Події', href: '/adminpanel/events'}
    ]

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<BsCalendarEvent className={'text-3xl'} />} title={'Події'} description={'Список усіх подій'}>
                <Link href={'/adminpanel/events/create'}>
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Створити
                    </IconButton>
                </Link>

            </PageTitle>
            <div className={'mt-8'}>
                <EventTable events={clientEvents} />
            </div>
        </div>
    );
};

export default Page;