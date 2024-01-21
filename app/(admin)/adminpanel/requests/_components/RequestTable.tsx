import React, { FC } from 'react'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"

import RequestTableItem from './RequestTableItem'
import { FullRegistrationRequest } from '@/types/registration'
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";
import RefreshOnMount from "@/utils/RefreshOnMount";

interface RequestTableProps {
    requests: FullRegistrationRequest[]
}

const RequestTable: FC<RequestTableProps> = ({ requests }) => {
    return (
        <div className="rounded-md border">
            <RefreshNotificationCountOnMount />
            <RefreshOnMount />
            <Table>
                <TableCaption className='pb-4'>
                    Список усіх заявок
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Ім'я</TableHead>
                        <TableHead>Номер телефону</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead className='text-right'>Редагувати</TableHead>
                    </TableRow>
                </TableHeader>
            <TableBody>
                {
                    requests?.map((item, i) => (
                        <RequestTableItem number={i+1} request={item} />
                    ))
                }
            </TableBody>

            </Table>
        </div>
    )
}

export default RequestTable