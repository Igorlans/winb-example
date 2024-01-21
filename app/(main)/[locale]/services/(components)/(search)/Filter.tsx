import { IService } from "@/app/(main)/types";

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

type FilterProps = {
  services: IService[];
  activeService: string;
};

const Filter = ( { services, activeService } : FilterProps ) => {
    return (
      <div className="basis-2/3 block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full text-sm h-10 w-full rounded-md border border-input bg-background px-3 py-2">
            <button className="flex items-center justify-between gap-x-[5px]">
              <span>
                {
                  services.find(service => service.id === activeService)?.name
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
              services.map(service => (
                <Link href={`/services/${service.id}`} key={service.id}>
                  <DropdownMenuItem>{service.name}</DropdownMenuItem>
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