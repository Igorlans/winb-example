'use client'

import {FC} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import useEventPlacesInfo from "@/hooks/useEventPlacesInfo";
import { useTranslations } from "next-intl";

interface IBannerPlacesIndicatorProps {
    eventId: string
}

const BannerPlacesIndicator: FC<IBannerPlacesIndicatorProps> = ({eventId}) => {

    const t = useTranslations("Event")

   const eventPlacesInfo = useEventPlacesInfo(eventId)

    if (!eventPlacesInfo) return (
        <div className="hidden md:flex items-center gap-x-1 text-right">
            Залишилося
            <Skeleton className={'h-7 w-20'} />
            місць
        </div>
    )

    return (
        <div className="hidden md:flex items-center gap-x-1 text-right">
            { t("available") }
            <span
                className="text-shadow font-bold xs:text-sm md:text-md xl:text-2xl">{eventPlacesInfo.places - eventPlacesInfo.takenPlaces} / {eventPlacesInfo.places}</span>
            { t("places") }
        </div>
    );
};

export default BannerPlacesIndicator;