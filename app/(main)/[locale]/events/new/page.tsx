import {Metadata} from 'next'
import {Suspense} from "react";
import CardsList from "@/app/(main)/[locale]/events/(components)/(catalog)/CardsList";
import CardsListSkeleton from "@/app/(main)/[locale]/events/(components)/CardsListSkeleton";
import { LocalePageParams } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
    const banner = null // TODO: Get dynamic banner

    return {
        title: "Події",
        description: "Обери ту послугу, яка потрібна для росту твого бізнесу сьогодні!",
        openGraph: {
            type: "website",
            url: `${process.env.NEXTAUTH_URL}/events`,
            title: "Події",
            description: "Обери ту послугу, яка потрібна для росту твого бізнесу сьогодні!",
            siteName: "Women in business",
            images: [
                {url: banner ?? "/images/LeadMagnet.png"}
            ]
        }
    }
}

export default async function Events({searchParams, params}: {
    params: { slug: string }
    searchParams: { [key: string]: string | undefined }
} & LocalePageParams) {

    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={<CardsListSkeleton />}>
            <CardsList locale={params.locale} params={searchParams} isArchive={false}/>
        </Suspense>
    )
}