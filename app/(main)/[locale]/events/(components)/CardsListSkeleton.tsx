import {Skeleton} from "@/components/ui/skeleton";

const CardsListSkeleton = () => {
  const items = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 gap-3.5 md:gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Skeleton className="w-full h-[445px]"></Skeleton>
      ))}
    </div>
  );
};

export default CardsListSkeleton;
