"use client" 
import { FC } from 'react'

import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
// import defaultBanner from '@/lib/BannerDefault.png';

import Image from 'next/image';

interface BannerProps {
    // title: string;
    // subtitle: string;
    img?: string;
    maxWidth?: string;
    children?: React.ReactNode;
}

const Banner: FC<BannerProps> = ({img= "/images/LeadMagnet.png", maxWidth, children}) => {
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
            <div className='decoratedBanner relative w-full h-96 banner-dark-filter'>
                <Image
                    src={img}
                    fill
                    alt="LeadMagnet"
                    className="object-cover "
                />
            </div>

            <div className='absolute top-1/2 left-0 w-full z-10 -translate-y-1/2'>
                <div className='container '>
                    {
                        children
                    }
                </div>

            </div>
        </div>
    );
}

export default Banner