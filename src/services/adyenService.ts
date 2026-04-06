import { CheckoutAPI, Types } from '@adyen/api-library';
import { client, merchantAccount } from '../config/config';


export async function createSession(countryCode: string, reference: string, currency: string, value: number): Promise<Types.checkout.CreateCheckoutSessionResponse> {
    //build the request objects
    const amount: Types.checkout.Amount = {
    currency, // Currency code (e.g., "EUR")
    value, // Amount in minor units (e.g., 10.00 EUR = 1000)
    };

    // Create POST /sessions request
    const checkoutSessionRequest: Types.checkout.CreateCheckoutSessionRequest = {
    amount,
    merchantAccount,
    countryCode, // Country code of the shopper (e.g., "NL")
    reference, // Unique reference for the transaction
    returnUrl: "http://localhost:3000", // URL to redirect the shopper after payment
    };

    // Send the request
    const CheckoutApi = new CheckoutAPI(client);
    //return the response
    const session = await CheckoutApi.PaymentsApi.sessions(checkoutSessionRequest);
    return session
}