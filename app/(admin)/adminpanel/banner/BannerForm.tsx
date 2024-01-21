"use client"

import { FC } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import type { BannerFormValue, BannerTextFieldsValue } from './formSchema'

import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/FormInput'
import FormSelect from '@/components/ui/custom/FormSelect'
import PageTitle from '@/components/adminpanel/PageTitle'
import IconButton from '@/components/adminpanel/IconButton'
import { BiSave, BiImage } from 'react-icons/bi'

import { $Enums } from '@prisma/client'
import FormImage from '@/components/ui/custom/FormImage'
import toast from 'react-hot-toast'
import { apiRequest } from '@/utils/apiRequest'
import { useBannerFormSchema } from "./formSchema";
import { Locale, Locales } from "@/i18n.config";
import { createLocaleDefaultValues } from "@/utils";
import { Banner } from "@/types";

interface BannerFormProps {
    banner?: Banner | null;
    locale: Locale
}

const BannerForm: FC<BannerFormProps> = ({ banner, locale }) => {
    const isUpdate = !!banner
    const disabled = locale !== Locales.uk;
    const router = useRouter()

    const { bannerFormSchema } = useBannerFormSchema(locale)
    const initialValues: BannerFormValue = {
        textFields: {
            ...createLocaleDefaultValues<BannerTextFieldsValue>({
                title: "",
                subtitle: ""
            })
        },
        type: "MAIN",
        image: "",
        link: ""
    }

    const defaultValues: BannerFormValue = isUpdate ? {
        ...banner,
        link: banner.link ?? undefined,
        textFields: JSON.parse(banner.textFields as string),
    } : initialValues

    const form = useForm<BannerFormValue>({
        resolver: zodResolver(bannerFormSchema),
        defaultValues,
        mode: "onBlur"
    })

    const toastMessages = {
        loading: isUpdate ? "Оновлення банеру" : "Створення банеру",
        success: isUpdate ? "Банер оновлено" : "Банер створено",
    }
    async function saveBanner (data: BannerFormValue) {
        await toast.promise(apiRequest({
                url: "/api/banner",
                method: isUpdate ? "PUT" : "POST",
                data: {
                    ...data,
                    id: banner?.id
                }
            }),
            {
                loading: toastMessages.loading,
                success: () => {
                    router.refresh()
                    return toastMessages.success
                },
                error: "Помилка"
            })
    }

    return (
        <div>
            <Form {...form}>
                <PageTitle icon={<BiImage className={'text-3xl'}/>} title={'Створення банеру'}
                           description="">
                    <IconButton
                        icon={<BiSave className={'text-base'}/>}
                        onClick={form.handleSubmit(saveBanner)}
                    >
                        Зберегти
                    </IconButton>

                </PageTitle>
                <div className='grid grid-cols-2 gap-x-4 pt-6'>
                    <div className='flex flex-col gap-y-4'>
                        <FormSelect 
                            name="type"
                            control={form.control}
                            label='Сторінка'
                            placeholder='Виберіть сторінку'
                            description='Виберіть сторінку, на якій розмістити даний банер'
                            options={[
                                {label: 'Головна сторінка', value: $Enums.BannerType.MAIN}
                            ]}
                        />
                        <FormInput 
                            name={`textFields.${locale}.title`}
                            control={form.control}
                            label='Заголовок'
                        />
                        <FormInput 
                            name={`textFields.${locale}.subtitle`}
                            control={form.control}
                            label='Підзаголовок'
                        />
                        <FormInput
                            disabled={disabled}
                            name="link"
                            control={form.control}
                            label='Посилання'
                        />
                        <FormImage
                            name="image"
                            control={form.control}
                            label=''
                            disabled={form.getValues("image").length > 0 || disabled}
                        />
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default BannerForm