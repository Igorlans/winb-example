import Slider from "./Slider";
import { getTranslations } from "next-intl/server";

const slides = [
    {id: "0", img: "/images/sliders/photo-1.jpg"},
    {id: "1", img: "/images/sliders/photo-2.jpg"},
    {id: "2", img: "/images/sliders/photo-3.jpg"},
    {id: "3", img: "/images/sliders/photo-4.jpg"},
    {id: "4", img: "/images/sliders/photo-5.jpg"},
    {id: "5", img: "/images/sliders/photo-6.jpg"},
]

const WomenSlider = async () => {

    const t = await getTranslations("About")

    return (
        <div className='container grid grid-cols-1 md:grid-cols-2 items-center gap-y-[30px] gap-x-[3vw]'>
             <div className="flex flex-col gap-y-3 md:gap-y-5">
                <h2 className="font-title">
                    WOMEN IN BUSINESS
                </h2>
                <p className="font-main">
                    { t("slider_desc") }
                </p>
            </div>
            <Slider 
               slides={ slides } 
            />
        </div>
    );
};

export default WomenSlider;