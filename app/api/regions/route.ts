import { NextResponse } from "next/server";
import { type ImageInputValues } from "@/types/types";
import prisma from "@/prisma/client";
import { RegionFormValues } from "@/app/(admin)/adminpanel/regions/formSchema";

export async function PUT(req: Request) {
    try {
        const body: RegionFormValues = await req.json()
        const {
            id,
            textFields,
            images,
            banner,
            isActive,
            video
        } = body

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.region.update({
            where: { id },
            data: {
                isActive,
                video,
                textFields: JSON.stringify(textFields),
                images: {
                    deleteMany: {},
                    createMany: {
                        data: [
                            ...images.map((img: ImageInputValues, i) => ({
                                url: img.url,
                                name: `${textFields.uk.name} ${i+1}`
                            })),
                            { 
                                url: banner, 
                                name: "Банер", 
                                isBanner: true 
                            }
                        ]
                    }
                }
            }
        })
        
        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ message: e.message }, { status: 500, statusText: e.message })
    }
}

// export async function GET(req: Request) {
//     try {
//         const regions = await prisma.region.findMany({
//             where: {
//                 isActive: true
//             },
//             include: {
//                 images: true,
//                 Events: {
//                     where: {
//                         date: {
//                             gte: getArchiveDate()
//                         }
//                     },
//                     orderBy: {
//                         date: 'asc'
//                     }
//                 },
//                 Members: true
//             }
//         })
//         return NextResponse.json({data: regions}, {
//             status: 201
//         })
//     } catch (e: any) {
//         console.log(e);
//         return NextResponse.json({message: e.message}, {
//             status: 500
//         })
//     }
// }
