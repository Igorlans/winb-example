import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FC, useState} from "react";
import {z} from "zod";
import FormInput from "@/components/ui/custom/FormInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormTextarea from "@/components/ui/custom/FormTextarea";
import {Form} from "@/components/ui/form";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {apiRequest} from "@/utils/apiRequest";
import { ClientMember } from "@/types";
import { useTranslations } from "next-intl";


interface IServiceBuyFormProps {
    serviceId: string;
    member: ClientMember
}

const schema = z.object({
    name: z.string().nonempty('Поле обовʼязкове'),
    memberId: z.string().nonempty('Поле обовʼязкове'),
    serviceId: z.string().nonempty('Поле обовʼязкове'),
    phone: z.string().nonempty('Поле обовʼязкове').regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, 'Введіть коректний номер'),
    comment: z.string(),
})

export type ServiceBuyFormValues = z.infer<typeof schema>

const ServiceBuyForm: FC<IServiceBuyFormProps> = ({member, serviceId}) => {

    const button = useTranslations("buttons");
    const field = useTranslations("form");
    const v = useTranslations("validation");
    const modal = useTranslations("serviceModal");
    const t = useTranslations("toast")

    const serviceBuySchema = z.object({
        name: z.string().min(1, v("field")),
        memberId: z.string().min(1, v("field")),
        serviceId: z.string().min(1, v("field")),
        phone: z.string().min(1, v("field")).regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, v("phone")),
        comment: z.string(),
    })

    const [open, setOpen] = useState(false)

    const methods = useForm<ServiceBuyFormValues>({
        defaultValues: {
            name: '',
            phone: '',
            comment: '',
            memberId: member.id,
            serviceId
        },
        resolver: zodResolver(serviceBuySchema)
    })

    const submitHandler = async (data: ServiceBuyFormValues) => {
        try {
            await toast.promise(apiRequest({url: '/api/services/requests', data, method: 'POST'}), {
                loading: `${t("enroll_sending")}..`,
                success: (res) => {
                    setOpen(false)
                    return t("enrol_sent")
                },
                error: (e) => {
                    return t("enroll_error")
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
            <DialogTrigger>
                <Button variant={'outline'} className="h-7 xl:h-9">
                    { button("event_apply") }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        { modal("title") }
                    </DialogTitle>
                    <DialogDescription>
                        { modal("desc") }"{member.textFields.name}"
                    </DialogDescription>
                </DialogHeader>
                <Form {...methods}>
                    <div className={'flex flex-col gap-6'}>
                        <FormInput
                            name={'name'}
                            control={methods.control}
                            label={field("name")}
                            placeholder={field("name")}
                        />
                        <FormInput
                            name={'phone'}
                            control={methods.control}
                            label={field("phone")}
                            placeholder={field("phone")}
                            maskChar={''}
                            mask={'+380 (99) 999-99-99'}
                        />
                        <FormTextarea
                            name={'comment'}
                            control={methods.control}
                            label={field("comment")}
                            className={'min-h-[170px]'}
                            placeholder={field("comment")}
                        />
                        <Button variant={'primary'} onClick={methods.handleSubmit(submitHandler)}>
                            { button("event_apply") }
                        </Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceBuyForm;