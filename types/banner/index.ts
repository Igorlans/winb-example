import { Prisma } from "@prisma/client";
import { ClientLocaleDataObject, LocaleObjectValues } from "@/types";
import { BannerTextFieldsValue } from "@/app/(admin)/adminpanel/banner/formSchema";

export const fullBannerIncludeArgs = {}

export type Banner = Prisma.BannerGetPayload<typeof fullBannerIncludeArgs>

export type BannerTextFields = LocaleObjectValues<BannerTextFieldsValue>
export type ClientBanner = Banner & ClientLocaleDataObject<BannerTextFieldsValue>