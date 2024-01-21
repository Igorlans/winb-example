import Link from "next/link";
import ArticleIcon from "./ArticleIcon";
import { Button } from "@/components/ui/button";
import "./style.css"

type SingleArticle = {
    id: string;
    isActive: boolean;
    name: string;
    url?: string;
    setRegion?: (id: string) => void
    isMobile?: boolean;
}

const SingleArticle = ({ id, name, isActive, url, isMobile, setRegion } : SingleArticle) => {
   
    return (
        <Link href={url ?? ""}
            onClick={() => {
                if (setRegion) setRegion(id)
            }}
        >
            <li className={`${isActive && !isMobile ? 'active-article shadow-lg' : null} ${isMobile && 'shadow-lg'} ${!isActive && 'hover:shadow-lg hover:scale-[1.02] ease-out duration-200'}  article-item flex items-center cursor-pointer select-none rounded-[10px] gap-x-[10px] md:gap-x-[20px]`}
            >
                    <div className={`flex p-[8px] ${isActive || isMobile ? null : 'cardShadow'} rounded-[10px] flex-col items-center justify-center`}>
                        <ArticleIcon />
                    </div>
                    <div className="flex flex-col gap-y-[5px] justify-end py-[8px]">
                        <span className="text-xs md:text-lg font-bold md:font-normal one-line-text">{ name }</span>
                        <Button variant="link" className="w-fit h-fit p-0 text-customPink text-xs block md:hidden font-bold md:font-normal">Читати</Button>
                    </div>
            </li>
        </Link>
    )
};

export default SingleArticle;