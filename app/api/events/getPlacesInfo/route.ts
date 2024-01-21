import {NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({message: 'Не вказаний ID івенту'}, {
                status: 400
            })
        }

        const event = await prisma.event.findUnique({
            where: {
                id
            },
            include: {
                eventTickets: true
            }
        })

        if (!event) {
            return NextResponse.json({message: 'Івент не знайдено'}, {
                status: 404
            })
        }


        const eventInfoObj = {
            places: event.places,
            takenPlaces: event.eventTickets.filter(ticket => ticket.verified).length
        }

        return NextResponse.json({message: 'Інформація про місця', data: eventInfoObj}, {
            status: 200
        })

    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}