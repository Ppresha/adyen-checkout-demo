import { Request, Response } from 'express';
import HmacValidator from '@adyen/api-library/lib/src/utils/hmacValidator';

export async function handleWebhook(req: Request, res: Response) {
    //verify the HMAC signature
    const notification = req.body.notificationItems[0].NotificationRequestItem;
    const hmacValidator = new HmacValidator();
    const isValid = hmacValidator.validateHMAC(notification, process.env.ADYEN_HMAC_KEY!);

    if (!isValid){
        //signature not valid
        res.status(403).send('Invalid HMAC signature');
        return;
    } 
    //process the event
    const { eventCode, success, merchantReference, amount } = notification;
    console.log(`Received ${eventCode} for ${merchantReference} amount ${amount.value} ${amount.currency} — success: ${success}`);

    //return [accepted] with 200
    res.status(200).send('[accepted]');
    }

