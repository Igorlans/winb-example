import Link from "next/link";
type SingleCategor = {
    id: string,
    name: string,
    article: string
}
const SingleCategor = ({ id, name, article } : SingleCategor) => {
    return (
        <Link href={`/services/${id}/${article}`}>
            <li className="flex items-center rounded-[10px] p-[10px] gap-x-[10px] md:gap-x-[20px]">
                <span className="border-[#C13C69] border-2 h-[25px]"></span>
                <span className="text-xs md:text-lg">{ name }</span>
            </li>
        </Link>
    );
};

export default SingleCategor;