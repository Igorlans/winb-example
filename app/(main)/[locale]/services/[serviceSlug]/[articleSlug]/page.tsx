import prisma from "@/prisma/client";
import type { Metadata } from "next";
import { NotFoundMetada } from "@/utils/NotFoundMetadata";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const articles = await prisma.article.findMany({
        select: {
            slug: true
        }
    })
    return articles.map((article) => ({
        articleSlug: article.slug,
    }))
}

export const revalidate = 3600;
export const dynamicParams = true;

import ServiceContent from "@/app/(main)/[locale]/services/(components)/(serviceContent)/ServiceContent";
import ToPrevButton from "@/components/ui/custom/buttons/ToPrevButton";
import { fullArticleIncludeArgs, LocalePageParams } from "@/types";
import { transformArticleData } from "@/utils";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = LocalePageParams & {
    params: {
        serviceSlug: string;
        articleSlug: string;
    }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
    try {
        const article = await prisma.article.findUnique({
            where: {
                slug: params.articleSlug,
            },
            ...fullArticleIncludeArgs
        })
        if (!article) {
            notFound()
        }
        const clientArticle = transformArticleData(article, params.locale);

        return {
            title: clientArticle.textFields.title,
            description: clientArticle.textFields.description,
            openGraph: {
                type: "article",
                url: `${process.env.NEXT_PUBLIC_API_URL}/services/${params.serviceSlug}/${params.articleSlug}`,
                title: clientArticle.textFields.title,
                description: clientArticle.textFields.description,
                siteName: "Women in business",
                images: [
                    {url: article.image[0] ?? "/images/LeadMagnet.png"}
                ]
            }
        }
    } catch {
        return NotFoundMetada
    }
}

const dbTitles = [ 'Консультації', 'Навчальні програми', 'Грантовий відділ' ] as const;

export default async function Article({params}: Props) {
    unstable_setRequestLocale(params.locale);

    const t = await getTranslations("Service")

    const article = await prisma.article.findUnique({
        where: {
            slug: params.articleSlug,
        },
        ...fullArticleIncludeArgs
    })

    if(!article) {
        notFound()
    }

    const clientArticle = transformArticleData(article, params.locale)

    function getValidButtonTitle (name: typeof dbTitles[number]): string {
        switch (name) {
            case "Консультації": return t("consultation")
            case "Грантовий відділ": return t("education");
            case "Навчальні програми": return t("department");
            default: return t("category")
        }
    }
    
    const buttonTitle = getValidButtonTitle(clientArticle.service.textFields.title as typeof dbTitles[number])

    return (
        <div>
            <ToPrevButton link={`/services/${params.serviceSlug}`}>
                { buttonTitle }
            </ToPrevButton>
            <ServiceContent article={clientArticle} />
        </div>
    )
}
