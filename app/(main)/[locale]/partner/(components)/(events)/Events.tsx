"use client"

import React from 'react';
import EventSlide from './EventSlide';

import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

import SliderControl from '@/components/slider/SliderControl'

const eventSlides = [
    {id: "0", img: "/images/partnerEvent.png"},
    {id: "1", img: "/images/partnerEvent.png"},
    {id: "2", img: "/images/partnerEvent.png"}
]

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

const Events = () => {
    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    return (
        <div className='container'>
            
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
                style={{ position: "relative", paddingInline: "12px"}}
                breakpoints={onePerViewBrakepoints}
            >
                {
                    eventSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <EventSlide
                                img={slide.img}
                            />
                        </SwiperSlide>
                    ))
                }
                <div className='container'>
                    <SliderControl
                        isBeginning={isBeginning}
                        isEnd={isEnd}
                        // className='float-left md:float-left'
                    />
                </div>
            </Swiper>

            <div className='flex flex-col gap-y-4 md:gap-y-6'>
                <h2 className="font-title">
                    Ми постійно проводимо бізнес заходи
                </h2>
                <p className="font-main">
                    Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні.
                    <br/>
                    <br/>
                    Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні.Зареєструйтеся, щоб стати нашим партнером. 
                    Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні.
                </p>
            </div>
        </div>
    );
};

export default Events;