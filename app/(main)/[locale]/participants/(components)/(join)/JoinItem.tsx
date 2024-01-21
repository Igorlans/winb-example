import "./style.css"

type JoinItemProps = {
    num: number;
    title: string;
    text: string;
}

const JoinItem = ( { num, title, text } : JoinItemProps ) => {
    return (
        <div className='joinItem flex select-none items-center gap-x-[1vw] max-h-[190px]'>
            <span className='text-[90px]  md:text-[150px]'>
                { num }
            </span>
            <div className='flex flex-col md:gap-y-[20px] md:max-w-[340px]'>
                <h4 className="font-card-title">{title}</h4>
                <p className="font-main min-h-[48px]">
                    { text }
                </p>
            </div>
        </div>
    );
};

export default JoinItem;