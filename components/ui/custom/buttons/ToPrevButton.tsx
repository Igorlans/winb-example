import { FC } from 'react'

import Link from 'next/link'
import { IoIosArrowBack } from "react-icons/io"

interface ToPrevButtonProps {
    link: string;
    children: React.ReactNode;
}

const ToPrevButton: FC<ToPrevButtonProps> = ({ children, link }) => {
    return (
        <Link href={link} className='block w-fit'>
            <div className='prev-arrow-button flex items-center gap-x-4 text-ring opacity-80 font-bold font-subtitle'>
                <IoIosArrowBack className='arrow text-xl md:text-2xl'/>
                {children}
            </div>
        </Link>
    )
}

export default ToPrevButton