"use client"

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import JoinItem from "./JoinItem";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/context/login-store";
import { useRegistraion } from "@/context/registration-store";
const joinItemValues = [
    {id: 0, title: 'ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ', text: "Як ефективно керувати людьми в сучасних умовах? Підтримувати та надихати?"},
    {id: 1, title: 'ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ', text: "Як ефективно керувати людьми в сучасних умовах? Підтримувати та надихати?"},
    {id: 2, title: 'ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ ЗАДАЧ', text: "Як ефективно керувати людьми в сучасних умовах? Підтримувати та надихати?"},
]


const Join = () => {
    const loginModal = useLogin()
    const registrationModal = useRegistraion()
    return (
        <div className='container flex flex-col'>

            <SectionTitle
                title="Як доєднатися?"
            />

            <div className="flex flex-col md:flex-row gap-x-[2vw]">
                {
                    joinItemValues.map((item) => (
                        <JoinItem
                            key={item.id}
                            num={item.id + 1}
                            title={item.title}
                            text={item.text}
                        />
                    ))
                }
            </div>

            <div className="flex items-center justify-end gap-x-[30px] pt-[30px]">
                <Button onClick={() => registrationModal.setIsOpen(true)} variant="primary" className="h-8 md:h-auto rounded-[6px] md:w-[247px]">Зареєструватись</Button>
                <Button onClick={() => loginModal.setIsOpen(true)} variant="outline" className="h-8 md:h-auto md:w-[247px]">Увійти в кабінет</Button>
            </div>
        </div>
    );
};

export default Join;