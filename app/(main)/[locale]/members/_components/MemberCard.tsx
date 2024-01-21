import { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";
import { ClientMember } from "@/types";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
    member: ClientMember;
    classNames?: string
}
export const MemberCard: FC<Props> = ({ member, classNames }) => {
    const buttons = useTranslations("buttons")
    return (
        <div className='rounded-lg bg-white cursor-pointer relative overflow-hidden shadow hover:shadow-md p-4 duration-300'>
            <div className={cn('grid grid-rows-[80px] md:grid-rows-[120px] grid-cols-[80px_3fr] md:grid-cols-[120px_3fr] gap-x-4', classNames)}>
                <div className='relative w-full h-full rounded-full overflow-hidden aspect-square'>
                    <Image
                        fill
                        src={member.image}
                        alt='article'
                        className="object-cover"
                    />
                </div>
                <div className='flex flex-col items-start justify-between'>
                    <div className='flex flex-col'>
                        <h4 className='font-card-title card-title-hidden'>{member.textFields.name}</h4>
                        <p className='font-main card-text-hidden'>{member.textFields.status}</p>
                    </div>
                    <Link href={`/member/${member.id}`}>
                        <ArrowButton>
                            { buttons("view") }
                        </ArrowButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}