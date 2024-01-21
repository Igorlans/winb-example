'use client'

import {Control, FieldPathValue, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import ImageUpload from "@/components/ui/custom/ImageUpload";

interface IFormImageProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string | React.ReactNode;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
    onFieldRemove?: () => void;
    imageClassName?: string
}

const FormImage = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              disabled,
                                              defaultValue,
                                              onChangeTrigger,
                                              onFieldRemove,
                                              imageClassName

                                          }: IFormImageProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={disabled}
                            onFieldRemove={onFieldRemove}
                            onChange={(url) => {
                                field.onChange(url as FieldPathValue<FieldValues, string>)
                                onChangeTrigger && onChangeTrigger(url)
                            }}
                            onRemove={() => field.onChange('' as FieldPathValue<FieldValues, string>)}
                            imageClassName={imageClassName}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImage;
