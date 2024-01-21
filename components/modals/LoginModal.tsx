"use client";

import { useState } from "react";
import Image from "next/image"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {signIn, useSession} from "next-auth/react";

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import List from "@/components/adminpanel/List";
import FormInput from "@/components/ui/custom/FormInput";
import toast from "react-hot-toast";
import { useLogin } from "@/context/login-store";
import { useTranslations } from "next-intl";

const schema = z.object({
    email: z.string().nonempty("Поле обовʼязкове").email('Неправильний формат'),
    password: z.string().nonempty("Поле обовʼязкове").min(8, 'Мінімальна кількість символів - 8')
})
type SignInBody = z.infer<typeof schema>

const LoginModal = () => {

    const button = useTranslations("buttons");
    const modal = useTranslations("loginModal");
    const field =  useTranslations("form");
    const v = useTranslations("validation");
    const t = useTranslations("toast");

    const signInValidation = z.object({
        email: z.string().min(1, v("field")).email(v("email")),
        password: z.string().min(1, v("field")).min(8, v("password"))
    })

    const {isOpen, setIsOpen} = useLogin()
    const router = useRouter()

    const methods = useForm<SignInBody>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(signInValidation)
    })

    const submitHandler = async (data: SignInBody) => {
        try {
            await toast.promise(signIn("credentials", {
                redirect: false,
                email: data?.email,
                password: data?.password
            }), {
                loading: t("login"),
                success: (res) => {
                    if (res?.error) throw new Error(res.error)
                    router.push('/account')
                    setIsOpen(false)
                    return t("login_success")
                },
                error: (e) => {
                    return t("error")
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                { button("signIn") }
            </DialogTrigger>
            <DialogContent className="max-w-[60vw] p-6 md:p-0 md:pr-6"
                defaultChecked={true}
            >
            <div className="flex flex-col items-center gap-x-[8vw] md:flex-row">
                <div className="relative hidden w-[40vw] h-[80vh] basis-1/2 md:block">
                    <Image
                        src="/images/loginFormBg.png"
                        alt="Login cover"
                        fill={true}
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <Form {...methods}>
                    <div className="flex flex-col gap-y-[15px] md:gap-y-[30px] max-w-[330px] md:ml-[-80px] z-[5]">
                        <h1 className="text-lg md:text-3xl text-left md:whitespace-nowrap font-bold">
                            { modal("title") }
                        </h1>
                        <div className="flex flex-col gap-y-[10px] md:gap-y-[20px]">
                            <List>
                                <FormInput name={'email'} control={methods.control} label={field("email")} />
                                <FormInput name={'password'} control={methods.control} label={field("password")} />
                            </List>
                        </div>
                        <div className="flex flex-col gap-y-[20px]">
                            <Button onClick={methods.handleSubmit(submitHandler)} variant="default" className="h-8 md:h-10 bg-customPink w-full">
                                { button("enter") }
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
            </DialogContent>
        </Dialog>
        
    )
}

export default LoginModal