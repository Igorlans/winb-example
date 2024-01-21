import { FC } from 'react'
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/FormInput'
import FormTextarea from '@/components/ui/custom/FormTextarea'
import FormImage from '@/components/ui/custom/FormImage'
import FormCheckbox from '@/components/ui/custom/FormCheckbox'
import { Button } from '@/components/ui/button'
import { LuPlus, LuTrash } from 'react-icons/lu'
import IconButton from '@/components/adminpanel/IconButton'
import FormVideo from "@/components/ui/custom/FormVideo";
import { RegionFormValues } from "@/app/(admin)/adminpanel/regions/formSchema";
import { Locale } from "@/i18n.config";

interface UIFormProps {
    form: UseFormReturn<RegionFormValues>;
    locale: Locale;
    disabled: boolean;
}

const UIForm: FC<UIFormProps> = ({ form, locale, disabled }) => {
    const { fields: regionImages, append: regionImageAppend, remove: regionImageRemove } = useFieldArray({
        control: form.control,
        name: "images",
        keyName: "formId"
    })
    return (
        <Form {...form}>
            <div className='flex flex-col gap-y-4'>
                <FormInput 
                    name={`textFields.${locale}.name`}
                    disabled={!disabled}
                    control={form.control}
                    label="Назва регіону"
                />
                <FormImage
                    name="banner"
                    control={form.control}
                    label="Банер регіону"
                    disabled={disabled}
                    imageClassName='w-full h-[380px]'
                />
                <FormInput 
                    name={`textFields.${locale}.title`}
                    control={form.control}
                    label="Заголовок регіону"
                />
                <FormTextarea 
                    name={`textFields.${locale}.description`}
                    control={form.control}
                    label="Опис регіону"
                />
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-y-4'>
                        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Зображення регіону</label>
                        <div className='flex flex-wrap gap-4 max-w-[640px]'>
                            {
                                regionImages?.map((item, i) => (
                                        <FormImage
                                            disabled={disabled}
                                            key={item.formId}
                                            name={`images.${i}.url`}
                                            control={form.control}
                                            onFieldRemove={() => regionImageRemove(i)}
                                            label={
                                                <div className={'flex justify-between items-center text-gray-400'}>
                                                    <div>Зображення регіону {i + 1}</div>
                                                    <Button disabled={disabled} size={'sm'} variant={'ghost'}
                                                            onClick={() => regionImageRemove(i)}>
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
                                onClick={() => regionImageAppend({
                                    url: '',
                                    isBanner: false
                                })}
                                icon={<LuPlus className={'text-lg'} />}
                                className='max-w-[192px]'
                            >
                                Додати
                            </IconButton>
                    </div>
                    <div className='flex flex-col gap-y-4 w-1/2'>
                        <FormInput 
                            name={`textFields.${locale}.cityTitle`}
                            control={form.control}
                            label="Назва міста"
                        />
                        <FormTextarea 
                            name={`textFields.${locale}.cityDescription`}
                            control={form.control}
                            label="Опис міста"
                        />
                    </div>
                </div>
                <FormVideo disabled={disabled} name={'video'} control={form.control} label={'Відео'} />
                <FormCheckbox
                    disabled={disabled}
                    name="isActive"
                    control={form.control}
                    label='Позначити як активний'
                    description='Якщо даний прапорець доступний, то сторінка буде опублікованою та доступною всім'
                />
            </div>
        </Form>
    )
}

export default UIForm