import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ArrowBottom from "@/components/ui/custom/arrowBottom";
import { ClientRegion } from "@/types";

type FilterProps = {
  regions: ClientRegion[];
  activeRegion: string | string[];
};

const Filter = ( { regions, activeRegion } : FilterProps ) => {
    return (
      <div className="basis-2/3 block lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full text-sm h-10 w-full rounded-md border border-input bg-background px-3 py-2">
            <button className="flex items-center justify-between gap-x-[5px]">
              <span>
                {
                  regions.find(region => region.id === activeRegion)?.textFields.name
                }
              </span>
              <ArrowBottom 
                color="black"
                prop="w-[12px] h-[12px]"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="basis-2/3 w-full">
            <DropdownMenuLabel>Бізнес-послуги</DropdownMenuLabel>
            
            {
              regions.map(region => (
                <Link href={`/regions/${region.id}`} key={region.id}>
                  <DropdownMenuItem>{region.textFields.name}</DropdownMenuItem>
                </Link>
              ))
            }

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
}
 
export default Filter;