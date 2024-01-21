import Image from "next/image";
import { Button } from "@/components/ui/button";
import {FC} from "react";
import { ClientEvent } from "@/types";


interface IEventBannerProps {
    event: ClientEvent
}
const EventBanner: FC<IEventBannerProps> = ({
    event
                                            }) => {

    const dateString = new Date(Number(event.date)).toLocaleDateString('uk', { day:"numeric", month:"long", year: 'numeric', weekday: 'long'})

    const venue = event.networkStatus === 'OFFLINE' ? event.textFields.venue : 'ONLINE'
    
    return (
        <div className="container flex flex-col gap-y-8 px-4">
            <div className="flex flex-col max-w-[1040px] gap-y-2.5 md:gap-y-5">
                <h1 className="text-black text-shadow font-bold text-xl md:text-3xl">
                    {event.textFields.title}
                </h1>
            </div>

            <div className="w-full grid grid-cols-1 gap-x-[0] md:grid-cols-[2fr_1fr] md:gap-x-[10%] items-center">
                <div className="relative h-[30vw] w-[100%] md:h-[350px]">
                    <Image
                        src={event.image}
                        fill={true}
                        style={{objectFit: 'cover'}}
                        alt="Event"
                    />
                </div>

                <form className="flex flex-col gap-y-[16px] md:gap-y-8 mt-5 mb:mt-0 py-[20px] px-[20px] md:py-[0px] mdpx-[0px]">
                    <div className="flex justify-between gap-x-12">
                        <div className="flex items-center gap-x-[10px] md:gap-x-5 select-none">
                            <div className="relative w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]">
                                <Image
                                    src="/icons/icon_calendar.svg"
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt="Clock"
                                />
                            </div>
                            <span className="text-sm md:text-lg">Дата</span>
                        </div>
                        <span className="text-sm md:text-lg text-ellipsis overflow-hidden whitespace-nowrap border-b border-customPink pt-2 max-w-[300px] w-[50%] md:w-[26vw]">{dateString}</span>
                    </div>
                    <div className="flex justify-between gap-x-12">
                        <div className="flex items-center gap-x-[10px] md:gap-x-5 select-none">
                            <div className="relative w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]">
                                <Image
                                    src="/icons/icon_clock.svg"
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt="Clock"
                                />
                            </div>
                            <span className="text-sm md:text-lg">Час</span>
                        </div>
                        <span className="text-sm md:text-lg border-b text-ellipsis overflow-hidden whitespace-nowrap border-customPink pt-2 max-w-[300px] w-[50%] md:w-[26vw]">{`${event.startTime}-${event.endTime}`}</span>
                    </div>
                    <div className="flex justify-between gap-x-12">
                        <div className="flex items-center gap-x-[10px] md:gap-x-5 select-none">
                            <div className="relative w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]">
                                <Image
                                    src="/icons/icon_location.svg"
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt="Clock"
                                />
                            </div>
                            <span className="text-sm md:text-lg">Місце</span>
                        </div>
                        <span className="text-sm md:text-lg border-b text-ellipsis overflow-hidden whitespace-nowrap border-customPink pt-2 max-w-[300px] w-[50%] md:w-[26vw]">{venue}</span>
                    </div>
                    <Button variant="primary" className="mt-[10px] mx-auto py-[10px] px-[30px] w-[160px] md:w-full md:py-[25px] md:px-10 md:text-sm">Зареєструватись</Button>
                </form>
            </div>
        </div>
    );
};

export default EventBanner;