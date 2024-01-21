import React, {HTMLInputTypeAttribute} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import MaskInput from "@/components/ui/custom/MaskInput";
import {Masks} from "@/utils/masks";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    mask?: string
    maskChar?: string
    description?: string;
    type?: HTMLInputTypeAttribute;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
}

const FormInput = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              defaultValue,
                                              shouldUnregister = true,
                                              type = 'text',
                                              placeholder,
                                              description,
                                              disabled = false,
                                              onChangeTrigger,
                                              mask,
    maskChar

                                          }: IFormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({field: {onChange, ...field}}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {mask ?
                            <MaskInput
                                onChange={(newValue) => {
                                    onChange(newValue);
                                    onChangeTrigger && onChangeTrigger(newValue);
                                }}
                                mask={mask}
                                maskChar={maskChar}
                                placeholder={placeholder}
                                {...field}
                                disabled={disabled}
                            />
                            :
                            <Input
                                {...field}
                                type={type}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    onChange(e);
                                    onChangeTrigger && onChangeTrigger(newValue);
                                }}
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        }


                    </FormControl>
                    {
                        description &&
                        <FormDescription>{description}</FormDescription>
                    }
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormInput;