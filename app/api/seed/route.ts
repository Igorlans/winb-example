import {
    createArticles,
    createBanners, createBusiness,
    createEvents,
    createMembers,
    createRegions,
    createServices,
    createUsers
} from "@/seed/seed";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { BusinessTextFields } from "@/types";
import { slugify } from "@/utils/slugify";

export async function POST(req: Request) {
    try {
        await createUsers()
            .then(() => createRegions())
            .then(() => createServices())
            .then(() => createBusiness())
            .then((res) => createMembers(res[0].id))
            .then(() => createArticles())
            .then(() => createEvents())
            .then(() => createBanners())

        return NextResponse.json({ message: "OK" }, { status: 200 })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    try {
        await prisma.user.deleteMany()
            .then(() => prisma.region.deleteMany())
            .then(() => prisma.service.deleteMany())
            .then(() => prisma.business.deleteMany())
            .then(() => prisma.member.deleteMany())
            .then(() => prisma.article.deleteMany())
            .then(() => prisma.event.deleteMany())
            .then(() => prisma.banner.deleteMany())

        return NextResponse.json({ message: "OK" }, { status: 200 })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}