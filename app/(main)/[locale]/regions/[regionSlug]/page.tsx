import prisma from '@/prisma/client';
import {notFound} from 'next/navigation';
import Banner from "@/components/banner/Banner";
import RegionContent from "@/app/(main)/[locale]/regions/(components)/(regionContent)/RegionContent";
import ToPrevButton from '@/components/ui/custom/buttons/ToPrevButton';
import { fullRegionIncludeArgs, LocalePageParams } from "@/types";
import { transformRegionData } from "@/utils";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const generateStaticParams = async () => {
    const regions = await prisma.region.findMany({
        where: {
            isActive: true
        },
        select: {
            slug: true
        }
    })

    return regions.map(region => ({regionSlug: region.slug}))
}
export const revalidate = 3600
const page = async ({params}: {params: {regionSlug: string}} & LocalePageParams) => {
    unstable_setRequestLocale(params.locale);

    const region = await prisma.region.findUnique({
        where: {
            slug: params?.regionSlug
        },
        ...fullRegionIncludeArgs
    })
    if (!region) {
        notFound()
    }
    const clientRegion = transformRegionData(region, params.locale)


    const t = await getTranslations("Region");

    return (
        <>
            <Banner
                title={t("title")}
                img={region.images.find(item => item.isBanner)?.url}
                subtitle={clientRegion.textFields.name}
                filter="dark"
            />
            <div className={'container pt-10'}>
                <ToPrevButton link={`/regions`}>
                    { t("to_regions") }
                </ToPrevButton>

                <div className={'mt-5 md:mt-9'}>
                    <RegionContent params={params} region={clientRegion} />
                </div>
            </div>

        </>
    )
}

export default page

