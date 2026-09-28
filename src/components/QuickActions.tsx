import React from 'react';
import { Plus, Instagram, ShoppingBag, Store, CreditCard, Sparkles, Terminal, Settings } from 'lucide-react';

interface QuickActionsProps {
  onCreateAutomation: () => void;
  onConnectInstagram?: () => void;
  onAddProduct?: () => void;
  onCustomizeStorefront?: () => void;
  onConnectPaymentGateway?: () => void;
  onViewLogs?: () => void;
  onOpenSettings?: () => void;
  onSettings?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateAutomation,
  onConnectInstagram,
  onAddProduct,
  onCustomizeStorefront,
  onConnectPaymentGateway,
  onViewLogs,
  onOpenSettings,
  onSettings,
}) => {
  const handleSettings = onSettings || onOpenSettings;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Quick Actions</h2>
          <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            5 Core Shortcuts
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Quickly launch automations, catalog items, branding, and payment gateways.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {/* 1. Add Product */}
        <button
          onClick={onAddProduct}
          className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">Add Product</p>
            <p className="text-[10px] text-slate-500 font-normal">Physical, digital or service</p>
          </div>
        </button>

        {/* 2. Create Automation */}
        <button
          onClick={onCreateAutomation}
          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-sm shadow-indigo-200 flex flex-col justify-between group cursor-pointer text-left"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">Flow</span>
          </div>
          <div>
            <p className="font-bold text-white text-xs">Create Automation</p>
            <p className="text-[10px] text-indigo-100 font-normal">Comment → Auto DM</p>
          </div>
        </button>

        {/* 3. Connect Instagram / Channels */}
        <button
          onClick={onConnectInstagram}
          className="p-3 rounded-xl bg-slate-50 hover:bg-pink-50/60 border border-slate-200 hover:border-pink-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-pink-600 transition-colors">Connect Channels</p>
            <p className="text-[10px] text-slate-500 font-normal">Instagram &amp; 3 more</p>
          </div>
        </button>

        {/* 4. Customize Storefront */}
        <button
          onClick={onCustomizeStorefront}
          className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-purple-600 bg-purple-100/60 px-1.5 py-0.5 rounded">6 Themes</span>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-purple-600 transition-colors">Customize Store</p>
            <p className="text-[10px] text-slate-500 font-normal">Brand logo, font &amp; colors</p>
          </div>
        </button>

        {/* 5. Connect Payment Gateway */}
        <button
          onClick={onConnectPaymentGateway}
          className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">0% Fee</span>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-emerald-700 transition-colors">Payment Gateway</p>
            <p className="text-[10px] text-slate-500 font-normal">Razorpay &amp; Cashfree</p>
          </div>
        </button>
      </div>
    </div>
  );
};
