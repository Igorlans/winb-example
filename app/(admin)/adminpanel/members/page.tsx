import PageTitle from "@/components/adminpanel/PageTitle";
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import {AiOutlinePlus} from 'react-icons/ai'
import IconButton from "@/components/adminpanel/IconButton";
import {IoWomanOutline} from "react-icons/io5";
import prisma from "@/prisma/client";
import {MemberTable} from "@/app/(admin)/adminpanel/members/components/MemberTable";
import Link from "next/link";
import { fullMemberIncludeArgs } from "@/types";
import { transformMemberData } from "@/utils/member";
import { orderSort } from "@/utils";
import { memberOrder } from "@/lib/memberTypes";



export const dynamic = 'force-dynamic'
export const revalidate = 0;

const Page = async () => {
    const members = await prisma.member.findMany({
        ...fullMemberIncludeArgs,
    })

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Членкині', href: '/adminpanel/members'},
    ]

    let clientMembers = transformMemberData(members, "uk")
    clientMembers = orderSort(clientMembers, memberOrder.uk)

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<IoWomanOutline className={'text-3xl'} />} title={'Членкині'} description={'Список усіх членкинь'}>
                <Link href={'/adminpanel/members/create'}>
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Створити
                    </IconButton>
                </Link>

            </PageTitle>
            <div className={'mt-8'}>
                <MemberTable members={clientMembers} />
            </div>
        </div>
    );
};

export default Page;