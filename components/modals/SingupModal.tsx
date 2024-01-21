"use client";

import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useRegistraion} from "@/context/registration-store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormValues } from "./loginSchema";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../ui/custom/FormInput";
import toast from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import { useTranslations } from "next-intl";
import useLoginFormSchema from "./loginSchema";

const SingupModal = () => {

    const button = useTranslations("buttons");
    const modal = useTranslations("registerModal");
    const field =  useTranslations("form");
    const t = useTranslations("toast");

    const {isOpen, setIsOpen} = useRegistraion()
    const { loginFormSchema } = useLoginFormSchema()

    const defaultValues: LoginFormValues = {
        id: "",
        name: "",
        phone: "",
        email: ""
    }
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
        mode: "onBlur"
    })

    async function submitForm (data: LoginFormValues) {
        try {
            toast.promise(apiRequest(
                {
                    url: "/api/user/request",
                    method: "POST",
                    data
                }
            ),
                {
                    loading: t("apply_sending"),
                    success: () => {
                        setIsOpen(false);
                        form.reset();
                        return t("apply_sent")
                    },
                    error: t("error")
                }
            )
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                { button("signUp") }
            </DialogTrigger>
            <DialogContent 
            className="w-[90vw] md:w-[50vw] h-[80vh] md:h-[60vh] p-0 md:pr-6 max-w-none overflow-hidden rounded-md"
                defaultChecked={true}
            >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full h-full">
                    <div className="relative w-full h-full">
                        <Image
                            fill
                            src="/images/loginFormBg.png"
                            alt="Login cover"
                            className="hidden md:block"
                            style={{objectFit: 'cover'}}
                        />
                        <Image
                            fill
                            src="/images/modal_bg_mobile.png"
                            alt="Login cover"
                            className="block md:hidden"
                            style={{objectFit: 'cover'}}
                        />
                    </div>
                    <div className="absolute md:relative grid grid-rows-[1fr_5fr_1fr] w-full h-full gap-y-4 px-4 py-4 ">
                        <div className="flex flex-col gap-y-1 md:gap-y-2 max-w-[250px] md:max-w-full">
                            <h1 className="text-lg md:text-3xl text-left font-bold">
                                { modal("title") }
                            </h1>
                            <p className="text-xs">
                                { modal("desc") }
                            </p>
                        </div>

                        <Form {...form}>
                            <form className="flex flex-col gap-y-4 md:gap-y-6"
                                onSubmit={form.handleSubmit(submitForm)}
                            >
                                <div className="flex flex-col gap-y-2 md:gap-y-4">
                                    <FormInput 
                                        name="name"
                                        control={form.control}
                                        label=""
                                        placeholder={ field("name") }
                                    />
                                    <FormInput 
                                        name="phone"
                                        control={form.control}
                                        label=""
                                        mask={'+380 (99) 999-99-99'}
                                        placeholder={ field("phone") }
                                        maskChar={''}
                                    />
                                    <FormInput 
                                        name="email"
                                        control={form.control}
                                        label=""
                                        placeholder={ field("email") }
                                    />
                                </div>
                                <Button type="submit" variant="default" className="bg-customPink w-full">
                                    { button("register") }
                                </Button>
                            </form>
                        </Form>

                        <div className="self-end w-full flex items-center justify-between text-sm">
                                <span>
                                    { modal("have_account") }
                                </span>
                                <Button variant="link" className="text-customPink p-0">
                                    { button("enter") }
                                </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        
    )
}

export default SingupModal
