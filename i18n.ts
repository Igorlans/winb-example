import { notFound, usePathname, useRouter } from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
import { i18n, Locale } from "@/i18n.config";
import { SelectItem } from "@/components/ui/custom/FormSelect";
import { useMemo } from "react";

// Can be imported from a shared config
const locales = i18n.locales;

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`./messages/${locale}.json`)).default
    };
});


export function useLocale(currentLocale: Locale) {
    const pathname = usePathname()
    const router = useRouter()
    const switchLocale = (locale: Locale) => {
        if(!locales.includes(locale)) notFound()

        const path = pathname.replace(currentLocale, locale)
        const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)

        router.replace(url.pathname)
    }

    const localeInfo: {
        current: string,
        display: { label: string, value: Locale }[]
    } = useMemo(() => {
        const rest = locales.filter(item => item !== currentLocale)
        return {
            current: currentLocale.toUpperCase(),
            display: rest.map(item => ({
                label: item.toUpperCase(), value: item
            }))
        }
    }, [currentLocale])

    return { switchLocale, localeInfo }
}