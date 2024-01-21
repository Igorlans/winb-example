import React, {FC} from 'react';
import {FullEventTicket} from "@/types/events";
import RefreshOnMount from "@/utils/RefreshOnMount";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import EventTicketTableItem from "@/app/(admin)/adminpanel/events/[id]/tickets/_components/EventTicketTableItem";
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";
import { ClientTicket } from "@/types";


interface IEventTicketTableProps {
    tickets: ClientTicket[]
}
const EventTicketTable: FC<IEventTicketTableProps> = ({
    tickets
}) => {

    return (
        <Table>
            <RefreshOnMount />
            <RefreshNotificationCountOnMount />
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Імʼя</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Членкиня</TableHead>
                    <TableHead>Оплата</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    tickets?.map((item, i) => (
                        <EventTicketTableItem key={i} ticket={item} number={i+1} />
                    ))
                }
            </TableBody>

        </Table>
    );
};

export default EventTicketTable;