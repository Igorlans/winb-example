"use client"

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { useSwiper } from 'swiper/react';

type SliderControlProps = {
    isBeginning: boolean
    isEnd: boolean
    className?: string
}

const SliderControl = ( { isBeginning, isEnd, className = 'float-right' } : SliderControlProps ) => {
    const swiper = useSwiper();

    return (
        <div className={`${ className } flex gap-5 py-3`}
            style={{visibility: isBeginning && isEnd ? "hidden" : "visible"}}
        >
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isBeginning ? "0.5" : "1", cursor: isBeginning ? "default" : "pointer"}}
                onClick={() => swiper.slidePrev()}
            >
                <HiChevronLeft style={{ color: "#C13C69" }} />
            </button>
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isEnd ? "0.5" : "1", cursor: isEnd ? "default" : "pointer"}}
                onClick={() => swiper.slideNext()}
            >
                <HiChevronRight style={{ color: "#C13C69" }} />
            </button>
        </div>
    );
};

export default SliderControl;