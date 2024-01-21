import prisma from '@/prisma/client';
import {getArchiveDate} from "@/utils/getArchiveDate";
import Banner from "@/components/banner/Banner";
import Link from "next/link";
import ArticleCard from '@/components/cards/ArticleCard';
import RegionList from './(components)/(regionList)/RegionList';
import { fullRegionIncludeArgs, LocalePageParams } from "@/types";
import { transformRegionData } from "@/utils";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600
const page = async ({ params }: LocalePageParams) => {
    const regions = await prisma.region.findMany({
        where: {
            isActive: true
        },
        include: {
            ...fullRegionIncludeArgs.include,
            Events: {
                where: {
                    date: {
                        gte: getArchiveDate()
                    }
                },
                orderBy: {
                    date: 'asc'
                }
            }
        }
    })

    const clientRegion = transformRegionData(regions, params.locale);

    const t = await getTranslations("Region")
    return (
        <>
            <Banner
                title={t("title")}
                subtitle={t("subtitle")}
                img={"/images/banners/BannerRegions.png"}
                filter="dark"
            />
            <div className={'container pt-[30px] md:pt-[80px]'}>
                <RegionList regions={clientRegion} />
            </div>

        </>
    )
}

export default page

