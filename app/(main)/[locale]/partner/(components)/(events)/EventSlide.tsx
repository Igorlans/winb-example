import Image from "next/image";

const EventSlide = ( { img } : { img: string } ) => {
    return (
        <div className="relative w-full h-[220px] md:h-[450px] overflow-hidden rounded-[10px]">
            <Image
                fill
                src={img}
                alt="offer image"
                // width={1310}
                // height={450}
                style={{objectFit: "cover"}}
            />
        </div>
    );
};

export default EventSlide;