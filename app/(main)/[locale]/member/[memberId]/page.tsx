import Banner from "@/components/banner/Banner";
import MemberCard from "./(components)/(memberCard)/MemberCard";
import MemeberInfo from "./(components)/(memberInfo)/MemeberInfo";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import { fullMemberIncludeArgs, LocalePageParams } from "@/types";
import { transformMemberData } from "@/utils/member";

export const dynamic = 'force-dynamic'
export const revalidate = 0

const EventPage = async ({ params }: { params: { memberId: string } } & LocalePageParams) => {

    const member = await prisma.member.findUnique({
        where: {
            id: params.memberId
        },
        ...fullMemberIncludeArgs
    })

    if (!member) {
        notFound()
    }

    const clientMember = transformMemberData(member, params.locale)

    return (
        <div className="h-full mb-20">
            <Banner 
                title={clientMember.textFields.name}
                subtitle={clientMember.textFields.slogan}
                filter="dark"
            />
            <div className="container pt-[40px] md:pt-[80px] grid grid-cols-1 gap-y-[40px] md:gap-y-0 md:grid-cols-[1fr_2fr] gap-x-0 md:gap-x-[30px] lg:gap-x-[50px] xl:gap-x-[80px]">
                <MemberCard member={clientMember} />
                <MemeberInfo member={clientMember} />
            </div>  
        </div>
    );
};

export default EventPage;