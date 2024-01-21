import { FC } from 'react'
import { getTranslations } from "next-intl/server";

const Mission: FC = async ({}) => {
    const t = await getTranslations("Home")
    return (
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-x-2 grid-rows-2 gap-y-4'>
            <div className='justify-self-start text-left font-subtitle text-darkPink font-semibold'>
                { t("mission") }
            </div>
            <div></div>
            <div></div>
            <div className='justify-self-end text-right font-subtitle text-darkPink font-semibold'>
                { t("vision") }
            </div>
        </div>
    )
}

export default Mission