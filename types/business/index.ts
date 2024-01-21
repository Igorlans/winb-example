import { Prisma } from "@prisma/client";
import { ClientLocaleDataObject, LocaleObjectValues } from "@/types";

export const fullBusinessIncludeArgs = {
    include: {
        member: true
    }
}

export type Business = Prisma.BusinessGetPayload<typeof fullBusinessIncludeArgs>
export type BusinessTextFieldsValue = {
    title: string
}
export type BusinessTextFields = LocaleObjectValues<BusinessTextFieldsValue>
export type ClientBusiness = Business & ClientLocaleDataObject<BusinessTextFieldsValue>