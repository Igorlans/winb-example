import Filter from "@/app/(main)/[locale]/events/(components)/(catalog)/(filter)/Filter";
import {ReactNode} from "react";
import prisma from "@/prisma/client";
import Banner from "@/components/banner/Banner";
import DrawerFilter from "../(components)/(drawer)/DrawerFilter";
import { fullRegionIncludeArgs, LocalePageParams } from "@/types";
import { transformSelectRegionData } from "@/utils";
import { getTranslations } from "next-intl/server";

const Layout = async ({children, params}: {
    children: ReactNode;
} & LocalePageParams) => {

    const regions = await prisma.region.findMany({
        where: {
            Events: {
                some: {}
            }
        },
        ...fullRegionIncludeArgs
    })
    const clientRegions = transformSelectRegionData(regions, params.locale)
    const t = await getTranslations("Event")

    return (
        <>
            <Banner
                title={t("archive")}
                filter="dark"
            />
            <div className="sectionGap">
                <div className="container pb-24">
                    <div className="hidden md:block">
                        <Filter locale={params.locale} regions={clientRegions} isArchive={true} />
                    </div>
                    <DrawerFilter locale={params.locale} regions={clientRegions} isArchive={true} />
                    {children}
                </div>
            </div>
        </>

    );
};

export default Layout;