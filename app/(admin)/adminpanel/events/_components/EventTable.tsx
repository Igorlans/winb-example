import React, {FC} from 'react';
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {FullEvent} from "@/types/events";
import EventTableItem from "@/app/(admin)/adminpanel/events/_components/EventTableItem";
import RefreshOnMount from "@/utils/RefreshOnMount";
import type { ClientEvent, Event } from "@/types";


interface IEventTableProps {
    events: ClientEvent[]
}
const EventTable: FC<IEventTableProps> = ({
    events
                                          }) => {
    return (
        <Table>
            <RefreshOnMount />
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Фото</TableHead>
                    <TableHead>Назва</TableHead>
                    <TableHead>Регіон</TableHead>
                    <TableHead className='text-right'>Редагувати</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    events?.map((item, i) => (
                        <EventTableItem key={i} event={item} number={i+1} />
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default EventTable;