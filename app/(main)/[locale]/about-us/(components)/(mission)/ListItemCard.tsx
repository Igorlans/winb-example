import Image from 'next/image';

type ListItemCardProps = {
    title: string;
    description: string;
    justify?: string;
}
const ListItemCard = ( { title, description, justify } : ListItemCardProps ) => {
    return (
        <div className="grid grid-rows-[1fr_0.1fr_0.5fr] gap-y-[10px] items-start"
            style={{justifySelf: justify}}
        >
            <Image
                src="/icons/icon_service.svg"
                width={80}
                height={80}
                className='w-full h-full max-w-[80px] max-h-[80px]'
                style={{objectFit: 'contain'}}
                alt="service icon"
            />
            <h4 className="font-card-title">
                { title }
            </h4>
            <p className="font-main">
                { description }
            </p>
        </div>
    );
};

export default ListItemCard;