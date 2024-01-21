import Breadcrumbs from '@/components/adminpanel/Breadcrumbs'
import PageTitle from '@/components/adminpanel/PageTitle'

import { RiServiceLine } from "react-icons/ri"
import ServicesTable from './_components/ServicesTable'
import prisma from '@/prisma/client'
import { fullServiceIncludeArgs } from '@/types'
import { transformServiceData } from "@/utils/service";
const breadCrumbs = [
    {text: 'Головна', href: '/adminpanel'},
    {text: 'Бізнес - послуги', href: '/adminpanel/services'},
]

export const dynamic = 'force-dynamic'

const page = async ({}) => {
    const services = await prisma.service.findMany({
        ...fullServiceIncludeArgs
    })

    const clientService = transformServiceData(services, "uk")
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            <PageTitle icon={<RiServiceLine className={'text-3xl'} />} title={'Бізнес - послуги'} description={'Список усіх бізнес - послуг'} />
            <div className={'mt-8'}>
                <ServicesTable services={clientService} />
            </div>
        </div>
    )
}

export default page