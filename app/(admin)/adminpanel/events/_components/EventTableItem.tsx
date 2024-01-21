'use client'
import React, {FC} from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import Image from "next/image";
import DeleteAlert from "@/components/ui/custom/DeleteAlert";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import {LuFileEdit, LuTicket} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import type { ClientEvent, RegionTextFields } from "@/types";

interface IEventTableItemProps {
    event: ClientEvent,
    number: number
}

const EventTableItem: FC<IEventTableItemProps> = ({
    event,
    number
}) => {

    const router = useRouter()
    const deleteEvent = async () => {
        try {
            await toast.promise(apiRequest({url: `/api/events?id=${event.id}`, method: 'DELETE'}),
                {
                    loading: 'Видалення події',
                    success: () => {
                        router.refresh()
                        return 'Подію видалено'
                    },
                    error: (e) => {
                        return 'Помилка видалення події';
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>
                <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={event.image}
                        src={event.image}
                    />
                </div>
            </TableCell>
            <TableCell>{event.textFields.title}</TableCell>
            <TableCell>{event.region?.textFields.name}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/events/${event.id}/tickets`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuTicket />
                    </Button>
                </Link>
                <Link href={`/adminpanel/events/${event.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuFileEdit/>
                    </Button>
                </Link>
                <DeleteAlert action={deleteEvent}/>
            </TableCell>
        </TableRow>
    );
};

export default EventTableItem;