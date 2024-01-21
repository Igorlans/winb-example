import PageTitle from "@/components/adminpanel/PageTitle";
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";

import IconButton from "@/components/adminpanel/IconButton";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

import BannerTable from "./(components)/BannerTable";
import prisma from "@/prisma/client";
import { fullBannerIncludeArgs } from "@/types";
import { transformBannerData } from "@/utils/banner";


export const dynamic = 'force-dynamic'

const Page = async () => {
    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
    ]

    const mainBanner = await prisma.banner.findMany({
        where: {
            type: "MAIN"
        },
        ...fullBannerIncludeArgs
    })

    const clientBanner = transformBannerData(mainBanner, "uk")

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle title={'Головна'} description={'Редагування головної'} />
            
            <div className='flex items-center justify-between pt-11'>
                <h1 className='text-black text-2xl font-bold uppercas'>Банер</h1>
                <Link href="/adminpanel/banner/create">              
                    <IconButton
                        type="button"
                        icon={<LuPlus className={'text-lg'} />}
                    >
                        Додати
                    </IconButton>
                </Link>
            </div>
            <div className={'mt-8'}>
                <BannerTable banner={clientBanner} />
            </div>
        </div>
    );
};

export default Page;