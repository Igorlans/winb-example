import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
import type { BannerFormValue } from "@/app/(admin)/adminpanel/banner/formSchema";
import { BannerTextFields } from "@/types";

export async function POST(req: Request) {
    try {
        const body: BannerFormValue = await req.json();
        const {
            textFields,
            ...data
        } = body

        // Set ukrainian text as default
        const dbTextFields: BannerTextFields = {
            uk: textFields["uk"],
            en: textFields["uk"],
            pl: textFields["uk"]
        }

        await prisma.banner.create({
            data: {
                ...data,
                textFields: JSON.stringify(dbTextFields)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, { status: 500, statusText: e.message })
    }
}

export async function PUT(req: Request) {
    try {
        const body: BannerFormValue & { id: string } = await req.json()

        const {
            id,
            textFields,
            ...data
        } = body
        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.banner.update({
            where: { id },
            data: {
                ...data,
                textFields: JSON.stringify(textFields)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, { status: 500, statusText: e.message })
    }
}

export async function DELETE(req: Request) {
    try {
        const body: BannerFormValue & { id: string } = await req.json()

        const {
            id,
            textFields,
            ...data
        } = body
        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.banner.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, { status: 500, statusText: e.message })
    }
}