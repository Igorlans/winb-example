'use client'
import {useFieldArray, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import PageTitle from "@/components/adminpanel/PageTitle";
import {useRouter} from "next/navigation";
import {BiSave} from 'react-icons/bi'
import IconButton from "@/components/adminpanel/IconButton";
import FormInput from "@/components/ui/custom/FormInput";
import toast from "react-hot-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import Title from "@/components/adminpanel/Title";
import List from "@/components/adminpanel/List";
import FormTextarea from "@/components/ui/custom/FormTextarea";
import {Card} from "@/components/ui/card";
import {IoWomanOutline} from "react-icons/io5";
import {GrNotes} from "react-icons/gr";
import {BiLockOpen} from "react-icons/bi";
import {BiEdit} from "react-icons/bi";
import {BsChatSquareText} from "react-icons/bs";
import {BiAddToQueue} from "react-icons/bi";
import FormImage from "@/components/ui/custom/FormImage";
import FormSelect, { SelectItem } from "@/components/ui/custom/FormSelect";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import React, { FC, useEffect, useMemo } from "react";
import Image from "next/image";
import {generatePassword} from "@/utils/generatePassword";
import {apiRequest} from "@/utils/apiRequest";
import { Member } from "@/types";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
    MemberFactsValues,
    MemberFormValues,
    MemberTextFieldsValues, useMemberFormSchema
} from "@/app/(admin)/adminpanel/members/formSchema";
import { createLocaleDefaultValues } from "@/utils";
import { Locale, Locales } from "@/i18n.config";
import { formLocaleMemberStatus } from "@/lib/memberTypes";
import FormTextEditor from "@/components/ui/custom/FormTextEditor";

