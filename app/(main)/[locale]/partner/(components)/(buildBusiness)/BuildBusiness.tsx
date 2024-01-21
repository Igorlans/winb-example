import Link from "next/link";
import Image from "next/image";
import ArrowRight from "@/components/ui/custom/arrowRight";
import "./style.css";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";

const BuildBusiness = () => {
    return (
        <div className="relative overflow-hidden">
            <Image
                src="/icons/icon_grayDiamond.svg"
                className="absolute z-0 top-1/5 md:top-1/4 -right-40 w-64 h-64 md:w-96 md:h-96"
                width={64}
                height={64}
                alt="diamond decor"
            />
            <Image
                src="/icons/icon_grayDiamond.svg"
                className="absolute z-0 top-0 -left-40 hidden md:block md:w-96 md:h-96"
                width={64}
                height={64}
                alt="diamond decor"
            />

            <div className="container">
                <div className="flex items-center justify-between flex-col md:flex-row">
                    <div className="flex flex-col md:max-w-[493px] gap-y-4 md:gap-y-6">
                        <h2 className="font-title">
                            Будуйте свій онлайн-бізнес разом із нами
                        </h2>
                        <p className="font-main">
                            Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні.
                        </p>
                        <Link href="#" className="">
                            <ArrowButton>Детальніше</ArrowButton>
                        </Link>
                    </div>
                    <div className="absoluteCardWrapper">

                            <div className="hover:scale-[1.1] hover:z-10 ease-out duration-200">
                                <Image
                                    src="/images/article_image.png"
                                    width={500}
                                    height={250}
                                    style={{objectFit: "cover"}}
                                    alt="Event"
                                />
                            </div>

                            <div className="hover:scale-[1.1] hover:z-10 ease-out duration-200">
                                <Image
                                    src="/images/article_image.png"
                                    width={500}
                                    height={250}
                                    style={{objectFit: "cover"}}
                                    alt="Event"
                                />
                            </div>

                            <div className="hover:scale-[1.1] hover:z-10 ease-out duration-200">
                                <Image
                                    src="/images/article_image.png"
                                    width={500}
                                    height={250}
                                    style={{objectFit: "cover"}}
                                    alt="Event"
                                />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildBusiness;