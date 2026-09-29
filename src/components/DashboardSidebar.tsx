import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  Instagram, 
  Play, 
  Terminal, 
  MessageSquare, 
  Settings,
  ShieldCheck,
  Zap,
  ExternalLink,
  Plus
} from 'lucide-react';
import { AccountSwitcherDropdown } from './account/AccountSwitcherDropdown';
import { useAuthPlatform } from '../context/AuthPlatformContext';

export type DashboardNavTab =
  | 'dashboard'
  | 'automations'
  | 'posts'
  | 'simulator'
  | 'logs'
  | 'conversations'
  | 'settings';

interface DashboardSidebarProps {
  currentTab: DashboardNavTab;
  onSelectTab: (tab: DashboardNavTab) => void;
  activeRulesCount: number;
  conversationsCount: number;
  onOpenConnectModal: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentTab,
  onSelectTab,
  activeRulesCount,
  conversationsCount,
  onOpenConnectModal,
}) => {
  const { activeAccount } = useAuthPlatform();

  const navItems = [
    { id: 'dashboard' as DashboardNavTab, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'automations' as DashboardNavTab, label: 'Auto-DM Rules', icon: Workflow, badge: `${activeRulesCount} Active` },
    { id: 'posts' as DashboardNavTab, label: 'Posts & Reels', icon: Instagram, badge: 'Feed' },
    { id: 'simulator' as DashboardNavTab, label: 'Test Simulator', icon: Play, badge: 'Interactive' },
    { id: 'logs' as DashboardNavTab, label: 'Live Webhook Logs', icon: Terminal, badge: 'Realtime' },
    { id: 'conversations' as DashboardNavTab, label: 'Sent DMs', icon: MessageSquare, badge: String(conversationsCount) },
    { id: 'settings' as DashboardNavTab, label: 'Meta Webhook Setup', icon: Settings, badge: 'Config' },
  ];

  return (
    <aside className="w-64 bg-[#090D1A] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1.5px] shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#090D1A] rounded-[10px] flex items-center justify-center">
              <Instagram className="w-4 h-4 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight">InstaAutoDM</span>
              <span className="text-[9px] font-bold text-pink-400 bg-pink-950/80 border border-pink-800/60 px-1 rounded">SaaS</span>
            </div>
            <p className="text-[10px] text-slate-400">Creator Automation Platform</p>
          </div>
        </div>
      </div>

      {/* Connected Account Switcher */}
      <div className="px-3 pt-3 space-y-1.5">
        <AccountSwitcherDropdown onOpenConnectModal={onOpenConnectModal} />
        <button
          onClick={onOpenConnectModal}
          className="w-full py-1 px-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/50 text-[10px] font-semibold text-amber-300 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Mode: Testing Token</span>
          </div>
          <span className="text-[10px] text-amber-400 underline">Update Token</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="px-2.5 pb-1 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500">
          <span>Auto-DM Platform</span>
          <button
            onClick={onOpenConnectModal}
            title="Connect Account"
            className="hover:text-pink-400 flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Account</span>
          </button>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm shadow-pink-900/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-pink-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge.includes('Active') || item.badge.includes('Live')
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Info */}
      <div className="p-3 border-t border-slate-800/70 bg-[#070A14]/80 space-y-2">
        <a
          href={`https://www.instagram.com/${activeAccount?.handle || 'mridaliniofficial'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold text-pink-300 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-800/50 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2 truncate">
            <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span className="truncate">@{activeAccount?.handle || 'mridaliniofficial'}</span>
          </div>
          <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 shrink-0" />
        </a>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-[11px]">Webhook Active</span>
            <span className="font-mono text-emerald-400 font-bold text-[10px]">Live</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Auto-replies enabled for @{activeAccount?.handle || 'mridaliniofficial'}
          </p>
        </div>
      </div>
    </aside>
  );
};
