import type { Metadata } from "next";

export const NotFoundMetada: Metadata = {
    title: "404",
    description: `Сторінка не знайдена`,
    openGraph: {
        type: "website",
        url: `${process.env.NEXTAUTH_URL}`,
        title: "404",
        description: `Сторінка не знайдена`,
        siteName: "Women in business",
        images: [
            {url: "/images/LeadMagnet.png"}
        ]
    }
}