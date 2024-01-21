import {
    setBeginCheckoutDataLayer,
    setClickDataLayer, setPurchaseDataLayer,
    setViewDataLayer,
    setClickOnCardDataLayer
} from "@/lib/gtm/dataLayers";
import {formBasketItemData, formItemData} from "@/lib/gtm/getDataFromItem";
import { ClientEvent } from "@/types";

class GtmService {
    viewItem(item: ClientEvent) {
        const formItem = formItemData(item)
        setViewDataLayer(formItem)
    }

    viewItemCard(item: ClientEvent) {
        const formItem = formItemData(item)
        setClickOnCardDataLayer(formItem)
    }

    selectItem(item: ClientEvent) {
        const formItem = formItemData(item)
        setClickDataLayer(formItem)
    }

    beginCheckout(item: ClientEvent, isMember: boolean) {
        const formItem = formBasketItemData(item, isMember)
        setBeginCheckoutDataLayer(formItem)
    }

    purchase(item: ClientEvent, isMember: boolean) {
        const formItem = formBasketItemData(item, isMember)
        setPurchaseDataLayer(formItem)
    }
}

export const gtmService = new GtmService()

export default GtmService;