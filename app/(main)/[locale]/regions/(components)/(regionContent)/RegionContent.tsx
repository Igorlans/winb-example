"use client"

import {useState } from "react";
import About from "./(about)/About";
import WomenSlider from "./(womenSlider)/WomenSlider";
import SwiperEvents from "@/app/(main)/[locale]/(components)/(swiper)/SwiperEvents";
import RegionTextSkeleton from "./RegionTextSkeleton";
import Team from "./(team)/Team";
import { ClientEvent, ClientRegion, LocalePageParams } from "@/types";
import { useTranslations } from "next-intl";

const RegionContent = (props: { region: ClientRegion } & LocalePageParams) => {
    const [isLoading, setIsLoading] = useState(false);

    return isLoading ? <RegionTextSkeleton /> : <RegionContentText {...props} />
}

const RegionContentText = ({region, params}: {region: ClientRegion | null} & LocalePageParams) => {

    if (!region) return <></>

    const t = useTranslations("Region")

    return (
        <div className="w-full">
            <div className="sectionGap"
                style={{paddingTop: 0}}
            >
                {
                    region?.video &&
                    <div>
                        <video className='mt-6 w-full h-full object-cover' controls={true}>
                            <source src={region?.video}/>
                        </video>
                    </div>
                }
                <About region={region}/>
                <WomenSlider region={region} />
                {
                    region.Events.length === 0 ? null :
                        <div className="overflow-hidden">
                            <SwiperEvents
                                events={region.events || []}
                                title={`${t("events")} ${region.textFields.cityTitle}`}
                                topGap={30}
                                slidesPerView={4}
                            />
                        </div>
                }
                {
                    region.members.length === 0 ? null :
                        <Team params={params} members={region.members || []}/>
                }
            </div>
        </div>
    );
}

export default RegionContent;