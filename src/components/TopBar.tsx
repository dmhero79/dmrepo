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
  Activity
} from 'lucide-react';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCreateAutomation?: () => void;
  onOpenCreateAutomation?: () => void;
  onOpenUpgrade?: () => void;
  activeAutomationsCount?: number;
  onBackToLanding?: () => void;
  onPreviewStorefront?: () => void;
  onOpenSimulator?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  onCreateAutomation,
  onOpenCreateAutomation,
  onOpenUpgrade,
  activeAutomationsCount = 3,
  onBackToLanding,
  onPreviewStorefront,
  onOpenSimulator,
}) => {
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
            placeholder="Search automations, posts, or keywords..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 pl-9 pr-14 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[11px] font-mono text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls Zone */}
      <div className="flex items-center gap-3">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            <span>← Landing Page</span>
          </button>
        )}

        {/* Webhook Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] tracking-tight">Meta Graph API v21.0 Connected</span>
        </div>

        {/* Primary Create Automation Action */}
        <button
          onClick={onCreateAutomation}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-200 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Automation</span>
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
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-left">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Notifications</span>
                <span className="text-[10px] text-indigo-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium text-slate-800">Course Launch surge</p>
                      <p className="text-slate-500 text-[11px]">142 DMs delivered today. Conversion rate is up 12%.</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">15m ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium text-slate-800">Instagram Webhook synced</p>
                      <p className="text-slate-500 text-[11px]">Subscribed to 48 posts on @yourbusiness.</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">1h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar + Name + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg hover:bg-slate-100 transition-colors group cursor-pointer"
          >
            {/* Real Avatar Photo generated */}
            <div className="relative">
              <img
                src="/src/assets/images/avatar_ankit_1790498690280.jpg"
                alt="Ankit"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-800 leading-tight flex items-center gap-1">
                <span>Ankit</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">ankit@growthlabs.io</p>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200" />
          </button>

          {/* User Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-left">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">Ankit</p>
                <p className="text-[11px] text-slate-400">ankit@growthlabs.io</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                  <span>Free Tier (482 / 500 DMs)</span>
                </div>
              </div>

              <div className="py-1 text-xs text-slate-600">
                <button 
                  onClick={() => { setUserDropdownOpen(false); onOpenUpgrade?.(); }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-indigo-600 font-medium cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Upgrade to Creator Pro ($5/mo)</span>
                </button>
                <button 
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile & Team</span>
                </button>
                <button 
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Instagram API Tokens</span>
                </button>
                <button 
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Workspace Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button 
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full px-3.5 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
