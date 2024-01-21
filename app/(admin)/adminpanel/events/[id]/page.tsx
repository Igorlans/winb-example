import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Breadcrumb} from "@/types/types";
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import EventForm from "@/app/(admin)/adminpanel/events/_components/EventForm";
import { formRegionSelectArgs, fullEventIncludeArgs } from "@/types";
import { apiRequest } from "@/utils/apiRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { $Enums } from "@prisma/client";
import { transformSelectRegionData } from "@/utils";
import { Locales } from "@/i18n.config";
import { transformEventData } from "@/utils/event";

const Page = async ({params} : {params: {id: string}}) => {
    const event = await prisma.event.findUnique({
        where: {
            id: params.id
        },
        ...fullEventIncludeArgs
    })
    if (!event) return null

    const regions = await prisma.region.findMany({
        ...formRegionSelectArgs
    });

    const regionOptions = transformSelectRegionData(regions, "uk");
    const clientEvent = transformEventData(event, "uk")

    const breadCrumbs: Breadcrumb[] = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Події', href: '/adminpanel/events'},
        {text: clientEvent.textFields.title, href: `/adminpanel/events/${event.id}`}
    ]
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <Tabs defaultValue={Locales.uk}>
                <TabsList>
                    <TabsTrigger value={Locales.uk}>Українська</TabsTrigger>
                    <TabsTrigger value={Locales.en}>Англійська</TabsTrigger>
                    <TabsTrigger value={Locales.pl}>Польська</TabsTrigger>
                </TabsList>
                <TabsContent value={Locales.uk}>
                    <EventForm event={event} regionOptions={regionOptions} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <EventForm event={event} regionOptions={regionOptions} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <EventForm event={event} regionOptions={regionOptions} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Page;