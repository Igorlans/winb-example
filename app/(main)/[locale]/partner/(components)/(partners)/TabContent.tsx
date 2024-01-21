import Image from "next/image";

type TabContentProps = {
    tab: {
        id: string,
        img: string
        descr: string
    }
}
const TabContent = ( { tab } : TabContentProps ) => {
    return (
        <div className="relative -mt-[40px] md:mt-0">
            <div className='grid grid-cols-1 gap-y-[38px] md:grid-cols-[1fr_2fr]'>
                <div className="relative w-[151px] md:w-full justify-self-start h-[36px] md:h-full">
                    <Image
                        src={tab?.img}
                        alt="offer image"
                        fill={true}
                        style={{objectFit: "contain"}}
                    />
                </div>
                <p className="font-main">
                    {tab?.descr}
                </p>
            </div>

            <div className="absolute bottom-[-40px] md:bottom-[-75px] z-5 bg-[#C7CFD3] h-2 text-[#C7CFD3] w-full"></div>

        </div>
    );
};

export default TabContent;