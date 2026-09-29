import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Settings, 
  LogOut, 
  User, 
  ShieldCheck, 
  ExternalLink,
  Command,
  Activity,
  Instagram,
  LogIn
} from 'lucide-react';
import { useAuthPlatform } from '../context/AuthPlatformContext';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCreateAutomation?: () => void;
  onOpenCreateAutomation?: () => void;
  onOpenSimulator?: () => void;
  onOpenAuthModal?: () => void;
  onOpenConnectModal?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  onCreateAutomation,
  onOpenCreateAutomation,
  onOpenSimulator,
  onOpenAuthModal,
  onOpenConnectModal,
}) => {
  const { currentUser, activeAccount, logout } = useAuthPlatform();
  const handleCreate = onCreateAutomation || onOpenCreateAutomation || (() => {});
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Input Zone */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search automations for @${activeAccount?.handle || 'mridaliniofficial'}...`}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 pl-9 pr-14 py-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[11px] font-mono text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls Zone */}
      <div className="flex items-center gap-3">
        {/* Active Account Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-pink-700 text-xs font-semibold">
          <Instagram className="w-3.5 h-3.5 text-pink-600" />
          <span>@{activeAccount?.handle || 'mridaliniofficial'}</span>
        </div>

        {/* Connect New Account Button */}
        {onOpenConnectModal && (
          <button
            onClick={onOpenConnectModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>Connect Account</span>
          </button>
        )}

        {/* Primary Create Automation Action */}
        <button
          onClick={handleCreate}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Auto-DM</span>
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Notifications Icon & Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-600 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-left">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Notifications</span>
                <span className="text-[10px] text-pink-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium text-slate-800">Instagram Webhook active</p>
                      <p className="text-slate-500 text-[11px]">Subscribed to comments on @{activeAccount?.handle || 'mridaliniofficial'}.</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Auth Button */}
        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg hover:bg-slate-100 transition-colors group cursor-pointer"
            >
              <div className="relative">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-1 ring-slate-200">
                    {currentUser.displayName?.slice(0, 2).toUpperCase() || 'CR'}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight flex items-center gap-1">
                  <span>{currentUser.displayName || 'Creator'}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">@{activeAccount?.handle || 'creator'}</p>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200" />
            </button>

            {/* User Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-left">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.displayName}</p>
                  <p className="text-[11px] text-slate-400">{currentUser.email || 'Platform User'}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pink-50 text-pink-700 text-[10px] font-semibold">
                    <span>Active: @{activeAccount?.handle}</span>
                  </div>
                </div>

                <div className="py-1 text-xs text-slate-600">
                  {onOpenConnectModal && (
                    <button
                      onClick={() => { setUserDropdownOpen(false); onOpenConnectModal(); }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-pink-600" />
                      <span>Connect Another Account</span>
                    </button>
                  )}
                  {onOpenSimulator && (
                    <button 
                      onClick={() => { setUserDropdownOpen(false); onOpenSimulator(); }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                    >
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      <span>Test Auto-DM Simulator</span>
                    </button>
                  )}
                  <a 
                    href={`https://www.instagram.com/${activeAccount?.handle || 'mridaliniofficial'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-pink-600 font-medium cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View @{activeAccount?.handle} on IG</span>
                  </a>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 transition-colors shadow-xs cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
