import { ClientRegion, FormRegion, Region, RegionTextFields, Event, Member } from "@/types";
import { SelectItem } from "@/components/ui/custom/FormSelect";
import { Locale } from "@/i18n.config";
import { transformEventData } from "@/utils/event";
import { transformMemberData } from "@/utils/member";
import { textFieldsTransformCatch } from "@/utils";

export function transformSelectRegionData(data: FormRegion, locale: Locale): SelectItem
export function transformSelectRegionData(data: FormRegion[], locale: Locale): SelectItem[]
export function transformSelectRegionData(
    data: FormRegion[] | FormRegion, locale: Locale
): SelectItem | SelectItem[] {
    if(Array.isArray(data)) {
        return data.map(item => {
            const region = JSON.parse(item.textFields as string) as RegionTextFields
            return {
                label: region[locale].name,
                value: item.id
            }
        })
    } else {
        const region = JSON.parse(data.textFields as string) as RegionTextFields
        return {
            label: region[locale].name,
            value: data.id
        }
    }
}


export function transformRegionData(data: Region, locale: Locale): ClientRegion;
export function transformRegionData(data: Region[], locale: Locale): ClientRegion[];
export function transformRegionData(
    data: Region | Region[], locale: Locale
): ClientRegion | ClientRegion[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const regionTextFields = JSON.parse(item.textFields as string) as RegionTextFields;
                return {
                    ...item,
                    textFields: regionTextFields[locale],
                    events: transformEventData(item.Events as Event[], locale),
                    members: transformMemberData(item.Members as Member[], locale)
                }
            })
        } else {
            const regionTextFields = JSON.parse(data.textFields as string) as RegionTextFields;
            return {
                ...data,
                textFields: regionTextFields[locale],
                events: transformEventData(data.Events as Event[], locale),
                members: transformMemberData(data.Members as Member[], locale)
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}