import { FC } from 'react'

import Image from 'next/image'

import ArrowButton from '@/components/ui/custom/buttons/ArrowButton';
import { cn } from '@/lib/utils';
import { useTranslations } from "next-intl";

interface TeamCardProps {
    member: {
        title: string;
        description: string;
        img: string;
    };
    className?: string
}

const TeamCard: FC<TeamCardProps> = ({ member, className}) => {

    const button = useTranslations("buttons")

    return (
        <div className='rounded-lg bg-white cursor-pointer relative overflow-hidden shadow hover:shadow-md p-4 duration-300'>
            <div className={cn('grid grid-rows-[80px] md:grid-rows-[120px] grid-cols-[80px_3fr] md:grid-cols-[120px_3fr] gap-x-4', className)}>
                <div className='relative w-full h-full rounded-full overflow-hidden aspect-square'>
                    <Image 
                        fill
                        src={member.img}
                        alt='article'
                        className="object-cover"
                    />
                </div>
                <div className='flex flex-col items-start justify-between'>
                    <div className='flex flex-col'>
                        <h4 className='font-card-title card-title-hidden'>{member.title}</h4>
                        <p className='font-main card-text-hidden'>{member.description}</p>
                    </div>
                    <ArrowButton>
                        { button("view") }
                    </ArrowButton>
                </div>
            </div>
        </div>
    )
}

export default TeamCard