import createMiddleware from 'next-intl/middleware';
import { i18n } from '@/i18n.config'

export default createMiddleware({
    // A list of all locales that are supported
    locales: i18n.locales,

    // Used when no locale matches
    defaultLocale: i18n.defaultLocale,
});

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/((?!api|images|icons|_next/static|_next/image|favicon.ico).*)']
    matcher: ['/((?!api|adminpanel|signIn|_next|.*\\..*).*)']
};