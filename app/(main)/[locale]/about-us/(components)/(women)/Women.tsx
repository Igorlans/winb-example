import Image from "next/image";
import ListItemCard from "./ListItemCard";
import { getTranslations } from "next-intl/server";
const Women = async () => {

    const t = await getTranslations("About")

    return (
        <div className="relative">
            <Image
                src="/icons/icon_logoDecor.svg"
                className="absolute -z-10 top-1/4 left-0 hidden md:block w-[850px] h-[227px]"
                width={850}
                height={227}
                alt="diamond decor"
            />
        <div className='container grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-y-[20px] md:gap-x-[3vw]'>
            <div className="flex flex-col gap-y-[20px] md:gap-y-5">
                <div className="flex flex-col gap-y-3 md:gap-y-5">
                    <h2 className="font-title">
                        WOMEN IN BUSINESS
                    </h2>
                    <p className="font-main">
                        { t("get_desc") }
                    </p>
                </div>
                <div className='pt-4 self-stretch md:self-end grid grid-cols-2 grid-rows-2 gap-4'>
                    <ListItemCard title={t("get1_title")} description={t("get1_desc")} />
                    <ListItemCard title={t("get2_title")} description={t("get2_desc")} />
                    <ListItemCard title={t("get3_title")} description={t("get3_desc")} />
                    <ListItemCard title={t("get4_title")} description={t("get4_desc")} />
                    <ListItemCard title={t("get5_title")} description={t("get5_desc")} />
                    <ListItemCard title={t("get6_title")} description={t("get6_desc")} />
                </div>
            </div>
            <Image
                src="/images/pageAboutUs/pageAboutUs-1.jpg"
                width={625}
                height={670}
                className="w-full h-full max-w-[625px]"
                style={{objectFit: "cover"}}
                alt="Women in business"
            />
        </div>
        </div>
    );
};

export default Women;