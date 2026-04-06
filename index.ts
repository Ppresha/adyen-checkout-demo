import express from "express";
import { handleGetSession } from './src/handlers/sessionHandler'
import { handleWebhook } from './src/handlers/webhookHandler'

// Create the app
const app = express();

// Middleware for JSON bodies
app.use(express.json());

// Tell Express to serve any file in public folder as a static asset.
app.use(express.static('public'));

//When a POST request comes in at path /api/{endpoint}, run...
app.post('/api/session', handleGetSession);
app.post('/api/webhooks', handleWebhook);

app.listen(3000, () => {
    console.log('Server running on port 3000')
});