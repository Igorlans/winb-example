"use client";

import SearchIcon from "@/components/ui/custom/searchIcon";
import { IoCloseCircle } from "react-icons/io5";
import { FC } from "react";
import { cx } from "class-variance-authority";

type Props = {
    value: string;
    className?: string;
    onChange: (val: string) => void;
}

const SearchBar: FC<Props> = ({ value, onChange, className }) => {

    return (
        <div className={cx(
            "flex items-center justify-between gap-x-[0.5vw] h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            className
        )}>
            <SearchIcon />
            <input className="w-full text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                   placeholder={`Ім'я, звання, email...`}
                   value={value}
                   onChange={(e) => onChange(e.target.value)}
            />
            {
                value.length > 0 &&
                <IoCloseCircle
                    className={"text-muted-foreground cursor-pointer"}
                    onClick={() => onChange("")}
                />
            }
        </div>
    )
}

export default SearchBar