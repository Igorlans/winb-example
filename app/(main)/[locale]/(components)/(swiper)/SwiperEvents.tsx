"use client";

import { SwiperSlide } from "swiper/react";
import Slider from "@/components/slider/Slider";

import EventCard from "@/components/eventCard/EventCard";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { Event } from "@prisma/client";
import { ClientEvent } from "@/types";
import { useTranslations } from "next-intl";

type SliderProps = {
  title?: string;
  topGap: number;
  slidesPerView?: number;
  events: ClientEvent[];
};

export default function EventSlider({
  title,
  topGap,
  slidesPerView,
  events,
}: SliderProps) {
  const t = useTranslations("Home");
  return (
    <div
      className={`container z-10 pt-${topGap}`}
      suppressHydrationWarning={false}
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      {title ? (
        <SectionTitle title={title} />
      ) : (
        <h2 className="font-title pb-1 text-center md:pb-4">{t("events")}</h2>
      )}

      <Slider spaceBetween={30} slidesPerView={slidesPerView ?? 4}>
        {events.map((slide, index) => (
          <SwiperSlide key={index}>
            <EventCard event={slide} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
