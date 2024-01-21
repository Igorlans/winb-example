import { FC } from "react";
import Image from "next/image";

interface ReviewCardProps {
  review: {
    name: string;
    description: string;
    img: string;
  };
  className?: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const { name, description, img } = review;

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md p-4 duration-300 cursor-pointer h-[480px] md:h-[600px]">
      <div className="mx-auto text-center mb-4">
        <div className="relative w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden aspect-square mx-auto mb-3">
          <Image fill src={img} alt="article" className="object-cover" />
        </div>
        <h4 className="font-card-title card-title-hidden">{name}</h4>
      </div>

      <div className="flex flex-col items-start justify-between">
        <div className="flex flex-col">
          <p className="font-main">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
