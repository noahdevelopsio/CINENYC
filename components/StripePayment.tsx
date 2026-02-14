'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, ShieldCheck, Lock, CreditCard } from 'lucide-react';

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripePaymentProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

/**
 * CheckoutForm Component
 * 
 * Renders the Stripe PaymentElement and handles the payment submission.
 * Manages processing states and displays error messages.
 */
const CheckoutForm: React.FC<{ onSuccess: () => void; onCancel: () => void }> = ({ onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,
            },
            redirect: 'if_required'
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else {
            // Successful payment logic
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement
                options={{
                    layout: 'tabs',
                }}
            />

            {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold">
                    {errorMessage}
                </div>
            )}

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest rounded-xl transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay Now'}
                </button>
            </div>
        </form>
    );
};

/**
 * StripePayment Component
 * 
 * Wrapper component that initializes the Stripe Elements context.
 * Fetches the PaymentIntent client secret from the backend.
 */
const StripePayment: React.FC<StripePaymentProps> = ({ amount, onSuccess, onCancel }) => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between p-4 bg-blue-900/10 border border-blue-500/20 rounded-2xl mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Stripe Secure</p>
                        <p className="text-[9px] text-blue-200 uppercase font-bold tracking-tight">Bank-Level Encryption</p>
                    </div>
                </div>
                <Lock className="w-4 h-4 text-blue-500" />
            </div>

            {clientSecret ? (
                <Elements options={{ clientSecret, appearance: { theme: 'night' } }} stripe={stripePromise}>
                    <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
                </Elements>
            ) : (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}
        </div>
    );
};

export default StripePayment;
