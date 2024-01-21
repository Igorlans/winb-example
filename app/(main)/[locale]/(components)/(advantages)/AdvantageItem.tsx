import { FC } from 'react'
import Image from 'next/image'

interface AdvantageItemProps {
    
}

const AdvantageItem: FC<AdvantageItemProps> = ({}) => {
    return (
        <div className="py-3 rounded-lg bg-white shadow-md hover:shadow-lg hover:scale-[1.02] ease-out duration-300">
            <div className="grid grid-rows-[40px_1fr] md:grid-rows-[50px_1fr] lg:grid-rows-[80px_1fr] gap-y-1 md:gap-y-2 place-content-center">
                <div className="relative w-full h-full aspect-square">
                    <Image 
                        fill
                        src={`/icons/icon_service.svg`}
                        alt="icon"
                    />
                </div>
                <div className="flex flex-col gap-y-2 md:gap-y-4 text-center px-3 md:px-4 py-2 md:py-4">
                    <div className='font-card-title'>
                        ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ
                    </div>
                    <div className='font-main'>
                        Lorem ipsum dolor sit amet consectetur. Vulputate fermentum aliquam ut
                        rutrum. Tellus etiam vitae congue.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvantageItem