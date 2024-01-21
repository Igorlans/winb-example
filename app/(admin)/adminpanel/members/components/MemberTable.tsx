"use client"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import RefreshOnMount from "@/utils/RefreshOnMount";
import { ClientMember } from "@/types";
import MemberTableItem from "@/app/(admin)/adminpanel/members/components/MemberTableItem";
import SearchBar from "@/components/searchBar/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useCallback, useMemo, useState } from "react";

interface DataTableProps {
    members: ClientMember[]
}

export function MemberTable({ members }: DataTableProps) {
    const [request, setRequest] = useState("")
    const debounceValue = useDebounce(request)

    const list = useMemo(() => (
        members.filter(item => {
            const searchTerm = debounceValue.toLowerCase()
            const isName =
                item.textFields.name.toLowerCase().includes(searchTerm);
            const isStatus =
                item.textFields.status.toLowerCase().includes(searchTerm);
            const isEmail =
                !!item.user.email?.toLowerCase().includes(searchTerm)

            return isName || isStatus || isEmail
        })
    ), [debounceValue])

    return (
        <>
            <SearchBar value={request} onChange={setRequest} className={"mt-8 mb-4"} />
            <div className="rounded-md border">
                <Table>
                    <RefreshOnMount />
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">№</TableHead>
                            <TableHead>Імʼя</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Пароль</TableHead>
                            <TableHead>Звання</TableHead>
                            <TableHead className='text-right'>Редагувати</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            list.map((item, i) => (
                                <MemberTableItem member={item} number={i+1} />
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
