import DecoratedSectonTitle from "@/components/sectionTitle/DecoratedSectonTitle";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";

const ServicesNav = () => {

    const scaleAnimationClasses = 'transform scale-[1] hover:scale-[1.02] transition-transform duration-300'
    return (
        <div className='container'>
            <DecoratedSectonTitle
                title="Бізнес - послуги"
            />
            <div className="grid md:grid-cols-2 gap-8 md:gap-14 h-full">
                <div className="">
                    <div className="flex flex-col h-full gap-8 md:gap-14">

                        <Card className={`${scaleAnimationClasses} h-full w-full rounded-lg bg-white cursor-pointer relative overflow-hidden`}>
                            <div className='h-full w-full grid grid-cols-[2fr_3fr] gap-x-4'>
                                <div className='relative w-full h-full'>
                                    <Image 
                                        fill
                                        src={"/images/services/service_smth2.jpg"}
                                        alt='article'
                                        className="object-cover"
                                    />
                                </div>
                                <div className='flex flex-col gap-y-4 items-start justify-between py-4 pr-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h4 className='font-card-title card-title-hidden'>Навчальні програми</h4>
                                        <p className='font-main card-text-hidden'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.</p>
                                    </div>
                                    <Link href={'/'}>
                                        <Button variant={'outline'} size={'sm'}>Читати</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        <Card className={`${scaleAnimationClasses} h-full w-full rounded-lg bg-white cursor-pointer relative overflow-hidden`}>
                            <div className='h-full w-full grid grid-cols-[2fr_3fr] gap-x-4'>
                                <div className='relative w-full h-full'>
                                    <Image 
                                        fill
                                        src={"/images/services/service_study.jpg"}
                                        alt='article'
                                        className="object-cover"
                                    />
                                </div>
                                <div className='flex flex-col gap-y-4 items-start justify-between py-4 pr-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h4 className='font-card-title card-title-hidden'>Навчальні програми</h4>
                                        <p className='font-main card-text-hidden'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.</p>
                                    </div>
                                    <Link href={'/'}>
                                        <Button variant={'outline'} size={'sm'}>Читати</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        {/* <Card className={`${scaleAnimationClasses} h-full w-full p-5 grid grid-cols-1 sm:grid-cols-2 gap-8`}>
                            <div className={'relative aspect-[33/25] bg-pink-300 rounded'}>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <h3 className={'font-subtitle'}>Навчальні програми</h3>
                                <p className={'font-card-description'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.</p>
                                <Link href={'/'}>
                                    <Button variant={'outline'} size={'sm'}>Читати</Button>
                                </Link>
                            </div>
                        </Card> */}
                        {/* <Card className={`block md:hidden ${scaleAnimationClasses} h-full w-full p-5 grid grid-cols-1 sm:grid-cols-2 gap-8`}>
                            <div className={'relative aspect-[33/25] bg-pink-300 rounded'}>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                <h3 className={'font-subtitle'}>Навчальні програми</h3>
                                <p className={'font-card-description'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.</p>
                                <Link href={'/'}>
                                    <Button variant={'outline'} size={'sm'}>Читати</Button>
                                </Link>
                            </div>
                        </Card> */}
                    </div>
                </div>
                <div className="">
                    <Card className={`${scaleAnimationClasses} h-full w-full`}>
                        <div className="h-full w-full grid grid-rows-[184px_2fr_0.5fr] md:grid-rows-[240px_2fr_1fr] gap-y-4">
                            <div className="relative overflow-hidden w-full h-full">
                                <Image 
                                    fill
                                    src={"/images/services/service_smth.jpg"}
                                    style={{ objectFit: "cover" }}
                                    alt="event"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 md:gap-y-3 px-4">
                                <div className="flex flex-col gap-y-1 md:gap-y-2">
                                    <h4 className="font-card-title card-title-hidden">
                                        Навчальні програми
                                    </h4>
                                    <p className="font-main card-text-hidden">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.
                                    </p>
                                </div>
                            </div>
                            <div className="pb-4 px-4">
                                <Link href={'/'}>
                                    <Button variant={'outline'} size={'sm'}>Читати</Button>
                                </Link>
                            </div>
                        </div>
                        {/* <div className={'relative h-64 w-full bg-pink-300 rounded'}>
                        </div>
                        <div className={'w-full flex flex-col gap-4'}>
                            <h3 className={'font-subtitle'}>Навчальні програми</h3>
                            <p className={'font-card-description'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium atque blanditiis ea eaque enim eos et facilis fuga harum itaque iusto magni minus nemo.</p>
                            <Link href={'/'}>
                                <Button variant={'outline'} size={'sm'}>Читати</Button>
                            </Link>
                        </div> */}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ServicesNav;