"use client"

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTranslations } from "next-intl";

interface AchievementData {
  regions: number;
  years: number;
  members: number;
  events: number;
}

const Achievement: React.FC = () => {

  const t = useTranslations("Home");

  const [animatedValues, setAnimatedValues] = useState<AchievementData>({
    regions: 0,
    years: 0,
    members: 0,
    events: 0,
  });

  const { regions, years, members, events } = useSpring({
    regions: animatedValues.regions,
    years: animatedValues.years,
    members: animatedValues.members,
    events: animatedValues.events,
    from: { regions: 0, years: 0, members: 0, events: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const element = document.getElementById('achievement');

      if (element) {
        const elementPosition = element.offsetTop;

        if (position > elementPosition - windowHeight + 100) {
          setAnimatedValues({
            regions: 13, // Задайте значення регіонів тут
            years: 4, // Задайте значення років тут
            members: 350, // Задайте значення членок тут
            events: 572, // Задайте значення подій тут
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="achievement"
      className="w-100 text-white py-24 max-md:py-8 select-none relative"
      style={{backgroundColor: '#C13C69'}}
    >
      <div className="container grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-[20px] md:gap-y-[0px] items-center relative z-10">
        <animated.div className="flex flex-col gap-1 md:gap-3 justify-center text-center">
          <animated.div className="font-bold text-3xl md:text-8xl">
            {regions.interpolate((val: number) => Math.floor(val))}
          </animated.div>
          <div className="font-normal text-sm md:text-2xl">
            { t("stat_regions") }
          </div>
        </animated.div>
        <animated.div className="flex flex-col gap-1 md:gap-3 justify-center text-center">
          <animated.div className="font-bold text-3xl md:text-8xl">
            {years.interpolate((val: number) => Math.floor(val))}
          </animated.div>
          <div className="font-normal text-sm md:text-2xl">
            { t("stat_years") }
          </div>
        </animated.div>
        <animated.div className="flex flex-col gap-1 md:gap-3 justify-center text-center">
          <animated.div className="font-bold text-3xl md:text-8xl">
            {members.interpolate((val: number) => Math.floor(val))}
          </animated.div>
          <div className="font-normal text-sm md:text-2xl">
            { t("stat_members") }
          </div>
        </animated.div>
        <animated.div className="flex flex-col gap-1 md:gap-3 justify-center text-center">
          <animated.div className="font-bold text-3xl md:text-8xl">
            {events.interpolate((val: number) => `${Math.floor(val)}+`)}
          </animated.div>
          <div className="font-normal text-sm md:text-2xl">
            { t("stat_events") }
          </div>
        </animated.div>
      </div>
      <img
        src="images/backgrounds/bg_decor.svg"
        className="absolute bottom-0 left-0 rotate-180 z-0"
        alt="decor"
      />
      <img
        src="images/backgrounds/bg_decor.svg"
        className="absolute top-0 right-0 z-0"
        alt="decor"
      />
    </div>
  );
};

export default Achievement;
