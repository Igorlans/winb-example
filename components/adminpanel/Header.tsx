'use client'
import {Card} from "@/components/ui/card";
import NavLink from "@/components/adminpanel/NavLink";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import Image from "next/image";
import Notifications from "@/app/(admin)/adminpanel/(components)/notifications/Notifications";
import ClientProvider from "@/utils/ClientProvider";

const Header = () => {
    return (
        <Card className={'mt-2 w-full p-6 flex justify-between border-pink-200'}>
            <div className={'flex items-center justify-center gap-12'}>
                {/*<div className={'flex items-center justify-center text-xl font-bold'}>АДМІНПАНЕЛЬ</div>*/}
                <div className={'w-[40px] relative'}>
                    <Image
                        src={'/icons/icon_diamond.svg'}
                        alt={'logo'}
                        sizes={'5vw'}
                        className={'w-full h-auto'}
                        width={0}
                        height={0}
                    />
                </div>
                    <div className={'flex gap-6 items-center'}>
                        <NavLink className={'uppercase'} href={'/adminpanel'}>Головна</NavLink>
                        <NavLink href={'/adminpanel/members'}>Членкині</NavLink>
                        <NavLink href={'/adminpanel/requests'}>Заявки</NavLink>
                        <NavLink href={'/adminpanel/events'}>Події</NavLink>
                        <NavLink href={'/adminpanel/regions'}>Регіони</NavLink>
                        <NavLink href={'/adminpanel/services'}>Бізнес - послуги</NavLink>
                    </div>
                </div>
            <div className={'flex gap-5'}>
                <ClientProvider>
                    <Notifications />
                </ClientProvider>
                <Button variant={'outline'} onClick={() => signOut()}>
                    Вийти
                </Button>
            </div>


        </Card>
    );
};

export default Header;