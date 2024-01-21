import { ClientService, Service, ServiceTextField } from "@/types";
import { Locale } from "@/i18n.config";
import { textFieldsTransformCatch } from "@/utils";

export function transformServiceData(data: Service, locale: Locale): ClientService;
export function transformServiceData(data: Service[], locale: Locale): ClientService[];
export function transformServiceData(
    data: Service | Service[], locale: Locale
): ClientService | ClientService[] | null {
    try {
        if(Array.isArray(data)) {
            return data.map(item => {
                const serviceTextField = JSON.parse(item.textFields as string) as ServiceTextField
                return {
                    ...item,
                    textFields: serviceTextField[locale]
                }
            })
        } else {
            const serviceTextField = JSON.parse(data.textFields as string) as ServiceTextField
            return {
                ...data,
                textFields: serviceTextField[locale]
            }
        }
    } catch (e) {
        return textFieldsTransformCatch(data, e)
    }
}