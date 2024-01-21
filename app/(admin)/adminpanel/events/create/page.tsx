import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import {Breadcrumb} from "@/types/types";
import EventForm from "@/app/(admin)/adminpanel/events/_components/EventForm";
import prisma from "@/prisma/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { $Enums } from "@prisma/client";
import { formRegionSelectArgs } from "@/types";
import { Locales } from "@/i18n.config";
import { transformSelectRegionData } from "@/utils";

const Page = async () => {
    const regions = await prisma.region.findMany({
        ...formRegionSelectArgs
    });

    const regionOptions = transformSelectRegionData(regions, "uk");

    const breadCrumbs: Breadcrumb[] = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Події', href: '/adminpanel/events'},
        {text: 'Стоворення події', href: '/adminpanel/events/create'}
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
                    <EventForm regionOptions={regionOptions} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <EventForm regionOptions={regionOptions} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <EventForm regionOptions={regionOptions} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Page;