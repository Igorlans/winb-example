import Image from "next/image";
import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import ArrowRight from "@/components/ui/custom/arrowRight";
import Link from "next/link";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";
import { useTranslations } from "next-intl";

type SliderSlideProps = {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  descr: string;
};

const SliderSlide = ( { id, title, subtitle, img, descr } : SliderSlideProps ) => {

  const button = useTranslations("buttons")

  const [animationProps, setAnimationProps] = useSpring(() => ({
    transform: "translateX(0)",
    opacity: 1,
    from: { transform: "translateX(-100px)", opacity: 0 },
  }));

  const handleScroll = () => {
    const slideMemberElement = document.getElementById("slide-member");
    if (slideMemberElement) {
      const slideMemberPosition = slideMemberElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (
        slideMemberPosition.top < windowHeight &&
        slideMemberPosition.bottom > 0
      ) {
        setAnimationProps({ transform: "translateX(0)", opacity: 1 });
      } else {
        setAnimationProps({ transform: "translateX(-100px)", opacity: 0 });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="slide-member" className="max-w-[1400px] mx-auto relative md:pt-[40px] overflow-hidden select-none">
      <animated.div
        className=" absolute rounded-xl skew-x-5 skew-y-2 bg-pink-100 top-[100px] max-h-[410px] right-0 w-[80vw] h-[60vw] md:w-[40vw] min-[1025px]:w-[414px] md:top-0 md:right-0 z-0"
        style={{
          ...animationProps,
        }}
      ></animated.div>
      <div className="container w-100 grid grid-cols-1 md:grid-cols-2 items-center gap-y-[20px] gap-x-28 relative z-10">
        <animated.div style={animationProps}>
          <div className="text-left">
            <h3 className="font-title mb-4 md:mb-5">{ title }</h3>
            <h5 className="font-subtitle font-bold mb-2">
              {
                subtitle
              }
            </h5>
            <p className="font-main mb-7">
              {
                descr
              }
            </p>
            <Link href={`/member/${id}`}>
              <ArrowButton>
                { button("view") }
              </ArrowButton>
            </Link>
          </div>
        </animated.div>
        <animated.div style={animationProps} className="order-first md:order-last">
            <Image
                src={img}
                alt="woman"
                width={414}
                height={414}
                className="object-cover rounded-xl w-full h-[78vw] min-[1025px] md:w-[414px] md:h-full border-white border-8 justify-self-end aspect-square"
            />
        </animated.div>
      </div>
      
    </div>
  );
};

export default SliderSlide;
