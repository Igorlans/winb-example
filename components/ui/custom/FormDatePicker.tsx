import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import dayjs from "dayjs";
import {useState} from "react";
import {da} from "date-fns/locale";


interface IFormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    description?: string;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
}

const FormDatePicker = <T extends FieldValues>({
    name,
    control,
    label,
    description,
    shouldUnregister,
    defaultValue,
    disabled,
    onChangeTrigger
                                               }: IFormDatePickerProps<T>) => {

    const [open, setOpen] = useState(false)

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild disabled={disabled}>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "max-w-[240px] w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        dayjs(Number(field.value)).format('DD.MM.YYYY')
                                    ) : (
                                        <span>Виберіть дату</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={new Date(Number(field.value))}
                                onSelect={(date) => {
                                    field.onChange(String(date?.getTime()))
                                    setOpen(false)
                                }}
                                disabled={disabled}
                                // disabled={(date) =>
                                //     date > new Date() || date < new Date("1900-01-01")
                                // }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {description &&
                        <FormDescription>
                            {description}
                        </FormDescription>
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormDatePicker;