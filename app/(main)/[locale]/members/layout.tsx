import {ReactNode} from "react";
import prisma from "@/prisma/client";
import Banner from "@/components/banner/Banner";
import { fullBusinessIncludeArgs, fullRegionIncludeArgs, LocalePageParams } from "@/types";
import { transformBusinessSelectData, transformSelectRegionData } from "@/utils";
import { Filter } from "@/app/(main)/[locale]/members/_components/filters/Filter";
import { DrawerFilter } from "@/app/(main)/[locale]/members/_components/Drawer";
import { getTranslations } from "next-intl/server";
import { localeMemberStatus } from "@/lib/memberTypes";

const Layout = async ({children, params}: {
    children: ReactNode;
} & LocalePageParams) => {
    const regions = await prisma.region.findMany({
        where: {
            Members: {
                some: {}
            }
        },
        ...fullRegionIncludeArgs
    })
    const business = await prisma.business.findMany({
        where: {
            member: {
                some: {}
            }
        },
        ...fullBusinessIncludeArgs
    })

    const regionOptions = transformSelectRegionData(regions, params.locale)
    const businessOptions = transformBusinessSelectData(business, params.locale)
    const statusOptions = localeMemberStatus[params.locale]

    const t = await getTranslations("Member");

    return (
        <>
            <Banner
                title={t("title")}
                subtitle={t("desc")}
                filter="dark"
            />
            <div className="sectionGap">
                <div className="container pb-24">
                    <div className="hidden md:block">
                        <Filter
                            statusOptions={statusOptions}
                            regionOptions={regionOptions}
                            businessOptions={businessOptions}
                        />
                    </div>
                    <DrawerFilter
                        statusOptions={statusOptions}
                        regionOptions={regionOptions}
                        businessOptions={businessOptions}
                    />
                    {children}
                </div>
            </div>
        </>

    );
};

export default Layout;