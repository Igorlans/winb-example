import Image from "next/image";

const SliderSlide = ( { img } : { img: string } ) => {
    return (
        <Image
            src={img}
            width={720}
            height={550}
            className="w-full h-full"
            style={{objectFit: "cover", height: "300px"}}
            alt="Members slide"
        />
    );
};

export default SliderSlide;