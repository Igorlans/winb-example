import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import RegionForm from "@/app/(admin)/adminpanel/regions/RegionForm";
import prisma from "@/prisma/client";
import { RegionWithImages } from "@/types/types";
import { fullRegionIncludeArgs } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import MemberForm from "@/app/(admin)/adminpanel/members/MemberForm";
import { transformRegionData } from "@/utils";

interface pageProps {
    params: {
        regionId: string
    }
}

const page = async ({ params }: { params: { regionId: string } }) => {
    const region = await prisma.region.findUnique({
        where: {
            id: params?.regionId
        },
        ...fullRegionIncludeArgs
    })
    if(!region) return null;

    const clientRegion = transformRegionData(region, "uk")

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Регіони', href: '/adminpanel/regions'},
        {text: clientRegion.textFields.name, href: `/adminpanel/regions/${params.regionId}`},
    ]

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
                    <RegionForm region={region} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <RegionForm region={region} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <RegionForm region={region} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page