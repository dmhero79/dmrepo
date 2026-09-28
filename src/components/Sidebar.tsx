import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  Instagram, 
  MessageSquare, 
  BarChart3, 
  Terminal, 
  Settings, 
  HelpCircle, 
  Sparkles,
  Zap,
  ChevronRight
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'automations'
  | 'accounts'
  | 'messages'
  | 'analytics'
  | 'logs'
  | 'settings'
  | 'help';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeAutomationsCount: number;
  onOpenUpgrade: () => void;
  onBackToLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeAutomationsCount,
  onOpenUpgrade,
  onBackToLanding,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'automations' as NavTab, label: 'Automations', icon: Workflow, badge: String(activeAutomationsCount) },
    { id: 'accounts' as NavTab, label: 'Instagram Accounts', icon: Instagram, badge: '1' },
    { id: 'messages' as NavTab, label: 'Messages', icon: MessageSquare, badge: null },
    { id: 'analytics' as NavTab, label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'logs' as NavTab, label: 'Logs', icon: Terminal, badge: 'Live' },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings, badge: null },
    { id: 'help' as NavTab, label: 'Help & Support', icon: HelpCircle, badge: null },
  ];

  return (
    <aside className="w-64 bg-[#090D1A] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div 
        onClick={onBackToLanding}
        className={`p-5 pb-4 border-b border-slate-800/60 ${onBackToLanding ? 'cursor-pointer hover:bg-slate-900/60 transition-colors' : ''}`}
        title={onBackToLanding ? "Back to Public Landing Page" : undefined}
      >
        <div className="flex items-center gap-3">
          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-[#090D1A] rounded-[10px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/30" />
              <div className="relative flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="m10 11 2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-lg tracking-tight">AutoDM</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-1.5 py-0.2 rounded">SaaS</span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight">Automate. Engage. Grow.</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
          Workspace
        </div>

        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'Live'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
          Preferences
        </div>

        {navItems.slice(6).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Plan Card (Bottom Section as required) */}
      <div className="p-3 border-t border-slate-800/70 bg-[#070A14]/80">
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">Free Plan</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">482 / 500 DMs</span>
          </div>

          <p className="text-[11px] text-slate-400 mb-2.5 leading-tight">
            Basic automation features
          </p>

          {/* Usage Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: '96.4%' }} 
            />
          </div>

          <button
            onClick={onOpenUpgrade}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-900/50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Upgrade Plan</span>
            <ChevronRight className="w-3 h-3 ml-0.5 opacity-80" />
          </button>
        </div>
      </div>
    </aside>
  );
};
