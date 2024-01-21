import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import MemberCard from "@/app/(main)/[locale]/member/[memberId]/(components)/(memberCard)/MemberCard";
import MemeberInfo from "@/app/(main)/[locale]/member/[memberId]/(components)/(memberInfo)/MemeberInfo";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import MemberBanner from "../MemberBanner";
import { fullMemberIncludeArgs, LocalePageParams } from "@/types";
import { transformMemberData } from "@/utils/member";


export const dynamic = 'force-dynamic'

const EventPage = async ({ params }: LocalePageParams) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        notFound()
    }

    const member = await prisma.member.findFirstOrThrow({
        where: {
            user: {
                email: session.user.email
            }
        },
        ...fullMemberIncludeArgs
    })

    if (!member) {
        notFound()
    }

    const clientMember = transformMemberData(member, params.locale)

    return (
        <div className="h-full mb-20">
            <MemberBanner
                title={clientMember.textFields.name}
                description={clientMember.textFields.slogan!}
            />
            <div className="container pt-[40px] md:pt-[80px] grid grid-cols-1 gap-y-[40px] md:gap-y-0 md:grid-cols-[1fr_2fr] gap-x-0 md:gap-x-[30px] lg:gap-x-[50px] xl:gap-x-[80px]">

                <MemberCard member={clientMember} />
                <MemeberInfo member={clientMember} />
            </div>
        </div>
    );
};

export default EventPage;