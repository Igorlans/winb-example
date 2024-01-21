import { ClientArticle, ClientLocaleDataObject, ClientRegion, LocaleObjectValues } from "@/types";
import { MemberFactsValues, MemberTextFieldsValues } from "@/app/(admin)/adminpanel/members/formSchema";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { SelectItem } from "@/components/ui/custom/FormSelect";

export const fullMemberIncludeArgs = {
    include: {
        tickets: true,
        region: true,
        services: {
            include: {
                Service: true,
                requests: true
            }
        },
        requests: true,
        user: true
    }
}
async function getFormMember(id: string) {
    return prisma.member.findFirstOrThrow({
        where: { id },
        ...fullMemberIncludeArgs
    })
}

export type Member = Prisma.PromiseReturnType<typeof getFormMember>

export type MemberTextField = LocaleObjectValues<MemberTextFieldsValues>
export type MemberFactsTextField = {
    icon: string
} & LocaleObjectValues<MemberFactsValues>

export type ClientMember = Member & {
    textFields: MemberTextFieldsValues,
    facts: MemberFactsValues[],
    addition: MemberFactsValues[],
    region: ClientRegion,
    services: ClientArticle[]
}

export type MemberStatusTextField = LocaleObjectValues<SelectItem[]>
export type ClientMemberStatus = ClientLocaleDataObject<SelectItem[]>