"use client"
import React, { FC, useMemo, useState } from "react"
import {format} from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { uk, enUS, pl } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Separator} from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Locale as i18Locale } from "@/i18n.config";
import { Locale } from "date-fns";


interface IRangeDatePickerProps {
    onSubmit: (newValue: DateRange | undefined) => void;
    onClear: () => void;
    defaultValue?: DateRange;
    fromDate?: Date;
    toDate?: Date;
    locale?: i18Locale
}
const RangeDatePicker: FC<IRangeDatePickerProps> = ({
                                         onSubmit,
    onClear,
    locale = "uk",
    defaultValue, fromDate, toDate
                                    }) => {

    const [date, setDate] = useState<DateRange | undefined>(defaultValue || undefined)
    const [open, setOpen] = useState<boolean>(false)

    const filter = useTranslations("filters")

    const handleSubmit = () => {
        onSubmit(date)
        setOpen(false)
    }

    const currentLocale: Locale = useMemo(() => {
        switch (locale) {
            case "uk": return uk;
            case "en": return enUS;
            case "pl": return pl;
            default: return uk
        }
    }, [locale])

    const handleClear = () => {
        onClear()
        setOpen(false)
        setDate(undefined)
    }
    return (
        <div className={cn("grid gap-2")}>
            <Popover open={open} onOpenChange={(newValue) => setOpen(newValue)}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y", {locale: currentLocale})} -{" "}
                                    {format(date.to, "LLL dd, y", {locale: currentLocale})}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y", {locale: currentLocale})
                            )
                        ) : (
                            <span>
                                { filter("range_all_time") }
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        locale={currentLocale}
                        initialFocus
                        mode="range"
                        fromDate={fromDate}
                        toDate={toDate}
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                    <Separator />
                    <div className={'p-3 flex justify-end'}>
                        <div className={'flex gap-5'}>
                            <Button variant={'outline'} size={'sm'} onClick={handleClear}>
                                { filter("range_all_time") }
                            </Button>
                            <Button disabled={!date?.from || !date?.to} size={'sm'} onClick={handleSubmit}>
                                OK
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default RangeDatePicker