"use client"

import { useState } from "react";
import { Swiper } from 'swiper/react';
import SliderControl from './SliderControl';

import 'swiper/css';

type SliderProps = {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  controlsFloat?: string;
}

export default function Slider ( { children, spaceBetween, slidesPerView, controlsFloat="right" } : SliderProps ) {

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(true)

    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd)
            }}
            onSlideChange={(e) => {
                setIsBeginning(e.isBeginning)
                setIsEnd(e.isEnd)
              }
            }
            style={{paddingInline: '12px'}}
            breakpoints={{
              150: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              428: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              600: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              991: {
                slidesPerView: slidesPerView,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}

        >

        {
            children
        }
        
        {
          controlsFloat === "left" ?
            <div className='container'>
              <SliderControl 
                isBeginning={isBeginning}
                isEnd={isEnd}
                className='float-right md:float-left'
              />
            </div> :

            <SliderControl 
              isBeginning={isBeginning}
              isEnd={isEnd}
            />

        }
      </Swiper>
    );
};