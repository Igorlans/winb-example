import Banner from "@/components/banner/Banner";
import Women from "./(components)/(women)/Women";
import About from "./(components)/(about)/About";
import Mission from "./(components)/(mission)/Mission";
// import Team from "./(components)/(team)/Team";
import Contact from "@/app/(main)/[locale]/participants/(components)/(contact)/Contact"
import WomenSlider from "./(components)/(womenSlider)/WomenSlider";
import Feedbacks from "./(components)/(feedbacks)/Feedbacks";
import prisma from "@/prisma/client";

import { Metadata } from 'next'
import { fullArticleIncludeArgs, fullMemberIncludeArgs, LocalePageParams } from "@/types";
import { transformMemberData } from "@/utils/member";
import { transformArticleData } from "@/utils";
import { getTranslations } from "next-intl/server";
 
export async function generateMetadata(): Promise<Metadata> {
    const banner = null // TODO: get dynamic banner
    return {
        title: "Про нас",
        description: "Перегляньте актуальну інформацію про нашу платформу",
        openGraph: {
            type: "article",
            url: `${process.env.NEXTAUTH_URL}/about-us`,
            title: "Про нас",
            description: "ОПерегляньте актуальну інформацію про нашу платформу",
            siteName: "Women in business",
            images: ["/images/banners/BannerAboutUs.jpg"]
        }
    }
}

const statusToDisplay = ['Керівниця регіонального представництва', 'Засновниця', 'Виконавча директорка']

const AboutUsPage = async ({ params }: LocalePageParams) => {
    const members = await prisma.member.findMany({
        ...fullMemberIncludeArgs
    })
    let clientMembers = transformMemberData(members, params.locale)
    clientMembers = clientMembers.filter(item => statusToDisplay.includes(item.textFields.status))

    const t = await getTranslations("About")

    return (
        <div>
            <Banner 
                title={t("title")}
                subtitle={t("desc")}
                img={"/images/banners/BannerAboutUs.jpg"}
            />
            <div className="sectionGap">

                <About />

                <Women />
                
                <Mission />
                
                {/* <Team members={clientMembers} /> */}
                
                <Contact />

                <WomenSlider />

                <Feedbacks />
            </div>
        </div>
    );
};

export default AboutUsPage;