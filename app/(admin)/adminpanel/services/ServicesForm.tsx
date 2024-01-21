"use client"

import { FC } from 'react'

import PageTitle from '@/components/adminpanel/PageTitle'
import IconButton from '@/components/adminpanel/IconButton'
import { BiSave } from 'react-icons/bi'
import { RiServiceLine } from "react-icons/ri"


import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import UIForm from './_components/UIForm'
import toast from 'react-hot-toast'
import { apiRequest } from '@/utils/apiRequest'
import { useRouter } from 'next/navigation'
import { Article, ClientMember } from "@/types";
import { Locale, Locales } from "@/i18n.config";
import {
    ArticleFormValues,
    ArticleTextFieldsValue,
    useArticleFormSchema
} from "@/app/(admin)/adminpanel/services/formSchema";
import { createLocaleDefaultValues } from "@/utils";

interface ServiceFormProps {
    article?: Article
    mentors: ClientMember[]
    locale: Locale
    serviceId: string
}

const ServiceForm: FC<ServiceFormProps> = ({ article, serviceId, mentors, locale }) => {
    const isUpdate = !!article
    const disabled = locale !== Locales.uk
    const router = useRouter()

    const { articleFormSchema } = useArticleFormSchema(locale)
    const initialValues: ArticleFormValues = {
        textFields: {
            ...createLocaleDefaultValues<ArticleTextFieldsValue>({
                title: "",
                description: "",
                text: "",
                editor: ""
            })
        },
        serviceId,
        image: [],
        isPaidService: false,
        mentors: []
    }

    const defaultValues: ArticleFormValues = isUpdate ? {
        ...article,
        serviceId,
        image: article?.image.map(item => ({
            url: item
        })),
        mentors: article.Mentors.map(item => ({
            id: item.id
        })),
        textFields: JSON.parse(article?.textFields as string)
    } : initialValues

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema),
        defaultValues,
        mode: "onBlur"
    })

    const pageDescription = isUpdate ? `Редагування статті (${locale})` : `Створення нової статті (${locale})`
    const toastMessages = {
        loading: isUpdate ? "Оновлення статті" : "Створення статті",
        success: isUpdate ? "Статтю оновлено" : "Статтю створено",
    }
    async function saveArticle (data: ArticleFormValues) {
        await toast.promise(apiRequest({
                url: "/api/services",
                method: isUpdate ? "PUT" : "POST",
                data: {
                    ...data,
                    id: article?.id
                }
            }),
            {
                loading: toastMessages.loading,
                success: () => {
                    router.push(`/adminpanel/services/${serviceId}`);
                    return toastMessages.success
                },
                error: "Помилка"
            }
        )
    }
    
    return (
        <div>
            <div className="mt-4">
                <PageTitle
                    icon={<RiServiceLine className={'text-3xl'} />}
                    title={'Бізнес - послуги'}
                    description={pageDescription}
                >
                    <IconButton
                        icon={<BiSave className={'text-base'} />}
                        type="submit"
                        onClick={form.handleSubmit(saveArticle)}
                    >
                        Зберегти
                    </IconButton>
                </PageTitle>
            </div>

            <div className={'mt-8'}>
                <UIForm
                    form={form}
                    mentors={mentors}
                    disabled={disabled}
                    locale={locale}
                />
            </div>
        </div>
    )
}

export default ServiceForm