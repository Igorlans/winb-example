"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderControl from "@/components/slider/SliderControl";
import "swiper/css";

import SliderSlide from "./SliderSlide";
type SliderProps = {
  slides: Array<{
    img: string;
  }>;
};
export default function Slider({ slides }: SliderProps) {
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(e) => {
          setIsBeginning(e.isBeginning);
          setIsEnd(e.isEnd);
        }}
        style={{ padding: "7px" }}
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SliderSlide img={slide.img} />
          </SwiperSlide>
        ))}
        <SliderControl isBeginning={isBeginning} isEnd={isEnd} />
      </Swiper>
    </div>
  );
}
