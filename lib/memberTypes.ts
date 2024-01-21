import { SelectItem } from "@/components/ui/custom/FormSelect";
import { ClientMemberStatus, MemberStatusTextField } from "@/types";
import { Locale } from "@/i18n.config";

export const formLocaleMemberStatus: MemberStatusTextField = {
    uk: [
        {label: 'Кандидатка', value: 'Кандидатка'},
        {label: 'Амбасадорка', value: 'Амбасадорка'},
        {label: 'Менторка', value: 'Менторка'},
        {label: 'Засновниця', value: 'Засновниця'},
        {label: 'Виконавча директорка', value: 'Виконавча директорка'},
        {label: 'Регіональна представниця', value: 'Регіональна представниця'},
    ],
    en: [
        {label: 'Кандидатка', value: 'Candidate'},
        {label: "Амбасадорка", value: "Ambassador"},
        {label: 'Менторка', value: 'Mentor'},
        {label: 'Засновниця', value: 'Founder'},
        {label: 'Виконавча директорка', value: 'Executive Director'},
        {label: 'Регіональна представниця', value: 'Regional representative'}
    ],
    pl: [
        {label: 'Кандидатка', value: 'Kandydat'},
        {label: "Амбасадорка", value: "Ambasador"},
        {label: 'Менторка', value: 'Mentor'},
        {label: 'Засновниця', value: 'Założyciel'},
        {label: 'Виконавча директорка', value: 'Dyrektor wykonawczy'},
        {label: 'Регіональна представниця', value: 'Przedstawiciel regionalny'}
    ]
}

export const localeMemberStatus: MemberStatusTextField = {
    uk: [
        {label: 'Кандидатка', value: 'Кандидатка'},
        {label: 'Амбасадорка', value: 'Амбасадорка'},
        {label: 'Менторка', value: 'Менторка'},
        {label: 'Засновниця', value: 'Засновниця'},
        {label: 'Виконавча директорка', value: 'Виконавча директорка'},
        {label: 'Регіональна представниця', value: 'Регіональна представниця'},
    ],
    en: [
        {label: 'Candidate', value: 'Candidate'},
        {label: "Ambassador", value: "Ambassador"},
        {label: 'Mentor', value: 'Mentor'},
        {label: 'Founder', value: 'Founder'},
        {label: 'Executive Director', value: 'Executive Director'},
        {label: 'Regional representative', value: 'Regional representative'}
    ],
    pl: [
        {label: 'Kandydat', value: 'Kandydat'},
        {label: "Ambasador", value: "Ambasador"},
        {label: 'Mentor', value: 'Mentor'},
        {label: 'Założyciel', value: 'Założyciel'},
        {label: 'Dyrektor wykonawczy', value: 'Dyrektor wykonawczy'},
        {label: 'Przedstawiciel regionalny', value: 'Przedstawiciel regionalny'}
    ]
}

export const homePageMembersStatus: Record<Locale, string[]> = {
    uk: ['Регіональна представниця', 'Засновниця', 'Виконавча директорка'],
    en: ['Regional representative', 'Founder', 'Executive Director'],
    pl: ['Założyciel', 'Dyrektor wykonawczy', 'Przedstawiciel regionalny']
}
export const memberOrder: Record<Locale, string[]> = {
    uk: ["Засновниця", "Виконавча директорка", "Регіональна представниця", "Менторка", "Амбасадорка", "Кандидатка"],
    en: ['Founder', 'Executive Director', 'Regional representative', 'Mentor', 'Ambassador', 'Candidate'],
    pl: ['Założyciel', 'Dyrektor wykonawczy', 'Przedstawiciel regionalny', 'Mentor', 'Ambasador', 'Kandydat']
}