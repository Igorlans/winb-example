import { Locale } from "@/i18n.config";
import {
    Event,
    ClientEvent,
    EventTextFields,
    Region,
    EventGuestTextFields,
    Ticket,
    ClientTicket,
    Member
} from "@/types"
import { textFieldsTransformCatch, transformRegionData } from "@/utils";
import { transformMemberData } from "@/utils/member";

export function transformEventData(data: Event, locale: Locale): ClientEvent;
export function transformEventData(data: Event[], locale: Locale): ClientEvent[];
export function transformEventData(
    data: Event[] | Event, locale: Locale
): ClientEvent | ClientEvent[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const eventTextFields = JSON.parse(item.textFields as string) as EventTextFields
                const {
                    image,
                    link,
                    ...eventGuestTextFields
                } = JSON.parse(item.eventGuest as string) as EventGuestTextFields
                return {
                    ...item,
                    textFields: eventTextFields[locale],
                    eventGuest: {
                        image, link,
                        ...eventGuestTextFields[locale]
                    },
                    region: transformRegionData(item.region as Region, locale)
                }
            })
        } else {
            const eventTextFields = JSON.parse(data.textFields as string) as EventTextFields
            const {
                image,
                link,
                ...eventGuestTextFields
            } = JSON.parse(data.eventGuest as string) as EventGuestTextFields
            return {
                ...data,
                textFields: eventTextFields[locale],
                eventGuest: {
                    image, link,
                    ...eventGuestTextFields[locale]
                },
                region: transformRegionData(data.region as Region, locale)
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}

export function transformEventTicketData(data: Ticket, locale: Locale): ClientTicket;
export function transformEventTicketData(data: Ticket[], locale: Locale): ClientTicket[];
export function transformEventTicketData(
    data: Ticket | Ticket[], locale: Locale
): ClientTicket | ClientTicket[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                return {
                    ...item,
                    event: transformEventData(item.Event as Event, locale),
                    member: transformMemberData(item.Member as Member, locale)
                }
            })
        } else {
            return {
                ...data,
                event: transformEventData(data.Event as Event, locale),
                member: transformMemberData(data.Member as Member, locale)
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}