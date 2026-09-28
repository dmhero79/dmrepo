import React, { useState } from 'react';
import { InstagramAccount } from '../../types';
import { Instagram, CheckCircle2, Plus, ExternalLink, Settings, Shield, RefreshCw } from 'lucide-react';

interface AccountsViewProps {
  account: InstagramAccount;
  onOpenManage: () => void;
  onOpenUpgrade: () => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  account,
  onOpenManage,
  onOpenUpgrade,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-600" />
            <span>Connected Instagram Accounts</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your connected Instagram creator and business profiles
          </p>
        </div>

        <button
          onClick={onOpenUpgrade}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect New Account (Pro)</span>
        </button>
      </div>

      {/* Primary Account Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2.5px] shadow-sm">
              <img
                src={account.avatarUrl}
                alt={account.handle}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{account.handle}</h2>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                  {account.accountType}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{account.businessName}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Connected via Meta Graph API v21.0 · Webhook active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenManage}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Configure Account</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">Followers</span>
            <p className="text-lg font-bold text-slate-900 font-mono tabular-nums">{account.followers}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">Published Posts</span>
            <p className="text-lg font-bold text-slate-900 font-mono tabular-nums">{account.postsCount}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">Delivery Success</span>
            <p className="text-lg font-bold text-emerald-600 font-mono tabular-nums">{account.deliveryRate}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs text-slate-500">Connected Since</span>
            <p className="text-lg font-bold text-slate-900 font-mono text-sm">{account.connectedSince}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
