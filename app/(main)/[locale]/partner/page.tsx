import Banner from "@/components/banner/Banner";

import BuildBusiness from "./(components)/(buildBusiness)/BuildBusiness";
import Offers from "./(components)/(offers)/Offers";
import Partners from "./(components)/(partners)/Partners";
import BusinessServices from "./(components)/(businessServices)/BusinessServices";
import Events from "./(components)/(events)/Events";

import { Metadata } from 'next'
 
export async function generateMetadata(): Promise<Metadata> {
    const banner = null // TODO: get dynamic banner
    return {
        title: "Партнерам",
        description: "Обери ту послугу, яка потрібна для росту твого бізнесу сьогодні!",
        openGraph: {
            type: "article",
            url: `${process.env.NEXTAUTH_URL}/partner`,
            title: "Партнерам",
            description: "Обери ту послугу, яка потрібна для росту твого бізнесу сьогодні!",
            siteName: "Women in business",
            images: [
                {url: banner ?? "/images/LeadMagnet.png"}
            ]
        }
    }
}

const PartnerPage = () => {
    return (
        <div>
            <Banner 
                title="Партнерам"
                subtitle="Обери ту послугу, яка потрібна для росту твого бізнесу сьогодні!"
            />
            
            <div className="sectionGap">

                <BuildBusiness />

                <Offers />
                
                <Partners />

                <BusinessServices />

                <Events />  

            </div>

        </div>
    );
};

export default PartnerPage;