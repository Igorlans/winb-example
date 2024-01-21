import Link from "next/link";
import ArticleCard from "../cards/ArticleCard";
import { ClientArticle, ClientMember } from "@/types";

type ServicesProps = {
  data: ClientArticle[];
};

const Services = ({ data }: ServicesProps) => {
  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="grid grod-cols-1 gap-2 md:gap-5">
        {data.map((item) => (
          <Link href={`/services/${item.service.slug}/${item.slug}`}>
            <ArticleCard
              article={{
                img: item.image[0],
                title: item.textFields.title,
                description: item.textFields.description,
              }}
            />
          </Link>
        ))}
      </div>
      {/* <div className="flex flex-col gap-y-[20px]">
                {
                    data.map(item => (
                        <SingleCategor
                            service={item}
                        />
                    ))
                }

            </div> */}
    </div>
  );
};

export default Services;
