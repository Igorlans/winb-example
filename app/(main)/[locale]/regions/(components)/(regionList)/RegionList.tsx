"use client"

import { FC } from 'react'
import { useState } from 'react'

import Link from 'next/link'
import ArticleCard from '@/components/cards/ArticleCard'
import SearchPannel from '@/app/(main)/[locale]/services/(components)/(search)/SearchPannel'
import { ClientRegion } from "@/types";

interface RegionListProps {
    regions: ClientRegion[]
}

const RegionList: FC<RegionListProps> = ({ regions }) => {
    const [searchResults, setSearchResults] = useState<ClientRegion[]>(regions)

    function handleSearch (val: string) {
        if (val === "") {
            setSearchResults(regions)
        } else {
            const filteredRegions = regions.filter(item => {
                return item.textFields.name.toLowerCase().includes(val.toLowerCase()!)
            })
            setSearchResults(filteredRegions)
        }
    }

    return (
        <div>
            <SearchPannel searchFunc={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 md:pt-11">
                {
                    searchResults.length === 0 ?
                        <>Нічого не знайдено</> :
                        searchResults.map((region) => (
                            <Link href={`/regions/${region.slug}`}>
                                <ArticleCard
                                    className='md:min-h-20'
                                    buttonText='Переглянути'
                                    article={
                                        {
                                            img: region.images.find(item => item.isBanner)?.url ?? "/images/LeadMagnet.png",
                                            title: region.textFields.name,
                                            description: region.textFields.description
                                        }
                                    }
                                />
                            </Link>
                        ))
                }
            </div>
        </div>
    )
}

export default RegionList