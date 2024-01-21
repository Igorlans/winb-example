"use client"

import { FC } from 'react'

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import {
    TableCell, 
    TableRow
} from "@/components/ui/table";
import { LuFileEdit } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Region } from '@prisma/client';
import { ClientRegion } from "@/types";

interface RegionTableItemProps {
    number: number
    region: ClientRegion
}

const RegionTableItem: FC<RegionTableItemProps> = ({ region, number }) => {
    const router = useRouter()
    return (
        <TableRow
            onClick={() => router.push(`/adminpanel/regions/${region?.id}`)}
        >
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{region.textFields.name}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/regions/${region?.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuFileEdit className={'text-base'} />
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export default RegionTableItem