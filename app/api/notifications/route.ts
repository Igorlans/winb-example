import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {fullNotificationInclude} from "@/types/notifications";
import {notificationPageSize} from "@/config";
import { transformNotificationData } from "@/utils";
import { Locales } from "@/i18n.config";


export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.nextUrl);

        const type = searchParams.get("type") as "ALL" | "READ" | 'UNREAD' | null;
        const locale = searchParams.get("locale") as Locales | undefined;
        const status = (!type || type === 'ALL') ? undefined : type
        const page = Number(searchParams.get('page'))

        console.log('data', {
            type,
            status,
            page
        })

        const notifications = await prisma.notification.findMany({
            where: {status},
            take: Number(notificationPageSize),
            skip: (Number(page) - 1) * Number(notificationPageSize),
            orderBy: {createdAt: "desc"},
            include: fullNotificationInclude
        });

        const clientNotification = transformNotificationData(notifications,  locale ?? "uk")

        return NextResponse.json({data: clientNotification}, {
            status: 200
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}