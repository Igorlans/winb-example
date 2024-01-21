"use client"

import { FC } from 'react'

import Link from 'next/link';

import { apiRequest } from '@/utils/apiRequest';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import DeleteAlert from './DeleteAlert';

import {
    TableCell, 
    TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { LuFileEdit } from 'react-icons/lu';
import Image from 'next/image';
import { Banner } from "@prisma/client";
import { ClientBanner } from "@/types";

interface BannerTableItemProps {
    number: number
    banner: ClientBanner
}

const BannerTableItem: FC<BannerTableItemProps> = ({ number, banner }) => {
    const router = useRouter()

    async function handleDelete (id: string) {
        try {
            toast.promise(apiRequest({
                url: "/api/banner",
                method: "DELETE",
                data: {
                    id
                }
            }), {
                loading: "Видалення...",
                success: () => {
                    router.refresh()
                    return "Банер успішно видалено"
                },
                error: "Помилка"
            }
            )
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>
                <div className='relative w-[400px] h-[200px]'>
                    <Image 
                        fill
                        src={banner?.image ?? "/images/LeadMagnet.png"}
                        alt={banner.textFields.title!}
                    />
                </div>
            </TableCell>
            <TableCell>{banner.textFields.title}{banner.id}</TableCell>
            <TableCell>{banner.textFields.subtitle}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/banner/${banner?.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuFileEdit className={'text-base'} />
                    </Button>
                </Link>
                <DeleteAlert action={() => handleDelete(banner.id)}/>
            </TableCell>
        </TableRow>
    )
}

export default BannerTableItem