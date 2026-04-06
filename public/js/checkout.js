async function initializeSession() {
    //fetch POST /api/session
    const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode: 'US'})
    });

    const session = await response.json();

    // get back {id, sessionData}

    // Configure AdyenCheckout
    const checkout = await AdyenWeb.AdyenCheckout({
        //session info
        session: {
            id: session.id,
            sessionData: session.sessionData
        },
        clientKey: 'test_T6VP4L263ZFTJAIMMXYWEMNMHY4UQ34N',
        environment: 'test',
        //callbacks
        onPaymentCompleted: (result) => {
            console.log('Payment completed', result);
        },
        onPaymentFailed: (result) => {
            console.log('Payment failed', result);
        },
        onError: (error) => {
            console.error('Payment error', error);
        }
    })

    // Mount Drop-In
    new AdyenWeb.Dropin(checkout).mount('#dropin-container');
}

initializeSession();

