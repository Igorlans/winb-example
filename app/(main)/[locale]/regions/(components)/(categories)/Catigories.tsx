import { IService, IArticle } from "@/app/(main)/types";

import SingleCategor from "./SingleCategor";

type CatigoriesProps = {
    categories: IService[];
    articles: IArticle[];
};

const Catigories = ( { categories, articles } : CatigoriesProps ) => {
    return (
        <div className="flex flex-col gap-y-[30px]">
             <h1 className="text-black text-shadow font-bold text-xl md:text-3xl">
                Інші категорії
            </h1>
            <div className="flex flex-col gap-y-[20px]">
                
                {
                    categories.map(category => (
                        <SingleCategor
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            article={articles[0]?.id}
                        />
                    ))
                }

            </div>
        </div>
    );
};

export default Catigories;