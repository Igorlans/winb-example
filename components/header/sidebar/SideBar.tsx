import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import SideBarItem from "./SideBarItem";
import { PiUserSquare } from "react-icons/pi";
import SingupModal from "@/components/modals/SingupModal";
import LoginModal from "@/components/modals/LoginModal";

import { TbBusinessplan, TbCalendarEvent, TbMapPinCheck } from "react-icons/tb"
import { FaRegUser } from "react-icons/fa";

import IconInst from "@/components/ui/custom/iconInst";
import IconFacebook from "@/components/ui/custom/iconFacebook";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClientService, LocalePageParams } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n";
import { Locale } from "@/i18n.config";

type SideBarProps = LocalePageParams & {
  open: boolean;
  services: ClientService[];
  setOpen: (open: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ params, open, setOpen, services }) => {

  const t = useTranslations("pages");
  const button = useTranslations("buttons");

  const { switchLocale, localeInfo } = useLocale(params.locale)

  const sidebarAnimation = useSpring({
    transform: open ? "translateX(0%)" : "translateX(-100%)",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bg-gray w-full h-full backdrop-filter backdrop-blur-md fixed z-50 top-0"
        ></div>
      )}
      <animated.div
        className="fixed w-full h-full top-0 left-0 bg-white z-50 max-w-md"
        style={sidebarAnimation}
      >
        <img
          src="/images/backgrounds/bg_TopSidebar.svg"
          alt="background"
          className="w-full absolute top-0"
        />
        <div className="py-[130px] px-6">
          <div className="grid grid-cols-2 items-center mb-6">
            <Link href={"/"}>
              <Image
                src="/images/header/logo.svg"
                width={155}
                height={60}
                style={{objectFit: 'cover'}}  
                alt="logo"
              />
            </Link>
            <div className="flex justify-end" onClick={() => setOpen(false)}>
              <RxCross2 size="2rem" style={{ color: "#C13C69" }} />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <SingupModal />
            </div>
            <div className="flex items-center h-5 w-0.5 bg-customPink"></div>
            <div>
              <LoginModal />
            </div>
          </div>
          <div className="separator my-[15px]"></div>

          <SideBarItem
            title={t("events")}
            link="/events/new"
            icon={<TbCalendarEvent className="text-2xl text-darkPink"/>}
            onClick={() => setOpen(false)}
          />
          <SideBarItem
            title={t("about")}
            link="/about-us"
            icon={<PiUserSquare className="text-2xl text-darkPink" />}
            onClick={() => setOpen(false)}
          />
          <SideBarItem
            title={t("regions")}
            link="/regions"
            icon={<TbMapPinCheck className="text-2xl text-darkPink" />}
            onClick={() => setOpen(false)}
          />
          <SideBarItem
            title={t("members")}
            link="/members"
            icon={<FaRegUser className="text-2xl text-darkPink" />}
            onClick={() => setOpen(false)}
          />
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger
                className="w-full select-none flex items-center gap-[20px] py-[7.5px] pr-3"
              >
                <div
                  className={`w-full flex items-center gap-[20px] p-0`}
                >
                    <TbBusinessplan className="text-2xl text-darkPink"/>
                  <div>
                    { t("services") }
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col py-[10px] mt-[12px] mx-[10px] gap-y-[10px] border-t border-b">

                {
                        services.map(service => (
                          <Link href={`/services/${service.slug}`} key={service.id}
                            onClick={() => setOpen(false)}
                          >
                            <li className="relative flex cursor-default select-none items-center rounded-sm text-base outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                              { service.textFields.title }
                            </li>
                          </Link>
                        ))
                }

                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* <div className="separator my-[15px]"></div> */}

          {/* <div className="flex flex-col gap-y-[10px]"
            onClick={() => setOpen(false)}
          >
            <div>
              { t("privacy") }
            </div>
          </div> */}
          <div className="separator my-[15px]"></div>

          <div className={"mb-[15px]"}>
            <Select onValueChange={(val: Locale) => {
              switchLocale(val)
              setOpen(false)
            }}>
              <SelectTrigger className="w-100">
                <SelectValue placeholder={ localeInfo.current } />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    { button("lang") }
                  </SelectLabel>
                  {
                    localeInfo.display.map(item => (
                      <SelectItem
                          value={item.value}
                      >
                        { item.label }
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 md:mt-[20px]">
                        <Link href={"https://www.instagram.com/winb.com_ua/?img_index=1"} target="_blank">
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconInst
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link>
                        <Link href={"https://www.facebook.com/WomeninBusinessUP/"} target="_blank">
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconFacebook
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link>
                        {/* <Link href={"#"}>
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconTwitter
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link> */}
                    </div>
        </div>
      </animated.div>
    </>
  );
};

export default SideBar;
