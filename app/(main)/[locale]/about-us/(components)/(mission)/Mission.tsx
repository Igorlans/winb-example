import Image from "next/image";

import ListItemCard from "./ListItemCard";
import { getTranslations } from "next-intl/server";

const Mission = async () => {

    const t = await getTranslations("About")

    return (
        <div className="relative">
            <Image
                src="/icons/icon_grayDiamond.svg"
                className="absolute z-0 top-[50%] -translate-y-[50%] md:-top-20 -right-40 w-[300px] h-[300px] md:w-96 md:h-96"
                width={64}
                height={64}
                alt="diamond decor"
            />
            <Image
                src="/icons/icon_grayDiamond.svg"
                className="absolute z-0 -bottom-40 -left-60 hidden md:block w-96 h-96"
                width={64}
                height={64}
                alt="diamond decor"
            />
            <div className='container'>
                <div className="font-title" style={{marginLeft: '28px'}}>
                    { t("plan") }
                </div>
                <Image
                    src="/images/pageAboutUs/pageAboutUsStrategyPlans.jpg"
                    className=""
                    width={600}
                    height={300}
                    alt="diamond decor"
                />
                {/* <ListItemCard
                    title="Місія"
                    description="Підвищення ефективності бізнесу наших клієнтів шляхом впровадження рішень, що відповідають сучасним інноваціям і останнім вимогам ведення бізнесу."
                    // justify="start"
                />  
                <ListItemCard
                    title="Місія"
                    description="Підвищення ефективності бізнесу наших клієнтів шляхом впровадження рішень, що відповідають сучасним інноваціям і останнім вимогам ведення бізнесу."
                    // justify="end"
                />  
                <ListItemCard
                    title="Місія"
                    description="Підвищення ефективності бізнесу наших клієнтів шляхом впровадження рішень, що відповідають сучасним інноваціям і останнім вимогам ведення бізнесу."
                    // justify="start"
                />  
                <ListItemCard
                    title="Місія"
                    description="Підвищення ефективності бізнесу наших клієнтів шляхом впровадження рішень, що відповідають сучасним інноваціям і останнім вимогам ведення бізнесу."
                    // justify="end"
                />   */}
            </div>
        </div>
    );
};

export default Mission;