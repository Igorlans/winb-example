import Breadcrumbs from '@/components/adminpanel/Breadcrumbs'
import PageTitle from '@/components/adminpanel/PageTitle'

import { RiServiceLine } from "react-icons/ri"
import ArticleTable from '../_components/ArticleTable'
import IconButton from '@/components/adminpanel/IconButton'
import Link from 'next/link'
import { AiOutlinePlus } from "react-icons/ai"

import prisma from '@/prisma/client'
import { Article, fullServiceIncludeArgs } from '@/types'
import { transformServiceData } from "@/utils/service";
import { transformArticleData } from "@/utils";


export const dynamic = 'force-dynamic'

const page = async ({ params }: {params: { serviceId: string } }) => {
    const service = await prisma.service.findUnique({
        where: {
            id: params.serviceId
        }, 
        ...fullServiceIncludeArgs
    })
    if (!service) return null

    const clientService = transformServiceData(service, "uk")
    const clientArticle = transformArticleData(service.Articles as Article[], "uk")
    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Бізнес - послуги', href: '/adminpanel/services'},
        {text: clientService.textFields.title ?? "", href: `/adminpanel/services/${service.id}`},
    ]

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<RiServiceLine className={'text-3xl'} />} title={'Бізнес - послуги'} description={'Список усіх статтей'}>
                <Link href={`/adminpanel/services/${service.id}/create`}>
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Додати
                    </IconButton>
                </Link>
            </PageTitle>
            <div className={'mt-8'}>
                <ArticleTable articles={clientArticle} />
            </div>
        </div>
    )
}

export default page