import { Request, Response } from 'express';
import { createSession } from '../services/adyenService';

export async function submitSessionRequest(req: Request, res: Response) {
    // Read country code from request
    const { countryCode } = req.body;

    if (!countryCode) {
        res.status(400).send('Country Code undefined');
        return;
    }

    // Data mapping
    const currencyMap: Record<string, string> = {
        US: "USD",
        GB: "GBP",
        NO: "NOK",
        SE: "SEK",
        DK: "DKK",
        CH: "CHF",
        JP: "JPY",
        CN: "CNY",
        KR: "KRW",
        BR: "BRL",
        MX: "MXN",
        AU: "AUD",
        CA: "CAD",
        IN: "INR",
        SG: "SGD",
        HK: "HKD",
        MY: "MYR",
        TH: "THB",
        ID: "IDR",
        PH: "PHP",
        VN: "VND",
        RU: "RUB",
        PL: "PLN",
        CZ: "CZK",
        AE: "AED",
        KE: "KES",
        NZ: "NZD"
    }

    const currency = currencyMap[countryCode] ?? "USD";
    const reference = crypto.randomUUID()
    const value = 1000;

    try {
        const session = await createSession(countryCode, reference, currency, value);

        //respond with response
        res.json(session);
    } catch (error) {
        res.status(500).send('Failed to create session');
    }


}