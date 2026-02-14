import React, { useEffect, useRef, useState } from 'react';
import { Loader2, ShieldCheck, CreditCard as CardIcon, Lock } from 'lucide-react';

interface PayPalCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

/**
 * PayPalCheckout Component
 * 
 * Renders the PayPal buttons using the PayPal JavaScript SDK.
 * Handles the creation and capture of orders.
 */
const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onCancel }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if PayPal SDK is loaded and the container ref is available
    if (window.paypal && paypalRef.current) {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'pill',
          label: 'pay',
          height: 50
        },
        // Create an order with the specified amount
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2)
              },
              description: `CineNYC Movie Tickets - ${Math.round(amount / 12.00)} Seats`
            }]
          });
        },
        // Capture the transaction on approval
        onApprove: async (data: any, actions: any) => {
          await actions.order.capture();
          onSuccess();
        },
        onCancel: () => {
          onCancel();
        },
        onError: (err: any) => {
          // In production, consider logging to an error monitoring service
          // For now, we suppress console errors to keep the console clean
        }
      }).render(paypalRef.current).then(() => {
        setIsReady(true);
      });
    }
  }, [amount, onSuccess, onCancel]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white">Secure Transaction</p>
            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-tight">End-to-End Encrypted</p>
          </div>
        </div>
        <Lock className="w-4 h-4 text-zinc-700" />
      </div>

      <div className="relative">
        {!isReady && (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[2rem] bg-black/20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Connecting to Gateway...</span>
          </div>
        )}

        <div
          ref={paypalRef}
          className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
        />
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-center gap-4 text-zinc-700">
          <CardIcon className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Accepting Debit & Credit Cards</span>
        </div>
        <p className="text-[8px] text-center text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
          Powered by PayPal. No financial details are stored on CineNYC servers.
          <br />By paying, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
};

export default PayPalCheckout;