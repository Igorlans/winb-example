"use client" 

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

type BannerProps = {
    title: string;
    subtitle?: string;
    img?: string;
    maxWidth?: string;
    children?: React.ReactNode;
    filter?: "dark" | "none"
}

const Banner: React.FC<BannerProps> = ( { title, filter = "none", subtitle, maxWidth, children, img } ) => {
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
        <animated.div
          style={springProps}
        >
          <div className={filter === "dark" ? "banner-dark-filter" : ''}>
            <img 
                src={img ?? "/images/banners/BannerDefault.png"}
                alt="LeadMagnet"
                className="w-full h-96 object-cover"
            />
          </div>
        </animated.div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >


            <div className="text-center flex flex-col gap-y-2 md:gap-y-4 text-white">

                <h1 className="font-title">
                    {
                        title
                    }
                </h1>
                <h2 className="font-subtitle"
                    style={{maxWidth: maxWidth ? maxWidth : '577px'}}
                >
                    {
                        subtitle
                    }
                </h2>

                <div className="flex items-center flex-col md:flex-row justify-center gap-x-[30px] gap-y-[20px]">
                    {
                        children
                    }
                </div>

            </div>


        </div>
      </div>
    );
  };
  
  export default Banner;