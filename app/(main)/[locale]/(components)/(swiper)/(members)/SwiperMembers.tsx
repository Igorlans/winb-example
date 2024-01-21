"use client"

import { SwiperSlide } from 'swiper/react';
import Slider from '@/components/slider/Slider';
import SliderSlide from './SliderSlide';
import DecoratedSectonTitle from '@/components/sectionTitle/DecoratedSectonTitle';
import { Member } from "@prisma/client";

import 'swiper/css';
import { ClientMember } from "@/types";

interface SliderProps {
  member: ClientMember[]
}

export default function MemberSlider ( { member }: SliderProps ) {

    return (
        <div className=''>
          <DecoratedSectonTitle
            title="Правління"
          />

          <Slider
            slidesPerView={1}
            spaceBetween={50}
            controlsFloat='left'
          >
            {
                member?.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <SliderSlide
                            id={slide.id}
                            title={slide.textFields.name}
                            subtitle={slide.textFields.status}
                            img={slide?.image}
                            descr={
                              slide.textFields.description.length > 700 ?
                              `${slide.textFields.description.slice(0, 700)}...` : slide.textFields.description
                            }
                        />
                    </SwiperSlide>
                ))
            }
          </Slider>

        </div>
    );
};