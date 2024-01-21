"use client"

import ArticleCard from "@/components/articleCard/ArticleCard"
import { FullRegion } from "@/types/types";
import { ClientRegion } from "@/types";


type ArticlesProps = {
    regions: ClientRegion[];
    activeRegion: string | string[];
};
const Regions = ( { regions, activeRegion } : ArticlesProps ) => {

    return (
        <div className="flex flex-col gap-y-[30px]">
             <h1 className="text-black text-shadow font-bold text-xl md:text-3xl">
                Міста
            </h1>
            <div className="flex flex-col gap-y-[18px]">
                {
                    regions.map(article => (
                        <ArticleCard
                            id={article.id!}
                            key={article.id}
                            name={article.textFields.name}
                            url={`/regions/${article.id}`}
                            isActive={activeRegion === article.id}
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

export default Regions;