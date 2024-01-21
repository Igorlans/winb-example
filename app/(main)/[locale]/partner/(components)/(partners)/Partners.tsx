"use client"

import { useState, useEffect } from "react";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import TabContent from "./TabContent";
import TabSwitches from "./TabSwitches"
const partnerTabs = [
    {id: "0", title: "Partner", img: "/images/partnerLogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "1", title: "Partner", img: "/images/secondPartnerlogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "2", title: "Partner", img: "/images/partnerLogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "3", title: "Partner", img: "/images/secondPartnerlogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "4", title: "Partner", img: "/images/partnerLogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
    {id: "5", title: "Partner", img: "/images/secondPartnerlogo.png", descr: "Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. Почніть процес цифрової трансформації вашої компанії вже сьогодні."},
]

const Partners = () => {
    const [activeTab, setActiveTab] = useState<string>();

    useEffect(() => {
        setActiveTab(partnerTabs[0].id);
    }, [partnerTabs]);
    return (
        <div className="container flex flex-col gap-y-[50px]">
            <SectionTitle
                title="Наші партнери"
            />

            <TabContent 
                tab={partnerTabs.find(tab => tab.id === activeTab)!}
            />

            

            <TabSwitches 
                tabs={partnerTabs}
                activeTab={activeTab!}
                handleSwitch={setActiveTab}
            />
        </div>
    );
};

export default Partners;