"use client";

import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
type BannerProps = {
  title: string,
  description: string
}

const MemberBanner: React.FC<BannerProps> = ({ title, description } : BannerProps) => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const handleParallax = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = scrollTop * 0.8;
    setParallaxOffset(offset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleParallax);
    return () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  const springProps = useSpring({
    transform: `translateY(${parallaxOffset}px)`,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div className="relative w-full h-96 overflow-hidden">
      <animated.img
        src="/images/LeadMagnet.png"
        alt={ title }
        className="w-full h-96 object-cover"
        style={springProps}
      />
      <div
        className="absolute top-1/2 left-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="text-center flex flex-col text-white">
          <span className="font-bold mb-7 sm:text-lg md:text-xl lg:text-3xl">
            { title }
          </span>
          <span className="font-normal max-w-[577px] mb-12 text-xs md:text-xs lg:text-2xl">
            { description }
          </span>
        </div>
      </div>
    </div>
      <div className="absolute bottom-[80%] w-full">
          <Image
            src="/images/backgrounds/bg_banner.svg"
            alt="bg_decor"
            width={1920}
            height={1080}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
    </div>
  );
};

export default MemberBanner;
