"use client"

import Banner from "@/components/banner/Banner";

import { useLogin } from "@/context/login-store";
import { useRegistraion } from "@/context/registration-store";
import { Button } from '@/components/ui/button';

export default function ParticipantsBanner () {
    const loginModal = useLogin()
    const registrationModal = useRegistraion()
    return (
        <Banner 
                title="Членкиням"
                subtitle="Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом. "
                maxWidth="838px"
            >
                <Button onClick={() => registrationModal.setIsOpen(true)} variant="primary" className="h-8 md:h-auto w-[165px] md:w-auto bg-darkPink rounded-[6px] shrink-0 text-ellipsis overflow-hidden whitespace-nowrap">Зареєструватись</Button>
                <Button onClick={() => loginModal.setIsOpen(true)} variant="outline" className="h-8 md:h-auto w-[165px] md:w-auto border-white text-white">Увійти в кабінет</Button>
            </Banner>
    )
}
