"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderControl from '@/components/slider/SliderControl';
import 'swiper/css';

import SliderSlide from './SliderSlide';
import { ImageInputValues } from '@/types/types';
import { Image } from '@prisma/client';
type SliderProps = {
    slides: ImageInputValues[]
}
export default function Slider ( { slides }: {slides: Image[]} ) {
    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    return (
        <div>
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
            style={{padding: '12px'}}
            breakpoints={{
              150: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,
              },
              428: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,
              },
              600: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,
              },
              991: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,
              },
            }}
        >
        {
            slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <SliderSlide
                        img={slide.url}
                    />
                </SwiperSlide>
            ))
        }
        <SliderControl 
              isBeginning={isBeginning}
              isEnd={isEnd}
              className='float-right lg:float-left'
          />
      </Swiper>
        </div>
    );
};