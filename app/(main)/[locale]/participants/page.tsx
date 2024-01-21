import Cards from "./(components)/(cards)/Cards";
import Business from "./(components)/(business)/Business";
import Offer from "./(components)/(offer)/Offer";
import Contact from "./(components)/(contact)/Contact";
import Join from "./(components)/(join)/Join";

import { Metadata } from 'next'
import ParticipantsBanner from "./(components)/ParticipantsBanner";
import ServicesNav from "../(components)/ServicesNav";
 
export async function generateMetadata(): Promise<Metadata> {
    const banner = null // TODO: get dynamic banner
    return {
        title: "Членкиням",
        description: "Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом.",
        openGraph: {
            type: "article",
            url: `${process.env.NEXTAUTH_URL}/participants`,
            title: "Членкиням",
            description: "Збільшуйте продажі та доходи, використовуючи наші експертні знання та технології для управління своїм онлайн-бізнесом.",
            siteName: "Women in business",
            images: [
                {url: banner ?? "/images/LeadMagnet.png"}
            ]
        }
    }
}

const ParticipantsPage = () => {
    return (
        <div className="w-full">
            <ParticipantsBanner />
            <div className="sectionGap">
                <ServicesNav />
                <Business />
                <Offer />
            </div>
            <Contact />
            
            <div className="sectionGap">
                <Join />
            </div>
        </div>
    );
};

export default ParticipantsPage;