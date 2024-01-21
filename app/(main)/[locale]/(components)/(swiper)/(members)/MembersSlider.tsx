"use client"

import { FC } from 'react'
import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

import DecoratedSectonTitle from '@/components/sectionTitle/DecoratedSectonTitle'
import SliderControl from '@/components/slider/SliderControl'

import { Member } from '@prisma/client'
import SliderSlide from './SliderSlide';
import { ClientMember } from "@/types";
import { useTranslations } from "next-intl";

interface MembersSliderProps {
    members: ClientMember[]
}

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

const MembersSlider: FC<MembersSliderProps> = ({ members }) => {

    const t = useTranslations("Home")

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(true)
    return (
        <div>
            <DecoratedSectonTitle
                title={t("management")}
            />
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd)
                }}
                onSlideChange={(e) => {
                        setIsBeginning(e.isBeginning)
                        setIsEnd(e.isEnd)
                    }
                }
                style={{ position: "relative" }}
                breakpoints={onePerViewBrakepoints}
            >
                {
                    members?.map(item => (
                        <SwiperSlide key={item.id}>
                            <SliderSlide
                                id={item.id}
                                title={item.textFields.name}
                                subtitle={item.textFields.status}
                                img={item?.image}
                                descr={
                                  item.textFields.description.length > 700 ?
                                  `${item.textFields.description.slice(0, 700)}...` : item?.textFields.description
                                }
                            />
                        </SwiperSlide>
                    ))
                }
                <div className='container'>
                    <SliderControl
                        isBeginning={isBeginning}
                        isEnd={isEnd}
                        className='float-right md:float-left'
                    />
                </div>
            </Swiper>
        </div>
    )
}

export default MembersSlider