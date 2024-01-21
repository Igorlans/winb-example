import { FC } from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import ServicesTableItem from './ServicesTableItem'
import { ClientService } from "@/types";

interface ServicesTableProps {
    services: ClientService[]
}

const ServicesTable: FC<ServicesTableProps> = ({ services }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption className='pb-4'>
                    Список усіх бізнес - послуг
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
                    services?.map((item, i) => (
                        <ServicesTableItem number={i+1} service={item} />
                    ))
                }
            </TableBody>

            </Table>
        </div>
    )
}

export default ServicesTable