import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedVariant?: string;
  onPaymentSuccess: (orderData: {
    customerName: string;
    customerEmail: string;
    instagramUsername: string;
    total: number;
    paymentId: string;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedVariant,
  onPaymentSuccess,
}) => {
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.j@gmail.com');
  const [instagramUsername, setInstagramUsername] = useState('sarah_123');
  const [gateway, setGateway] = useState<'Razorpay' | 'Cashfree'>('Razorpay');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'success'>('details');

  if (!isOpen || !product) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate instant gateway round-trip and webhook verification
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      const fakePayId = `pay_${gateway === 'Razorpay' ? 'rzp' : 'cf'}_${Math.random().toString(36).substring(2, 9)}`;
      onPaymentSuccess({
        customerName,
        customerEmail,
        instagramUsername: instagramUsername.replace(/^@/, ''),
        total: product.price,
        paymentId: fakePayId,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">AutoDM Direct Creator Checkout</h3>
              <p className="text-[10px] text-slate-400">Paid directly to Ankit Sharma's {gateway} Account</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            {/* Order Item Preview */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {product.type}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{product.title}</h4>
                {selectedVariant && (
                  <p className="text-[11px] text-slate-500">Variant: {selectedVariant}</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-slate-900 font-mono">${product.price}</span>
                <span className="text-[10px] text-emerald-600 block font-semibold">Free Delivery</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram @Handle</label>
                  <input
                    type="text"
                    required
                    value={instagramUsername}
                    onChange={(e) => setInstagramUsername(e.target.value)}
                    placeholder="username"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Gateway Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Creator's Connected Payment Gateway
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGateway('Razorpay')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    gateway === 'Razorpay'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Razorpay</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500">UPI, Cards, NetBanking, EMI</p>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway('Cashfree')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    gateway === 'Cashfree'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Cashfree</span>
                    <span className="text-[9px] text-slate-400">Available</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Instant UPI &amp; Cards</p>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with {gateway}...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${product.price} via {gateway}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                🔒 256-bit SSL encrypted. Payment is processed directly by the creator's gateway.
              </p>
            </div>
          </form>
        ) : (
          /* Payment Success & Loop Completed Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Order confirmed! AutoDM has created the order in Ankit's dashboard and added <strong>@{instagramUsername}</strong> into the creator CRM.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-600 font-mono">${product.price} (via {gateway})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CRM Lifecycle:</span>
                <span className="font-semibold text-indigo-600">Updated to "Purchased"</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Continue to Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
