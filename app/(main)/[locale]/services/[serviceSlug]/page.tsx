import prisma from "@/prisma/client";
import { NotFoundMetada } from "@/utils/NotFoundMetadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article, fullServiceIncludeArgs } from "@/types";
import { Suspense } from "react";
import ArticleCardList from "../(components)/articleCardList/ArticleCardList";
import ArticleCardListSkeleton from "../(components)/articleCardList/ArticleCardListSkeleton";
import { LocalePageParams } from "@/types";
import { transformServiceData } from "@/utils/service";
import { transformArticleData } from "@/utils";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = LocalePageParams & {
    params: {
        serviceSlug: string;
        articleSlug: string;
    },
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
    try {
        const service = await prisma.service.findUnique({
            where: {
                slug: params.serviceSlug
            },
            ...fullServiceIncludeArgs
        })
        if (!service) notFound()

        const clientService = transformServiceData(service, params.locale)
        return {
            title: clientService.textFields.title,
            description: clientService.textFields.title,
            openGraph: {
                type: "website",
                url: `${process.env.NEXT_PUBLIC_API_URL}/services/${params.serviceSlug}`,
                title: clientService.textFields.title,
                description: clientService.textFields.title,
                siteName: "Women in business",
                images: [
                    {url: clientService.image ?? "/images/LeadMagnet.png"}
                ]
            }
        }
    } catch {
        return NotFoundMetada
    }
}

export async function generateStaticParams() {
    const services = await prisma.service.findMany({
        select: {
            slug: true
        }
    })

    return services.map((service) => ({
        serviceSlug: service.slug,
    }))
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function Services({ params }: Props) {
    unstable_setRequestLocale(params.locale);
    const service = await prisma.service.findUnique({
        where: {
            slug: params.serviceSlug
        },
        ...fullServiceIncludeArgs
    })
    if (!service) notFound()

    const clientArticle = transformArticleData(service.Articles as Article[], params.locale)

    return (
        <Suspense fallback={<ArticleCardListSkeleton />}>
            <ArticleCardList articles={clientArticle} />
        </Suspense>
    )
}
