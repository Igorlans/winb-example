
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import ServiceForm from '../../ServicesForm';

import prisma from '@/prisma/client'
import { fullArticleIncludeArgs, fullMemberIncludeArgs } from "@/types";
import { transformArticleData } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import { transformMemberData } from "@/utils/member";

const page = async ({ params }: { params: { articleId: string, serviceId: string } }) => {
    const article = await prisma.article.findUnique({
        where: {
            id: params.articleId,
        },
        ...fullArticleIncludeArgs
    })

    if(!article) return null;

    const clientArticle = transformArticleData(article, "uk")

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Бізнес - послуги', href: '/adminpanel/services'},
        {text: clientArticle.textFields.title ?? "", href: `/adminpanel/services/${params.serviceId}`},
        {text: 'Редагування статті', href: `/adminpanel/services/${params.serviceId}/${article.id}`},
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
                    <ServiceForm article={article} serviceId={params.serviceId} mentors={clientMember} locale={Locales.uk}/>
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <ServiceForm article={article} serviceId={params.serviceId} mentors={clientMember} locale={Locales.en}/>
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <ServiceForm article={article} serviceId={params.serviceId} mentors={clientMember} locale={Locales.pl}/>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page