import { ClientEvent } from "@/types";

export const formItemData = (item: ClientEvent) => {

    return ({
        'item_name': item.textFields.title,
        'item_id': item.id,
        'price': item.price,
        'quantity': 1,
        'item_category': item.region?.textFields.name,
    })
}

export type GTMItemData = ReturnType<typeof formItemData>

export const formBasketItemData = (item: ClientEvent, isMember: boolean) => {
    const price = isMember ? item.memberPrice : item.price

    return {
        'item_name': item.textFields.title,
        'item_id': item.id,
        'price': price,
        'quantity': 1,
        'item_category': item.region?.textFields.name,
    }
}

export type GTMBasketItemData = ReturnType<typeof formBasketItemData>
