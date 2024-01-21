'use client'
import Banner from "@/app/(main)/[locale]/events/[eventId]/(components)/(banner)/Banner";
import EventInvite from "@/app/(main)/[locale]/events/[eventId]/(components)/(eventInvite)/EventInvite";
import EventExpert from "@/app/(main)/[locale]/events/[eventId]/(components)/(eventExpert)/EventExpert";
import EventPrice from "@/app/(main)/[locale]/events/[eventId]/(components)/(eventPrice)/EventPrice";
import {FC, useEffect, useRef} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import BannerPlacesIndicator from "@/app/(main)/[locale]/events/[eventId]/(components)/PlacesIndicators/BannerPlacesIndicator";
import {gtmService} from "@/lib/gtm/gtmService";
import { ClientEvent } from "@/types";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";

interface IEventPageProps {
    event: ClientEvent,
    locale: Locale
}

const EventPage: FC<IEventPageProps> = ({ event, locale}) => {

    const t = useTranslations("Event");
    const button = useTranslations("buttons");

    const dateString = new Date(Number(event.date)).toLocaleDateString(locale, { day:"numeric", month:"long", year: 'numeric', weekday: 'long'})

    const venue = event.networkStatus === 'OFFLINE' ?
        event.textFields.venue : 'ONLINE'

    const priceBlockRef = useRef<HTMLDivElement>(null)


    const scrollToPrice = () => {
        if (priceBlockRef.current) {
            priceBlockRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    useEffect(() => {
        gtmService.viewItem(event)
    }, []);


    return (
        <div className="">
            <Banner img={'/images/banners/BannerDefault.png'}>
                <div>
                    <div className="max-w-[939px] flex flex-col gap-y-4 text-white">
                        <h1 className="max-w-[639px] font-title">
                            {event.textFields.title}
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-y-2 font-subtitle">
                                <div className="flex items-center gap-x-2">
                                    { t("date") }: {dateString}
                                </div>
                                <div className="flex items-center gap-x-2">
                                    { t("place") }: {venue}
                                </div>
                                <div className="flex items-center gap-x-2">
                                    { t("region") }:
                                    <Link className={'hover:underline'} href={`/regions?region=${event.region?.slug}`} >
                                        {event.region?.textFields.name }
                                    </Link>
                                </div>
                            </div>
                            <BannerPlacesIndicator eventId={event.id} />
                        </div>
                        <div>
                            <Button onClick={scrollToPrice} variant="primary" className="px-11">
                                { button("event_apply") }
                            </Button>
                        </div>
                    </div>
                </div>
            </Banner>
            <div className="sectionGap">
                <EventInvite event={event}/>
                <EventExpert event={event}/>
            </div>
            <EventPrice event={event} blockRef={priceBlockRef} />
        </div>
    );
};

export default EventPage;