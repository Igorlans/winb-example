"use client"

import { FC } from 'react'

import {
    TableCell, 
    TableRow
} from "@/components/ui/table";
import { FullRegistrationRequest } from '@/types/registration';
import dayjs from 'dayjs';

import { LuTrash2 } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { apiRequest } from '@/utils/apiRequest';
import { useRouter } from 'next/navigation';
import DeleteAlert from '@/components/ui/custom/DeleteAlert';

interface RequestTableItemProps {
    number: number;
    request: FullRegistrationRequest
}


const RequestTableItem: FC<RequestTableItemProps> = ({ request, number }) => {
    const router = useRouter()

    async function handleDelete (id: string) {
        try {
            toast.promise(apiRequest({
                url: "/api/user/request",
                method: "DELETE",
                data: {
                    id
                }
            }), 
            {
                loading: "Видалення заявки...",
                success: () => {
                    router.refresh();
                    return "Заявку видалено"
                },
                error: "Помилка"
            }
            )
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TableRow>
        <TableCell className="font-medium">{number}</TableCell>
        <TableCell>{request.name}</TableCell>
        <TableCell>{request.phone}</TableCell>
        <TableCell>{request.email}</TableCell>
        <TableCell>{dayjs(request.createdAt).format('DD.MM.YYYY')}</TableCell>
        <TableCell className='float-right'>
            <DeleteAlert action={() => handleDelete(request.id)}>
                <Button className='h-10 w-10 p-1' variant="destructive">
                    <LuTrash2 className={'text-base'} />
                </Button>
            </DeleteAlert>
        </TableCell>
    </TableRow>
    )
}

export default RequestTableItem