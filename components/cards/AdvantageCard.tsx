import { FC } from 'react'

import Image from 'next/image'

interface AdvantageCardProps {
    title: string;
    descr: string;
}

const AdvantageCard: FC<AdvantageCardProps> = ({title, descr}) => {
    return (
        <div className="py-3 cursor-default rounded-lg bg-white shadow-md hover:shadow-lg hover:scale-[1.02] ease-out duration-300">
            <div className="grid grid-rows-[40px_1fr] md:grid-rows-[50px_1fr] lg:grid-rows-[60px_1fr] gap-y-2 md:gap-y-3 place-content-center">
                <div className="relative w-full h-full aspect-square">
                    <Image 
                        fill
                        src={`/icons/icon_service.svg`}
                        alt="icon"
                    />
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-2 text-center px-3 md:px-4 pb-2 md:pb-4">
                    <h3 className='font-card-title'>
                        {title}
                    </h3>
                    <p className='font-main'>
                        {descr}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdvantageCard