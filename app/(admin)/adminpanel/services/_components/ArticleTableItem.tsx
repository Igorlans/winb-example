import { FC } from 'react'

import Link from 'next/link';

import {
    TableCell, 
    TableRow
} from "@/components/ui/table";
import { LuFileEdit, LuTrash2 } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { FullServiceArticle } from '@/types/services';
import toast from 'react-hot-toast';
import { apiRequest } from '@/utils/apiRequest';
import { useRouter } from 'next/navigation';
import { ClientArticle } from "@/types";

interface ArticleTableItemProps {
    number: number
    article: ClientArticle
}

const ArticleTableItem: FC<ArticleTableItemProps> = ({number, article}) => {
    const router = useRouter()

    async function handleDelete (id: string) {
        try {
            await toast.promise(apiRequest({
                url: "/api/services",
                method: "DELETE",
                data: { id }
            }), 
            {
                loading: "Видалення статті...",
                success: () => {
                    router.refresh();
                    return "Статтю видалено"
                },
                error: "Помилка"
            }
            )
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <TableRow>
            
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{article.textFields.title}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Button className='h-10 w-10 p-1' variant="destructive" onClick={() => handleDelete(article.id)}>
                    <LuTrash2 className={'text-base'} />
                </Button>
                <Link href={`/adminpanel/services/${article.serviceId}/${article.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuFileEdit className={'text-base'} />
                    </Button>
                </Link>
                <Link href={`/adminpanel/services/${article.serviceId}/${article.id}/requests`}>
                    <Button>
                        Записи
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export default ArticleTableItem