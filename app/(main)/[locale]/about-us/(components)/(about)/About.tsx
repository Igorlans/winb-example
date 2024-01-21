"use client";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");

  return (
    <div className="container flex flex-col">
      <SectionTitle title={t("about")} />

      <p className="font-main">{t("about_desc")}</p>
    </div>
  );
};

export default About;
