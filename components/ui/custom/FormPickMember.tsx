import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import PickMember, {IdObject} from "@/components/ui/custom/PickMember";
import { ClientMember } from "@/types";

interface IFormInputProps<T extends FieldValues> {
    members: ClientMember[];
    name: Path<T>;
    control: Control<T>;
    disabled?: boolean;
    label: string;
    description?: string;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    onChangeTrigger?: (newValue: IdObject[]) => void;
}

const FormPickMember = <T extends FieldValues>({
                                                   name,
                                                   control,
                                                   label,
                                                   defaultValue,
                                                    disabled = false,
                                                   shouldUnregister = true,
                                                   description,
                                                   onChangeTrigger,
                                                   members

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
                        <PickMember
                            disabled={disabled}
                            members={members}
                            value={field.value}
                            setValue={(newValue) => {
                                onChange(newValue)
                                onChangeTrigger?.(newValue)
                            }}
                        />
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

export default FormPickMember;