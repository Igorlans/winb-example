import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import {FC} from "react";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";
import { ClientEvent } from "@/types";
import { EventFormValue } from "@/app/(admin)/adminpanel/events/_components/formSchema";
import { useTranslations } from "next-intl";

interface IEventExpertProps {
    event: ClientEvent
}
const EventExpert:FC<IEventExpertProps> = ({ event}) => {

    const t = useTranslations("Event");
    const button = useTranslations("buttons");

    const expert: ClientEvent["eventGuest"]  = event.eventGuest

    return (
        <div className="container flex flex-col gap-y-[10px] md:gap-y-[20px] lg:gap-y-[30px] 2xl:gap-y-[40px]">
            
            <SectionTitle title={t("expert")} />
            
            <div className="w-[100%] grid gap-x-[9vw] place-items-center md:place-items-start md:grid-cols-[1fr_2fr]">
                <h3 className="text-lg md:text-xl block md:hidden text-left whitespace-nowrap font-bold">{expert.name}</h3>
                <div className="relative aspect-square my-[30px] w-[150px] w-[30vw] min-w-[150px] min-h-[150px] max-w-[400px] max-m-[400px]">
                    <Image
                        src={expert.image}
                        fill={true}
                        style={{objectFit: 'cover'}}
                        className="rounded-full overflow-hidden"
                        alt="Expert"
                    />
                </div>

                <div className="flex text-center flex-col gap-y-[30px] md:text-left">
                    <h2 className="hidden md:block text-left font-title">{expert.name}</h2>
                    <div
                        className="break-words font-main"
                        dangerouslySetInnerHTML={{
                            __html: expert.description
                        }}
                    />
                    {expert.link &&
                        <Link href={expert.link} target={'_blank'}>
                            <ArrowButton>
                                { button("view") }
                            </ArrowButton>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default EventExpert;