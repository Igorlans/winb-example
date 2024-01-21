import './globals.css'
import { Montserrat } from 'next/font/google'
import {notFound} from "next/navigation";
import {useLocale} from "next-intl";
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Head from 'next/head';
import { LocalePageParams } from "@/types";


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'WinB',
  description: 'Woman in business',
}

export default function LocaleLayout({
  children,
    params
}: {
  children: React.ReactNode,
} & LocalePageParams) {
    const locale = useLocale();

    // Show a 404 error if the user requests an unknown locale
    if (params.locale !== locale) {
        notFound();
    }
  return (
    <html lang={locale}>
      {/* <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/favicon/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="x16"
          href="/icons/favicon/favicon-16x16.png"
        />
      </Head> */}
      <body className={montserrat.className}>
        <header>
          <Header params={params} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
