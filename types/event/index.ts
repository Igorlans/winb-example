import { $Enums, type Prisma } from "@prisma/client";

import {
    ClientLocaleDataObject,
    ClientMember,
    ClientRegion,
    LocaleObjectValues
} from "@/types";
import {
    EventGuestTextFieldsValue,
    EventTextFieldsValue
} from "@/app/(admin)/adminpanel/events/_components/formSchema";

export const fullEventIncludeArgs = {
    include: {
        eventTickets: true,
        region: {
            include: {
                images: true,
                Members: true
            }
        }
    }
}

export const fullEventTicketIncludeArgs = {
    include: {
        Event: {
            include: {
                region: {
                    include: {
                        images: true,
                        Members: true
                    }
                }
            }
        },
        Member: {
            include: {
                region: true,
                services: true,
                requests: true,
                user: true
            }
        }
    }
}

export type Event = Prisma.EventGetPayload<typeof fullEventIncludeArgs>
export type Ticket = Prisma.EventTicketGetPayload<typeof fullEventTicketIncludeArgs>

export type EventTextFields = LocaleObjectValues<EventTextFieldsValue>
export type EventGuestTextFields = {
    image: string,
    link?: string
} & LocaleObjectValues<EventGuestTextFieldsValue>

export type ClientEvent = Event & ClientLocaleDataObject<EventTextFieldsValue> & {
    region: ClientRegion | null
    eventGuest: {
        image: string,
        link?: string
    } & EventGuestTextFieldsValue
}

export type ClientTicket = Ticket & {
    event: ClientEvent,
    member: ClientMember
}