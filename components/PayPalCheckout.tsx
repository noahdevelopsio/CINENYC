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

  // Keep fresh references to callbacks to avoid effect re-runs
  const onSuccessRef = useRef(onSuccess);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onCancelRef.current = onCancel;
  }, [onSuccess, onCancel]);

  useEffect(() => {
    let isCancelled = false;
    let intervalId: NodeJS.Timeout;

    const renderPayPalButtons = () => {
      if (!window.paypal || !paypalRef.current) return;

      // Clear container to prevent duplicate buttons
      paypalRef.current.innerHTML = '';

      const renderPromise = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'pill',
          label: 'pay',
          height: 50
        },
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
        onApprove: async (data: any, actions: any) => {
          try {
            await actions.order.capture();
            if (!isCancelled && onSuccessRef.current) onSuccessRef.current();
          } catch (err) {
            // Handle capture error silently or UI notification
          }
        },
        onCancel: () => {
          if (!isCancelled && onCancelRef.current) onCancelRef.current();
        },
        onError: (err: any) => {
          if (!isCancelled) console.error('PayPal Error:', err);
        },
        onClick: (data: any, actions: any) => {
          // No action needed for click event
        }
      }).render(paypalRef.current);

      renderPromise.then(() => {
        if (!isCancelled) setIsReady(true);
      }).catch((err: any) => {
        // Handle init errors
      });
    };

    if (window.paypal) {
      renderPayPalButtons();
    } else {
      intervalId = setInterval(() => {
        if (window.paypal) {
          clearInterval(intervalId);
          renderPayPalButtons();
        }
      }, 100);
    }

    return () => {
      isCancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [amount]); // Only re-render if amount changes

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative z-10">
      <div className="flex items-center gap-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-2xl">
        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Secure Payment</h4>
          <p className="text-[10px] text-zinc-400">Your transaction is protected by PayPal's encryption.</p>
        </div>
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