"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import type { FullService, FullServiceArticle, ServiceParams } from "@/types/services"
import { ClientService } from "@/types";

export default function useActiveService (service: ClientService, serviceParams: {slug: string}) {
    const router = useRouter()
    const params = useSearchParams()
    const paramService = params.get("article")

    const [activeArticle, setActiveArticle] = useState<string | null>(null) // articleId
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (isMobile) return
        if (!activeArticle) setActiveArticle(service?.Articles[0]?.id) // set initial variant
    }, [])

    useEffect(() => {
        const activeServiceArticle = service.Articles.find((item: FullServiceArticle) => item.id === activeArticle)
        if (activeServiceArticle?.slug) router.replace(`?article=${article?.slug}`, { scroll: false }) // set variant title to search params
    }, [activeArticle])


    useEffect(() => {
        if (!paramService) setActiveArticle(null)
    }, [paramService])

    useEffect(() => {
        if(isMobile) {
            router.replace(`/services/${serviceParams.slug}`)
            setActiveArticle(null)
        }
        else (setActiveArticle(service?.Articles[0]?.id))
    }, [isMobile])

    const article: FullServiceArticle | null = useMemo(() => {
        const article = service.Articles.find((item: FullServiceArticle) => item.id === activeArticle)

        if (article) return article
        else return null
    }, [activeArticle])

    function handleArticleChange(id: string) {
        if (id) setActiveArticle(id)
        else  setActiveArticle(service?.Articles[0]?.id) // set initial variant
    }

    return {
        article,
        handleArticleChange,

        isMobile,
        setIsMobile
    }
}