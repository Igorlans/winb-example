import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from "next/link";

export default function NotFound() {
    return (
        <div className='w-full h-[90vh] md:h-[90vh]'>
            <div className='relative w-full h-full'>
                <div className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                    <h1 className='text-[80px] md:text-[20vw] lg:text-[300px] font-bold text-darkPink text-center w-full'>404</h1>
                    <div className='flex z-11 pointer-events-auto flex-col items-center text-center gap-y-2 md:-mt-[6vw] lg:-mt-16'>
                        <h3 className='text-sm md:text-xl'>Сторінка не знайдена</h3>
                        <Link href={'/'}>
                            <Button variant="outline" className='py-1 text-xs'>Перейти на головну</Button>
                        </Link>
                    </div>
                </div>
                <div className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[200px] min-h-[200px] w-[12vw] h-[12vw]'>
                    <div className='relative w-full h-full'>
                        <Image 
                            fill
                            src={"/icons/icon_grayDiamond.svg"}
                            alt=''
                        />
                    </div>
                </div>
        
                <div className='hidden md:block absolute top-0 left-0 w-[100vw] h-full'>
                    <div className='absolute top-0 left-0 w-[400px] h-full'>
                        <div className='relative w-full h-full'>
                            <Image 
                                fill
                                src={"/icons/textDecor.svg"}
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='absolute top-0 left-36 w-[400px] h-full'>
                        <div className='relative w-full h-full'>
                            <Image 
                                fill
                                src={"/icons/textDecor.svg"}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}