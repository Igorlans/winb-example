import React, {FC} from 'react';
import {FullEventTicket} from "@/types/events";
import {TableCell, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { ClientTicket } from "@/types";


interface IEventTicketTableItemProps {
    ticket: ClientTicket,
    number: number;
}

const EventTicketTableItem: FC<IEventTicketTableItemProps> = ({
                                                                  ticket,
                                                                  number
                                                              }) => {

    const name = ticket.Member?.id ? ticket.member.textFields.name : ticket.name
    const phone = ticket.Member?.id ? ticket.Member.phone : ticket.phone
    const email = ticket.Member?.id ? ticket.Member.user.email : ticket.email

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                {
                    ticket.Member?.id ?
                        <Link href={`/member/${ticket.Member.id}`} target={'_blank'}>
                            <Button variant={'outline'}>
                                Сторінка
                            </Button>
                        </Link>
                        : 'Ні'
                }
            </TableCell>
            <TableCell>{ticket.verified ? 'Так' : 'Ні'}</TableCell>
        </TableRow>
    );
};

export default EventTicketTableItem;