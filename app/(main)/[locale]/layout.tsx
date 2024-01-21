import './globals.css'
import {Montserrat} from 'next/font/google'
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Providers from "@/app/(main)/Providers";
import {Toaster} from "react-hot-toast";
import Script from "next/script";
import { Metadata } from 'next';
import React, { ReactNode } from "react";
import getRequestConfig from "@/i18n";
import { NextIntlClientProvider } from "next-intl";
import { i18n } from "@/i18n.config";
import { unstable_setRequestLocale } from "next-intl/server";


const montserrat = Montserrat({subsets: ['latin']})
const locales = i18n.locales;

export const metadata: Metadata = {
    title: 'WinB',
    description: 'Woman in business',
    icons: {
        icon: '/icons/favicon/favicon-32x32.png',
        shortcut: '/icons/favicon/favicon-32x32.png',
        apple: '/icons/favicon/apple-touch-icon.png',
    },
    openGraph: {
        type: "website",
        url: `${process.env.NEXTAUTH_URL}`,
        title: "Women in business",
        description: "Women in business",
        siteName: "Women in business",
        images: [
            {url: "/icons/favicon/favicon-32x32.png"}
        ]
    }
}

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: ReactNode,
    params: any
}) {
    const { messages } = await getRequestConfig({locale})
    unstable_setRequestLocale(locale);
    return (
        <html lang={locale}>
        <body className={montserrat.className}>
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-T5KZ5P89');
                `}
        </Script>
        <noscript
            dangerouslySetInnerHTML={{
                __html:
                    `<iframe 
                src="https://www.googletagmanager.com/ns.html?id=GTM-T5KZ5P89"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
          ></iframe>`
            }}></noscript>
        
        <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Toaster/>
                <header>
                    <Header params={{ locale }}/>
                </header>
                <main>{children}</main>
                <footer>
                    <Footer/>
                </footer>
            </NextIntlClientProvider>
        </Providers>
        </body>
        </html>
    );
}
