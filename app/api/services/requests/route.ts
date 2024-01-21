import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {ServiceBuyFormValues} from "@/app/(main)/[locale]/services/(components)/MentorCard/ServiceBuyForm";

export async function POST(req: Request) {
    try {
        const body: ServiceBuyFormValues = await req.json();
        const newServiceRequest = await prisma.articleRequest.create({
            data: {
                memberId: body.memberId,
                articleId: body.serviceId,
                name: body.name,
                phone: body.phone,
                comment: body.comment,
                notification: {
                    create: {
                        Notification: {
                            create: {
                                type: 'SERVICE',
                                createdAt: String(Date.now()),
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json({message: 'Запис оформлено', data: newServiceRequest}, {
            status: 201
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}