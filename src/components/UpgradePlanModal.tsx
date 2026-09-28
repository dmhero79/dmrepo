import React from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, Instagram, ArrowRight, CreditCard } from 'lucide-react';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: () => void;
}

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
}) => {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    onUpgradeSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              Simple Creator Pricing
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              AutoDM Creator Plan
            </h2>
            <p className="text-xs text-slate-500">
              One straightforward plan. Everything included to automate, sell, and scale.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer self-start"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Details */}
        <div className="p-6 space-y-6">
          <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">All-in-One Social Commerce CRM</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900 font-mono">$5</span>
                  <span className="text-sm font-semibold text-slate-500">/month</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                0% Platform Commission
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-indigo-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Instagram Account Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Creator Storefront</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 10 Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 100 Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Custom Domain (SSL included)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Physical, Digital &amp; Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Payment Gateway (Razorpay/Cashfree)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Customer CRM &amp; Orders</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Your Payments Go Directly to You</p>
              <p className="mt-0.5 text-slate-500 leading-relaxed">
                Connect your own Razorpay or Cashfree account. AutoDM never holds your funds and takes 0% transaction fee.
              </p>
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Activate $5/Month Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
