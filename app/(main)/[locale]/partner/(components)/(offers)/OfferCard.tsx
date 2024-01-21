import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/components/ui/custom/arrowRight";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";

type OfferCardProps = {
    reverse: boolean,
    title: string,
    img: string,
    descr: string
}

const OfferCard = ( { reverse, title, img, descr } : OfferCardProps ) => {
    return (
        <div className="grid grid-cols-2 grid-flow-row-dense items-center cardShadow gap-x-[3vw] rounded-[16px] p-4">
            <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                <Image
                    fill
                    src={img}
                    className="object-cover"
                    alt="offer image"
                />
            </div>

            <div className="justify-self-end flex items-center flex-col md:flex-row">
                <div className="flex flex-col items-end md:max-w-[690px] gap-y-[10px] md:gap-y-[20px]"
                    style={
                        reverse ? 
                        {alignItems: "flex-end", textAlign: "right"} : 
                        {alignItems: "flex-start", textAlign: "left"}
                    }
                >
                    <h4 className="font-bold font-subtitle card-title-hidden">
                        { title }
                    </h4>
                    <p className="font-main four-line-text">
                        { descr }
                    </p>
                    <Link href="#">
                        <ArrowButton>Детальніше</ArrowButton>
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default OfferCard;