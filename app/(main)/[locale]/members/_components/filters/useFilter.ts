"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Fields = "region" | "status" | "business" | "search"
const fields: Fields[] = ["region", "status", "business", "search"]
export type Value = string | "all"
type DefaultValue = Record<Fields, Value | undefined>

export default function useFilters() {

    const [search, setSearch] = useState("")

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const setQuery = useCallback((query: {key: Fields, val: Value}[]) => {

        query.forEach(item => params.set(item.key, item.val));
        router.replace(`${pathname}?${params.toString()}`)

    }, [pathname]);
    const clearQuery = useCallback((query: Fields[]) => {

        query.forEach(item => params.delete(item))
        router.replace(`${pathname}?${params.toString()}`)

    }, [searchParams]);
    const defaultValues: DefaultValue = useMemo(() => {
        const params = new URLSearchParams(searchParams);
        let defaultValues: DefaultValue = {
            region: "all",
            status: "all",
            business: "all",
            search: ""
        }
        fields.forEach(item => {
            defaultValues = {
                ...defaultValues,
                [item]: params.get(item) ?? undefined
            }
        })
        return defaultValues
    }, [searchParams])

    const setRegion = (val: Value) => {
        if(val === "all") clearQuery(["region"]);
        else setQuery([{ key: "region", val }]);
    }

    const setMemberType = (val: Value) => {
        if(val === "all") clearQuery(["status"]);
        else setQuery([{ key: "status", val }]);
    }

    const setBusiness = (val: Value) => {
        if(val === "all") clearQuery(["business"]);
        else setQuery([{ key: "business", val }])
    }

    useEffect(() => {

        const handler = setTimeout(() => {
            if(search.length === 0) clearQuery(["search"])
            else setQuery([{ key: "search", val: search.toLowerCase() }])
        }, 500);

        return () => clearTimeout(handler);

    }, [search]);

    return {
        defaultValues,
        setRegion,
        setMemberType,
        setBusiness,
        setSearch,
        search
    }
}