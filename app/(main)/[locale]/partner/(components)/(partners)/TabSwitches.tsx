import Image from "next/image";

type TabProps = {
    tabs: Array<any>,
    activeTab: string,
    handleSwitch: (id: string) => void
}

const TabSwitches = ( { tabs, handleSwitch, activeTab } : TabProps ) => {
    return (
        <div className="mt-[-18px] md:mt-[17px] flex justify-between gap-x-[50px] overflow-x-scroll lg:overflow-visible">
            {
                tabs.map(item => (
                    <button className="shrink-0 relative w-[90px] md:w-[123px] h-[70px]  md:h-[132px] select-none"
                        key={item.id}
                        onClick={() => handleSwitch(item.id)}
                        style = {
                            { transition: "0.3s ease-in", borderTop: activeTab === item.id ? "8px solid #C9547E" : "8px solid #C7CFD3" }
                        }
                    >
                        <Image
                            src={item.img}
                            alt="offer image"
                            fill={true}
                            style = {
                                { objectFit: "contain", filter: activeTab === item.id ?  "brightness(1)" : "brightness(2)", transition: "0.3s ease-in" }
                            }
                        />
                    </button>
                ))
            }
        </div>
    );
};

export default TabSwitches;

// {
//     tabs.map(item => (
//         <button className="shrink-0 relative w-[123px] h-[132px]"
//             key={item.id}
//             onClick={() => handleSwitch(item.id)}
//             style={
//                 activeTab === item.id ? {borderTop: "8px solid #C9547E", transition: "0.3s ease-in"} : {borderTop: "8px solid #C7CFD3", transition: "0.1s ease-in"}
//             }
//         >
//             <Image
//                 src={item.img}
//                 alt="offer image"
//                 fill={true}
//                 style={
//                     activeTab === item.id ? {objectFit: "contain", filter: "brightness(1)", transition: "0.3s ease-in"} : {objectFit: "contain", filter: "brightness(2)", transition: "0.3s ease-in"}
//                 }
//                 // style={{objectFit: "contain", activeTab === item.id ? {filter: "brightness(1)"} : {filter: "brightness(2)"}
//             />
//         </button>
//     ))
// }