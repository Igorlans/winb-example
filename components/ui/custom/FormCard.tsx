import React, {FC, HTMLAttributes} from 'react';
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";


interface IFormCardProps extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode,
    className?: string
}

const FormCard: FC<IFormCardProps> = ({children, className, ...props}) => {
    return (
        <Card className={cn('p-8 border-pink-200', className)} {...props}>
            {children}
        </Card>
    );
};

export default FormCard;