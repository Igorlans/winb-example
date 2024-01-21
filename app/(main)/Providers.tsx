'use client'
import {SessionProvider, useSession} from "next-auth/react";
import React, {FC, Suspense} from "react";
import NextTopLoader from "nextjs-toploader";

interface IProvidersProps {
    children: React.ReactNode
}

const Providers: FC<IProvidersProps> = ({children}) => {
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