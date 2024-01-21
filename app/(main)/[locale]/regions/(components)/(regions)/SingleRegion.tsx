import Link from "next/link"
import { Button } from "@/components/ui/button";
import "./style.css"
import ArticleIcon from "@/components/servicesItem/ArticleIcon";

type SingleArticle = {
    id: string,
    isActive: boolean,
    name: string,
}

const SingleRegion = ({ id, name, isActive } : SingleArticle) => {
   
    return (
        <Link href={`/regions/${id}`}>
            <li className={`${isActive ? 'active-article cardShadow' : null} article-item flex items-center cursor-pointer select-none rounded-[10px] gap-x-[10px] md:gap-x-[20px]`}
            >
                    <div className={`flex p-[8px] ${isActive ? null : 'cardShadow'} rounded-[10px] flex-col items-center justify-center`}>
                        <ArticleIcon />
                    </div>
                    <div className="flex flex-col gap-y-[5px] justify-end py-[8px]">
                        <span className="text-xs md:text-lg font-bold md:font-normal">{ name }</span>
                        <Button variant="link" className="w-fit h-fit p-0 text-customPink text-xs block md:hidden font-bold md:font-normal">Читати</Button>
                    </div>
            </li>
        </Link>
    )
};

export default SingleRegion;