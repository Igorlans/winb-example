import prisma from "@/prisma/client";
import {Prisma} from "@prisma/client";

async function getFullRequest () {
    const request = await prisma.registrationRequest.findFirstOrThrow()
    return request
}

export type FullRegistrationRequest = Prisma.PromiseReturnType<typeof getFullRequest>