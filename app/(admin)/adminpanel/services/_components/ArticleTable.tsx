"use client"

import { FC } from 'react'
import { FullServiceArticle } from '@/types/services'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import ArticleTableItem from './ArticleTableItem'
import { ClientArticle } from "@/types";

interface ArticleTableProps {
    articles: ClientArticle[]
}

const ArticleTable: FC<ArticleTableProps> = ({ articles }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption className='pb-4'>
                    Список усіх статтей
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
                    articles?.map((item, i) => (
                        <ArticleTableItem number={i+1} article={item} />
                    ))
                }
            </TableBody>

            </Table>
        </div>
    )
}

export default ArticleTable