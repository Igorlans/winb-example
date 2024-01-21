import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import MemberForm from "@/app/(admin)/adminpanel/members/MemberForm";
import prisma from "@/prisma/client";
import { formRegionSelectArgs, fullBusinessIncludeArgs } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import { transformBusinessSelectData, transformSelectRegionData } from "@/utils";

const Page = async () => {
    const regions = await prisma.region.findMany({
        ...formRegionSelectArgs
    });
    const business = await prisma.business.findMany({
        ...fullBusinessIncludeArgs
    })

    const regionOptions = transformSelectRegionData(regions, "uk");
    const businessOptions = transformBusinessSelectData(business, "uk")

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Членкині', href: '/adminpanel/members'},
        {text: 'Створення членкині', href: '/adminpanel/members/create'},
    ]
    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>
            <Tabs defaultValue={Locales.uk}>
                <TabsList>
                    <TabsTrigger value={Locales.uk}>Українська</TabsTrigger>
                    <TabsTrigger disabled value={Locales.en}>Англійська</TabsTrigger>
                    <TabsTrigger disabled value={Locales.pl}>Польська</TabsTrigger>
                </TabsList>
                <TabsContent value={Locales.uk}>
                    <MemberForm businessOptions={businessOptions} regionOptions={regionOptions} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <MemberForm businessOptions={businessOptions} regionOptions={regionOptions} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <MemberForm businessOptions={businessOptions} regionOptions={regionOptions} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Page;