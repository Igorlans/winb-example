import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const NavCards = ({ swiperRef, products }) => {
  const isBeginning =
    swiperRef.current &&
    swiperRef.current.swiper &&
    swiperRef.current.swiper.isBeginning;
  const isEnd =
    swiperRef.current &&
    swiperRef.current.swiper &&
    swiperRef.current.swiper.isEnd;

  const handleClickPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleClickNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div
      className="flex justify-end gap-5 py-2.5"
      style={{ margin: "20px 0px" }}
    >
      <div
        style={{ width: "40px", height: "40px" }}
        className={`relative bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center  ${
          isBeginning ? "opacity-50" : "opacity-100"
        }`}
        onClick={handleClickPrev}
      >
        <HiChevronLeft style={{ color: "#C13C69" }} />
      </div>

      <div
        style={{ width: "40px", height: "40px" }}
        className={`relative w-9 h-9 bg-white rounded-full shadow-md cursor-pointer flex items-center justify-center ${
          isEnd ? "opacity-50" : "opacity-100"
        }`}
        onClick={handleClickNext}
      >
        <HiChevronRight style={{ color: "#C13C69" }} />
      </div>
    </div>
  );
};

export default NavCards;
