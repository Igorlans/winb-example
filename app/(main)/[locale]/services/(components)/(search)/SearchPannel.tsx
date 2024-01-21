'use client'

import SearchIcon from "@/components/ui/custom/searchIcon";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type SearchPannelProps = {
    searchFunc?: (value: string) => void;
};

const SearchPannel = ({ searchFunc } : SearchPannelProps) => {

    const field = useTranslations("form")

    const [inputValue, setInputValue] = useState<string>("")
    // const [debounceRequest, setDebounceRequest] = useState<string>("")

    // const searchParams = useSearchParams()
    // const pathname = usePathname()
    // const router = useRouter()

    // const createQueryString = useCallback((name: string, value: string) => {
    //     const params = new URLSearchParams(searchParams)
    //     params.set(name, value)
    //     return params.toString()
    // }, [searchParams])

    useEffect(() => {
        if (searchFunc) {
            searchFunc(inputValue)
        }
        // const timeout = setTimeout(() => {
        //     setDebounceRequest(inputValue);
        // }, 500);
        // return () => clearTimeout(timeout);
    }, [inputValue])

    // useEffect(() => {
    //     if (debounceRequest === "") {
    //         router.replace(pathname)
    //     } else {
    //         console.log(debounceRequest);
    //         router.replace(pathname + '?' + createQueryString('query', debounceRequest))
    //     }
    // }, [debounceRequest])

    return (
        <div className="basis-1/3 md:basis-full flex items-center justify-between gap-x-[0.5vw] h-10 w-full rounded-md border border-input bg-background px-3 py-2">
            <SearchIcon />
            <input className="w-full text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={`${field("search")}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};

export default SearchPannel;