import { NextResponse } from "next/server";

import type { LoginFormValues } from "@/components/modals/loginSchema";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
    try {
        const body: LoginFormValues = await req.json();
        const {
            name,
            phone,
            email
        } = body
        await prisma.registrationRequest.create({
            data: {
                name,
                phone,
                email,
                notification: {
                    create: {
                        Notification: {
                            create: {
                                type: 'REQUEST',
                                createdAt: String(Date.now()),
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({message: 'Заявку створено'}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    try {
        const body: LoginFormValues = await req.json()

        const {
            id
        } = body;

        await prisma.registrationRequest.delete({
            where: {
                id
            }
        })
        return NextResponse.json({message: 'Заявку видалено'}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}