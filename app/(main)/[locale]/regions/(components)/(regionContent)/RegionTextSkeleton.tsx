import { Skeleton } from "@/components/ui/skeleton";

const RegionTextSkeleton = () => {
    return (
        <div className="w-full mb-[50px] pt-[30px]">
            <div className="flex flex-col max-w-[798px] gap-y-2.5 md:gap-y-[50px]">
                
                <Skeleton className="h-10" />

            </div>
            <div className="flex flex-col mt-[50px] max-w-[928px] gap-y-[50px]">
                <div className="space-y-4"> 
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6 w-[90%]" />
                    <Skeleton className="h-6 w-[90%]" />
                    <Skeleton className="h-6 w-[50%]" />
                </div>

                <div className="grid grid-cols-2 items-center gap-x-[1vw]">

                    <Skeleton className="h-[350px]" />
                    
                    <div className="block   space-y-8"> 
                        <Skeleton className="h-10" />
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-[90%]" />
                            <Skeleton className="h-6 w-[90%]" />
                            <Skeleton className="h-6 w-[50%]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-3 gap-x-[30px] gap-y-[20px]">
                    <Skeleton className="w-full h-[95px]"/>
                    <Skeleton className="w-full h-[95px]"/>
                    <Skeleton className="w-full h-[95px]"/>
                    <Skeleton className="w-full h-[95px]"/>
                    <Skeleton className="w-full h-[95px]"/>
                    <Skeleton className="w-full h-[95px]"/>
                </div>

                <div className="space-y-4"> 
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6 w-[90%]" />
                    <Skeleton className="h-6 w-[50%]" />
                </div>

            </div>
        </div>
    );
};

export default RegionTextSkeleton;