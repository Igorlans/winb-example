import { FC } from 'react'
import Link from 'next/link';
import {
    TableCell, 
    TableRow
} from "@/components/ui/table";
import { LuFileEdit } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { ClientService } from "@/types";

interface ServicesTableItemProps {
    number: number;
    service: ClientService
}

const ServicesTableItem: FC<ServicesTableItemProps> = ({ service, number }) => {
    return (
        <TableRow>
            
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{service.textFields.title}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/services/${service.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuFileEdit className={'text-base'} />
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export default ServicesTableItem