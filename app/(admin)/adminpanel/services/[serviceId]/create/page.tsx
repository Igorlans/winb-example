
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import ServiceForm from '../../ServicesForm';

import prisma from '@/prisma/client'
import { fullMemberIncludeArgs, fullServiceIncludeArgs } from '@/types'
import { transformServiceData } from "@/utils/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import EventForm from "@/app/(admin)/adminpanel/events/_components/EventForm";
import { transformMemberData } from "@/utils/member";

const page = async ({ params }: { params: {serviceId: string} }) => {
    const service = await prisma.service.findUniqueOrThrow({
        where: {
            id: params.serviceId
        },
        ...fullServiceIncludeArgs
    })
    if(!service) return null;

    const clientService = transformServiceData(service, "uk")

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Бізнес - послуги', href: '/adminpanel/services'},
        {text: clientService.textFields.title ?? "", href: `/adminpanel/services/${service.id}`},
        {text: 'Створення статті', href: `/adminpanel/services/${service.id}/create`},
    ]

    const mentors = await prisma.member.findMany({
        ...fullMemberIncludeArgs
    })

    const clientMember = transformMemberData(mentors, "uk")

    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>
            <Tabs defaultValue={Locales.uk}>
                <TabsList>
                    <TabsTrigger value={Locales.uk}>Українська</TabsTrigger>
                    <TabsTrigger value={Locales.en}>Англійська</TabsTrigger>
                    <TabsTrigger value={Locales.pl}>Польська</TabsTrigger>
                </TabsList>
                <TabsContent value={Locales.uk}>
                    <ServiceForm serviceId={params.serviceId} mentors={clientMember} locale={Locales.uk}/>
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <ServiceForm serviceId={params.serviceId} mentors={clientMember} locale={Locales.en}/>
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <ServiceForm serviceId={params.serviceId} mentors={clientMember} locale={Locales.pl}/>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page