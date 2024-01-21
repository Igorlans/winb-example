import { FC, Suspense } from "react";
import { MemberList } from "@/app/(main)/[locale]/members/_components/MemberList";
import { LocalePageParams } from "@/types";
import { MemberListSkeleton } from "@/app/(main)/[locale]/members/_components/MemberListSkeleton";
import { Fields } from "@/app/(main)/[locale]/members/_components/filters/useFilter";

type Props = LocalePageParams & {
    searchParams: Record<Fields, string | undefined>
}
const Page: FC<Props> = ({ searchParams, params }) => {
    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={<MemberListSkeleton />}>
            <MemberList searchParams={searchParams} params={params} />
        </Suspense>
    )
}

export default Page;