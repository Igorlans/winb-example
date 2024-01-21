import { Skeleton } from "@/components/ui/skeleton";

export const MemberListSkeleton = () => {
    return (
        <div className={"grid grid-cols-1 gap-3.5 md:gap-7 min-[650px]:grid-cols-2 xl:grid-cols-3"}>
            {
                new Array(12).fill(null).map((item , i) => (
                    <Skeleton key={i} className="w-full h-[152px]" />
                ))
            }
        </div>
    )
}