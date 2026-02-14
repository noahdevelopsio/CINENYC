import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * POST Handler for creating a Stripe PaymentIntent.
 * 
 * Receives the payment amount and currency.
 * Returns a clientSecret to be used by the frontend to confirm payment.
 */
export async function POST(request: Request) {
    try {
        const { amount, currency = 'usd' } = await request.json();

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error('Stripe Error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
