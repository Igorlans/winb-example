import {FC} from 'react'
import {UseFormReturn, useFieldArray, useWatch} from "react-hook-form"
import {Form} from '@/components/ui/form'
import FormInput from '@/components/ui/custom/FormInput'
import FormTextarea from '@/components/ui/custom/FormTextarea'
import FormImage from '@/components/ui/custom/FormImage'
import FormTextEditor from '@/components/ui/custom/FormTextEditor'

import FormCheckbox from '@/components/ui/custom/FormCheckbox'
import {Button} from '@/components/ui/button'
import IconButton from '@/components/adminpanel/IconButton'
import {LuPlus, LuTrash} from 'react-icons/lu'
import FormPickMember from "@/components/ui/custom/FormPickMember";
import { ClientMember } from "@/types";
import { ArticleFormValues } from "@/app/(admin)/adminpanel/services/formSchema";
import { Locale } from "@/i18n.config";

interface UIFormProps {
    mentors: ClientMember[];
    locale: Locale;
    disabled: boolean;
    form: UseFormReturn<ArticleFormValues>
}

const UIForm: FC<UIFormProps> = ({
    form,
    mentors,
    locale,
    disabled
}) => {
    const {fields: articleImages, append: setArticleImage, remove: removeArticleImage} = useFieldArray({
        control: form.control,
        name: "image",
        keyName: "formId"
    })

    const {isPaidService} = useWatch({
        control: form.control
    })

    return (
        <Form {...form}>
            <div className='flex flex-col gap-y-8'>
                <FormInput
                    name={`textFields.${locale}.title`}
                    control={form.control}
                    label="Заголовок статті"
                />
                <FormInput
                    name={`textFields.${locale}.description`}
                    control={form.control}
                    label="Підзаголовок статті"
                />
                <FormTextarea
                    name={`textFields.${locale}.text`}
                    control={form.control}
                    label="Основний текст"
                />
                <div className='flex flex-col gap-y-4'>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        Фото бізнес-послуги        
                    </label>
                    <div className='flex flex-wrap gap-4 max-w-[640px]'>
                        {
                            articleImages?.map((item, i) => (
                                <FormImage
                                    disabled={disabled}
                                    key={item.formId}
                                    name={`image.${i}.url`}
                                    control={form.control}
                                    onFieldRemove={() => removeArticleImage(i)}
                                    label={
                                        <div className={'flex justify-between items-center text-gray-400'}>
                                            <div>Фото {i + 1}</div>
                                            <Button size={'sm'} variant={'ghost'}
                                                    onClick={() => removeArticleImage(i)}>
                                                <LuTrash className={'text-sm'}/>
                                            </Button>
                                        </div>
                                    }
                                />
                            ))
                        }
                    </div>
                    <IconButton
                        disabled={disabled}
                        onClick={() => setArticleImage({
                            url: ""
                        })}
                        icon={<LuPlus className={'text-lg'}/>}
                        className='max-w-[192px]'
                    >
                        Додати
                    </IconButton>
                </div>
                <FormTextEditor
                    name={`textFields.${locale}.editor`}
                    control={form.control}
                    label='Текст'
                />

                <FormCheckbox
                    disabled={disabled}
                    name="isPaidService"
                    control={form.control}
                    label='Платна послуга'
                    description='Встановіть прапорець, щоб продавати дану послугу'
                />

                {
                    isPaidService &&
                    <FormPickMember
                        disabled={disabled}
                        members={mentors}
                        name={'mentors'}
                        control={form.control}
                        label={'Членкині, які надають послуги'}
                        shouldUnregister={false}
                    />
                }
            </div>
        </Form>
    )
}

export default UIForm