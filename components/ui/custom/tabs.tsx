import { Button } from "../button"

type TabProps = {
    tabs: Array<any>,
    activeTab: string,
    handleSwitch: (id: string) => void
}

const Tabs = ( { tabs, handleSwitch, activeTab } : TabProps ) => {
    return (
        <div className={`pb-[10px] flex gap-x-[16px] overflow-x-scroll lg:overflow-auto`}>
            {
                tabs.map(item => (
                    <Button 
                        key={item.id}
                        id={item.id}
                        variant={activeTab === item.id ? "primary" : "secondary"}
                        className={`rounded-[6px] shrink-0 text-ellipsis overflow-hidden whitespace-nowrap`}
                        onClick={() => handleSwitch(item.id)}
                    >{item.title}</Button>
                ))
            }
        </div>
    );
};

export default Tabs;