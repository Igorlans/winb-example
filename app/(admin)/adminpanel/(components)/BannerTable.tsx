import { FC } from 'react'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import BannerTableItem from './BannerTableItem'
import { Banner } from "@prisma/client";
import { ClientBanner } from "@/types";

interface BannerTableProps {
    banner: ClientBanner[]
}

const BannerTable: FC<BannerTableProps> = ({ banner }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption className='pb-4'>
                    {
                        banner.length > 0 ? "Список усіх банерів" : "Список банерів порожній"
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Зображення</TableHead>
                        <TableHead>Заголовок</TableHead>
                        <TableHead className='text-right'>Підзаголовок</TableHead>
                    </TableRow>
                </TableHeader>
            <TableBody>
                {
                    banner?.map((item, i) => (
                        <BannerTableItem number={i+1} banner={item} />
                    ))
                }
            </TableBody>

            </Table>
        </div>
    )
}

export default BannerTable