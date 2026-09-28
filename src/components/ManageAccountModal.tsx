import React, { useState } from 'react';
import { InstagramAccount } from '../types';
import { X, Instagram, CheckCircle2, RefreshCw, Shield, Key, ExternalLink, AlertTriangle } from 'lucide-react';

interface ManageAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: InstagramAccount;
}

export const ManageAccountModal: React.FC<ManageAccountModalProps> = ({
  isOpen,
  onClose,
  account,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedSuccess(true);
      setTimeout(() => setSyncedSuccess(false), 3000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Manage Instagram Account</h2>
              <p className="text-xs text-slate-500">Connected Profile & Graph API Settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Profile Overview */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]">
              <img
                src={account.avatarUrl}
                alt={account.handle}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{account.handle}</h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● Connected
                </span>
              </div>
              <p className="text-xs text-slate-500">{account.businessName} · {account.accountType}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                {account.followers} Followers · {account.postsCount} Posts · Connected since {account.connectedSince}
              </p>
            </div>
          </div>

          {/* Graph API Permissions Granted */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Meta Graph API Scopes
            </h4>
            <div className="space-y-2">
              {[
                { name: 'instagram_basic', desc: 'Read account profile, media insights and posts' },
                { name: 'instagram_manage_comments', desc: 'Real-time webhook notifications for incoming post comments' },
                { name: 'instagram_manage_messages', desc: 'Dispatch automated direct messages via Messenger platform' },
              ].map((perm) => (
                <div key={perm.name} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-semibold text-slate-800">{perm.name}</span>
                    <p className="text-slate-500 text-[11px]">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync & Refresh Action */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-800">Refresh Instagram Media Cache</p>
              <p className="text-[11px] text-slate-500">Pull latest published reels, carousels, and stories</p>
            </div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : syncedSuccess ? 'Synced!' : 'Sync Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
