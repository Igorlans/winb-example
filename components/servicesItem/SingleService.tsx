import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleIcon from "./ArticleIcon";
import { ClientArticle } from "@/types";

type SingleArticle = {
    service: ClientArticle
}
const SingleService = ({ service } : SingleArticle) => {
    return (
        <li className="active-article cardShadow flex items-center gap-x-[20px] rounded-[10px] p-[10px] md:gap-x-[50px]">
            <div className="flex flex-col items-center justify-center rouded-[10px]">
                <div className="relative md:w-[40px] md:h-[37px]">
                    <ArticleIcon />
                </div>
            </div>
            <div>
                <span className="h-54 w-100 items-center mb-1 text-[12px] md:text-base font-bold">{ service.textFields.title }</span>
                 <Link href={`/services/${service.Service?.slug}/${service.slug}`}>
                    <Button variant="link" className="flex items-center justify-start gap-x-[10px] md:gap-x-5 text-customPink pl-0 font-bold">
                        <span className="text-sm text-customPink font-bold">Читати</span>
                    </Button>
                 </Link>
            </div>
        </li>
    );
};

export default SingleService;