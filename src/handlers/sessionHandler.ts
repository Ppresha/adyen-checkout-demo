import { Request, Response} from 'express';
import { createSession } from '../services/adyenService';

export async function handleGetSession(req: Request, res: Response) {
    //read from request
    const { countryCode } = req.body;

    //do work
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

    const session =createSession(countryCode, reference, currency, value);

    //respond with response
    res.json(session);
}