'use client'
import PageTitle from "@/components/adminpanel/PageTitle";
import {BsCalendarEvent} from "react-icons/bs";
import IconButton from "@/components/adminpanel/IconButton";
import {BiEdit, BiSave} from "react-icons/bi";
import React, { FC } from "react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import FormCard from "@/components/ui/custom/FormCard";
import List from "@/components/adminpanel/List";
import Title from "@/components/adminpanel/Title";
import FormInput from "@/components/ui/custom/FormInput";
import FormSelect, {SelectItem} from "@/components/ui/custom/FormSelect";
import FormImage from "@/components/ui/custom/FormImage";
import {Form} from "@/components/ui/form";
import FormDatePicker from "@/components/ui/custom/FormDatePicker";
import FormTextarea from "@/components/ui/custom/FormTextarea";
import {
    EventFormValue, EventGuestTextFieldsValue,
    EventTextFieldsValue,
    useEventFormSchema,
} from "@/app/(admin)/adminpanel/events/_components/formSchema";
import toast from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import type { Event } from "@/types";
import { Locale, Locales } from "@/i18n.config";
import { createLocaleDefaultValues } from "@/utils";
import FormCheckbox from "@/components/ui/custom/FormCheckbox";
import FormTextEditor from "@/components/ui/custom/FormTextEditor";
interface IEventFormProps {
    event?: Event;
    regionOptions: SelectItem[]
    locale: Locale
}


