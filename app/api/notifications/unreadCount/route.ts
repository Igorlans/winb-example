import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {

        const unreadNotificationsCount = await prisma.notification.aggregate({
            where: {
                status: 'UNREAD'
            },
            _count: true
        });

        return NextResponse.json({data: unreadNotificationsCount._count}, {
            status: 200
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}