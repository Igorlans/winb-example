import React from "react";
import Link from "next/link";

interface SideBarItemProps {
  title: string;
  link: string;
  onClick?: () => void;
  icon: React.ReactNode
  isActive?: boolean; // New prop for indicating active category
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  title,
  link,
  onClick,
  isActive = false,
  icon
}) => {
  const activeClass = isActive ? "bg-customPink text-white" : "";

  return (
    <Link href={link}>
      <div
        className={`w-full select-none flex items-center gap-[20px] py-[7.5px] pr-3 rounded-[25px] ${activeClass}`}
        onClick={onClick}
      >
        <div>
          {icon}
        </div>
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default SideBarItem;
