'use client';

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Loader2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PaystackPaymentProps {
    amount: number;
    email: string;
    onSuccess: () => void;
    onCancel: () => void;
}

/**
 * PaystackPayment Component
 * 
 * Handles transactions using the Paystack Popup method.
 * verifies transactions on the server after successful completion.
 */
const PaystackPayment: React.FC<PaystackPaymentProps> = ({ amount, email, onSuccess, onCancel }) => {
    const [isVerifying, setIsVerifying] = useState(false);

    const config = {
        reference: (new Date()).getTime().toString(),
        email,
        amount: Math.round(amount * 100), // Convert to kobo (lowest currency unit)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    };

    const initializePayment = usePaystackPayment(config);

    const [error, setError] = React.useState<string | null>(null);

    // Callback function called when payment is successful
    const handlePaystackSuccess = (reference: any) => {
        setIsVerifying(true);
        setError(null);

        // securely verify transaction on server to prevent frontend manipulation
        fetch(`/api/verify-paystack?reference=${reference.reference}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    onSuccess();
                } else {
                    setError('Payment verification failed. Please contact support.');
                    setIsVerifying(false);
                }
            })
            .catch(() => {
                setError('Network error during verification. Please contact support.');
                setIsVerifying(false);
            });
    };

    const handlePay = () => {
        initializePayment({
            onSuccess: handlePaystackSuccess,
            onClose: onCancel
        });
    };

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
                <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Verifying Transaction...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between p-4 bg-green-900/10 border border-green-500/20 rounded-2xl mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Paystack Secured</p>
                        <p className="text-[9px] text-green-200 uppercase font-bold tracking-tight">Instant Processing</p>
                    </div>
                </div>
                <Lock className="w-4 h-4 text-green-500" />
            </div>

            <div className="text-center space-y-2 mb-8">
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Total to Pay</p>
                <p className="text-4xl font-black text-white italic">${amount.toFixed(2)}</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-red-400 text-xs font-bold">{error}</p>
                </div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={onCancel}
                    className="flex-1 py-4 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-widest rounded-2xl transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handlePay}
                    className="flex-[2] py-4 px-4 bg-green-600 hover:bg-green-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-green-600/20 flex items-center justify-center gap-2 group"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Pay with Paystack
                </button>
            </div>

            <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-widest">
                Redirects to secure gateway
            </p>
        </div>
    );
};

export default PaystackPayment;
