import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {fullMemberInclude} from "@/types/members";
import { MailParams } from "@/utils/generateMail";
import { generateMail } from "@/utils/generateMail";
import { generateMailOptions } from "@/lib/nodemailer";
import { transporter } from "@/lib/nodemailer";
import type { Event, EventTextFields, LocaleObjectValues } from "@/types";
import { EventFormValue, EventGuestTextFieldsValue } from "@/app/(admin)/adminpanel/events/_components/formSchema";
import { $Enums } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const body: EventFormValue = await req.json()
        const {
            eventGuest,
            textFields,
            price,
            memberPrice,
            places,
            ...data
        } = body

        // Set ukrainian text as default
        const dbTextFields: EventTextFields = {
            uk: textFields["uk"],
            en: textFields["uk"],
            pl: textFields["uk"]
        }
        const dbEvenGuest: LocaleObjectValues<EventGuestTextFieldsValue> = {
            uk: eventGuest["uk"],
            en: eventGuest["uk"],
            pl: eventGuest["pl"]
        }
        
        await prisma.event.create({
            data: {
                ...data,
                price: Number(price),
                memberPrice: Number(memberPrice),
                places: Number(places),
                textFields: JSON.stringify(dbTextFields),
                eventGuest: JSON.stringify(dbEvenGuest)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return Response.json(true, {status: 500, statusText: e.message})
    }
}

export async function PUT(req: Request) {
    try {
        const body: EventFormValue & { id: string | null } = await req.json()
        const {
            eventGuest,
            textFields,
            price,
            memberPrice,
            places,
            id,
            ...data
        } = body

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.event.update({
            where: { id },
            data: {
                ...data,
                textFields: JSON.stringify(textFields),
                eventGuest: JSON.stringify(eventGuest)
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return Response.json(true, {status: 500, statusText: e.message})
    }
}

export async function DELETE(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.event.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, { status: 500, statusText: e.message })
    }
}

// export async function POST(req: Request) {
//     try {
//         const body: EventFormValues = await req.json();
//
//         const newEvent = await prisma.event.create({
//             data: {
//                 ...body,
//                 price: Number(body.price),
//                 memberPrice: Number(body.memberPrice),
//                 places: Number(body.places),
//             },
//             include: {
//                 Region: true
//             }
//         })
//
//         const members = await prisma.member.findMany({
//             where: {
//                 regionId: body.regionId
//             },
//             include: fullMemberInclude
//         })
//
//         const mailParams: MailParams = {
//             event: {
//                 id: newEvent.id,
//                 title: newEvent.title,
//                 description: newEvent.description,
//                 date: newEvent.date,
//                 region: newEvent?.Region?.name ?? "Всі регіони",
//                 place: body.venue ?? "Всі місця",
//                 img: body.image,
//             },
//             member: {
//                 img: body.eventGuest.image,
//                 name: body.eventGuest.name,
//                 description: body.eventGuest.description
//             }
//         }
//
//         const mail = generateMail(mailParams)
//         const options = generateMailOptions(members, "Нова подія у вашому регіоні", mail)
//         await transporter.sendMail(options)
//
//         return NextResponse.json({message: 'Подію створено', data: newEvent}, {
//             status: 201
//         })
//
//     } catch (e: any) {
//         console.log(e)
//         return NextResponse.json({message: e.message}, {
//             status: 500
//         })
//     }
// }