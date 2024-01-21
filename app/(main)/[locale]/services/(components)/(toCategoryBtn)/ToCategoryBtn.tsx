import Link from "next/link";

type ToCategoryBtnProps = {
    url: string;
    category: string | undefined;
}
const ToCategoryBtn = ( { url, category } : ToCategoryBtnProps ) => {
    return (
        <Link href={url}>
            <button className='flex items-center gap-x-[2vw] pb-[20px]'>
                <svg width="10" height="19" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector 14" d="M12 1L2 11L12 21" stroke="#C9547E" stroke-width="2"/>
                </svg>
                <span className="text-sm text-ring font-bold">{category}</span>
            </button>
        </Link>
    );
};

export default ToCategoryBtn;