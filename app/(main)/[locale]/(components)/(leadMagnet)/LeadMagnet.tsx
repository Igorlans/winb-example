'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useRegistraion} from "@/context/registration-store";
import { useTranslations } from "next-intl";

const LeadMagnet = () => {
    const { setIsOpen } = useRegistraion()
    const t = useTranslations("Home")
    const button = useTranslations("buttons")

    return ( 
        <div className="relative w-full h-96">
           <Image
            src="/images/banners/BannerDefault.png"
            alt={ t("why_join_title") }
            className="banner-dark-filter"
            fill={true}
            style={{
              objectFit: 'cover',
            }}
        />
            <div
              style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)'
              }}
            ></div>
            <div className="absolute top-1/2 left-1/2" style={{transform: 'translate(-50%, -50%)'}}>
                <div className="flex text-center flex-col gap-y-4 md:gap-y-6 text-white w-[92vw] md:max-w-[900px]">
                    <h2 className="font-title leading-7 md:leading-10 text-center">
                        { t("why_join_title") }
                    </h2>
                    <p className="font-subtitle leading-5 md:leading-8 text-left">
                        { t("you_will_get") }<br/>
                        { t("why_join_desc1") }<br/>
                        { t("why_join_desc2") }<br/>
                        { t("why_join_desc3") }
                    </p>
                    <div>
                        <Button onClick={() => setIsOpen(true)} variant="primary">
                            { button("apply") }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LeadMagnet;