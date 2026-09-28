import React, { useState } from 'react';
import { Automation, Product, ChannelType } from '../../types';
import { 
  Zap, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  MessageSquare, 
  ShoppingBag, 
  TrendingUp, 
  Sparkles,
  Layers,
  ArrowRight,
  Globe,
  Clock
} from 'lucide-react';

interface AutomationsViewProps {
  automations: Automation[];
  products: Product[];
  onToggleStatus: (id: string) => void;
  onDeleteAutomation: (id: string) => void;
  onOpenCreateModal: () => void;
  onOpenVisualBuilder?: () => void;
  onOpenSimulator: () => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({
  automations,
  products,
  onToggleStatus,
  onDeleteAutomation,
  onOpenCreateModal,
  onOpenVisualBuilder,
  onOpenSimulator,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | ChannelType>('all');

  const getKeywords = (item: Automation): string[] => {
    if (item.keywords && item.keywords.length > 0) return item.keywords;
    if (item.keyword) return [item.keyword];
    return [];
  };

  const getChannelBadge = (ch: ChannelType) => {
    switch (ch) {
      case 'instagram':
        return { name: 'Instagram', bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'tiktok':
        return { name: 'TikTok', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
      case 'whatsapp':
        return { name: 'WhatsApp', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'telegram':
        return { name: 'Telegram', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
    }
  };

  const filtered = automations.filter((item) => {
    const kws = getKeywords(item);
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      kws.some((k) => k.toLowerCase().includes(search.toLowerCase())) ||
      item.postCaption?.toLowerCase().includes(search.toLowerCase()) ||
      item.command?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || item.channel === channelFilter;
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const totalDms = automations.reduce((sum, a) => sum + (a.dmsSent ?? a.dmCount ?? 0), 0);
  const totalConversions = automations.reduce((sum, a) => sum + (a.conversions || 0), 0);
  const totalRevenue = automations.reduce((sum, a) => sum + (a.conversionRevenue || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              <span>Multi-Channel Social Automations</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {automations.filter((a) => a.status === 'active').length} Active Flows
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Visual visual trigger → condition → action automation pipeline across Instagram, TikTok, WhatsApp, and Telegram.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-indigo-600" />
            <span>Test Simulator</span>
          </button>
          {onOpenVisualBuilder && (
            <button
              onClick={onOpenVisualBuilder}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Visual Pipeline Builder</span>
            </button>
          )}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Responses Dispatched</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalDms.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Instant delivery across 4 channel webhooks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Storefront Orders</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalConversions.toLocaleString()}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Directly attributed to comment/DM links</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Automated Sales Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">100% deposited to creator gateway account</p>
        </div>
      </div>

      {/* Filter and Channel Selector Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaign, keyword, or command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Channel Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs overflow-x-auto">
            {(['all', 'instagram', 'tiktok', 'whatsapp', 'telegram'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1 font-semibold rounded-lg capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  channelFilter === ch
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ch === 'all' ? 'All Channels' : ch}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs">
            {(['all', 'active', 'paused'] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setStatusFilter(filterKey)}
                className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-colors cursor-pointer ${
                  statusFilter === filterKey
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Automations List with Visual Pipeline Chips */}
      <div className="space-y-4">
        {filtered.map((auto) => {
          const linkedProduct = products.find((p) => p.id === auto.targetProductId);
          const chBadge = getChannelBadge(auto.channel);
          const kws = getKeywords(auto);

          return (
            <div
              key={auto.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Post Info & Name */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={auto.postThumbnail || '/src/assets/images/post_course_launch_1790498703738.jpg'}
                      alt={auto.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md text-[9px] font-bold border ${chBadge.bg}`}>
                      {chBadge.name}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">{auto.name}</h3>
                      {auto.postCode && (
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {auto.postCode}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          auto.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            auto.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                          }`}
                        />
                        {auto.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-xl">
                      {auto.postCaption || `Automated social commerce flow on ${chBadge.name}`}
                    </p>

                    {/* Keywords / Command tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-xs text-slate-400 font-medium">Trigger Condition:</span>
                      {auto.command ? (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-mono">
                          Command: {auto.command}
                        </span>
                      ) : (
                        kws.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono"
                          >
                            #{kw}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Target Product & Stats */}
                <div className="flex flex-wrap items-center gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {linkedProduct && (
                    <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Linked Storefront Offer
                      </span>
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
                        {linkedProduct.title} (${linkedProduct.price})
                      </span>
                    </div>
                  )}

                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Results
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                      {auto.dmsSent ?? auto.dmCount ?? 0} Dispatched • {auto.conversions || 0} Orders
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold">
                      ${(auto.conversionRevenue || 0).toLocaleString()} revenue
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleStatus(auto.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        auto.status === 'active'
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {auto.status === 'active' ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Activate</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onDeleteAutomation(auto.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete automation rule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Visual Workflow Steps (Trigger ↓ Condition ↓ Action) */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  TRIGGER: {auto.channel.toUpperCase()} {auto.triggerType?.replace(/_/g, ' ') || 'INTERACTION'}
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-purple-700 font-semibold font-mono">
                  CONDITION: {auto.command ? `Command ${auto.command}` : `Keyword [#${kws[0] || 'any'}]`}
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-emerald-700 font-semibold">
                  ACTION: Send Direct Reply + Storefront Checkout
                </span>
              </div>

              {/* Message Payload Preview */}
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-700">Outbound Message Payload:</span>
                </div>
                <p className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">
                  {auto.replyMessage || auto.dmMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
