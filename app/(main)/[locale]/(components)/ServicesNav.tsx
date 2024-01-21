import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const ServicesNav = async () => {

    const t = await getTranslations("Home");
    const button = await getTranslations("buttons");

    const scaleAnimationClasses = 'transform scale-[1] hover:scale-[1.02] transition-transform duration-300'
    return (
        <div className='container'>
            <div className="grid md:grid-cols-2 gap-8 md:gap-14 h-full">
                <div className="">
                    <div className="flex flex-col h-full gap-8 md:gap-14">

                        <Card className={`${scaleAnimationClasses} h-full w-full rounded-lg bg-white cursor-pointer relative overflow-hidden`}>
                            <div className='h-full w-full grid grid-cols-[2fr_3fr] gap-x-4'>
                                <div className='relative w-full h-full'>
                                    <Image 
                                        fill
                                        src={"/images/cards/Events.png"}
                                        alt='article'
                                        className="object-cover"
                                    />
                                </div>
                                <div className='flex flex-col gap-y-4 items-start justify-between py-4 pr-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h4 className='font-card-title card-title-hidden'>
                                            { t("card1_title") }
                                        </h4>
                                        <p className='font-main card-text-hidden'>
                                            { t("card1_desc") }
                                        </p>
                                    </div>
                                    <Link href={'/events/new'}>
                                        <Button variant={'outline'} size={'sm'}>
                                            { button("read") }
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        <Card className={`${scaleAnimationClasses} h-full w-full rounded-lg bg-white cursor-pointer relative overflow-hidden`}>
                            <div className='h-full w-full grid grid-cols-[2fr_3fr] gap-x-4'>
                                <div className='relative w-full h-full'>
                                    <Image 
                                        fill
                                        src={"/images/cards/BusinessServices.webp"}
                                        alt='article'
                                        className="object-cover"
                                    />
                                </div>
                                <div className='flex flex-col gap-y-4 items-start justify-between py-4 pr-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h4 className='font-card-title card-title-hidden'>
                                            { t("card2_title") }
                                        </h4>
                                        <p className='font-main card-text-hidden'>
                                            { t("card2_desc") }
                                        </p>
                                    </div>
                                    <Link href={'/services/konsultatsii'}>
                                        <Button variant={'outline'} size={'sm'}>
                                            { button("read") }
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="">
                    <Card className={`${scaleAnimationClasses} h-full w-full`}>
                        <div className="h-full w-full grid grid-rows-[184px_2fr_0.5fr] md:grid-rows-[240px_2fr_1fr] gap-y-4">
                            <div className="relative overflow-hidden w-full h-full">
                                <Image 
                                    fill
                                    src={"/images/cards/Regions.png"}
                                    style={{ objectFit: "cover" }}
                                    alt="event"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 md:gap-y-3 px-4">
                                <div className="flex flex-col gap-y-1 md:gap-y-2">
                                    <h4 className="font-card-title card-title-hidden">
                                        { t("card3_title") }
                                    </h4>
                                    <p className="font-main card-text-hidden">
                                        { t("card3_desc") }
                                    </p>
                                </div>
                            </div>
                            <div className="pb-4 px-4">
                                <Link href={'/regions'}>
                                    <Button variant={'outline'} size={'sm'}>
                                        { button("read") }
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ServicesNav;