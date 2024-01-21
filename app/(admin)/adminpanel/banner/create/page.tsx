import { FC } from 'react'
import Breadcrumbs from "@/components/adminpanel/Breadcrumbs";
import BannerForm from '../BannerForm';
import { LocalePageParams } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locales } from "@/i18n.config";

const page: FC = ({}) => {
    const breadCrumbs = [
        {text: 'Головна', href: '/adminpanel'},
        {text: 'Створення банера', href: '/adminpanel/banner/create'},
    ]

    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>
            <Tabs defaultValue={Locales.uk}>
                <TabsList>
                    <TabsTrigger value={Locales.uk}>Українська</TabsTrigger>
                    <TabsTrigger value={Locales.en}>Англійська</TabsTrigger>
                    <TabsTrigger value={Locales.pl}>Польська</TabsTrigger>
                </TabsList>
                <TabsContent value={Locales.uk}>
                    <BannerForm locale={Locales.uk} />
                </TabsContent>
                <TabsContent value={Locales.en}>
                    <BannerForm locale={Locales.en} />
                </TabsContent>
                <TabsContent value={Locales.pl}>
                    <BannerForm locale={Locales.pl} />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page