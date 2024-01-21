import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type ServicesType = {
    icon: string,
    name: string,
}

const Services: FC = async () => {
    const t = await getTranslations("Home")

    const services = [
        {id: 0, name: t("services"), icon: 'icon_services', link: '/services/konsultatsii'},
        {id: 1, name: t("events"), icon: 'icon_event', link: '/events/new'},
        {id: 2, name: t("regions"), icon: 'icon_ukraine', link: '/regions'},
        {id: 3, name: t("about"), icon: 'icon_about', link: '/about-us'}
    ]

    return (
        <div className="relative">
            <img
                className="absolute z-0"
                src="/images/backgrounds/bg_services.png"
                alt="bg"
            />
            <div className="container py-4 md:py-16">
                <div className="relative place-content-center grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 xl:gap-12 md:gap-3.5 gap-3.5">
                    {
                        services.map(item => (
                            <Link href={item.link} key={item.id}>
                                <ServiceBlock
                                    icon={item.icon}
                                    name={item.name}
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const ServiceBlock: FC<ServicesType> = ({icon, name}: ServicesType) => {
    return (
        <div className="py-3 rounded-lg bg-white shadow-md hover:shadow-lg hover:scale-[1.02] ease-out duration-300">
            <div className="grid grid-rows-[40px_1fr] md:grid-rows-[50px_1fr] lg:grid-rows-[80px_1fr] gap-y-1 md:gap-y-2 max-h-[150px] place-content-center">
                <div className="relative w-full h-full aspect-square">
                    <Image 
                        fill
                        src={`/icons/${icon}.svg`}
                        alt="icon"
                    />
                </div>
                <h4 className="text-center font-main">
                    {name}
                </h4>
            </div>
        </div>
    );
};

export default Services;
