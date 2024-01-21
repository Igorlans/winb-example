import Image from "next/image";

const SliderSlide = ( { img } : { img: string } ) => {
    return (
        <Image
            src={img}
            width={720}
            height={450}
            className="w-full h-full"
            style={{objectFit: "cover"}}
            alt="Members slide"
        />
    );
};

export default SliderSlide;