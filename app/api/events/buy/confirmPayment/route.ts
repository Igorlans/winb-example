import prisma from "@/prisma/client";
import {NextResponse} from "next/server";
import HmacMD5 from "crypto-js/hmac-md5";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // const body = JSON.parse(Object.keys(json)[0]);

        let changedStatus = false

        if (body.transactionStatus === 'Approved') {
            await prisma.eventTicket.update({
                where: {
                    id: body.orderReference,
                },
                data: {
                    verified: true,
                },
            })
            changedStatus = true
        }

        const timestampMillis = Date.now();
        const timestampSeconds = Math.floor(timestampMillis / 1000);

        const merchantSecretKey = '1e866388930e0556e88234d502dc502e85fd982b';
        const orderReference = body.orderReference;
        const status = 'accept';
        const time = timestampSeconds;

        const str = `${orderReference};${status};${time}`;

        const signature = HmacMD5(str, merchantSecretKey).toString();


        return NextResponse.json({message: 'Подію створено', data: {
                orderReference,
                status,
                time,
                signature
            }}, {
            status: changedStatus ? 201 : 200
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}