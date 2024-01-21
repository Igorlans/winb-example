import { Skeleton } from '@/components/ui/skeleton'
import { FC } from 'react'

interface ArticleCardListSkeletonProps {
    
}

const ArticleCardListSkeleton: FC<ArticleCardListSkeletonProps> = ({}) => {
    return (
        <div className='flex flex-col gap-5'>
            {
                [0,1,2,3,4].map(item => (
                    <Skeleton className='w-full h-[190px]' />
                ))
            }
        </div>
    )
}

export default ArticleCardListSkeleton