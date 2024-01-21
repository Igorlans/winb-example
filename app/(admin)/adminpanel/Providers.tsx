'use client'
import {SessionProvider} from "next-auth/react";
import React, {Suspense} from "react";
import {Session} from "next-auth"
import NextTopLoader from "nextjs-toploader";

interface IProvidersProps {
    children: React.ReactNode
    session: Session | null
}
const Providers = ({children, session}: IProvidersProps) => {

    return (
        <SessionProvider>
            <Suspense fallback={null}>
                <NextTopLoader
                    color={'hsl(318,55%,59%)'}
                    initialPosition={0.08}
                    crawlSpeed={200}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    height={5}
                />
            </Suspense>
            {children}
        </SessionProvider>
    );
};

export default Providers;