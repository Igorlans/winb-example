import { NextResponse } from "next/server";
import { ArticleFormValues } from "@/app/(admin)/adminpanel/services/formSchema";
import prisma from "@/prisma/client";
import { slugify } from "@/utils/slugify";
import { ArticleTextField, fullServiceIncludeArgs } from "@/types";
import { transformServiceData } from "@/utils/service";
import { Locales } from "@/i18n.config";

export async function POST(req: Request) {
    try {
        const body: ArticleFormValues = await req.json();
        const {
            textFields,
            image,
            mentors,
            ...data
        } = body;

        const dbTextFields: ArticleTextField = {
            uk: textFields["uk"],
            en: textFields["uk"],
            pl: textFields["uk"]
        }
        const slug = slugify(dbTextFields.uk.title)

        await prisma.article.create({
            data: {
                ...data,
                Mentors: {
                    connect: mentors
                },
                slug,
                image: image.map(item => item.url),
                textFields: JSON.stringify(dbTextFields)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ message: e.message }, { status: 500, statusText: e.message })
    }
}

export async function PUT(req: Request) {
    try {
        const body: ArticleFormValues & { id: string | null } = await req.json();
        const {
            textFields,
            image,
            id,
            mentors,
            ...data
        } = body;

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        const slug = slugify(textFields.uk.title)

        await prisma.article.update({
            where: { id },
            data: {
                ...data,
                Mentors: {
                    set: mentors
                },
                slug,
                image: image.map(item => item.url),
                textFields: JSON.stringify(textFields)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ message: e.message }, { status: 500, statusText: e.message })
    }
}

export async function DELETE(req: Request) {
    try {
        const body: { id: string } = await req.json()
        const { id } = body
        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.article.delete({
            where: { id }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ message: e.message }, { status: 500, statusText: e.message })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const locale = searchParams.get("locale") as Locales | undefined;

        let services = await prisma.service.findMany({
            ...fullServiceIncludeArgs
        })
        services = transformServiceData(services, locale ?? "uk")

        return NextResponse.json({ data: services, message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ data: [], message: e.message }, { status: 500, statusText: e.message })
    }
}