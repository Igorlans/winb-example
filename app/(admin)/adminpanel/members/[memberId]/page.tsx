import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import MemberForm from "@/app/(admin)/adminpanel/members/MemberForm";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";
import { formRegionSelectArgs, fullBusinessIncludeArgs, fullMemberIncludeArgs } from "@/types";
import { transformMemberData } from "@/utils/member";
import { transformBusinessSelectData, transformSelectRegionData } from "@/utils";

export const dynamic = 'force-dynamic'
export const revalidate = 0;



const Page = async ({params}: {params: {memberId: string}}) => {

    const member = await prisma.member.findUnique({
        where: {
            id: params.memberId
        },
        ...fullMemberIncludeArgs
    })

    if (!member) notFound();

    const regions = await prisma.region.findMany({
        ...formRegionSelectArgs
    });
    const business = await prisma.business.findMany({
        ...fullBusinessIncludeArgs
    })

    const businessOptions = transformBusinessSelectData(business, "uk")
    const regionOptions = transformSelectRegionData(regions, "uk");
    const clientMember = transformMemberData(member, "uk")

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Членкині', href: '/adminpanel/members'},
        {text: clientMember.textFields.name, href: `/adminpanel/members/${member.id}`},
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
                    <MemberForm businessOptions={businessOptions} member={member} regionOptions={regionOptions} locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <MemberForm businessOptions={businessOptions} member={member} regionOptions={regionOptions} locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <MemberForm businessOptions={businessOptions} member={member} regionOptions={regionOptions} locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Page;