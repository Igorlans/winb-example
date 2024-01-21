import {type Prisma} from "@prisma/client";
import prisma from "@/prisma/client";
import {
    ClientEvent,
    ClientLocaleDataObject, ClientMember,
    fullEventIncludeArgs,
    fullMemberIncludeArgs,
    LocaleObjectValues
} from "@/types";
import { RegionTextFieldsValues } from "@/app/(admin)/adminpanel/regions/formSchema";

export const formRegionSelectArgs = {
    select: {
        id: true,
        textFields: true
    }
}

export const fullRegionIncludeArgs = {
    include: {
        Events: true,
        images: true,
        Members: true
    }
}

async function getFormRegionData(id: string) {
    return prisma.region.findFirstOrThrow({
        where: { id },
        ...formRegionSelectArgs
    })
}

export type FormRegion = Prisma.PromiseReturnType<typeof getFormRegionData>
export type Region = Prisma.RegionGetPayload<typeof fullRegionIncludeArgs>

export type RegionTextFields = LocaleObjectValues<RegionTextFieldsValues>
export type ClientRegion = Region & {
    textFields: RegionTextFieldsValues;
    events: ClientEvent[];
    members: ClientMember[];
}