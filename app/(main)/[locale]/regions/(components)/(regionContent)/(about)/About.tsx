"use client"

import { useState } from "react";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import ArrowBottom from "@/components/ui/custom/arrowBottom";
import { FullRegion } from "@/types/types";
import { ClientRegion } from "@/types";

const About = ({region}: {region: ClientRegion}) => {
    const [isReadMore, setIsReadMore] = useState(false);

    return (
        <div className="flex flex-col">
            
            <SectionTitle title={region.textFields.title} />

            {region.textFields.description.length > 1500 ?
                <>
                    <p className={`box-blur break-words ${isReadMore ? `readMoreActive` : null} relative font-main`}>
                        {isReadMore ? region.textFields.description : region.textFields.description.slice(0, 1500)}
                    </p>

                    <button className="flex items-center justify-end gap-x-[10px] md:gap-x-5"
                            onClick={() => setIsReadMore(!isReadMore)}
                    >
                        <span className="text-sm text-customPink font-bold">Читати більше</span>
                        <ArrowBottom isActive={isReadMore}/>
                    </button>
                </>
                :
                <>
                    <p className={`break-words relative font-main`}>
                        {region.textFields.description}
                    </p>
                </>

            }

        </div>
    );
};

export default About;