interface IMemberFormProps {
    member?: Member;
    regionOptions: SelectItem[],
    businessOptions: SelectItem[]
    locale: Locale;
}
const MemberForm: FC<IMemberFormProps> = ({ member, regionOptions, businessOptions, locale }) => {

    const isUpdate = !!member;
    const disabled = locale !== Locales.uk;

    const { memberFormSchema } = useMemberFormSchema(locale);
    const router = useRouter();

    const statusOptions = formLocaleMemberStatus[locale]

    // TEXTS
    const formTitle = isUpdate ? `Оновлення членкині (${locale})` : `Створення членкині (${locale})`
    const loadingMessage = isUpdate ? 'Оновлення членкині...' : 'Створення членкині...';
    const successMessage = isUpdate ? 'Членкиню оновлено' : 'Членкиню створено';
    const errorMessage = isUpdate ? 'Помилка оновлення членкині' : 'Помилка створення членкині';

    const initialValues: MemberFormValues = {
        textFields: {
            ...createLocaleDefaultValues<MemberTextFieldsValues>({
                name: "",
                description: "",
                slogan: "",
                status: "",
                experience: ""
            })
        },
        facts: [
            {
                icon: "",
                ...createLocaleDefaultValues<MemberFactsValues>({
                    text: ""
                })
            }
        ],
        additional: [
            {
                icon: "",
                ...createLocaleDefaultValues<MemberFactsValues>({
                    text: ""
                })
            }
        ],
        email: "",
        phone: "",
        password: "",
        regionId: "",
        image: ""
    }

    const defaultValues: MemberFormValues = isUpdate ? {
        email: member?.user.email ?? "",
        phone: member?.phone ?? "",
        password: member?.user.password ?? "",
        regionId: member.regionId ?? "",
        image: member.image,
        businessId: member.businessId ?? undefined,
        textFields: JSON.parse(member.textFields as string),
        facts: JSON.parse(member.facts as string),
        additional: JSON.parse(member.additional as string)
    } : initialValues

    const methods = useForm<MemberFormValues>({
        defaultValues,
        resolver: zodResolver(memberFormSchema),
        mode: 'onBlur'
    })

    const {fields: additional, append: additionalAppend, remove: additionalRemove} = useFieldArray({
        control: methods.control,
        name: `additional`
    })

    const {fields: facts, append: factsAppend, remove: factsRemove} = useFieldArray({
        control: methods.control,
        name: 'facts'
    })

    const onSubmit = async (data: MemberFormValues) => {
        if (!data?.image) return toast.error('Додайте фото')
        await toast.promise(apiRequest({
                url: '/api/user',
                data: {
                    ...data,
                    id: member?.user.id
                },
                method: isUpdate ? 'PUT': 'POST'
            }),
            {
                loading: loadingMessage,
                success: () => {
                    isUpdate ? router.refresh() : router.push("/adminpanel/members")
                    return successMessage
                },
                error: (e: any) => {
                    console.log(e)
                    return errorMessage;
                }
            })
    }

    const onRemove = async () => {
        await toast.promise(apiRequest({url: `/api/user?id=${member?.user.id}`, method: 'DELETE'}),
            {
                loading: 'Видалення членкині...',
                success: () => {
                    router.push('/adminpanel/members')
                    return 'Членкиню видалено'
                },
                error: (e) => {
                    return "Помилка видалення членкині";
                }
            })
    }


    const setGeneratedPassword = () => {
        try {
            const newPassword = generatePassword(15)
            methods.setValue('password', newPassword)
        } catch (e) {
            console.log(e)
            toast.error('Помилка генерації паролю')
        }
    }

    return (
        <div>
            <div className="mt-4">
                <PageTitle
                    icon={<IoWomanOutline className={'text-3xl'} />}
                    title={formTitle}
                    description={!isUpdate ? 'Створення нової членкині' : `Оновлення членикні`}
                >
                    <div className={'flex gap-3'}>
                        <IconButton
                            type={'submit'}
                            onClick={methods.handleSubmit(onSubmit)}
                            icon={<BiSave className={'text-lg'} />}
                        >
                            Зберегти
                        </IconButton>
                        {isUpdate &&
                            <DeleteButton onConfirm={onRemove} />
                        }
                    </div>

                </PageTitle>
            </div>
            <Form {...methods}>
                <List className={'mt-10'}>
                    <Card className={'p-8 border-pink-200'}>
                        <Title icon={<BiEdit className={'text-2xl'} />} className={'mb-6'}>Загальна інформація</Title>
                        <div className={'mt-10 flex justify-between gap-8 flex-wrap'}>
                            <Card className={'max-w-[500px] w-full p-8 border-pink-200'}>
                                <Title icon={<GrNotes className={'text-lg'} />} className={'mb-6'}>Дані</Title>
                                <List>
                                    <FormInput
                                        name={`textFields.${locale}.name`}
                                        control={methods.control}
                                        label={'Імʼя'}
                                    />
                                    <FormSelect
                                        disabled={disabled}
                                        name={`textFields.${locale}.status`}
                                        control={methods.control}
                                        label={'Рівень членства'}
                                        placeholder={'Виберіть рівень'}
                                        options={statusOptions}
                                    />
                                    <FormSelect
                                        disabled={disabled}
                                        name="regionId"
                                        control={methods.control}
                                        label={'Регіон'}
                                        placeholder={'Виберіть регіон'}
                                        options={regionOptions}
                                    />
                                    <FormSelect
                                        disabled={disabled}
                                        name="businessId"
                                        control={methods.control}
                                        label={'Тип бізнесу'}
                                        placeholder={'Виберіть тип бізнесу'}
                                        options={businessOptions}
                                    />
                                    <FormInput
                                        name={`textFields.${locale}.slogan`}
                                        control={methods.control}
                                        label={'Лозунг'}
                                    />
                                    <FormImage disabled={disabled} name={'image'} control={methods.control} label={'Фото'} />
                                </List>
                            </Card>
                            <Card className={'max-w-[500px] w-full p-8 border-pink-200'}>
                                <Title icon={<BiLockOpen className={'text-2xl'} />} className={'mb-6'}>Дані для входу</Title>
                                <List>
                                    <FormInput
                                        disabled={disabled || isUpdate}
                                        name={'email'}
                                        control={methods.control}
                                        label={'Email'}
                                    />
                                    <FormInput
                                        disabled={disabled}
                                        name={'phone'}
                                        control={methods.control}
                                        label={'Номер телефону'}
                                    />
                                    <FormInput
                                        disabled={disabled}
                                        name={'password'}
                                        control={methods.control}
                                        label={'Пароль'}
                                    />
                                    <Button disabled={disabled} className={'self-end'} variant={'ghost'} onClick={setGeneratedPassword}>
                                        Згенерувати пароль
                                    </Button>
                                </List>

                            </Card>
                        </div>
                    </Card>

                    <Card className={'p-8 border-pink-200'}>
                        <Title icon={<BiAddToQueue className={'text-2xl'} />} className={'mb-6'}>Додаткова інформація</Title>
                        <div className={'mt-10 flex justify-between gap-8 flex-wrap'}>
                            <Card className={'max-w-[500px] w-full p-8 border-pink-200'}>
                                <Title icon={<GrNotes className={'text-lg'} />} className={'mb-6'}>Відомості</Title>
                                <List>
                                    {additional?.map((item, index) =>
                                        <div className={'flex gap-4 items-start'} key={item.id}>
                                            <FormSelect
                                                name={`additional.${index}.icon`}
                                                control={methods.control}
                                                defaultValue={''}
                                                label={'Іконка'}
                                                placeholder={'Виберіть іконку'}
                                                options={[
                                                    {label: 'Немає', value: ''},
                                                    {
                                                        label:
                                                            <Image
                                                                src={'/icons/icon_person.svg'}
                                                                width={20}
                                                                height={20}
                                                                style={{objectFit: 'cover'}}
                                                                alt="icon"
                                                            />,
                                                        value: '/icons/icon_person.svg'
                                                    },
                                                    {
                                                        label:
                                                            <Image
                                                                src={'/icons/icon_location.svg'}
                                                                width={20}
                                                                height={20}
                                                                style={{objectFit: 'cover'}}
                                                                alt="icon"
                                                            />,
                                                        value: '/icons/icon_location.svg'
                                                    },
                                                    {
                                                        label:
                                                            <Image
                                                                src={'/icons/icon_memberPhonePurp.svg'}
                                                                width={20}
                                                                height={20}
                                                                style={{objectFit: 'cover'}}
                                                                alt="icon"
                                                            />,
                                                        value: '/icons/icon_memberPhonePurp.svg'
                                                    },
                                                ]}
                                            />
                                            <FormInput name={`additional.${index}.${locale}.text`} control={methods.control} label={'Текст'} />
                                            <Button className={'mt-8'} type="button" onClick={() => additionalRemove(index)} variant="destructive" size="sm">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Button onClick={() => additionalAppend({
                                        ...createLocaleDefaultValues<MemberFactsValues>({
                                            text: ""
                                        }),
                                        icon: ""
                                    })}>
                                        Додати
                                    </Button>
                                </List>
                            </Card>
                            <Card className={'max-w-[500px] w-full p-8 border-pink-200'}>
                                <Title icon={<GrNotes className={'text-lg'} />} className={'mb-6'}>Факти</Title>
                                <List>
                                    {facts?.map((item, index) =>
                                        <div className={'flex gap-4 items-start'} key={item.id}>
                                            <FormSelect
                                                name={`facts.${index}.icon`}
                                                control={methods.control}
                                                defaultValue={''}
                                                label={'Іконка'}
                                                placeholder={'Виберіть іконку'}
                                                options={[
                                                    {label: 'Немає', value: ''},
                                                    {
                                                        label:
                                                            <Image
                                                                src={'/icons/icon_memberFact.svg'}
                                                                width={30}
                                                                height={30}
                                                                style={{objectFit: 'cover'}}
                                                                alt="icon"
                                                            />,
                                                        value: '/icons/icon_memberFact.svg'
                                                    },
                                                    {
                                                        label:
                                                            <Image
                                                                src={'/icons/icon_memberStar.svg'}
                                                                width={30}
                                                                height={30}
                                                                style={{objectFit: 'cover'}}
                                                                alt="icon"
                                                            />,
                                                        value: '/icons/icon_memberStar.svg'
                                                    },
                                                ]}
                                            />
                                            <FormInput name={`facts.${index}.${locale}.text`} control={methods.control} label={'Текст'} />
                                            <Button className={'mt-8'} type="button" onClick={() => factsRemove(index)} variant="destructive" size="sm">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <Button onClick={() => factsAppend({
                                        ...createLocaleDefaultValues<MemberFactsValues>({
                                            text: ""
                                        }),
                                        icon: ''
                                    })}>
                                        Додати
                                    </Button>
                                </List>
                            </Card>
                        </div>
                    </Card>

                    <Card className={'p-8 border-pink-200'}>
                        <Title icon={<BsChatSquareText className={'text-xl'} />} className={'mb-6'}>Подробиці</Title>
                        <List>
                            <FormTextEditor
                                name={`textFields.${locale}.description`}
                                control={methods.control}
                                label={'Про членкиню'}
                            />
                            <FormTextEditor
                                name={`textFields.${locale}.experience`}
                                control={methods.control}
                                label={'Досвід'}
                            />
                        </List>
                    </Card>


                    <div className={'flex justify-end'}>
                        <IconButton
                            type={'submit'}
                            onClick={methods.handleSubmit(onSubmit)}
                            icon={<BiSave className={'text-lg'} />}
                        >
                            Зберегти
                        </IconButton>
                    </div>
                </List>
            </Form>
        </div>
    );
};


const DeleteButton = ({onConfirm}: {onConfirm: () => void}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className={'bg-destructive text-destructive-foreground hover:bg-destructive/90 p-3 rounded'}>
                    <Trash className="h-4 w-4" />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ви впевнені, що хочете видалити цю членкиню?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Цю дію неможливо відмінити. Членкиня буде видалена із бази даних.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Відмінити</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Видалити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MemberForm;