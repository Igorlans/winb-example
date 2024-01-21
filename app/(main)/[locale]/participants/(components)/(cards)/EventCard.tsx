import Image from "next/image";
import { Button } from "@/components/ui/button";
import ArrowRight from "@/components/ui/custom/arrowRight";
import "./style.css";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";

const EventCardHorisontal = ( { area } : { area: string } ) => {
    return (
            <div className={`flex justify-between w-fit max-h-[250px] gap-x-[2vw] md:max-w-[620px] cardShadow p-[20px] rounded-[10px]`}
                style={{ gridArea: area }}
            >
                <Image
                    src='/images/partImage.png'
                    width={250}
                    height={250}
                    className="md:min-w-[137px] w-full rounded-[10px]"
                    style={{ objectFit: 'cover' }}
                    alt="partImage"
                />
                
                <div className="flex flex-col md:basis-2/4 gap-y-[10px] md:min-w-[233px]">
                    <div className="flex justify-between text-second text-sm hidden md:flex">
                        <span className="font-card-description">22 травня 2023</span>
                        <div className="flex items-center gap-x-[5px]">
                            <div className="relative w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]">
                                <Image
                                    src="/icons/icon_location.svg"
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt="Place"
                                />
                            </div>
                            <span className="font-card-description">online</span>
                        </div>
                    </div>

                    <div className="flex flex-col text-left gap-y-[10px]">
                        <h4 className="font-card-title card-title-hidden">ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ</h4>
                        <p className="font-card-description card-text-hidden">
                            Як ефективно керувати людьми в сучасних умовах? Підтримувати та надихати? 
                        </p>
                        <Button variant="outline" className="hidden md:block h-8 max-w-[140px] border-second text-second">Детальніше</Button>
                        <ArrowButton className="flex md:hidden">Детальніше</ArrowButton>
                    </div>
                </div>
            </div>
    );
};

const EventCardVertical = ( { area } : { area: string } ) => {
    return (
            <div className={`${area} flex h-full flex-col gap-y-[10px] md:max-w-[505px] cardShadow p-[20px] rounded-[10px] justify-between`}
                style={{ gridArea: area }}
            >
                    <Image
                        src='/images/partImage.png'
                        width={500}
                        height={335}
                        className="w-full h-[250px] md:w-auto rounded-[10px] overflow-hidden"
                        style={{ objectFit: 'cover' }}
                        alt="partImage"
                    />
                <div className="flex flex-col gap-y-[10px]">
                    <div className="hidden justify-between text-second text-sm md:flex">
                        <span className="font-card-description">22 травня 2023</span>
                        <div className="flex items-center gap-x-[5px]">
                            <div className="relative w-[10px] h-[10px] lg:w-[15px] lg:h-[15px]">
                                <Image
                                    src="/icons/icon_location.svg"
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt="Place"
                                />
                            </div>
                            <span className="font-card-description">online</span>
                        </div>
                    </div>

                    <div className="flex flex-col text-left gap-y-[10px]">
                        <h4 className="font-card-title card-title-hidden">ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ</h4>
                        <p className="font-card-description card-text-hidden">
                            Lorem ipsum dolor sit amet consectetur. Vulputate fermentum aliquam ut rutrum. Tellus etiam vitae congue et ornare at facilisis velit maecenas.
                        </p>
                        <Button variant="outline" className="hidden md:block h-8 border-second text-second">Детальніше</Button>
                        <ArrowButton className="flex md:hidden">Детальніше</ArrowButton>
                    </div>
                </div>
            </div>
    );
};

export {
    EventCardHorisontal,
    EventCardVertical
};