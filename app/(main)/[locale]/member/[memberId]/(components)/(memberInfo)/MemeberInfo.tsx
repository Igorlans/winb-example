"use client"
import {useState, FC} from "react";
import TabSwitches, {ITab} from "./TabSwitches";
import Services from "@/components/servicesItem/Services";
import { ClientMember } from "@/types";
import { useTranslations } from "next-intl";


interface IMemberInfoProps {
    member: ClientMember
}



export type MemberTab = "description" | "experience" | "services"



const MemeberInfo: FC<IMemberInfoProps> = ({member}) => {

    const t = useTranslations("Member")

    const [activeTab, setActiveTab] = useState<MemberTab>('description');

    const initTabs: ITab[] = [
        {label: t("about"), value: 'description'},
        {label: t("experience"), value: 'experience'},
        {label: t("services"), value: 'services'},
    ]

    const filteredTabs = initTabs.filter(tab => {
        if (tab.value === 'services' && member.services.length === 0) {
            return false
        }
        if (tab.value === "experience" && !member?.textFields.experience?.trim()) {
            return false
        } else {
            return true
        }
    })

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return <TabContent
                    title={t("about")}
                >
                    <p dangerouslySetInnerHTML={{ __html: member.textFields.description }} className={'break-words'} />
                </TabContent>
            case "experience":
                return <TabContent
                    title={t("experience")}
                >
                    <p dangerouslySetInnerHTML={{ __html: member.textFields.experience }} className={'break-words'} />
                </TabContent>
            case "services":
                return <TabContent
                    title={t("services")}
                >
                    <Services
                        data={member.services}
                    />
                </TabContent>
        }
    }
    return (
        <div className="flex overflow-x-hidden flex-col mb-[50px] gap-y-[40px] md:gap-y-[50px]">
            <TabSwitches
                tabs={filteredTabs}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />
            {renderContent()}
        </div>
    );
};

type TabContentProps = {
    title: string;
    children?: React.ReactNode;
}
const TabContent = ( { children, title } : TabContentProps) => {
    return (
        <div className="flex flex-col gap-y-[20px]">
            <div
                className="flex items-center"
            >
                <div className="w-100 h-1 basis-1/3 bg-customPink"></div>
                <h3 className="basis-1/2 pl-[10px] text-lg md:text-xl text-center whitespace-nowrap font-bold">
                    { title }
                </h3>
            </div>

                { children }


        </div>
    )
}

export default MemeberInfo;