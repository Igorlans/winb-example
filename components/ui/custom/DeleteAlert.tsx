"use client"

import React, { FC } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {buttonVariants} from '@/components/ui/button'
import { HiOutlineTrash } from "react-icons/hi"
import {cn} from "@/lib/utils";
interface CustomAlertProps {
    action: () => void,
    children?: React.ReactNode
}

const DeleteAlert: FC<CustomAlertProps> = ({ action, children }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children ||
                    <div className={cn(buttonVariants({ variant: 'default', size: 'default', className: ''}))}>
                        <HiOutlineTrash className={'text-base'} />
                    </div>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Цю дію не можна буде відмінити.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => action()}
                    >Продовжити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert