"use client"
import { Button } from "@/components/ui/button";
import {MemberTab} from "@/app/(main)/[locale]/member/[memberId]/(components)/(memberInfo)/MemeberInfo";

type SwitchProps = {
    setActiveTab: (newValue: MemberTab) => void,
    activeTab: MemberTab;
    tabs: ITab[]
}

export interface ITab {
    label: string;
    value: MemberTab
}

const TabSwitches = ({ activeTab, setActiveTab, tabs } : SwitchProps) => {
    const getActiveVariant = (memberTab: MemberTab) => {
        return memberTab === activeTab ? 'primary' : 'secondary'
    }

    return (
        <div className="pb-[10px] flex gap-x-[16px] overflow-x-scroll lg:overflow-auto">
            {tabs?.map(tab =>
                <Button
                    key={tab.value}
                    variant={getActiveVariant(tab.value)}
                    className="rounded-[6px] shrink-0 text-ellipsis overflow-x-hidden whitespace-nowrap"
                    onClick={() => setActiveTab(tab.value)}
                >{tab.label}</Button>
            )}
        </div>
    );
};

export default TabSwitches;