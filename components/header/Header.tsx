"use client";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ArrowBottom from "../ui/custom/arrowBottom";
import { Button } from "../ui/button";
import { useMemo, useState, useEffect, FC } from "react";
import SideBar from "./sidebar/SideBar";
import LoginModal from "../modals/LoginModal";
import SingupModal from "../modals/SingupModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthStatus } from "@/types/types";
import { apiRequest } from "@/utils/apiRequest";
import { ClientService, LocalePageParams } from "@/types";
import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n";
import { SelectItem } from "@/components/ui/custom/FormSelect";

const Header: FC<LocalePageParams> = ({ params }) => {
  const t = useTranslations("pages");
  const button = useTranslations("buttons");

  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ClientService[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const { switchLocale, localeInfo } = useLocale(params.locale);

  const signout = async () => {
    try {
      await toast.promise(
        signOut({
          redirect: false,
        }),
        {
          loading: "Вихід...",
          success: (res) => {
            router.push("/");
            return "Ви вийшли з облікового запису";
          },
          error: (e) => {
            return "Помилка виходу з облікового запису";
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    apiRequest({
      url: `/api/services?locale=${params.locale}`,
      method: "GET",
    })
      .then((res) => setServices(res))
      .catch((res) => setServices([]));
  }, []);

  const authStatus = useMemo(() => {
    let status: AuthStatus = "UNATHORIZED";
    const isAdmin = !!session?.user?.isSuperUser;
    const isAuthed = !!session?.user;

    if (isAuthed) {
      status = "MEMBER";
    }

    if (isAdmin) {
      status = "ADMIN";
    }

    return status;
  }, [session]);

  const renderAccButtons = () => {
    switch (authStatus) {
      case "UNATHORIZED":
        return (
          <>
            <div className="cursor-pointer hover:text-customPink duration-300">
              <SingupModal />
            </div>
            <div className="flex items-center h-5 w-0.5 bg-customPink"></div>

            <div className="cursor-pointer hover:text-customPink">
              <LoginModal />
            </div>
          </>
        );
      case "MEMBER":
        return (
          <>
            <div
              onClick={() => router.push("/account")}
              className="cursor-pointer hover:text-customPink duration-300"
            >
              Кабінет
            </div>
            <div className="flex items-center h-5 w-0.5 bg-customPink"></div>

            <div
              onClick={signout}
              className="cursor-pointer hover:text-customPink"
            >
              Вийти
            </div>
          </>
        );
      case "ADMIN":
        return (
          <>
            <div
              onClick={() => router.push("/adminpanel")}
              className="cursor-pointer hover:text-customPink duration-300"
            >
              Адмінпанель
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div
        className="fixed top-0 bg-white z-30"
        style={{
          width: "100%",
          boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="pc">
          <div
            className="gap-3 py-5 items-center"
            style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 1.8fr 0.7fr",
            }}
          >
            <div className="cursor-pointer">
              <Link href={"/"}>
                <Image
                  src="/images/header/logo.svg"
                  width={170}
                  height={64}
                  style={{ objectFit: "cover" }}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex gap-10 items-left">
              <div className="cursor-pointer hover:text-customPink duration-300">
                <Link href={"/"}>{t("home")}</Link>
              </div>
              <div className="cursor-pointer hover:text-customPink duration-300">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-x-[5px]">
                      <span className="">{t("services")}</span>
                      <ArrowBottom color="black" prop="w-[12px] h-[12px]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{t("services")}</DropdownMenuLabel>
                    {services.map((item) => (
                      <Link href={`/services/${item.slug}`} key={item.id}>
                        <DropdownMenuItem>
                          {item.textFields.title}
                        </DropdownMenuItem>
                      </Link>
                    ))}
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="cursor-pointer hover:text-customPink duration-300 whitespace-nowrap">
                <Link href={"/events/new"}>{t("events")}</Link>
              </div>
              <div className="cursor-pointer hover:text-customPink duration-300 whitespace-nowrap">
                <Link href={"/regions"}>{t("regions")}</Link>
              </div>
              <div className="cursor-pointer hover:text-customPink duration-300 whitespace-nowrap">
                <Link href={"/members"}>{t("members")}</Link>
              </div>
              <div className="cursor-pointer hover:text-customPink duration-300 whitespace-nowrap">
                <Link href={"/about-us"}>{t("about")}</Link>
              </div>
            </div>
            <div className="flex justify-end gap-5">
              <div className="flex gap-3 items-center">
                {renderAccButtons()}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{localeInfo.current}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{button("lang")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {localeInfo.display.map((item) => (
                      <DropdownMenuItem
                        onClick={() => switchLocale(item.value)}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mobile"
          style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-100 flex justify-between items-center py-5 px-7">
            <div>
              <Link href={"/"}>
                <Image
                  src="/images/header/logo.svg"
                  width={102}
                  height={35}
                  style={{ objectFit: "cover" }}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex items-right" onClick={() => setOpen(!open)}>
              <Image
                src="/images/header/burger.svg"
                width={25}
                height={25}
                style={{ objectFit: "cover" }}
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
      <SideBar
        params={params}
        open={open}
        setOpen={setOpen}
        services={services}
      />
    </>
  );
};

export default Header;
