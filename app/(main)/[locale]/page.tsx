import SwiperBanner from "./(components)/(swiper)/SwiperBanner";
import Achievement from "./(components)/(achievement)/Achievement";
import LeadMagnet from "./(components)/(leadMagnet)/LeadMagnet";
import MemberSlider from "./(components)/(swiper)/(members)/MembersSlider";
import Services from "./(components)/(services)/Services";
import Advantages from "./(components)/(advantages)/Advantages";
import EventSlider from "./(components)/(swiper)/SwiperEvents";
import prisma from "@/prisma/client";
import ServicesNav from "@/app/(main)/[locale]/(components)/ServicesNav";
import Mission from "./(components)/(mission)/Mission";
import {
  fullBannerIncludeArgs,
  fullEventIncludeArgs,
  fullMemberIncludeArgs,
  LocalePageParams,
} from "@/types";
import { transformMemberData } from "@/utils/member";
import { transformEventData } from "@/utils/event";
import { unstable_setRequestLocale } from "next-intl/server";
import { orderSort } from "@/utils";
import { homePageMembersStatus, memberOrder } from "@/lib/memberTypes";
import { transformBannerData } from "@/utils/banner";
import { Locale } from "@/i18n.config";

export const revalidate = 300;

export default async function Home({ params: { locale } }: LocalePageParams) {
  unstable_setRequestLocale(locale);

  const members = await prisma.member.findMany({
    ...fullMemberIncludeArgs,
  });
  let clientMembers = transformMemberData(members, locale);
  clientMembers = clientMembers.filter((item) =>
    homePageMembersStatus[locale].includes(item.textFields.status)
  );

  clientMembers = orderSort(clientMembers, memberOrder[locale]);

  const banners = await prisma.banner.findMany({
    where: {
      type: "MAIN",
    },
    ...fullBannerIncludeArgs,
  });

  let clientBanner = transformBannerData(banners, locale);

  const bannerSlideOrder = ["clnnfg4h50002q8pgktr8mxtj"];
  clientBanner = clientBanner.sort(
    (a, b) => bannerSlideOrder.indexOf(b.id) - bannerSlideOrder.indexOf(a.id)
  );

  const currentDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() - 1);
  const from = String(nextDay.getTime());

  const events = await prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
    where: {
      date: {
        gte: from,
      },
    },
    ...fullEventIncludeArgs,
  });
  const clientEvents = transformEventData(events, locale);
  return (
    <div>
      <SwiperBanner banners={clientBanner} />
      <Services />
      <div className="sectionGap">
        <EventSlider events={clientEvents} topGap={20} />
        <Advantages />
        <Mission />
        <LeadMagnet />
        <ServicesNav />

        <Achievement />
        <MemberSlider members={clientMembers} />
      </div>
    </div>
  );
}
