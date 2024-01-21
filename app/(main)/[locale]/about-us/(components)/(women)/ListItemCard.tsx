import Image from 'next/image';

type ListItemCardProps = {
    title: string;
    description: string;
}
const ListItemCard = ( { title, description } : ListItemCardProps ) => {
    return (
        <div className="grid grid-rows-[4fr_1fr] md:grid-rows-[0.5fr_0.2fr_1fr] gap-y-[10px] items-start justify-self-center">
            <Image
                src="/icons/icon_service.svg"
                width={60}
                height={60}
                className='w-full h-full max-w-[60px] max-h-[60px]'
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