'use client'
import React, {FC} from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import type { ClientMember } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { IoWomanOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";


interface IMemberTableItemProps {
    member: ClientMember,
    number: number
}

const MemberTableItem: FC<IMemberTableItemProps> = ({
    member,
    number
}) => {

    const router = useRouter()

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>
                { member.textFields.name }
            </TableCell>
            <TableCell>
                { member.user.email }
            </TableCell>
            <TableCell>
                { member.user.password }
            </TableCell>
            <TableCell>
                { member.textFields.status }
            </TableCell>
            <TableCell className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/*<DropdownMenuLabel>Дії</DropdownMenuLabel>*/}
                        <DropdownMenuItem
                            onClick={() => router.push(`/member/${member.id}`)}
                            className={'flex items-center gap-3'}
                        >
                            <IoWomanOutline className={'text-lg'} />
                            Сторінка членкині
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.push(`/adminpanel/members/${member.id}`)}
                            className={'flex items-center gap-3'}
                        >
                            <MdOutlineEdit className="text-lg"/>
                            Оновити
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default MemberTableItem;