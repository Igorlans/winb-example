"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation";
import SingleCategor from "./SingleCategor";
import { FullService } from "@/types/services";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClientService } from "@/types";
import { useTranslations } from "next-intl";

type CatigoriesProps = {
    services: ClientService[];
    activeService: string;
};

const Catigories = ( { services, activeService } : CatigoriesProps ) => {

    const t = useTranslations("Service");

    const router = useRouter();
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-y-5">
            <div className="font-title">
                { t("category") }
            </div>
            <ul className="hidden md:flex flex-col gap-y-4">
                
                {
                    services.map(item => (
                        <Link href={`/services/${item.slug}`}>
                            <li className={
                                cn(
                                    "flex items-center py-2 rounded-[4px] gap-x-[10px] md:gap-x-[20px] ease-out duration-300", 
                                    item.slug === activeService ? "bg-darkPink text-white" : "hover:text-darkPink"
                                )}>
                                <span className="border-darkPink border-2 h-5"></span>
                                <h3 className="font-subtitle">{ item.textFields.title }</h3>
                            </li>
                        </Link>
                    ))
                }

            </ul>
            <div className="block md:hidden z-20">
                <Select onValueChange={(slug) => router.push(`${pathname}services/${slug}`)} value={activeService}>
                    <SelectTrigger className="w-full">
                        <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            services.map(item => (
                                <SelectItem value={item.slug} key={item.slug}>
                                    {item.textFields.title }
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Catigories;