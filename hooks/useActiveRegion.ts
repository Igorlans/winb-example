"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import { FullRegion } from "@/types/types"
import { ClientRegion } from "@/types";

// function transformTitle(title: string) {
//     const words = title.trim().toLocaleLowerCase().split(" ")
//     return words.reduce((acc, item) => acc + "_" + item, "").slice(1)
// }

export default function useActiveRegion (regions: ClientRegion[]) {
    const router = useRouter()
    const params = useSearchParams()
    const paramRegion = params.get("region")

    const [activeRegion, setActiveRegion] = useState<string | null>(null) // regionId
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (isMobile) return
        if (!activeRegion) setActiveRegion(regions[0].id) // set initial variant
    }, [])

    useEffect(() => {
        const activeRegionTitle = regions.find((region: FullRegion) => region.id === activeRegion)
        if (activeRegionTitle?.textFields.name) router.replace(`?region=${region?.slug}`, { scroll: false }) // set variant title to search params
    }, [activeRegion])


    useEffect(() => {
        if (!paramRegion) setActiveRegion(null)
    }, [paramRegion])

    useEffect(() => {
        if(isMobile) {
            router.replace("/regions")
            setActiveRegion(null)
        }
        else (setActiveRegion(regions[0].id))
    }, [isMobile])

    const region: FullRegion | null = useMemo(() => {
        const region = regions?.find((region: FullRegion) => region.id === activeRegion)

        if (region) return region
        else return null
    }, [activeRegion])

    function handleRegionChange(id: string) {
        if (id) setActiveRegion(id)
        else  setActiveRegion(regions[0].id) // set initial variant
    }

    return {
        region,
        handleRegionChange,

        isMobile,
        setIsMobile
    }
}