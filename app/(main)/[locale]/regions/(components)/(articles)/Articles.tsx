"use client"

import ArticleCard from "@/components/articleCard/ArticleCard"
import { FullRegion } from "@/types/types";
import { ClientRegion } from "@/types";

type ArticlesProps = {
    regions: ClientRegion[];
    activeRegion: FullRegion | null
    setRegion: (id: string) => void
    isMobile: boolean;
};
const Articles = ( { regions, activeRegion, isMobile, setRegion } : ArticlesProps ) => {

    return (
        <div className="flex flex-col gap-y-[30px]">
             <h1 className="text-black text-shadow font-bold text-xl md:text-3xl">
                Статті
            </h1>
            <div className="flex flex-col gap-y-[18px]">
                {
                    regions?.map(region => (
                        <ArticleCard
                            id={region.id}
                            key={region.id}
                            name={region.textFields.name}
                            isActive={
                                activeRegion ?
                                activeRegion.id === region.id : false
                            }
                            setRegion={setRegion}
                            isMobile={isMobile}
                        />
                    ))
                }

                {
                    regions.length === 0 &&
                    <p className="text-center md:text-left text-shadow text-sm md:text-lg">
                        Немає статей
                    </p>
                }

            </div>
        </div>
    );
};

export default Articles;