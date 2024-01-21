import { ClientLocaleDataObject, ClientMember, fullMemberIncludeArgs, LocaleObjectValues } from "@/types";
import { Prisma } from "@prisma/client";

export const fullServiceIncludeArgs = {
    include: {
        Articles: {
            include: {
                Service: true,
                Mentors: true,
            }
        }
    }
}

export type Service = Prisma.ServiceGetPayload<typeof fullServiceIncludeArgs>

export type ServiceTextFieldsValue = {
    title: string;
}
export type ServiceTextField = LocaleObjectValues<ServiceTextFieldsValue>
export type ClientService = Service & ClientLocaleDataObject<ServiceTextFieldsValue>