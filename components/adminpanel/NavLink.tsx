'use client'
import Link, {LinkProps} from "next/link";
import {FC, HTMLAttributes} from "react";
import {usePathname} from "next/navigation";

interface INavLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: HTMLAttributes<'a'>['className']
}
const NavLink: FC<INavLinkProps> = ({children, ...props}) => {

    const pathname = usePathname();
    const isActive = pathname === props.href;

    return (
        <Link {...props} className={isActive ? 'text-pink-600' : ''}>
            {children}
        </Link>
    );
};

export default NavLink;