import HmacMD5 from 'crypto-js/hmac-md5';
import {API_URL} from "@/config";
import { ClientTicket } from "@/types";

export const pay = async (data: ClientTicket) => {
    try {
        console.log(data, 'ddafdsafsdf')
        const {id: ticketId, Event: event, Member: member} = data;
        const price = !!member?.id ? event.memberPrice : event.price;
        // @ts-ignore

        const eventTextFields = JSON.parse(event?.textFields)
        const name =  eventTextFields?.uk?.title || eventTextFields?.en?.title ||eventTextFields?.pl?.title || event.id;

        // @ts-ignore
        const productNameArr = [name];
        const productCountArr = [1];
        const productPriceArr = [price];
        const orderReference = ticketId;
        const orderDate = String(Date.now());
        const currency = 'UAH';
        const merchantAccount = 'winb_vercel_app';
        const merchantDomainName = 'https://winb.in.ua';
        const merchantSecretKey = '9a71304aa39d0797881eae9b5168342605b67c09';
        const productName = productNameArr.join(';');
        const productCount = productCountArr.join(';');
        const productPrice = productPriceArr.join(';');

        const str = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${productPrice};${currency};${productName};${productCount};${productPrice}`;

        console.log(str);

        const signature = HmacMD5(str, merchantSecretKey).toString();
        const wayforpayConfig = {
            merchantAccount,
            merchantDomainName,
            merchantSecretKey,
            merchantSignature: signature,
            orderReference,
            orderDate,
            defaultPaymentSystem: 'card',
            paymentSystems: 'card;applePay;googlePay',
            amount: price,
            currency,
            merchantTransactionSecureType: 'AUTO',
            productName: productNameArr,
            productPrice: productPriceArr,
            productCount: productCountArr,
            clientFirstName: name,
            apiVersion: 2,
            merchantAuthType: 'SimpleSignature',
            // returnUrl: `${API_URL}/events/${event.id}?thanks=true`,
            approvedUrl: `${API_URL}/events/${event.id}?thanks=true`,
            declinedUrl: `${API_URL}/events/${event.id}?failed=true`,
            serviceUrl: `https://winb.vercel.app/api/events/buy/confirmPayment`,
            language: 'UA',
        };

        // const url = wayforpay.getPayUrl(wayforpayConfig)
        // const formData = new FormData()

        // for (let key in wayforpayConfig) {
        //     formData.append(key, wayforpayConfig[key])
        // }


        const form = document.createElement('form');
        form.style.display = 'none'; // Make the form invisible

        form.method = 'post';
        form.action = 'https://secure.wayforpay.com/pay';
        form.acceptCharset = 'utf-8';

        for (const key in wayforpayConfig) {
            if (wayforpayConfig.hasOwnProperty(key)) {
                // @ts-ignore
                if (Array.isArray(wayforpayConfig[key])) {

                    // @ts-ignore
                    wayforpayConfig[key].forEach(value => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    });
                } else {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    // @ts-ignore
                    input.value = wayforpayConfig[key];
                    form.appendChild(input);
                }
            }
        }

        document.body.appendChild(form);

        form.submit();

    } catch (e) {
        console.log(e)
    }
};