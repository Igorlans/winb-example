import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import BannerForm from '../BannerForm';
import prisma from '@/prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import { fullBannerIncludeArgs } from "@/types";

interface pageProps {
    params: {
        id: string
    }
}

const page = async ({ params }: pageProps) => {
    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Редагування банера', href: '/adminpanel/banner/create'},
    ]
    const banner = await prisma.banner.findUnique({
        where: {
            id: params.id
        },
        ...fullBannerIncludeArgs
    })
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
                    <BannerForm banner={banner} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <BannerForm banner={banner} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <BannerForm banner={banner} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page