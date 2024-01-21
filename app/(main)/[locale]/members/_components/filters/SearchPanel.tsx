import SearchIcon from "@/components/ui/custom/searchIcon";
import { FC } from "react";
import { useTranslations } from "next-intl";

type Props = {
    value: string;
    onChange: (val: string) => void;
}
export const SearchPanel: FC<Props> = ({ value, onChange }) => {
    const t = useTranslations("form")
    return (
        <div className="basis-1/3 md:basis-full flex items-center justify-between gap-x-[0.5vw] h-10 w-full rounded-md border border-input bg-background px-3 py-2">
            <SearchIcon />
            <input className="w-full text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                   placeholder={`${t("search")}...`}
                   value={value}
                   onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}