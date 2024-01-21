import Breadcrumbs from '@/components/adminpanel/Breadcrumbs'
import PageTitle from '@/components/adminpanel/PageTitle'

import { IoLocationOutline } from "react-icons/io5"

import RegionTable from './_components/RegionTable'
import { $Enums, Region } from '@prisma/client'
import prisma from '@/prisma/client'
import { Button } from "@/components/ui/button";
import { create } from "zustand";
import { fullRegionIncludeArgs } from "@/types";
import { transformRegionData } from "@/utils";

const breadCrumbs = [
    {text: 'Головна', href: '/adminpanel'},
    {text: 'Регіони', href: '/adminpanel/regions'},
]

const page = async ({}) => {
    const regions = await prisma.region.findMany({
        ...fullRegionIncludeArgs
    })

    const clientRegion = transformRegionData(regions, "uk");

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<IoLocationOutline className={'text-3xl'} />} title={'Регіони'} description={'Список усіх членкинь'} />

            <div className={'mt-8'}>
                <RegionTable regions={clientRegion} />
            </div>
        </div>
    )
}

export default page