import Image from "next/image";
import {FC} from "react";
import Link from "next/link";
import { ClientMember } from "@/types";

interface IMemberCardProps {
    member: ClientMember
}

export interface IFactItem {
    icon: string | '';
    text: string
}

export interface IJsonArray<T> {
    items: T[]
}

const MemberCard: FC<IMemberCardProps> = ({member}) => {

    return (
        <div
            className="flex flex-col container cardShadow py-[17px] px-[0px] md:p-[25px] rounded-[25px] h-fit md:min-w-[300px]">
            <div className="relative w-full h-[100vw] md:h-[35vh] max-h-[300px] rounded-[12px] overflow-hidden">
                <Image
                    src={member.image}
                    fill={true}
                    style={{objectFit: 'cover'}}
                    alt="memberPhoto"
                />
            </div>
            <div className={'space-y-4 mt-[25px]'}>
                <h2 className="text-lg md:text-xl text-left whitespace-wrap font-bold">{member.textFields.name}</h2>
                <p className="text-sm md:text-base">
                    {member.textFields.status}
                </p>
                <Link href={`/regions/${member.region?.slug}`}
                      className="cursor-pointer flex items-center gap-x-[30px] max-h-[41px] px-[10px] py-[10.5px] max-w-[183px] rounded-[10px] border-[1px] border-second">
                    <Image
                        src={'/icons/icon_location.svg'}
                        className="overflow-hidden"
                        width={20}
                        height={20}
                        style={{objectFit: 'cover'}}
                        alt="icon"
                    />
                    <span className="text-xs">{member.region.textFields.name}</span>
                </Link>
            </div>

            {/*{*/}
            {/*    additionalItems?.length ?*/}
            {/*        <div className="flex flex-col gap-y-[20px] mt-[25px]">*/}
            {/*            <ul className="flex flex-col gap-y-[10px]">*/}
            {/*                {additionalItems.map(item =>*/}
            {/*                    <CardInfoItem key={item.text} info={item?.text} icon={item?.icon}/>*/}
            {/*                )}*/}
            {/*            </ul>*/}

            {/*        </div>*/}
            {/*        : null*/}
            {/*}*/}

            {/*{*/}
            {/*    factsItems?.length ?*/}
            {/*        <div className="flex flex-col gap-y-[10px] mt-[30px]">*/}
            {/*            <h1 className="text-sm md:text-base hidden md:block text-left whitespace-nowrap font-bold">*/}
            {/*                Факти про мене*/}
            {/*            </h1>*/}

            {/*            <ul className="flex flex-col gap-y-[10px]">*/}
            {/*                {factsItems.map(item =>*/}
            {/*                    <CardFactItem key={item.text} info={item?.text} icon={item?.icon}/>*/}
            {/*                )}*/}
            {/*            </ul>*/}

            {/*        </div>*/}
            {/*        : null*/}
            {/*}*/}

        </div>
    );
};

type CardInfoItemProps = {
    info: string;
    icon: string;
}
const CardInfoItem = ({info, icon}: CardInfoItemProps) => {
    return (
        <li className="flex items-center gap-x-[30px] max-h-[41px] px-[10px] py-[10.5px] max-w-[183px] rounded-[10px] border-[1px] border-second">
            {icon &&
                <Image
                    src={icon}
                    className="overflow-hidden"
                    width={20}
                    height={20}
                    style={{objectFit: 'cover'}}
                    alt="icon"
                />
            }
            <span className="text-xs">{info}</span>
        </li>
    )
}

const CardFactItem = ({info, icon}: CardInfoItemProps) => {
    return (
        <li className="flex items-center gap-x-[30px]">
            {icon &&
                <Image
                    src={icon}
                    width={40}
                    height={40}
                    style={{objectFit: 'cover', flexShrink: 0}}
                    alt="icon"
                />
            }
            <span className="text-base">{info}</span>
        </li>
    )
}
export default MemberCard;