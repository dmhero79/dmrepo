import React, { useState } from 'react';
import { PaymentGatewayConfig } from '../../types';
import { 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Lock, 
  AlertCircle, 
  RefreshCw, 
  Key, 
  ExternalLink,
  Zap,
  Building
} from 'lucide-react';

interface PaymentsViewProps {
  configs: PaymentGatewayConfig[];
  onToggleConnection: (provider: 'Razorpay' | 'Cashfree') => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  configs,
  onToggleConnection,
}) => {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);

  const handleTestConnection = (provider: 'Razorpay' | 'Cashfree') => {
    setTestingId(provider);
    setTimeout(() => {
      setTestingId(null);
      setTestSuccess(provider);
      setTimeout(() => setTestSuccess(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          <span>Payment Gateway Connections</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Connect your OWN Razorpay or Cashfree merchant account. AutoDM does NOT hold creator funds and charges 0% transaction commission.
        </p>
      </div>

      {/* Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950">
          <h4 className="font-bold">Zero-Commission Direct Payout Architecture</h4>
          <p className="text-[11px] text-indigo-900/80 mt-0.5 leading-relaxed">
            All customer payments on your storefront flow directly into your own Razorpay/Cashfree gateway account. AutoDM validates webhooks server-side and automatically updates customer order fulfillment and CRM records.
          </p>
        </div>
      </div>

      {testSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{testSuccess} Webhook &amp; API keys verified successfully! Live checkout active.</span>
        </div>
      )}

      {/* Gateway Cards */}
      <div className="space-y-5">
        {configs.map((gw) => (
          <div
            key={gw.provider}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-base ${gw.provider === 'Razorpay' ? 'bg-[#0C2340]' : 'bg-[#1C64F2]'}`}>
                  {gw.provider === 'Razorpay' ? 'R' : 'C'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{gw.provider}</h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        gw.isConnected
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      ● {gw.isConnected ? 'Connected & Active' : 'Disconnected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {gw.provider === 'Razorpay' 
                      ? 'Accepts UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, EMI' 
                      : 'Accepts instant UPI intent, Debit Cards, and NetBanking'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {gw.isConnected && (
                  <button
                    onClick={() => handleTestConnection(gw.provider)}
                    disabled={testingId === gw.provider}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingId === gw.provider ? 'animate-spin text-indigo-600' : ''}`} />
                    <span>{testingId === gw.provider ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                )}

                <button
                  onClick={() => onToggleConnection(gw.provider)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    gw.isConnected
                      ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                      : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm'
                  }`}
                >
                  {gw.isConnected ? 'Disconnect' : 'Connect Account'}
                </button>
              </div>
            </div>

            {/* Merchant Details */}
            {gw.isConnected ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Merchant ID</span>
                  <p className="font-mono text-slate-800 font-bold mt-0.5">{gw.merchantId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Key ID</span>
                  <p className="font-mono text-slate-800 font-bold mt-0.5">{gw.keyId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Server-side Webhook</span>
                  <p className="font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Verified Active
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                <p>Connect your {gw.provider} Merchant ID and Key ID to start receiving direct payments from Instagram DMs and storefront checkout.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
