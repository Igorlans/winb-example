import { Business, BusinessTextFields } from "@/types";
import { Locale } from "@/i18n.config";
import { textFieldsTransformCatch } from "@/utils";
import { SelectItem } from "@/components/ui/custom/FormSelect";

export function transformBusinessSelectData(data: Business, locale: Locale): SelectItem;
export function transformBusinessSelectData(data: Business[], locale: Locale): SelectItem[];
export function transformBusinessSelectData(
    data: Business | Business[], locale: Locale
): SelectItem | SelectItem[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const businessTextFields = JSON.parse(item.textFields as string) as BusinessTextFields
                return {
                    label: businessTextFields[locale].title,
                    value: item.id
                }
            })
        } else {
            const businessTextFields = JSON.parse(data.textFields as string) as BusinessTextFields
            return {
                label: businessTextFields[locale].title,
                value: data.id
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}