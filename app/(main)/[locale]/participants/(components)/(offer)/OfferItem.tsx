import Image from "next/image";

const OfferItem = () => {
  return (
    <div
      className="px-[8px] py-[10px] select-none md:px-[25px] md:py-[35px] rounded-lg flex flex-col gap-3.5 items-center text-center bg-white shadow-md hover:shadow-lg hover:scale-[1.02] ease-out duration-200"
    >
      <div className="relative w-[30px] h-[30px] md:w-[80px] md:h-[80px]">
        <Image
          src="/icons/icon_service.svg"
          alt="service icon"
          fill={true}
          style={{objectFit: 'contain'}}
        />
      </div>
      <div className="title font-bold text-[8px] md:text-[16px]">
        ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ
      </div>
      <div className="descr font-normal text-[8px] md:text-[11px] ">
        Lorem ipsum dolor sit amet consectetur. Vulputate fermentum aliquam ut
        rutrum. Tellus etiam vitae congue et ornare at facilisis velit maecenas.
      </div>
    </div>
  );
};

export default OfferItem;
