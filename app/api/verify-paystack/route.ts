import { NextResponse } from 'next/server';

/**
 * GET Handler for verifying a Paystack transaction.
 * 
 * Expects a 'reference' query parameter.
 * Verifies the transaction status with Paystack's API.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
        return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        const data = await response.json();

        if (!data.status) {
            return NextResponse.json({ status: false, message: data.message }, { status: 400 });
        }

        if (data.data.status === 'success') {
            return NextResponse.json({ status: true, data: data.data });
        }

        return NextResponse.json({ status: false, message: 'Transaction not successful' });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
