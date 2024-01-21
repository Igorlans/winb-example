"use client";

import { useState } from "react";
import { Swiper } from "swiper/react";
import SliderControl from "@/components/slider/SliderControl";
import "swiper/css";

import { SwiperSlide } from "swiper/react";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Link from "next/link";
import ReviewCard from "@/components/cards/ReviewCard";
import { useTranslations } from "next-intl";

export default function Feedbacks() {
  const t = useTranslations("About");

  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const Reviews = [
    {
      id: 0,
      name: t("review1_name"),
      description: t("review1_descr"),
      img: "/images/pageAboutUs/reviews/review-1.jpg",
    },
    {
      id: 1,
      name: t("review2_name"),
      description: t("review2_descr"),
      img: "/images/pageAboutUs/reviews/review-2.jpg",
    },
    {
      id: 2,
      name: t("review3_name"),
      description: t("review3_descr"),
      img: "/images/pageAboutUs/reviews/review-3.jpg",
    },
    {
      id: 3,
      name: t("review4_name"),
      description: t("review4_descr"),
      img: "/images/pageAboutUs/reviews/review-4.jpg",
    },
    {
      id: 4,
      name: t("review5_name"),
      description: t("review5_descr"),
      img: "/images/pageAboutUs/reviews/review-5.jpg",
    },
    {
      id: 5,
      name: t("review6_name"),
      description: t("review6_descr"),
      img: "/images/pageAboutUs/reviews/review-6.jpg",
    },
  ];

  return (
    <div className="container">
      <SectionTitle title={t("reviews")} />
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(e) => {
          setIsBeginning(e.isBeginning);
          setIsEnd(e.isEnd);
        }}
        style={{ paddingInline: "7px" }}
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
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
          },
        }}
      >
        {Reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-y-4">
              {/* <Link href={""}>             */}
              <ReviewCard review={review} />
              {/* </Link> */}
            </div>
          </SwiperSlide>
        ))}
        <SliderControl isBeginning={isBeginning} isEnd={isEnd} />
      </Swiper>
    </div>
  );
}
