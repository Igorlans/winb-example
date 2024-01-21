import React, {ReactNode} from 'react';
import { unstable_setRequestLocale } from "next-intl/server";
import { LocalePageParams } from "@/types";
const RegionLayout = async ({children, params}: { children: ReactNode } & LocalePageParams) => {
    unstable_setRequestLocale(params.locale);
    return (
        <div className="h-full mb-[50px]">
            {/*PAGE*/}
            {children}
        </div>
    );

};

export default RegionLayout;