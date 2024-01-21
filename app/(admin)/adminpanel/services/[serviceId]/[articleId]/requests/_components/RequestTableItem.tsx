'use client'
import React, {FC} from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import {FullArticleRequest} from "@/types/requests";
import { ClientArticle } from "@/types";


interface IRequestItemProps {
    request: ClientArticle["requests"][number],
    number: number
}

const RequestTableItem: FC<IRequestItemProps> = ({
                                                      request,
                                                      number
                                                  }) => {

    const dateTimeFormat = new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    });

    const date = dateTimeFormat.format(request.createdAt)

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{request.name}</TableCell>
            <TableCell>{request.phone}</TableCell>
            <TableCell>{request.comment}</TableCell>
            <TableCell>{request.member.textFields.name}</TableCell>
            <TableCell>{date}</TableCell>
        </TableRow>
    );
};

export default RequestTableItem;