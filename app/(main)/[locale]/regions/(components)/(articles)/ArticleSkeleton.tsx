import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-[10px]">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
        </div>
    );
};

const SkeletonItem = () => {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-[10px]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export default ArticleSkeleton;