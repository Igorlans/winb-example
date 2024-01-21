import Breadcrumbs from '@/components/adminpanel/Breadcrumbs'
import PageTitle from '@/components/adminpanel/PageTitle'

import {LuBellDot} from "react-icons/lu"
import RequestTable from './_components/RequestTable'
import prisma from '@/prisma/client'
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";

const breadCrumbs = [
    {text: 'Головна', href: '/adminpanel'},
    {text: 'Заявки', href: '/adminpanel/requests'},
]

const page = async ({}) => {
    const requests = await prisma.registrationRequest.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
    const idArr = requests.map(request => request.id)

    await prisma.notification.updateMany({
        where: {
            RegistrationRequestNotification: {
                RegistrationRequest: {
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

    return (
        <div>
            <Breadcrumbs links={breadCrumbs}/>
            <PageTitle icon={<LuBellDot className={'text-3xl'}/>} title={'Заявки'} description={'Список усіх заявок'}/>

            <div className='mt-8'>
                <RequestTable requests={requests}/>
            </div>
        </div>
    )
}

export default page