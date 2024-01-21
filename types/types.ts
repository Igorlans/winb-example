import {Event, Image, Member, Prisma, Region} from "@prisma/client";
import { z } from "zod"
import {LinkProps} from "next/link";
import {getArchiveDate} from "@/utils/getArchiveDate";
import prisma from "@/prisma/client";

export const imageInput = z.object({
    id: z.string().optional(),
    url: z.string().nonempty({ message: "Зображення обов'язкове" }),
    isBanner: z.boolean().default(false),
    name: z.string().optional(),
})
export type ImageInputValues = z.infer<typeof imageInput>

export interface RegionWithImages extends Region {
    images: ImageInputValues[];
}

export const fullRegionIncludeArgs = {
    images: true,
    Events: {
        where: {
            date: {
                gte: getArchiveDate()
            }
        },
        orderBy: {
            date: 'asc'
        }
    },
    Members: true
}

const getFullRegion = async () => {
    const region = await prisma.region.findFirstOrThrow({
        include: {
            images: true,
            Events: {
                where: {
                    date: {
                        gte: getArchiveDate()
                    }
                },
                orderBy: {
                    date: 'asc'
                }
            },
            Members: true
        }
    });
    return region;
}


export type FullRegion = Prisma.PromiseReturnType<typeof getFullRegion>
export interface Breadcrumb {
    text: string;
    href: LinkProps['href']
}


export type AuthStatus = 'UNATHORIZED' | 'ADMIN' | 'MEMBER';

export interface EventPlacesInfo {
    places: number;
    takenPlaces: number
}


