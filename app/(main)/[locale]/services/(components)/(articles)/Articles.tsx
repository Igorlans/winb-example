"use client"

import ArticleCard from "@/components/articleCard/ArticleCard"
import { FullServiceArticle } from "@/types/services";
import { ClientArticle } from "@/types";

type ArticlesProps = {
    articles: ClientArticle[];
    activeRegion: ClientArticle | null
    setArticle: (id: string) => void
    isMobile: boolean;
};
const Articles = ( { articles, activeRegion, isMobile, setArticle } : ArticlesProps ) => {
    
    return (
        <div className="flex flex-col gap-y-[30px]">
             <h1 className="text-black text-shadow font-bold text-xl md:text-3xl">
                Статті
            </h1>
            <div className="flex flex-col gap-y-[18px]">
                {
                    articles?.map(item => (
                        <ArticleCard
                            id={item.id}
                            key={item.id}
                            name={item.textFields.title}
                            isActive={
                                activeRegion ?
                                activeRegion.id === item.id : false
                            }
                            setRegion={setArticle}
                            isMobile={isMobile}
                        />
                    ))
                }

                {
                    articles.length === 0 &&
                    <p className="text-center md:text-left text-shadow text-sm md:text-lg">
                        Немає статей
                    </p>
                }

            </div>
        </div>
    );
};

export default Articles;