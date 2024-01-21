'use client'

import {Button} from "@/components/ui/button";
import * as React from "react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { SelectItem as SelectItemType } from "@/components/ui/custom/FormSelect";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {FC, useCallback, useMemo} from "react";
import {DateRange} from "react-day-picker";
import RangeDatePicker from "@/components/ui/custom/RangeDatePicker";
import {Label} from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";


interface IFilterProps {
    regions: SelectItemType[];
    isArchive: boolean;
    closeDrawer?: () => void;
    locale: Locale
}


const Filter: FC<IFilterProps> = ({regions, locale, isArchive, closeDrawer}) => {

    const filter = useTranslations("filters");
    const t = useTranslations("Event")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const dateDefaultParams: DateRange = useMemo(() => {
        const searchQueryFrom = searchParams.get('from')
        const searchQueryTo = searchParams.get('to')
        const from = searchQueryFrom ? new Date(Number(searchQueryFrom)) : undefined
        const to = searchQueryTo ? new Date(Number(searchQueryTo)) : undefined

        return {from, to}
    }, [searchParams])

    const setQueryString = useCallback(
        (queryArray: { name: string, value: string }[]) => {
            const params = new URLSearchParams(searchParams)
            queryArray.forEach(queryItem => params.set(queryItem.name, queryItem.value))
            router.push(`${pathname}?${params.toString()}`)
        },
        [searchParams]
    )

    const clearQueryString = useCallback(
        (queryArr: string[]) => {
            const params = new URLSearchParams(searchParams)
            queryArr.forEach(queryItem => params.delete(queryItem))

            router.push(`${pathname}?${params.toString()}`)
        },
        [searchParams]
    )
    const setCity = (newValue: string) => {
        if (newValue === 'all') {
            clearQueryString(['city'])
        } else {
            setQueryString([{name: 'city', value: newValue}])
        }
    }

    const setSort = (newValue: string) => {
        setQueryString([{name: 'sort', value: newValue}])
    }

    const setDateQuery = (newValue: DateRange | undefined) => {
        if (newValue?.from && newValue?.to) {
            setQueryString([
                {name: 'from', value: String(newValue.from.getTime())},
                {name: 'to', value: String(newValue.to.getTime())},
            ])
        }
    }


    return (
        <div className="mb-12 grid grid-cols-1 items-center gap-3.5 md:gap-7 md:grid-cols-4">
            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { filter("date") }
                </Label>
                <RangeDatePicker
                    onClear={() => {
                        clearQueryString(['from', 'to'])
                    }}
                    locale={locale}
                    onSubmit={(newValue) => setDateQuery(newValue)}
                    defaultValue={dateDefaultParams}
                    fromDate={isArchive ? undefined : new Date()}
                    toDate={isArchive ? new Date() : undefined}
                />
            </div>

            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { filter("city") }
                </Label>
                <Select defaultValue={searchParams.get('city') || undefined}
                        onValueChange={(newValue) => setCity(newValue)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={ filter("city") }/>
                    </SelectTrigger>
                    <SelectContent className="w-full overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                            <SelectLabel>
                                { filter("city") }
                            </SelectLabel>
                            <SelectItem value={'all'}>
                                { filter("city_all") }
                            </SelectItem>
                            {regions.map(region =>
                                <SelectItem value={region.value}>
                                    {region.label}
                                </SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { filter("sort_date_title") }
                </Label>
                <Select defaultValue={searchParams.get('sort') || undefined}
                        onValueChange={(newValue) => setSort(newValue)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={filter("sort_date")}/>
                    </SelectTrigger>
                    <SelectContent className="w-full overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                            <SelectLabel>
                                { filter("sort_date_title") }
                            </SelectLabel>
                            <SelectItem value={'desc'}>
                                { filter("sort_nearest") }
                            </SelectItem>
                            <SelectItem value={'asc'}>
                                { filter("sort_distant") }
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className={'flex justify-end mt-6 md:hidden'}>
                <Button size={'lg'} variant={'primary'} onClick={closeDrawer}>
                    OK
                </Button>
            </div>


            <div className="hidden md:grid grid-cols-2 items-center gap-4 whitespace-nowrap">
                <Link href={
                    isArchive ? '/events/new' : '/events/archive'
                }>
                    <Button variant="link">
                        {
                            isArchive ?
                                t("events") : t("archive")
                        }
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Filter;