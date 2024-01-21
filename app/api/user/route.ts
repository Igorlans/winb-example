import { MemberFormValues } from "@/app/(admin)/adminpanel/members/formSchema";
import prisma from "@/prisma/client";
import { MemberFactsTextField, MemberTextField } from "@/types";
import { NextResponse } from "next/server";
import { Locale } from "@/i18n.config";
import { formLocaleMemberStatus } from "@/lib/memberTypes";
import { createLocaleMemberStatus } from "@/utils";



export async function POST(req: Request) {
    try {
        const body: MemberFormValues = await req.json()

        const {
            email,
            password,
            textFields,
            additional,
            facts,
            ...member
        } = body

        const dbUser = await prisma.user.findUnique({
            where: { email }
        })
        if(dbUser) {
            return Response.json({ message: "User with provided email already exist" }, { status: 400, statusText: "Bad request" })
        }

        const createDate = String(Date.now())


        const localeStatus = createLocaleMemberStatus(textFields)

        const dbTextFields: MemberTextField = {
            uk: {
                ...textFields["uk"],
                status: localeStatus.uk
            },
            en: {
                ...textFields["uk"],
                status: localeStatus.en
            },
            pl: {
                ...textFields["uk"],
                status: localeStatus.pl
            }
        }
        const dbFacts: MemberFactsTextField[] = facts.map(item => ({
            icon: item.icon,
            uk: item["uk"],
            en: item["uk"],
            pl: item["uk"]
        }))
        const dbAdditional: MemberFactsTextField[] = additional.map(item => ({
            icon: item.icon,
            uk: item["uk"],
            en: item["uk"],
            pl: item["uk"]
        }))

        await prisma.user.create({
            data: {
                email,
                password,
                createdAt: createDate,
                member: {
                    create: {
                        textFields: JSON.stringify(dbTextFields),
                        facts: JSON.stringify(dbFacts),
                        additional: JSON.stringify(dbAdditional),
                        ...member
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

export async function PUT(req: Request) {
    try {
        const body: MemberFormValues & { id: string | null } = await req.json()

        const {
            id,
            password,
            email,
            textFields,
            facts,
            additional,
            ...member
        } = body

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        const localeStatus = createLocaleMemberStatus(textFields);
        const dbTextFields: MemberTextField = {
            uk: {
                ...textFields["uk"],
                status: localeStatus.uk
            },
            en: {
                ...textFields["en"],
                status: localeStatus.en
            },
            pl: {
                ...textFields["pl"],
                status: localeStatus.pl
            }
        }

        await prisma.user.update({
            where: { id },
            data: {
                password,
                member: {
                    update: {
                        textFields: JSON.stringify(dbTextFields),
                        facts: JSON.stringify(facts),
                        additional: JSON.stringify(additional),
                        ...member
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

export async function DELETE(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if(!id) {
            return NextResponse.json({ message: "Bad request" }, { status: 400, statusText: "Bad request" })
        }

        await prisma.user.delete({
            where: { id },
        })

        return NextResponse.json({ message: "OK" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ message: e.message }, { status: 500, statusText: e.message })
    }
}