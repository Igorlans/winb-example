import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Image from "next/image";

import "./style.css"
import AdvantageCard from "@/components/cards/AdvantageCard";

const Offer = () => {
  
  const AdvantageCardTexts = [
    {
      id:1,
      title: "НЕТВОРКІНГ",
      descr: "допомагаєм знайти клієнтів, інвесторів, партнерів та просто приємні знайомства"
    },
    {
      id:2,
      title: "СИЛЬНЕ ОТОЧЕННЯ",
      descr: "Власниці бізнесу, представниці 25+ різних галузей економіки. Підтримка та мотивація екологічне спілкування на рівних. "
    },
    {
      id:3,
      title: "НАВЧАННЯ ТА КОНСУЛЬТУВАННЯ",
      descr: "допомагаємо отримати найсвіжіші знання"
    },
    {
      id:4,
      title: "ГРАНТОВА ПІДТРИМКА БІЗНЕСУ",
      descr: "допомагаємо у знаходженні, написанні та отриманні грантів"
    },
  ]
    return (
        <div className="relative flex flex-col items-center gap-y-0 md:gap-y-[30px]">
          <div className="container">
            <SectionTitle 
                  title="Що ми пропонуємо?"
            />
            <div className="relative z-10 responsive-grid">
            {AdvantageCardTexts.map((item) =>
                   <AdvantageCard 
                   key={item.id}
                   title={item.title}
                   descr={item.descr}
                 />
                )}
            </div>

          </div>
            <Image
                src="/icons/textDecor.svg"
                className="hidden md:block absolute z-0 top-[50px] left-[50px] w-64 h-64 md:w-[90px] md:h-[590px]"
                width={90}
                height={640}
                alt="diamond decor"
            />
        </div>
    );
};

export default Offer;