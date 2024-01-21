import { FC } from 'react'

import Image from 'next/image';
import ArrowButton from '@/components/ui/custom/buttons/ArrowButton';
import { cn } from '@/lib/utils';
import { useTranslations } from "next-intl";

interface ArticleCardProps {
    article: {
        img: string;
        title: string;
        description: string
    }
    className?: string;
    buttonText?: string; 
}

const ArticleCard: FC<ArticleCardProps> = ({ article, className, buttonText = "Читати далі" }) => {

    const button = useTranslations("buttons")

    return (
        <div className='rounded-lg bg-white cursor-pointer relative overflow-hidden shadow p-4 duration-300'>
            <div className={cn('grid grid-cols-[2fr_3fr] gap-x-4', className)}>
                <div className='relative w-full h-full rounded overflow-hidden aspect-video'>
                    <Image 
                        fill
                        src={article.img}
                        alt='article'
                        className="object-cover"
                    />
                </div>
                <div className='flex flex-col gap-y-4 items-start justify-between'>
                    <div className='flex flex-col gap-y-2'>
                        <h4 className='font-card-title card-title-hidden'>{article.title}</h4>
                        <p className='font-main card-text-hidden'>{article.description}</p>
                    </div>
                    <ArrowButton>
                        { button("addition") }
                    </ArrowButton>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard