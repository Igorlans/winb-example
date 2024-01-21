import React, {FC, useEffect} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

interface IDeleteButtonProps {
    onConfirm: () => void;
    title: string;
    description?: string,
    children: React.ReactNode
}

const DeleteButton: FC<IDeleteButtonProps> = ({
    onConfirm,
    title,
    description,
    children
                                              }) => {


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
                {/*<Button type="button" variant="destructive">*/}
                {/*    <Trash className="h-4 w-4" />*/}
                {/*</Button>*/}
            </AlertDialogTrigger>
            <AlertDialogContent className={'z-20'}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {/*Ви впевнені, що хочете видалити цю членкиню?*/}
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                        {/*Цю дію неможливо відмінити. Членкиня буде видалена із бази даних.*/}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Відмінити</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Видалити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};

export default DeleteButton;