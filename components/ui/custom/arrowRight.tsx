import { Button } from "../button";
import Link from "next/link";

const ArrowRight = ( { btnProp, textProp, strProp, lable, link } : { lable: string, btnProp?: string, textProp?: string, strProp?: string, link?: string } ) => {
    return (
        <Button variant="link" className={`${btnProp} flex p-0 h-4 items-center justify-start gap-x-[10px] md:gap-x-5 text-customPink font-bold`}
        >
            {link ?
                <Link href={link} className={`${textProp ? textProp : "text-[10px] md:text-xs"}  text-customPink font-bold`}>{lable}</Link>
                :
                <span className={`${textProp ? textProp : "text-[10px] md:text-xs"}  text-customPink font-bold`}>{lable}</span>

            }
            <svg className={strProp} viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 7L0.999999 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3333 1L25 7L18.3333 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </Button>
    );
};

export default ArrowRight;