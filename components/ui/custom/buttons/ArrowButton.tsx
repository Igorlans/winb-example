import { FC } from 'react'

import { BsArrowRight } from "react-icons/bs";

import "./style.css";
import { cn } from '@/lib/utils';

interface ArrowButtonProps {
    children: React.ReactNode;
    className?: string;
}

const ArrowButton: FC<ArrowButtonProps> = ({children, className}) => {
    return (
        <div className={cn('arrow-button flex items-center gap-x-4 text-darkPink font-bold text-xs md:text-sm', className)}>
            {children}
            <BsArrowRight className='arrow text-lg md:text-xl'/>
        </div>
    )
}

export default ArrowButton