import React, {ReactNode} from 'react';
import prisma from "@/prisma/client";
import { fullServiceIncludeArgs, LocalePageParams } from "@/types";
import {notFound} from "next/navigation";
import Banner from "@/components/banner/Banner";
import Catigories from "@/app/(main)/[locale]/services/(components)/(categories)/Catigories";
import { transformServiceData } from "@/utils/service";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = LocalePageParams & {
    params: {
        serviceSlug: string;
        articleSlug: string;
    },
    children: ReactNode
}
const ServicesLayout = async ({ children, params }: Props) => {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations("Service")

    const service = await prisma.service.findUnique({
        where: {
            slug: params.serviceSlug
        },
        ...fullServiceIncludeArgs
    })
    if (!service) {
        notFound()
    }
    const clientService = transformServiceData(service, params.locale)

    const services = await prisma.service.findMany({
        ...fullServiceIncludeArgs
    })
    const clientServices = transformServiceData(services, params.locale)
    return (
        <div className="h-full mb-[50px]">
            <Banner
                title={ t("title") }
                img={"/images/banners/BannerDefault.png"}
                subtitle={clientService.textFields.title}
                filter="dark"
            />
            <div className='container pt-[0px] md:pt-[80px] w-full grid gap-x-9 grid-cols-1 md:grid-cols-[1.2fr_3fr]'>

                {/*DESKTOP*/}
                <div className='hidden md:block min-w-[300px]'>
                    <Catigories services={clientServices} activeService={params.serviceSlug}/>
                </div>

                {/*MOBILE*/}
                <div className={'block md:hidden my-8'}>
                    <Catigories services={clientServices} activeService={params.serviceSlug}/>
                </div>

                {/*PAGE*/}
                {children}
            </div>
        </div>
    );
};

export default ServicesLayout;