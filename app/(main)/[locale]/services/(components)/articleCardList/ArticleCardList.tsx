"use client"

import { FC } from 'react'
import { useState } from "react"

import Link from 'next/link';
import ArticleCard from '@/components/cards/ArticleCard';

import { FullServiceArticle } from '@/types/services';
import SearchPannel from "@/app/(main)/[locale]/services/(components)/(search)/SearchPannel";
import { ClientArticle } from "@/types";

interface ArticleCardListProps {
    articles: ClientArticle[]
}

const ArticleCardList: FC<ArticleCardListProps> = ({ articles }) => {
    const [searchResults, setSearchResults] = useState<ClientArticle[]>(articles)

    function handleSearch (val: string) {
        if (val === "") {
            setSearchResults(articles)
        } else {
            const filteredArticles = articles.filter(item => {
                return item.textFields.title.toLowerCase().includes(val.toLowerCase())
            })
            setSearchResults(filteredArticles)
        }
    }

    return (
        <div>
            <SearchPannel searchFunc={handleSearch} />
            <div className={'flex flex-col gap-5 pt-4 md:pt-11'}>
                {
                    searchResults.length === 0 ? 
                        <>Нічого не знайдено</> :
                        searchResults.map(article =>
                            <Link href={`/services/${article.Service?.slug}/${article.slug}`}>
                                <ArticleCard 
                                    article={
                                        {
                                            img: article.image[0],
                                            title: article.textFields.title,
                                            description: article.textFields.description
                                        }
                                    }
                                />
                            </Link>
                        )
                }
            </div>
        </div>
    )
}

export default ArticleCardList