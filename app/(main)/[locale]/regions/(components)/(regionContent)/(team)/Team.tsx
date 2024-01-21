import SectionTitle from "@/components/sectionTitle/SectionTitle";
import {FC} from "react";
import TeamCard from "@/components/cards/TeamCard";
import Link from "next/link";
import { ClientMember, LocalePageParams } from "@/types";
import { orderSort } from "@/utils";
import { memberOrder } from "@/lib/memberTypes";
import { useTranslations } from "next-intl";

type ITeamProps = LocalePageParams & {
    members: ClientMember[]
}
const Team: FC<ITeamProps> = ({
    members,
    params
}) => {

    const t = useTranslations("Region")

    const sortedMember = orderSort(members, memberOrder[params.locale]);

    return (
        <div>
            <SectionTitle
            title={t("team")}
          />
          <div className="grid grod-cols-1 md:grid-cols-2 gap-2 md:gap-5">
              {
                  sortedMember?.map(member =>
                    <Link href={`/member/${member.id}`}>
                      <TeamCard
                            member={
                                {
                                    title: member.textFields.name,
                                    description: member.textFields.status,
                                    img: member.image
                                }
                            }
                      />
                    </Link>
                  )
              }
          </div>
        </div>
    );
};

export default Team;