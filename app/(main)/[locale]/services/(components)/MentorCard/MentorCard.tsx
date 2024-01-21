import Image from "next/image";
import ServiceBuyForm from "@/app/(main)/[locale]/services/(components)/MentorCard/ServiceBuyForm";
import { cn } from "@/lib/utils";
import ArrowButton from "@/components/ui/custom/buttons/ArrowButton";
import Link from "next/link";
import { ClientMember } from "@/types";

type ListItemCardProps = {
    member: ClientMember,
    serviceId: string;
    className?: string
}

const MentorCard = ({member, serviceId, className}: ListItemCardProps) => {
    return (
        <div className='relative rounded-lg bg-white cursor-pointer overflow-hidden shadow hover:shadow-md p-4 duration-300'>
            <Link href={`/member/${member.id}`} className={"absolute top-0 left-0 right-0 bottom-0 z-0"}/>
            <div className={cn('grid grid-rows-[90px] md:grid-rows-[120px] grid-cols-[90px_3fr] md:grid-cols-[120px_3fr] gap-x-4', className)}>
                <div className='z-20 relative w-full h-full rounded-full overflow-hidden aspect-square'>
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
                        <p className="text-xs md:text-sm">{member.textFields.status}</p>
                        {/* <p className='font-main card-title-hidden'>{member.description}</p> */}
                    </div>
                    <div className={"z-20"}>
                        <div className="pt-2">
                            <ServiceBuyForm member={member} serviceId={serviceId} />
                        </div>
                        {/*<Link href={`/member/${member.id}`}>*/}
                        {/*    <ArrowButton className="pt-1 md:pt-2">Переглянути</ArrowButton>*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MentorCard;