const EventForm: FC<IEventFormProps> = ({event, regionOptions, locale}) => {
    const router = useRouter()
    const { eventFormSchema } = useEventFormSchema(locale)

    const isUpdate = !!event;

    const disabled = locale !== Locales.uk;

    // TEXTS
    const pageDescription = isUpdate ? `Редагування події` : 'Cтворення нової події';
    const pageTitle = isUpdate ? `Редагування події (${locale})` : `Створення події (${locale})`;
    const errorMessage = isUpdate ? 'Помилка редагування події' : 'Помилка створення події';
    const loadingMessage = isUpdate ? 'Редагування події...' : 'Створення події...';
    const successMessage = isUpdate ? 'Подію відредаговано' : 'Подію створено';


    const initialValues: EventFormValue = {
        textFields: {
            ...createLocaleDefaultValues<EventTextFieldsValue>({
                title: "",
                description: "",
                venue: ""
            })
        },
        eventGuest: {
            ...createLocaleDefaultValues<EventGuestTextFieldsValue>({
                name: "",
                description: "",
            }),
            image: "",
            link: ""
        },
        isMemberEvent: false,
        image: "",
        price: "",
        memberPrice: "",
        places: "",
        date: "",
        startTime: "",
        endTime: "",
        networkStatus: "OFFLINE",
        regionId: ""
    }

    const defaultValues: EventFormValue = isUpdate ? {
        ...event,
        price: String(event?.price),
        memberPrice: String(event?.memberPrice),
        places: String(event?.places),
        eventGuest: JSON.parse(event?.eventGuest as string),
        regionId: event?.regionId ?? "",
        textFields: JSON.parse(event?.textFields as string) ?? initialValues.textFields
    } : initialValues

    const methods = useForm<EventFormValue>({
        defaultValues,
        resolver: zodResolver(eventFormSchema)
    })

    const {networkStatus} = useWatch({
        control: methods.control
    })

    const submitHandler = async (data: EventFormValue) => {
        await toast.promise(
            apiRequest({
                url: '/api/events',
                data: {
                    ...data,
                    id: event?.id
                },
                method: isUpdate ? 'PUT' : "POST"
            }),
            {
                loading: loadingMessage,
                success: () => {
                    // router.push('/adminpanel/events')
                    router.refresh()
                    return successMessage
                },
                error: () => {
                    return errorMessage;
                }
            })
    }

    return (
        <Form {...methods}>
            <div className="mt-4">
                <PageTitle icon={<BsCalendarEvent className={'text-3xl'}/>} title={pageTitle}
                           description={pageDescription}>
                    <IconButton
                        icon={<BiSave className={'text-base'}/>}
                        onClick={methods.handleSubmit(submitHandler)}
                    >
                        Зберегти
                    </IconButton>

                </PageTitle>
            </div>
            <List className={'mt-8'}>
                <FormCard>
                    <List>
                        <Title icon={<BiEdit className={'text-2xl'}/>} className={'mb-6'}>Загальна інформація</Title>
                        <div className={'grid gap-5 grid-cols-1 md:grid-cols-2'}>
                            <FormCard>
                                <List>
                                    <FormInput
                                        name={`textFields.${locale}.title`}
                                        control={methods.control}
                                        label={'Назва події'}
                                    />
                                    <FormInput
                                        disabled={disabled}
                                        name={'places'}
                                        control={methods.control}
                                        label={'Кількість місць'}
                                    />
                                    <FormCheckbox
                                        disabled={disabled}
                                        name="isMemberEvent"
                                        control={methods.control}
                                        label='Подія лише для членкинь'
                                    />
                                    <FormInput
                                        disabled={disabled || methods.watch("isMemberEvent")}
                                        name={'price'}
                                        control={methods.control}
                                        label={'Ціна'}
                                    />
                                    <FormInput
                                        disabled={disabled}
                                        name={'memberPrice'}
                                        control={methods.control}
                                        label={'Ціна для членкинь'}
                                    />
                                    <FormImage disabled={disabled} name={'image'} control={methods.control} label={'Фото'}/>
                                </List>
                            </FormCard>
                            <FormCard>
                                <List>
                                    <FormDatePicker
                                        disabled={disabled}
                                        name={'date'}
                                        control={methods.control}
                                        label={'Дата'}
                                    />
                                    <div className={'grid grid-cols-2 gap-8'}>
                                        <FormInput
                                            disabled={disabled}
                                            name={'startTime'}
                                            control={methods.control}
                                            placeholder={'12:00'}
                                            label={'Початок'}
                                            mask={'99:99'}
                                            maskChar={''}
                                        />
                                        <FormInput
                                            disabled={disabled}
                                            name={'endTime'}
                                            control={methods.control}
                                            placeholder={'14:00'}
                                            label={'Кінець'}
                                            mask={'99:99'}
                                            maskChar={''}
                                        />
                                    </div>
                                    <FormSelect
                                        disabled={disabled}
                                        name={'networkStatus'}
                                        control={methods.control}
                                        placeholder={'Статус'}
                                        label={'Статус'}
                                        defaultValue={event?.networkStatus || 'OFFLINE'}
                                        options={[
                                            {label: 'OFFLINE', value: 'OFFLINE'},
                                            {label: 'ONLINE', value: 'ONLINE'},
                                        ]}
                                    />

                                    {networkStatus === 'OFFLINE' &&
                                        <FormInput
                                            name={`textFields.${locale}.venue`}
                                            control={methods.control}
                                            label={'Місце проведення'}
                                        />
                                    }

                                    <FormSelect
                                        disabled={disabled}
                                        name={'regionId'}
                                        control={methods.control}
                                        placeholder={'Регіон'}
                                        label={'Регіон'}
                                        defaultValue={event?.regionId || regionOptions?.[0]?.value}
                                        options={regionOptions}
                                    />

                                </List>
                            </FormCard>
                        </div>
                    </List>
                </FormCard>

                <FormCard>
                    <Title icon={<BiEdit className={'text-2xl'}/>} className={'mb-6'}>Опис</Title>
                    <FormTextarea className={'min-h-[250px]'} name={`textFields.${locale}.description`} control={methods.control}
                                  label={'Опис'}/>
                </FormCard>

                <FormCard>
                    <Title icon={<BiEdit className={'text-2xl'}/>} className={'mb-6'}>Експерт заходу</Title>
                    <div className={'grid grid-cols-1 gap-8'}>
                        <FormCard>
                            <List>
                                <FormInput
                                    name={`eventGuest.${locale}.name`}
                                    control={methods.control}
                                    label={'Імʼя'}
                                />
                                <FormImage disabled={disabled} name={'eventGuest.image'} control={methods.control} label={'Фото'}/>
                            </List>
                        </FormCard>
                        <FormCard>
                            <List>
                                <FormTextEditor
                                    name={`eventGuest.${locale}.description`}
                                    control={methods.control}
                                    label={'Опис'}
                                />
                                <FormInput
                                    disabled={disabled}
                                    name={'eventGuest.link'}
                                    control={methods.control}
                                    label={'Посилання'}
                                />
                            </List>
                        </FormCard>
                    </div>
                </FormCard>
            </List>
        </Form>
    );
};

export default EventForm;