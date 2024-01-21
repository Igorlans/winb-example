import React, {HTMLInputTypeAttribute, ReactElement, ReactNode, ReactNodeArray} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Control, FieldValues, Path, PathValue} from "react-hook-form";

import {Editor} from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from 'tinymce';
import {useRef} from 'react';

interface IFormTextEditorProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
}

const API_KEY = process.env.NEXT_TEXTEDITOR_API_KEY

const FormTextEditor = <T extends FieldValues>({
                                                   name,
                                                   control,
                                                   label,
                                                   defaultValue,
                                                   shouldUnregister = true,
                                                   type = 'text',
                                                   placeholder,
                                                   description,
                                                   disabled,
                                                   onChangeTrigger,
                                               }: IFormTextEditorProps<T>) => {
    const formEditorRef = useRef<TinyMCEEditor | null>(null)
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({field: {onChange, value}}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Editor
                            apiKey={API_KEY}
                            //@ts-ignore
                            onInit={(editor) => (formEditorRef.current = editor)}
                            onBlur={(focused, editor) => {
                                const newValue = editor.getContent();
                                onChange(newValue)
                                onChangeTrigger && onChangeTrigger(newValue)
                            }
                            }
                            disabled={disabled}
                            initialValue={value}
                            init={{
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                    "toc",
                                    "visualchars",
                                    "hr",
                                    "link",
                                    "imagetools",
                                    "autolink",
                                    "nonbreaking",
                                    "emoticons",
                                    "imagetools",
                                    "media",
                                    "textpattern",
                                    "wordcount",
                                    "image",
                                ],
                                toolbar:
                                    "undo redo | " +
                                    "bold italic underline strikethrough | " +
                                    "alignleft aligncenter alignright alignjustify | " +
                                    "outdent indent | " +
                                    "link image media | " +
                                    +"bullist | numlist |" +
                                    +"styleselect |" +
                                    "charmap emoticons | " +
                                    "code | " +
                                    "table | " +
                                    "fullscreen | " +
                                    "styleselect |" +
                                    " image",
                                menubar:
                                    "file edit view insert format tools table help",
                                toolbar_mode: "sliding",
                                contextmenu:
                                    "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
                                visualblocks_default_state: true,
                                fontsize_formats:
                                    "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
                                textpattern_patterns: [
                                    {start: "*", end: "*", format: "italic"},
                                    {start: "**", end: "**", format: "bold"},
                                    {start: "#", format: "h1"},
                                    {start: "##", format: "h2"},
                                    {start: "###", format: "h3"},
                                    {start: "####", format: "h4"},
                                    {start: "#####", format: "h5"},
                                    {start: "######", format: "h6"},
                                    {start: "1. ", cmd: "InsertOrderedList"},
                                    {start: "* ", cmd: "InsertUnorderedList"},
                                    {start: "- ", cmd: "InsertUnorderedList"},
                                ],
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

export default FormTextEditor;