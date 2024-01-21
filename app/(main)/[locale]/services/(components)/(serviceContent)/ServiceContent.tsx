"use client"

import {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

import {FullServiceArticle} from "@/types/services";
import Image from "next/image";
import Team from "../team/Team";
import SliderControl from '@/components/slider/SliderControl'
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import TeamCard from "@/components/cards/TeamCard";
import MentorCard from "@/app/(main)/[locale]/services/(components)/MentorCard/MentorCard";
import { ClientArticle } from "@/types";
import { useTranslations } from "next-intl";

const onePerViewBrakepoints = {
    150: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    428: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    991: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
}

const ServiceContent = ({article}: { article: ClientArticle | null }) => {
    if (!article) return <></>

    const t = useTranslations("Service");

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    return (
        <div className="w-full max-w-[760px] mt-5 md:mt-9">
            <div className=""
                 style={{paddingTop: 0}}
            >
                <div className="flex flex-col gap-y-2.5 md:gap-y-5">
                    <h1 className="font-title">
                        {
                            article.textFields.title
                        }
                    </h1>

                    <h3 className="font-subtitle">
                        {
                            article.textFields.description
                        }
                    </h3>

                </div>
                <div className="mt-5 md:mt-9 flex flex-col gap-y-4 md:gap-y-6">
                    <p className="font-main">
                        {
                            article.textFields.text
                        }
                    </p>

                    <div className="w-full max-w-[760px] md:w-[55vw]">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSwiper={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd)
                              }}
                              style={{paddingRight: "10px"}}
                            onSlideChange={(e) => {
                                    setIsBeginning(e.isBeginning)
                                    setIsEnd(e.isEnd)
                                }
                            }
                            breakpoints={onePerViewBrakepoints}
                        >
                            {
                                article.image.map((slide, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="relative w-full h-[220px] md:h-[450px] overflow-hidden rounded-[10px]">
                                            <Image
                                                src={slide}
                                                fill={true}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={article.textFields.title}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            <div className='container'>
                                <SliderControl
                                    isBeginning={isBeginning}
                                    isEnd={isEnd}
                                />
                            </div>
                        </Swiper>
                    </div>

                    <div dangerouslySetInnerHTML={{__html: article.textFields.editor}} className=""></div>
                    {article.isPaidService && article.mentors.length > 0 ?
                        <div className={'mt-8'}>
                            <div>
                                <SectionTitle
                                    title={t("mentor")}
                                />
                                <div className="grid grod-cols-1 xl:grid-cols-2 gap-2 md:gap-5">
                                    {
                                        article.mentors?.map(member =>
                                            <MentorCard
                                                member={member}
                                                serviceId={article.id}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
}


export default ServiceContent;