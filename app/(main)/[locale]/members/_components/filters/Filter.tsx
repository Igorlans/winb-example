"use client";

import useFilters from "@/app/(main)/[locale]/members/_components/filters/useFilter";
import { SearchPanel } from "@/app/(main)/[locale]/members/_components/filters/SearchPanel";
import { Label } from "@/components/ui/label";
import { SelectItem as SelectItemType } from "@/components/ui/custom/FormSelect";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as React from "react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";

type Props = {
    regionOptions: SelectItemType[],
    businessOptions: SelectItemType[],
    statusOptions: SelectItemType[]
    closeDrawer?: () => void;
}
export const Filter: FC<Props> = ({ regionOptions,statusOptions, businessOptions, closeDrawer }) => {

    const t = useTranslations("filters");
    const field = useTranslations("form");

    const {
        defaultValues,
        search,
        setSearch,
        setRegion,
        setMemberType,
        setBusiness
    } = useFilters();

    return (
        <div className={"mb-12 grid grid-cols-1 items-center gap-3.5 md:gap-7 md:grid-cols-4"}>
            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { t("city") }
                </Label>
                <Select defaultValue={defaultValues.region}
                        onValueChange={setRegion}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("city")}/>
                    </SelectTrigger>
                    <SelectContent className="w-full overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                            <SelectLabel>
                                { t("city") }
                            </SelectLabel>
                            <SelectItem value={'all'}>
                                { t("city_all") }
                            </SelectItem>
                            {
                                regionOptions.map(item =>
                                <SelectItem value={item.value}>
                                    { item.label }
                                </SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { t("status") }
                </Label>
                <Select defaultValue={defaultValues.status}
                        onValueChange={setMemberType}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("status")}/>
                    </SelectTrigger>
                    <SelectContent className="w-full overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                            <SelectLabel>
                                { t("status") }
                            </SelectLabel>
                            <SelectItem value={'all'}>
                                { t("any") }
                            </SelectItem>
                            {
                                statusOptions.map(item =>
                                    <SelectItem value={item.value}>
                                        { item.label }
                                    </SelectItem>
                                )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { t("business") }
                </Label>
                <Select defaultValue={defaultValues.business}
                        onValueChange={setBusiness}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("business")}/>
                    </SelectTrigger>
                    <SelectContent className="w-full overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                            <SelectLabel>
                                { t("business") }
                            </SelectLabel>
                            <SelectItem value={'all'}>
                                { t("any") }
                            </SelectItem>
                            {
                                businessOptions.map(item =>
                                    <SelectItem value={item.value}>
                                        { item.label }
                                    </SelectItem>
                                )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className={'space-y-3'}>
                <Label className={'block md:hidden'}>
                    { field("search") }
                </Label>
                <SearchPanel value={search} onChange={setSearch} />
            </div>

            <div className={'flex justify-end mt-6 md:hidden'}>
                <Button size={'lg'} variant={'primary'} onClick={closeDrawer}>
                    OK
                </Button>
            </div>

        </div>
    )
}