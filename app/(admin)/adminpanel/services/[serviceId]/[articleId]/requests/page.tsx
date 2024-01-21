
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import prisma from '@/prisma/client'
import { ServiceParams } from "@/types/services";
import PageTitle from "@/components/adminpanel/PageTitle";
import RequestTable from "@/app/(admin)/adminpanel/services/[serviceId]/[articleId]/requests/_components/RequestTable";
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";
import { fullArticleIncludeArgs, fullServiceIncludeArgs } from "@/types";
import { transformServiceData } from "@/utils/service";
import { transformArticleData } from "@/utils";

const page = async ({ params }: ServiceParams) => {
    const service = await prisma.service.findUnique({
        where: {
            id: params.serviceId
        },
        include: {
            ...fullServiceIncludeArgs.include,
            Articles: {
                where: {
                    id: params.articleId
                },
                ...fullServiceIncludeArgs.include.Articles
            },
        }
    })

    const article = await prisma.article.findUnique({
        where: {
            id: params.articleId
        },
        include: {
            ...fullArticleIncludeArgs.include,
            requests: {
                ...fullArticleIncludeArgs.include.requests,
                orderBy: {
                    createdAt: 'desc'
                },
            }
        }
    })

    if(!service || !article) return null

    const idArr = article.requests.map(request => request.id)

    await prisma.notification.updateMany({
        where: {
            ServiceNotification: {
                ArticleRequest: {
                    id: {
                        in: idArr
                    }
                }
            }
        },
        data: {
            status: "READ"
        }
    })

    const clientService = transformServiceData(service, "uk");
    const clientArticle = transformArticleData(article, "uk");

    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Бізнес - послуги', href: '/adminpanel/services'},
        {text: clientService.textFields.title ?? "", href: `/adminpanel/services/${service.id}`},
        {text: clientArticle.textFields.title, href: `/adminpanel/services/${service.id}/${article.id}`},
        {text: "Записи", href: `/adminpanel/services/${service.id}/${article.id}/requests`},
    ]


    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>
            <PageTitle title={'Записи'} />
            <RequestTable requests={clientArticle.requests} />
        </>
    )
}

export default page