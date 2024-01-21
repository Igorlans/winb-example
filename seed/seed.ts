import prisma from "@/prisma/client";
import regions from "./data/regions.json";
import users from "./data/users.json"
import services from "./data/services.json";
import events from "./data/events.json";
import articles from "./data/articles.json";
import members from "./data/members.json";
import banners from "./data/banners.json";
import business from "./data/businesses.json";
import {
    ArticleTextField, BannerTextFields, BusinessTextFields, EventGuestTextFields,
    EventTextFields,
    MemberFactsTextField,
    MemberTextField,
    RegionTextFields,
    ServiceTextField
} from "@/types";
import { ServiceTextFieldsValue } from "@/types";
import { ArticleTextFieldsValue } from "@/app/(admin)/adminpanel/services/formSchema";
import { MemberTextFieldsValues } from "@/app/(admin)/adminpanel/members/formSchema";
import { $Enums, Banner, Business } from "@prisma/client";
import {
    EventGuestTextFieldsValue,
    EventTextFieldsValue
} from "@/app/(admin)/adminpanel/events/_components/formSchema";
import { slugify } from "@/utils/slugify";
import { BannerTextFieldsValue } from "@/app/(admin)/adminpanel/banner/formSchema";
import { createLocaleMemberStatus } from "@/utils";
export async function createRegions() {
    await prisma.region.createMany({
        data: [
            ...regions.map(item => {
                const text = {
                    name:item.name,
                    title:item.title,
                    description:item.description,
                    cityTitle:item.cityTitle,
                    cityDescription:item.cityDescription,
                }
                const textFields: RegionTextFields = {
                    uk: text,
                    en: text,
                    pl: text
                }
                return {
                    id: item.id,
                    video: item.video,
                    isActive: item.isActive,
                    slug: item.slug,
                    textFields: JSON.stringify(textFields)
                }
            })
        ]
    })
}

export async function createBusiness() {
    await prisma.business.createMany({
        data: [
            ...business.map(item => {
                const textFields: BusinessTextFields = {
                    uk: {
                        title: item.title
                    },
                    en: {
                        title: item.title_en
                    },
                    pl: {
                        title: item.title_pl
                    }

                }
                const slug = slugify(item.title)
                return {
                    slug,
                    textFields: JSON.stringify(textFields)
                }
            })
        ]
    });


    return prisma.business.findMany()
}

export async function createServices() {
    await prisma.service.createMany({
        data: [
            ...services.map(item => {
                const textFields: ServiceTextField = {
                    uk: { title: item.title },
                    en: { title: item.title_en },
                    pl: { title: item.title_pl }
                }
                return {
                    id: item.id,
                    slug: item.slug,
                    textFields: JSON.stringify(textFields),
                    image: "/images/LeadMagnet.png"
                }
            })
        ]
    })
}

export async function createArticles() {
    await prisma.article.createMany({
        data: [
            ...articles.map(item => {
                const text: ArticleTextFieldsValue = {
                    title: item.title,
                    description: item.description,
                    text: item.text,
                    editor: item.editor
                }
                const textFields: ArticleTextField = {
                    uk: text,
                    en: text,
                    pl: text
                }
                return {
                    id: item.id,
                    textFields: JSON.stringify(textFields),
                    slug: item.slug,
                    serviceId: item.serviceId,
                    image: [item.image],
                    isPaidService: item.isPaidService,
                }
            })
        ]
    })
}

export async function createEvents() {
    await prisma.event.createMany({
        data: [
            ...events.map(item => {
                const text: EventTextFieldsValue = {
                    title: item.title,
                    description: item.description,
                    venue: item.venue
                }
                const guest: EventGuestTextFieldsValue = {
                    name: item.eventGuest.name,
                    description: item.eventGuest.description
                }

                const textFields: EventTextFields = {
                    uk: text,
                    en: text,
                    pl: text
                }
                const eventGuest: EventGuestTextFields = {
                    image: item.eventGuest.image,
                    link: item.eventGuest.link,
                    uk: guest,
                    en: guest,
                    pl: guest
                }

                return {
                    id: item.id,
                    price: item.price,
                    memberPrice: item.memberPrice,
                    date: item.date,
                    endTime: item.endTime,
                    eventGuest: JSON.stringify(eventGuest),
                    image: item.image,
                    networkStatus: item.networkStatus as $Enums.NetworkStatus,
                    places: item.places,
                    startTime: item.startTime,
                    regionId: item.regionId,
                    textFields: JSON.stringify(textFields)
                }
            })
        ]
    })
}

export async function createUsers() {
    await prisma.user.createMany({
        data: [
            ...users.map(item => ({
                id: item.id,
                email: item.email,
                password: item.password,
                createdAt: item.createdAt,
                isSuperUser: item.isSuperUser
            }))
        ]
    })
}

export async function createMembers(businessId: string) {
    await prisma.member.createMany({
        data: [
            ...members.map(item => {
                const text: MemberTextFieldsValues = {
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    slogan: item.slogan,
                    experience: item.experience
                }
                const factsTextFields: MemberFactsTextField[] = item.facts.items.map(v => ({
                    icon: "",
                    uk: { text: "" },
                    en: { text: "" },
                    pl: { text: "" }
                }))
                const additionTextFields: MemberFactsTextField[] = item.additional.items.map(v => ({
                    icon: "",
                    uk: { text: "" },
                    en: { text: "" },
                    pl: { text: "" }
                }))
                const textFields: MemberTextField = {
                    uk: text,
                    en: text,
                    pl: text
                }

                const localeMemberStatus = createLocaleMemberStatus(textFields)

                const dbTextFields: MemberTextField = {
                    uk: {
                        ...textFields.uk,
                        status: localeMemberStatus.uk
                    },
                    en: {
                        ...textFields.en,
                        status: localeMemberStatus.en
                    },
                    pl: {
                        ...textFields.pl,
                        status: localeMemberStatus.pl
                    }
                }

                return {
                    id: item.id,
                    textFields: JSON.stringify(dbTextFields),
                    additional: JSON.stringify(additionTextFields),
                    facts: JSON.stringify(factsTextFields),
                    phone: item.phone,
                    image: item.image,
                    userId: item.userId,
                    regionId: item.regionId,
                    businessId
                }
            })
        ]
    })
}

export async function createBanners() {
    return prisma.banner.createMany({
        data: [
            ...banners.map(item => {
                const text: BannerTextFieldsValue = {
                    title: item.title,
                    subtitle: item.subtitle
                }
                const textFields: BannerTextFields = {
                    uk: text,
                    en: text,
                    pl: text
                }

                return {
                    id: item.id,
                    type: item.type as $Enums.BannerType,
                    link: item.link,
                    image: item.image,
                    textFields: JSON.stringify(textFields)
                }
            })
        ]
    })
}