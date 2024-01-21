"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {useRegistraion} from "@/context/registration-store";
const BusinessServices = () => {
    const { setIsOpen } = useRegistraion()
    return (
        <div className="relative w-full h-96 overflow-hidden">
        <Image
            src="/images/contactCover.png"
            alt="LeadMagnet"
            fill={true}
            style={{objectFit: 'cover'}}
        />


        <div className="absolute w-full top-1/2 left-1/2" style={{transform: 'translate(-50%, -50%)'}}>
            <div className="absotute z-50 text-center flex items-center flex-col gap-y-4 md:gap-y-6">
                <h2 className="max-w-[80vw] md:max-w-[50vw] font-title">
                    ПОСЛУГИ ДЛЯ БІЗНЕСУ ДЛЯ РІШЕННЯ МАЛИХ ТА ВЕЛИКИХ ЗАДАЧ
                </h2>
                <p className="max-w-[838px] font-subtitle">
                    Обери ту послугу, яка потрібна для росту<br/>
                    твого бізнесу сьогодні!
                </p>
                <div>
                    <Button onClick={() => setIsOpen(true)} variant="primary">
                        Зареєструватись
                    </Button>
                </div>
            </div>
        </div>

        <img
            src="images/backgrounds/bg_decor.svg"
            className="absolute bottom-0 left-0 rotate-180 z-0 md:w-[50vw]"
            alt="decor"
        />
        <img
            src="images/backgrounds/bg_decor.svg"
            className="absolute top-0 right-0 z-0 md:w-[50vw]"
            alt="decor"
        />
    </div>
    );
};

export default BusinessServices;