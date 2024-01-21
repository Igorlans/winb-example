'use client'

import Image from "next/image";
import {FullEvent, FullEventTicket} from "@/types/events";
import {FC, ReactNode, Ref, useEffect, useState} from "react";
import BuyEventForm, {BuyEventFormValues} from "@/app/(main)/[locale]/events/[eventId]/(components)/BuyEventForm";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {pay} from "@/hooks/useOrder";
import {useSearchParams} from "next/navigation";

import {Button} from "@/components/ui/button";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import {useRegistraion} from "@/context/registration-store";
import PricePlacesIndicator from "@/app/(main)/[locale]/events/[eventId]/(components)/PlacesIndicators/PricePlacesIndicator";
import {gtmService} from "@/lib/gtm/gtmService";
import { ClientEvent, ClientTicket } from "@/types";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslations } from "next-intl";


interface IEventPriceProps {
    event: ClientEvent,
    blockRef: Ref<HTMLDivElement> | null;
}

const EventPrice: FC<IEventPriceProps> = ({ event, blockRef}) => {

    const t = useTranslations("Event");
    const button = useTranslations("buttons");

    const [open, setOpen] = useState(false)
    const {setIsOpen: setRegistrationOpen} = useRegistraion()
    const {data: session} = useSession()
    const user = session?.user;
    const isMember = Boolean(session?.user.member?.id);

    const isOnEvent = user?.member?.tickets.some(ticket => ticket.memberId === user?.member?.id && ticket.verified)


    const loadingMessage = 'Запис на подію...'
    const successMessage = 'Вас буде записано на подію після оплати'
    const errorMessage = 'Помилка запису на подію'

    const memberBuy = async () => {
        try {
            const formData = {
                memberId: user?.member?.id,
                eventId: event.id
            }
            await toast.promise(apiRequest({url: '/api/events/buy', data: formData, method: 'POST'}),
                {
                    loading: loadingMessage,
                    success: (data: ClientTicket) => {
                        pay(data)
                        return successMessage
                    },
                    error: (e: any) => {
                        console.log(e)
                        if (e?.cause < 500) {
                            return e?.message;
                        }
                        return errorMessage;
                    }
                })

        } catch (e) {
            console.log(e)
        }
    }

    //THANKS

    const searchParams = useSearchParams()


    useEffect(() => {
        const thanks = searchParams.get('thanks')
        const failed = searchParams.get('failed')

        if (thanks) {
            if (document.referrer === 'https://secure.wayforpay.com/') {
                toast.success('Ви успішно записались на подію. Очікуйте лист на електронну пошту', {duration: 5000})
                gtmService.purchase(event, isMember)
            }
        }

        if (failed) {
            if (document.referrer === 'https://secure.wayforpay.com/') {
                toast.error('Оплата неуспішна. Спробуйте ще раз', {duration: 3000})
            }
        }
    }, [])

    console.log(event)

    return (
        <div ref={blockRef}>
            <BuyEventForm event={event} open={open} setOpen={setOpen}/>

            <SectionTitle title={t("register")} styles='container mb-[10px] md:mb-[40px]'/>

            <div className="relative w-full h-[500px] md:h-[700px] banner-dark-filter">
                <div className="relative w-full h-full decoratedBanner">
                    <Image
                        fill
                        src="/images/banners/BannerDefault.png"
                        className="object-cover"
                        alt="Cover"
                    />
                </div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-md overflow-hidden">
                    <div
                        className="bg-white py-9 px-11 flex flex-col gap-y-4 md:gap-y-9 items-center w-[95vw] md:w-[50vw] md:max-w-[960px] md:min-w-[545px]">
                        <PricePlacesIndicator eventId={event.id} />
                        <div className="flex flex-wrap justify-center gap-y-4 gap-x-9">

                            <div className="flex flex-col gap-y-2 md:gap-y-4 text-center md:text-right py-0 md:py-9 md:min-w-[214px]">
                                <div className="text-darkPink font-bold xs:text-sm md:text-md xl:text-2xl">
                                    { t("customer") }
                                </div>
                                <div>
                                    <span className={cn(
                                        event.isMemberEvent && "invisible",
                                        "text-input line-through text-[16px] md:text-base hidden md:block invisible"
                                    )}>
                                        {event.price} грн
                                    </span>
                                    <div className={cn(
                                        event.isMemberEvent && "invisible",
                                        "text-sm md:text-lg"
                                    )}>{event.price} грн</div>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                disabled={event.isMemberEvent}
                                                onClick={() => setOpen(true)}
                                                variant="primary"
                                                className="px-11 w-full"
                                            >
                                                { button("event_apply") }
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className={cn(
                                            !event.isMemberEvent && "invisible"
                                        )}>
                                            <div className={"text-left"}>
                                                <span className={"font-semibold mb-1"}>Ця подія лише для членкинь.</span>
                                                <p className={"text-xs"}>
                                                    Увійдіть або зареєструйтеся, щоб продовдити.
                                                </p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="w-[1px] bg-darkPink hidden md:block"></div>
                            <div className="flex flex-col gap-y-2 md:gap-y-4 text-center md:text-left py-0 md:py-9 md:min-w-[214px]">
                                <div className="text-darkPink font-bold xs:text-sm md:text-md xl:text-2xl">
                                    { t("member") }
                                </div>
                                <div>
                                    <span className={cn(
                                        event.isMemberEvent && "invisible",
                                        "text-input line-through text-[16px] md:text-base"
                                    )}>
                                        {event.price} грн
                                    </span>
                                    <div className="text-sm md:text-lg">{event.memberPrice} грн</div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="px-11"
                                    disabled={isOnEvent}
                                    onClick={isMember ? memberBuy : () => setRegistrationOpen(true)}
                                >
                                    {
                                        !isMember ?
                                            button("register") :
                                                isOnEvent ? button("already_applied") : button("event_apply")
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EventPrice;