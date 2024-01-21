"use client"

import { useLogin } from "@/context/login-store";
import { useRegistraion } from "@/context/registration-store";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import ArrowBottom from "../ui/custom/arrowBottom";

const Footer = () => {
  const loginMogal = useLogin()
  const registerMogal = useRegistraion();

  const t = useTranslations("footer");
  const button = useTranslations("buttons");

  return (
    <div className="w-full bg-darkPink py-11">
        <div className="container grid-cols-1 gap-y-[20px] grid min-[991px]:grid-cols-[1fr_0.5fr_1.5fr_1fr] justify-items-start text-white">
          <div className="flex flex-wrap gap-y-3">

            <Link href={"/"} className="relative w-full">
                  <Image 
                    src="/images/header/footerLogo.svg"
                    width={200}
                    height={70}
                    style={{objectFit: 'cover'}}
                    alt="logo"
                  />
            </Link>
            
            <p className="font-card-description max-w-[400px]">
                { t("desc") }
            </p>
          </div>

          <div className="">
            <h1 className="font-bold font-subtitle pb-2">
                { t("pages") }
            </h1>
            <Pages />
          </div>

          <div>
            <h1 className="font-bold font-subtitle text-left min-[991px]:text-left pb-2">
                { t("contacts") }
            </h1>
            <Contacts />
          </div>

          <div className="w-full h-full">
            {/* <h1 className="hidden min-[991px]:block font-bold font-subtitle pb-2">
                { t("addition") }
            </h1> */}
            <Socials />
          </div>

        </div>
        <div className="container w-full pt-4 flex justify-left md:grid grid-cols-[3fr_1fr] items-left">
          <Links />
          <div className="flex gap-x-[10px] font-bold font-subtitle text-white">
            <div className="cursor-pointer" onClick={() => registerMogal.setIsOpen(true)}>
                { button("signUp") }
            </div>
            <div className="border-l-4"></div>
            <div className="cursor-pointer" onClick={() => loginMogal.setIsOpen(true)}>
                { button("signIn") }  
            </div>
          </div>
        </div>
    </div>
  );
};


const Pages = () => {
    const t = useTranslations("pages")
  return (
    <ul className="flex flex-col gap-y-1 h-full font-main">
      <Link href={"/"} className="hover:opacity-70 duration-300">
          { t("home") }
      </Link>
      <Link href={"/services"} className="hover:opacity-70 duration-300">
          { t("services") }
      </Link>
      <Link href={"/events/new"} className="hover:opacity-70 duration-300">
          { t("events") }
      </Link>
      <Link href={"/regions"} className="hover:opacity-70 duration-300">
          { t("regions") }
      </Link>
      <Link href={"/events/members"} className="hover:opacity-70 duration-300">
          { t("members") }
      </Link>
      <Link href={"/about-us"} className="hover:opacity-70 duration-300">
          { t("about") }
      </Link>
    </ul>
  );
}

const Contacts = () => {
    const t = useTranslations("footer")
  return (
    <div className="flex items-left min-[991px]:items-start text-left flex-col gap-y-1 h-full font-main">
            ГО «Українська платформа «Жінки  в бізнесі»

            <Link href={`tel:+380975058050`} className="hover:opacity-70 duration-300">
              +380975058050
            </Link>
            <Link target="_blank" href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTGnQLCmhpDNQcNxdJmgtWlmkjjlpjPCQDXTKtmVvKrMDfrsjgBFvFJdDttTrwKlCnwbjq" className="hover:opacity-70 duration-300">
              womeninbusinessup@gmail.com
            </Link>
            <Link target="_blank" href="https://maps.app.goo.gl/adXak2Ty2cp4Spik8" className="hover:opacity-70 duration-300 cursor-default">
                { t("address") }
            </Link>
    </div>
  );
}

const Socials = () => {
    const t = useTranslations("pages")
  return (
    <div className="grid h-full grid-rows-1 min-[991px]:grid-rows-2 justify-items-center min-[991px]:justify-items-start font-main">
          <div className="flex flex-col items-center md:items-start gap-y-1 h-full font-main text-center md:text-left">
            {/*<Link href={"/partner"} className="hover:opacity-70 duration-300">Партнерам</Link>*/}
            {/*<Link href={"/participants"} className="hover:opacity-70 duration-300">Членкиням </Link>*/}
            {/* <Link href={"#"} className="hover:opacity-70 duration-300">
                { t("privacy") }
            </Link> */}
          </div>

          <div className="self-end flex gap-x-[10px] mt-[10px] font-card-title">
            
            {/* <Link href={"#"}>Реєстрація</Link>
            <div className="border-l-4"></div>
            <Link href={"#"}>Вхід</Link> */}
          
            {/* <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-x-[5px]">
                      <span className="md:text-lg font-bold ml-2">UA</span>
                      <ArrowBottom
                        color="white"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Мова</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>EN</DropdownMenuItem>
                    <DropdownMenuItem>PL</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div> */}
          </div>

        </div>
  );
}

const Links = () => {
  return (
    <div className="hidden min-[991px]:block">
            <div className="flex justify-start gap-6 w-full">
              <Link href={"https://www.instagram.com/winb.com_ua/?img_index=1"} target="_blank">
                <div className="cursor-pointer hover:opacity-70 duration-300">
                  <Image
                    src="/icons/icon_instagram.svg"
                    width={28}
                    height={28}
                    style={{objectFit: 'cover'}}
                    alt="icon instagram"
                  />
                </div>
              </Link>
              <Link href={"https://www.facebook.com/WomeninBusinessUP/"} target="_blank">
                <div className="cursor-pointer hover:opacity-70 duration-300">
                  <Image
                    src="/icons/icon_facebook.svg"
                    width={28}
                    height={28}
                    style={{objectFit: 'cover'}}
                    alt="icon facebook"
                  />
                </div>
              </Link>
              {/* <Link href={"#"}>
                <div className="cursor-pointer hover:opacity-70 duration-300">
                  <Image
                    src="/icons/icon_twitter.svg"
                    width={28}
                    height={28}
                    style={{objectFit: 'cover'}}
                    alt="icon twitter"
                  />
                </div>
              </Link> */}
            </div>
          </div>
  );
}

export default Footer;
