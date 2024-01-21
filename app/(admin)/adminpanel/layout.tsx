import '../../(main)/[locale]/globals.css'
import {Montserrat} from 'next/font/google'
import Providers from "@/app/(admin)/adminpanel/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import Header from "@/components/adminpanel/Header";
import {Toaster} from "react-hot-toast";
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";

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

    if (session?.user?.email !== 'ADMIN') {
        redirect('/signIn')
    }

    return (
        <html lang={'uk'} className={'text-[14px] md:text-[16px]'}>
        <body className={montserrat.className}>
            <Toaster />
            <Providers session={session}>
                <div className={'max-w-[1400px] p-3 w-full mx-auto'}>
                    <Header />
                    <main className={'m-0 p-3 pt-8 relative'}>{children}</main>
                </div>
            </Providers>
        </body>
        </html>
    );
}
