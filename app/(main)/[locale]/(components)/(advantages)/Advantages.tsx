import Image from "next/image";
import DecoratedSectonTitle from "@/components/sectionTitle/DecoratedSectonTitle";
import AdvantageCard from "@/components/cards/AdvantageCard";
import { getTranslations } from "next-intl/server";

const Advantages = async () => {

  const t = await getTranslations("Home")

  const AdvantageCardTexts = [
    {
      id:1,
      title: t("advantage1_title"),
      descr: t("advantage1_desc")
    },
    {
      id:2,
      title: t("advantage2_title"),
      descr: t("advantage2_desc")
    },
    {
      id:3,
      title: t("advantage3_title"),
      descr: t("advantage3_desc"),
    },
    {
      id:4,
      title: t("advantage4_title"),
      descr: t("advantage4_desc"),
    },
  ]

  return (
    <div className="relative">
      
      <DecoratedSectonTitle title={t("advantages")} />

      <div className="relative z-10 container grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      {AdvantageCardTexts.map((item) =>
                   <AdvantageCard 
                   key={item.id}
                   title={item.title}
                   descr={item.descr}
                 />
                )}

      </div>

      <Image
        src="/icons/icon_grayDiamond.svg"
        className="absolute z-0 top-0 top-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        width={500}
        height={500}
        alt="diamond decor"
        />
    </div>
  );
};

export default Advantages;
