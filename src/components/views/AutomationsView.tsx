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

  const getKeywords = (item: Automation): string[] => {
    if (item.keywords && item.keywords.length > 0) return item.keywords;
    if (item.keyword) return [item.keyword];
    return [];
  };

  const filtered = automations.filter((item) => {
    const kws = getKeywords(item);
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      kws.some((k) => k.toLowerCase().includes(search.toLowerCase())) ||
      item.postCaption?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalDms = automations.reduce((sum, a) => sum + (a.dmsSent ?? a.dmCount ?? 0), 0);
  const totalKeywords = new Set(automations.flatMap(getKeywords)).size;

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-pink-600" />
              <span>Instagram Auto-DM Rules</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {automations.filter((a) => a.status === 'active').length} Active Rules
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated comment-to-DM triggers for <strong className="text-slate-800">@mridaliniofficial</strong>. Replies instantly via Meta Graph API v21.0.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-pink-200 bg-pink-50/80 text-pink-700 hover:bg-pink-100 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-pink-600" />
            <span>Test Simulator</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Auto-DM Rule</span>
          </button>
        </div>
      </div>

      {/* Live Connected Instagram Account Status Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-pink-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <span className="text-xs">IG</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">@mridaliniofficial</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Live Meta Graph API v21.0</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Active comment-to-DM triggers mapped to your 5 live Instagram reels &amp; posts. Private reply automation operational.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSimulator}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white cursor-pointer self-start sm:self-auto shrink-0 shadow-xs flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Test Live Keyword Trigger</span>
        </button>
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
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trigger Keywords</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{totalKeywords}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Configured triggers (BUY, LINK, PRICE, etc.)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Response Latency</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">&lt; 2s</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Instant Graph API delivery</p>
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
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-xl">
            {(['all', 'active', 'paused'] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setStatusFilter(filterKey)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors cursor-pointer ${
                  statusFilter === filterKey
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filterKey === 'all' ? 'All Rules' : filterKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Automations List with Visual Pipeline Chips */}
      <div className="space-y-4">
        {filtered.map((auto) => {
          const linkedProduct = products.find((p) => p.id === auto.targetProductId);
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
                      src={auto.postThumbnail || 'https://scontent-tpe1-1.cdninstagram.com/v/t51.71878-15/758400594_1074641168558022_1484593028835977962_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uQ0xJUFMuQzMifQ%3D%3D&_nc_ohc=HVabN2FWD9oQ7kNvwFM9FBh&_nc_oc=AdoP2Bf2hCiK3OAEETclYPi9L9VgUDxABn71tcLNI0MORMe1y1HOucbGZiNFCAABwHgqnL4umtwQvnzhrNFuOo1c&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQLk8FizTLNX151tK6mV209F174oTBZUa2rPNQc4Hn82y_MIhwf4FvvS5LLXgF8eSfd7z28Gxuvjrg&oh=00_AQOm2l9bXA6nStQi0kisLsse273EDDqCS5zrbE2spawy_A&oe=6AC085D9'}
                      alt={auto.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md text-[9px] font-bold border bg-pink-50 text-pink-700 border-pink-200">
                      Instagram
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
                      {auto.postCaption || 'Instagram Auto-DM trigger rule'}
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
