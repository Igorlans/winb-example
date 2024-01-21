"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import "./style.css"
import { useTranslations } from "next-intl";
import { ClientBanner } from "@/types";

const SwiperBanner = ({ banners }: {banners: ClientBanner[]}) => {
    const t = useTranslations("buttons")
  return (
    <div className="swiper-container select-none overflow-hidden">
      <Swiper
        modules={[ Pagination, A11y ]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
      >
        {banners.map(item => (
          <SwiperSlide key={item.id} className="relative">
            <div className="relative w-full h-96 banner-slide-decor">
              <Image
                  src={item?.image ?? "/images/banners/BannerDefault.png"}
                  alt={item.textFields.title}
                  fill={true}
                  style={{objectFit: 'cover'}}
              />
              <div className="container">
                <div className="absolute z-10 top-1/2 -translate-y-1/2 max-w-[60%] md:max-w-[30%] flex flex-col gap-y-2 md:gap-y-3">
                  <h2 className="font-title">
                    {
                      item.textFields.title
                    }
                  </h2>
                  <p className="font-subtitle">
                    {
                      item.textFields.subtitle
                    }
                  </p>
                  <div className="mt-1 md:mt-2">
                    <Link href={item.link ?? "#"} >
                      <Button variant="primary" className="md:w-40">
                          { t("addition") }
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;
