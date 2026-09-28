import React from 'react';
import { InstagramAccount } from '../types';
import { Instagram, CheckCircle2, Settings2, ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';

interface AccountCardProps {
  account: InstagramAccount;
  onManageAccount: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onManageAccount,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Your Instagram Account</h2>
          <p className="text-xs text-slate-500">Connected via Meta Graph API</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connected</span>
        </div>
      </div>

      {/* Account Info Profile Lockup */}
      <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
        {/* Instagram Profile Avatar with gradient ring */}
        <div className="relative shrink-0">
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]">
            <img
              src={account.avatarUrl}
              alt={account.handle}
              className="w-full h-full rounded-full object-cover bg-white"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full p-1 text-white shadow-xs">
            <Instagram className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Account Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-slate-900 truncate">{account.handle}</h3>
            <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.2 rounded shrink-0">
              {account.accountType}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">{account.businessName}</p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span>Since {account.connectedSince}</span>
            <span>·</span>
            <span className="text-emerald-600 font-medium">API Health 100%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid: 12.4K Followers · 48 Posts */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100/80 text-center">
          <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
            {account.followers}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Followers</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100/80 text-center">
          <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
            {account.postsCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Posts</div>
        </div>
      </div>

      {/* Button: Manage Account */}
      <button
        onClick={onManageAccount}
        className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer group"
      >
        <Settings2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
        <span>Manage Account</span>
      </button>
    </div>
  );
};
