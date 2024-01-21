"use client"

import { FC } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import PageTitle from '@/components/adminpanel/PageTitle';
import IconButton from '@/components/adminpanel/IconButton';
import { BiSave } from 'react-icons/bi';
import { IoLocationOutline } from "react-icons/io5"
import UIForm from './_components/UIForm';

import toast from 'react-hot-toast';
import { apiRequest } from '@/utils/apiRequest';
import { useRouter } from 'next/navigation';
import { Region } from "@/types";
import { Locale, Locales } from "@/i18n.config";
import { RegionFormValues, useRegionFormSchema } from "@/app/(admin)/adminpanel/regions/formSchema";

interface RegionFormProps {
    region: Region;
    locale: Locale
}

const RegionForm: FC<RegionFormProps> = ({ region, locale }) => {
    if (!region) return <></>

    const router = useRouter();
    const { regionFormSchema } = useRegionFormSchema(locale);
    const disabled = locale !== Locales.uk

    const defaultValues: RegionFormValues = {
        ...region,
        video: region.video ?? "",
        banner: region.images.find((item) => item.isBanner)?.url ?? "/images/LeadMagnet.png",
        images: region.images.filter((item) => !item.isBanner).map(i => ({
            id: i.id,
            url: i.url,
            name: i.name ?? "image",
            isBanner: i.isBanner
        })),
        textFields: JSON.parse(region.textFields as string)
    }

    const form = useForm<RegionFormValues>({
        resolver: zodResolver(regionFormSchema),
        defaultValues,
        mode: "onBlur"
    })
    async function updateRegion (data: RegionFormValues) {
        await toast.promise(apiRequest({
                url: "/api/regions",
                method: "PUT",
                data
            }),
            {
                loading: "Оновлення регіону",
                success: () => {
                    router.refresh()
                    return "Регіон оновлено"
                },
                error: "Помилка"
            }
        )
    }

    return (
        <div>
            <div className="mt-4">
                <PageTitle
                    icon={<IoLocationOutline className={'text-3xl'} />}
                    title={"Редагування регіону"}
                    description={"Редагування регіону"}
                >
                    <div className={'flex gap-3'}>
                        <IconButton
                            type={'submit'}
                            onClick={form.handleSubmit(updateRegion)}
                            icon={<BiSave className={'text-lg'} />}
                        >
                            Зберегти
                        </IconButton>
                    </div>
                </PageTitle>
            </div>

            <div className='mt-8'>
                <UIForm
                    form={form}
                    locale={locale}
                    disabled={disabled}
                />
            </div>

        </div>
    )
}

export default RegionForm