'use client'

import React, {FC} from 'react';
import {FullEvent, FullEventTicket} from "@/types/events";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import List from "@/components/adminpanel/List";
import FormInput from "@/components/ui/custom/FormInput";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {pay} from "@/hooks/useOrder";
import {gtmService} from "@/lib/gtm/gtmService";
import {useSession} from "next-auth/react";
import { ClientEvent, ClientTicket } from "@/types";
import { useTranslations } from "next-intl";


const schema = z.object({
    name: z.string().nonempty('Поле обовʼязкове'),
    email: z.string().nonempty('Поле обовʼязкове').email('Введіть коректний email'),
    phone: z.string().nonempty('Поле обовʼязкове').regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, 'Введіть коректний номер'),
    eventId: z.string(),
})

export type BuyEventFormValues = z.infer<typeof schema>


interface IBuyEventFormProps {
    event: ClientEvent;
    open: boolean;
    setOpen: (newValue: boolean) => void;
}
const BuyEventForm: FC<IBuyEventFormProps> = ({
    open,
    setOpen,
    event
}) => {

    const modal = useTranslations("eventModal");
    const field = useTranslations("form");
    const button = useTranslations("buttons");
    const v = useTranslations("validation");
    const t = useTranslations("toast")

    const buyEventFormSchema = z.object({
        name: z.string().min(1, v("field")),
        email: z.string().min(1, v("field")).email(v("email")),
        phone: z.string().min(1, v("field")).regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, 'Введіть коректний номер'),
        eventId: z.string(),
    })

    //TEXTS
    const loadingMessage = t("apply_sending")
    const successMessage = t("event_apply_msg")
    const errorMessage = t("error")

    const methods = useForm<BuyEventFormValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            eventId: event.id

        },
        resolver: zodResolver(buyEventFormSchema)
    })

    const {data: session} = useSession()
    const user = session?.user;
    const isMember = Boolean(user?.member?.id);
    const submitHandler = async (data: BuyEventFormValues) => {
        try {
            gtmService.beginCheckout(event, isMember)
            await toast.promise(apiRequest({url: '/api/events/buy', data: data, method: 'POST'}),
                {
                    loading: loadingMessage,
                    success: (data: ClientTicket) => {
                        setOpen(false)
                        pay(data)
                        return successMessage
                    },
                    error: (e: any) => {
                        console.log(e)
                        if (e?.cause < 500) {
                            return e?.message;
                        }
                        return errorMessage;
                    }
                })

        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogContent className={'max-w-[450px] w-full'}>
                <DialogHeader>
                    <DialogTitle>{event.textFields.title}</DialogTitle>
                    <DialogDescription>
                        { modal("desc") }
                    </DialogDescription>
                </DialogHeader>
                <Form {...methods}>
                    <List className={'mt-8'}>
                        <FormInput
                            name={'name'}
                            control={methods.control}
                            label={field("name")}
                        />
                        <FormInput
                            name={'email'}
                            control={methods.control}
                            label={field("email")}
                        />
                        <FormInput
                            name={'phone'}
                            control={methods.control}
                            label={field("phone")}
                            mask={'+380 (99) 999-99-99'}
                            maskChar={''}
                        />
                        <Button variant={'primary'} onClick={methods.handleSubmit(submitHandler)}>
                            { button("event_apply") }
                        </Button>
                    </List>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BuyEventForm;