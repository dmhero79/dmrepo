import React, { useState, useRef, useEffect } from 'react';
import { Instagram, ChevronDown, Plus, Check, Trash2, ExternalLink } from 'lucide-react';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface AccountSwitcherDropdownProps {
  onOpenConnectModal: () => void;
}

export const AccountSwitcherDropdown: React.FC<AccountSwitcherDropdownProps> = ({ onOpenConnectModal }) => {
  const { connectedAccounts, activeAccount, switchAccount, deleteInstagramAccount } = useAuthPlatform();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between text-left group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
            {activeAccount?.avatarUrl ? (
              <img
                src={activeAccount.avatarUrl}
                alt={activeAccount.handle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <span>IG</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">
              @{activeAccount?.handle || 'mridaliniofficial'}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Account</span>
            </div>
          </div>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0c1222] border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-left">
          <div className="px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Your Connected Accounts</span>
            <span className="font-mono text-pink-400">{connectedAccounts.length}</span>
          </div>

          <div className="max-h-56 overflow-y-auto divide-y divide-slate-800/40">
            {connectedAccounts.map((acc) => {
              const isSelected = acc.id === activeAccount?.id;
              return (
                <div
                  key={acc.id}
                  className={`px-3 py-2 flex items-center justify-between hover:bg-slate-800/60 transition-colors group cursor-pointer ${
                    isSelected ? 'bg-pink-950/30' : ''
                  }`}
                  onClick={() => {
                    switchAccount(acc.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white text-[11px] font-bold shrink-0 overflow-hidden border border-slate-700">
                      {acc.avatarUrl ? (
                        <img src={acc.avatarUrl} alt={acc.handle} className="w-full h-full object-cover" />
                      ) : (
                        <span>IG</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${isSelected ? 'text-pink-300' : 'text-slate-200'}`}>
                        @{acc.handle}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{acc.displayName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-pink-400" />
                    )}
                    {connectedAccounts.length > 1 && !isSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteInstagramAccount(acc.id);
                        }}
                        title="Remove Account"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connect Another Account Button */}
          <div className="p-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConnectModal();
              }}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold text-pink-300 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-800/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect Another Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
