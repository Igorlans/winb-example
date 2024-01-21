"use client"

import { useState, useEffect } from "react";
import Tab from "@/components/ui/custom/tabs"
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import DecoratedSectonTitle from "@/components/sectionTitle/DecoratedSectonTitle";
import OfferCard from "./OfferCard";

const tabs = [
    {id: "aboutMe", title: "Коротко про мене", descr: null},
    {id: "experience", title: "Досвід", descr: null},
    {id: "services", title: "Послуги", descr: null}
]

const offerCards = [
    {id: "0", title: "Онлайн-бізнес разом із нами", img: "/images/article_image.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "0", title: "Онлайн-бізнес разом із нами", img: "/images/article_image.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "0", title: "Онлайн-бізнес разом із нами", img: "/images/article_image.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
]
// type OfferTab = "aboutMe" | "experience" | "services";

const Offers = () => {
    const [activeTab, setActiveTab] = useState<string>();

    useEffect(() => {
        setActiveTab(tabs[0].id);
    }, [tabs]);

    return (
        <div className="container flex flex-col gap-y-[30px]">
            <SectionTitle
                title="Пропозиції"
            />

            <Tab
                tabs={tabs}
                activeTab={activeTab!}
                handleSwitch={(id: string) => setActiveTab(id)}
            />

            {
                offerCards.map((card, i) => (
                    <OfferCard
                        key={card.id}
                        reverse={i % 2 === 0}
                        title={card.title}
                        img={card.img}
                        descr={card.descr}
                    />
                ))
            }
        </div>
    );
};

export default Offers;