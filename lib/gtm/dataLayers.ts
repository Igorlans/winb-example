import {mainCurrency} from "@/config";
import {GTMBasketItemData, GTMItemData} from "@/lib/gtm/getDataFromItem";

type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const setViewDataLayer = (product: GTMItemData) => {

    const dataLayerLayout = {
        'event': 'view_item',
        'ecommerce': {
            'currency': mainCurrency,
            'value': Number(product.price),
            'items': [
                product
            ]
        },
    }

    console.log('view_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setClickOnCardDataLayer = (product: GTMItemData) => {

    const dataLayerLayout = {
        'event': 'view_item_card',
        'ecommerce': {
            'items': [
                product
            ]
        },
    }

    console.log('view_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setClickDataLayer = (product: GTMItemData) => {

    const dataLayerLayout = {
        'event': 'select_item',
        'ecommerce': {
            'items': [
                product
            ]
        },
    }

    console.log('select_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

}

export const setBeginCheckoutDataLayer = (item: GTMBasketItemData) => {
    const dataLayerLayout = {
        'event': 'begin_checkout',
        'ecommerce': {
            'currency': mainCurrency,
            'value': item.price,
            'items': [
                item
            ]
        },
    }
    console.log('begin_checkout', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setPurchaseDataLayer = (item: GTMBasketItemData) => {
    const dataLayerLayout = {
        'event': 'purchase',
        'ecommerce': {
            'currency': mainCurrency,
            'value': item.price,
            'items': [
                item
            ]
        },
    }
    console.log('purchase', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

