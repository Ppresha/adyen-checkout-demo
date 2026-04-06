// Environment variables and configuration
import dotenv from 'dotenv';
import { Client, Config, EnvironmentEnum } from '@adyen/api-library';

//Load environment variables from .env file
dotenv.config();

// validate ADYEN_API_KEY exists 
if (!process.env.ADYEN_API_KEY){
    throw new Error('ADYEN_API_KEY is not set in .env');
}

// Application configuration
const config = new Config({
    apiKey: process.env.ADYEN_API_KEY,
    environment: EnvironmentEnum.TEST,
});

// Instantiate Adyen Client with my API Key and TEST environment
const client = new Client(config);

// Exporting the client and merchant account for use in other parts of the application
export { client };

// Validate ADYEN_MERCHANT_ACCOUNT exists
if (!process.env.ADYEN_MERCHANT_ACCOUNT) {
    throw new Error('ADYEN_MERCHANT_ACCOUNT is not set in .env');
}
export const merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT;
