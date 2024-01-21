import SectionTitle from "@/components/sectionTitle/SectionTitle";
import {FC} from "react";
import TeamCard from "@/components/cards/TeamCard";
import Link from "next/link";
import { ClientMember } from "@/types";

interface ITeamProps {
    members: ClientMember[]
}
const Team: FC<ITeamProps> = ({
    members
}) => {
    return (
        <div>
            <SectionTitle
            title='Оберіть менторку'
          />
          <div className="grid grod-cols-1 xl:grid-cols-2 gap-2 md:gap-5">
              {
                  members?.map(member =>
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