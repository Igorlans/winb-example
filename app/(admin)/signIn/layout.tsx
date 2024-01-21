import '../../(main)/[locale]/globals.css'
import { Montserrat } from 'next/font/google'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
    title: 'WinB Admin',
    description: 'Woman in business',
}

interface IRootLayoutProps {
    children: React.ReactNode
}
export default async function RootLayout({children}:IRootLayoutProps) {
    const session = await getServerSession(authOptions);

    if (session?.user?.email === 'ADMIN') {
        redirect('/adminpanel')
    }

    return (
        <html lang={'uk'}>
        <body className={montserrat.className}>
            <Toaster />
            <main>{children}</main>
        </body>
        </html>
    );
}
