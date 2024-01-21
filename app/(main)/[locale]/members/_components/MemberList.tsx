import { fullMemberIncludeArgs, LocalePageParams } from "@/types";
import { FC } from "react";
import { Fields } from "@/app/(main)/[locale]/members/_components/filters/useFilter";
import prisma from "@/prisma/client";
import { transformMemberData } from "@/utils/member";
import { MemberCard } from "@/app/(main)/[locale]/members/_components/MemberCard";
import { orderSort } from "@/utils";
import { memberOrder } from "@/lib/memberTypes";

type Props = LocalePageParams & {
    searchParams: Record<Fields, string | undefined>
}

export const MemberList: FC<Props> = async ({ searchParams, params}) => {
    const {
        region, status, business, search
    } = searchParams

    const members = await prisma.member.findMany({
        where: {
            regionId: region,
            businessId: business,
        },
        ...fullMemberIncludeArgs
    })

    const clientMember = transformMemberData(members, params.locale);

    let filteredMembers = clientMember.filter(item => {
        const isStatus =
            status ? item.textFields.status === status : true

        const isName =
            search ? item.textFields.name.toLocaleLowerCase().includes(search) : true

        return isStatus && isName
    })

    filteredMembers = orderSort(filteredMembers, memberOrder[params.locale])

    return (
        <div className={"grid grid-cols-1 gap-3.5 md:gap-7 min-[650px]:grid-cols-2 xl:grid-cols-3"}>
            {
                filteredMembers.map(item => (
                    <MemberCard key={item.id} member={item} />
                ))
            }
        </div>
    )
}