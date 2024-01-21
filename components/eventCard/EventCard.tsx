"use client"
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useSpring, animated} from "react-spring";
import Link from "next/link";
import {Button} from "../ui/button";
import {Event} from "@prisma/client";
import {gtmService} from "@/lib/gtm/gtmService";
import {FullEvent} from "@/types/events";
import { ClientEvent } from "@/types";
import { useTranslations } from "next-intl";

type EventCardProps = {
    event: ClientEvent
    styles?: string;
};

const EventCard: React.FC<EventCardProps> = ({event, styles}) => {

    const t = useTranslations("buttons")

    const [isHovered, setIsHovered] = useState(false);
    const springProps = useSpring({
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isHovered
            ? "0px 4px 20px rgba(0, 0, 0, 0.1)"
            : "0px 4px 15px rgba(0, 0, 0, 0.1)",
    });

    const dateString = new Date(Number(event.date)).toLocaleDateString('uk', {
        day: "numeric",
        month: "long",
        year: 'numeric'
    })

    const cardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    gtmService.viewItemCard(event)
                    console.log('view')
                    observer.disconnect()
                }
            },
            {
                threshold: 1,
            }
        );
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
    }, []);

    return (
        <Link href={`/events/${event.id}`} className={`${styles}`} onClick={() => gtmService.selectItem(event)}>
            <animated.div
                ref={cardRef}
                className="rounded-lg bg-white cursor-pointer relative z-10 overflow-hidden"
                style={springProps}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="grid h-[340px] md:h-[488px] grid-rows-[144px_2fr_0.5fr] md:grid-rows-[240px_4fr_1fr] gap-y-2 md:gap-y-4 pb-4">
                    <div className="relative overflow-hidden w-full h-full">
                        <Image 
                            fill
                            src={event.image}
                            style={{ objectFit: "cover" }}
                            alt="event"
                        />
                    </div>
                    <div className="px-2 md:px-4 flex flex-col gap-y-2 md:gap-y-3">
                        <div className="flex justify-between text-[10px] md:text-xs lg:text-sm text-customPink">
                            <div>{dateString}</div>
                            <div>{event.networkStatus}</div>
                        </div>
                        <div className="flex flex-col gap-y-1 md:gap-y-2">
                            <h4 className="font-card-title card-title-hidden">
                                {event.textFields.title}
                            </h4>
                            <p className="text-xs card-text-hidden">
                                {event.textFields.description}
                            </p>
                        </div>
                    </div>
                    <div className="px-2 md:px-4">
                        <Link href={`/events/${event.id}`} onClick={() => gtmService.selectItem(event)}>
                            <Button variant="outline" className="h-8 md:h-10">
                                { t("addition") }
                            </Button>
                        </Link>
                    </div>
                </div>
            </animated.div>
        </Link>
    );
};

export default EventCard;
