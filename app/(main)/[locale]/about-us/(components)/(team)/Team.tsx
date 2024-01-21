"use client"

import { useState } from "react";
import { Swiper } from 'swiper/react';
import SliderControl from "@/components/slider/SliderControl";
import 'swiper/css';

import { SwiperSlide } from 'swiper/react';

import SectionTitle from '@/components/sectionTitle/SectionTitle';
import TeamCard from "@/components/cards/TeamCard";
import Link from "next/link";
import { Member } from "@prisma/client";
import { ClientMember } from "@/types";
import { useTranslations } from "next-intl";

export default function Team ({ members }: { members: ClientMember[] }) {

    const t = useTranslations("About")

  const [isBeginning, setIsBeginning] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)
    return (
        <div className='container'>
          <SectionTitle
            title={t("team")}
          />
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd)
            }}
            onSlideChange={(e) => {
                setIsBeginning(e.isBeginning)
                setIsEnd(e.isEnd)
              }
            }
            style={{ paddingInline: "10px" }}
            breakpoints={{
              150: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              428: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              600: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 15,
              },
              991: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}

        >
        {
                members.map((slide) => (
                    <SwiperSlide key={slide.id}>
                          <Link href={`/member/${slide.id}`}>            
                            <TeamCard
                                member={
                                  {
                                    title: slide.textFields.name,
                                    description: slide.textFields.description,
                                    img: slide.image,
                                  }
                                } 
                            />
                          </Link>
                        {/* <div className="flex flex-col gap-y-4">
                          <Link href={""}>            
                            <TeamCard
                                member={
                                  {
                                    title: slide.name,
                                    description: slide.description,
                                    img: slide.image,
                                  }
                                } 
                            />
                          </Link>
                          <Link href={""}>            
                            <TeamCard
                                member={
                                  {
                                    title: slide.name,
                                    description: slide.description,
                                    img: slide.image,
                                  }
                                }
                            />
                          </Link>
                        </div> */}
                    </SwiperSlide>
                ))
            }
            <SliderControl 
              isBeginning={isBeginning}
              isEnd={isEnd}
            />
      </Swiper>
          
      </div>
    );
};