import Link from "next/link";
import { ClientService } from "@/types";
type SingleCategor = {
    service: ClientService
}
const SingleCategor = ({ service } : SingleCategor) => {
    return (
        <Link href={`/services/${service.slug}`}>
            <li className="flex items-center rounded-[10px] py-2 gap-x-[10px] md:gap-x-[20px] hover:text-darkPink ease-out duration-300">
                <span className="border-darkPink border-2 h-5"></span>
                <h3 className="font-subtitle">{ service.textFields.title }</h3>
            </li>
        </Link>
    );
};

export default SingleCategor;