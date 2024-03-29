import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of new locales that are supported
    locales: ['uk', 'en'],

    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'uk'
});

export const config = {
    // Skip new paths that should not be internationalized
    matcher: ['/((?!api|_next|.*\\..*).*)']
};