import React from 'react';
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";

interface IFormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder: string;
    description?: string;
    disabled?: boolean;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    options: SelectItem[];
    className?: string;
}

export type SelectItem = {
    label: string | React.ReactNode;
    value: string;
} | {
    label: 'separator',
    value: 'separator',
}
const FormSelect = <T extends FieldValues>({
    name, control, label, shouldUnregister, description, defaultValue, options, placeholder, className, disabled = false
                                           }: IFormSelectProps<T>) => {
    return (
            <FormField
                control={control}
                name={name}
                defaultValue={defaultValue}
                shouldUnregister={shouldUnregister}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select disabled={disabled} onValueChange={(value) => field.onChange(value as PathValue<any, any>)} defaultValue={field.value} >
                            <FormControl>
                                <SelectTrigger className={className}>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[55vh]'>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {options?.map((option, index) => {
                                        if (option.value === 'separator' && option.label === 'separator') {
                                            return (
                                                <Separator />
                                            )
                                        } else {
                                            return (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                            )
                                        }
                                    }

                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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

export default FormSelect;