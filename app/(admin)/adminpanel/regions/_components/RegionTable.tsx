"use client"

import { FC } from 'react'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import RegionTableItem from './RegionTableItem'
import { Region } from '@prisma/client'
import { ClientRegion } from "@/types";

interface RegionTableProps {
    regions: ClientRegion[],
}

const RegionTable: FC<RegionTableProps> = ({ regions  }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption className='pb-4'>
                    Список усіх регіонів
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Назва</TableHead>
                        <TableHead className='text-right'>Редагувати</TableHead>
                    </TableRow>
                </TableHeader>
            <TableBody>
                {
                    regions?.map((item, i) => (
                        <RegionTableItem number={i+1} region={item} />
                    ))
                }
            </TableBody>

            </Table>
        </div>
    )
}

export default RegionTable