import Image from "next/image";
import ArrowButton from "../ui/custom/buttons/ArrowButton";

type ListItemCardProps = {
    title: string;
    description: string;
    img: string;
    date?: string;
    styles?: string;
    memberId?: string
}

const TeamCard = ( { title, description, img, styles, date, memberId } : ListItemCardProps ) => {
    return (
        <div className="grid grid-cols-[1fr_3fr] h-[150px]">
            <div className="relative w-full h-full rounded-full overflow-hidden aspect-square">
                <Image 
                    fill
                    src={img}
                    className="object-cover"
                    alt="member"
                />
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <div className="font-card-title card-title-hidden">
                        {
                            title
                        }
                    </div>
                    <p className="font-card-description card-text-hidden">
                        {
                            description
                        }
                    </p>
                </div>
                <ArrowButton>Перейти</ArrowButton>
            </div>
        </div>
    );
};

export default TeamCard;