import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Store, 
  Users, 
  MessageSquare, 
  Workflow, 
  Receipt, 
  BarChart3, 
  Instagram, 
  CreditCard, 
  Settings,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';

export type DashboardNavTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'storefront'
  | 'customers'
  | 'conversations'
  | 'automations'
  | 'orders'
  | 'analytics'
  | 'channels'
  | 'instagram'
  | 'payments'
  | 'settings';

interface DashboardSidebarProps {
  currentTab: DashboardNavTab;
  onSelectTab: (tab: DashboardNavTab) => void;
  onPreviewStorefront: () => void;
  onBackToLanding: () => void;
  ordersCount: number;
  conversationsCount: number;
  productsCount: number;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentTab,
  onSelectTab,
  onPreviewStorefront,
  onBackToLanding,
  ordersCount,
  conversationsCount,
  productsCount,
}) => {
  const navItems = [
    { id: 'dashboard' as DashboardNavTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'products' as DashboardNavTab, label: 'Products', icon: ShoppingBag, badge: `${productsCount}/100` },
    { id: 'categories' as DashboardNavTab, label: 'Categories', icon: Tag, badge: null },
    { id: 'storefront' as DashboardNavTab, label: 'Storefront', icon: Store, badge: 'Live' },
    { id: 'customers' as DashboardNavTab, label: 'Customers', icon: Users, badge: 'CRM' },
    { id: 'conversations' as DashboardNavTab, label: 'Conversations', icon: MessageSquare, badge: String(conversationsCount) },
    { id: 'automations' as DashboardNavTab, label: 'Automations', icon: Workflow, badge: '3' },
    { id: 'orders' as DashboardNavTab, label: 'Orders', icon: Receipt, badge: String(ordersCount) },
    { id: 'analytics' as DashboardNavTab, label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'channels' as DashboardNavTab, label: 'Channels', icon: Globe, badge: '4 Active' },
    { id: 'payments' as DashboardNavTab, label: 'Payments', icon: CreditCard, badge: 'Razorpay' },
    { id: 'settings' as DashboardNavTab, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-64 bg-[#090D1A] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          <div 
            onClick={onBackToLanding}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Back to AutoDM Landing Page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#090D1A] rounded-[10px] flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="m10 11 2 2 4-4" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-base tracking-tight">AutoDM</span>
                <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-1 rounded">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400">Social Commerce CRM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation List (12 Sections exactly matching user prompt) */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        <div className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
          Management &amp; CRM
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'Live' || item.badge === 'Connected' || item.badge === 'Razorpay'
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

      {/* Bottom Storefront & Plan Quota Footer */}
      <div className="p-3 border-t border-slate-800/70 bg-[#070A14]/80 space-y-2">
        {/* Quick View Public Storefront Button */}
        <button
          onClick={onPreviewStorefront}
          className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-800/60 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Store className="w-3.5 h-3.5 text-indigo-400" />
            <span className="truncate">shop.ankitsharma.me</span>
          </div>
          <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
        </button>

        {/* Plan card: $5/month */}
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-[11px]">AutoDM Pro Plan</span>
            <span className="font-mono text-emerald-400 font-bold text-[10px]">$5/mo</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            0% commission · 100 products · 10 categories
          </p>
        </div>
      </div>
    </aside>
  );
};
