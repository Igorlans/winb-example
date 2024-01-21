import Slider from "./Slider";
import { FullRegion } from "@/types/types";
import { ClientRegion } from "@/types";

const WomenSlider = ({region}: {region: ClientRegion}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-y-[10px] md:gap-y-[30px] gap-x-[3vw]'
        >
            <Slider
               slides={region?.images.filter(item => !item.isBanner)} 
            />

             <div className="flex flex-col gap-y-0 md:gap-y-[10px] lg:pb-[72px]">
                <h3 className="font-title">
                    {
                        region.textFields.cityTitle
                    }
                </h3>
                <p className="font-main">
                    {
                        region.textFields.cityDescription
                    }
                </p>
            </div>
            
        </div>
    );
};

export default WomenSlider;