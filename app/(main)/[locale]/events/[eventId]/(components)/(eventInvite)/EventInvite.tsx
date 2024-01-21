"use client"

import {FC, useState} from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import ArrowBottom from "@/components/ui/custom/arrowBottom";
import Image from "next/image";
import {FullEvent} from "@/types/events";
import { ClientEvent } from "@/types";
import { useTranslations } from "next-intl";

interface IEventInviteProps {
    event: ClientEvent
}

const EventInvite: FC<IEventInviteProps> = ({ event}) => {

    const t = useTranslations("Event");
    const button = useTranslations("buttons")

    const [isReadMore, setIsReadMore] = useState(false);

    return (
        <div className="container flex flex-col gap-y-[10px] md:gap-y-[40px]">
            <SectionTitle title={`${ t("invite") }`}/>

            <div className="grid grid-rows-[350px_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-2 gap-x-16 md:gap-y-9">

                <div className="flex flex-col order-2 gap-y-[10px] md:order-1">
                    <h3 className="font-title">{event.textFields.title}</h3>

                    {event.textFields.description.length > 1100 ?
                        <>
                            <p className={`box-blur break-words ${isReadMore ? `readMoreActive` : null} relative font-main`}>
                                {isReadMore ? event.textFields.description : event.textFields.description.slice(0, 1100)}
                            </p>

                            <button className="flex items-center justify-end gap-x-[10px] md:gap-x-5"
                                    onClick={() => setIsReadMore(!isReadMore)}
                            >
                                <span className="text-sm text-customPink font-bold">
                                    { button(("read_more")) }
                                </span>
                                <ArrowBottom isActive={isReadMore}/>
                            </button>
                        </>
                        :
                        <>
                            <p className={`break-words relative font-main`}>
                                {event.textFields.description}
                            </p>
                        </>

                    }


                </div>
                <div className="relative w-full order-1 h-[250px] md:h-[350px] md:order-2">
                    <Image
                        fill
                        src={event.image}
                        alt="Event"
                        className="object-cover rounded"
                    />
                </div>
            </div>

        </div>
    )
        ;
};

export default EventInvite;