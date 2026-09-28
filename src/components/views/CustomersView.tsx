import React, { useState } from 'react';
import { Customer, CustomerStatus, ChannelType, CustomerIdentity } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  Instagram, 
  Mail, 
  Phone, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Plus,
  Link2,
  CheckCircle2,
  X
} from 'lucide-react';

interface CustomersViewProps {
  customers: Customer[];
  onSelectCustomerConversation: (customerId: string) => void;
  onLinkIdentity?: (customerId: string, newIdentity: Omit<CustomerIdentity, 'id'>) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  onSelectCustomerConversation,
  onLinkIdentity,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<'all' | ChannelType>('all');
  const [search, setSearch] = useState('');
  const [activeCustomer, setActiveCustomer] = useState<Customer>(customers[0] || {} as Customer);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [newChannel, setNewChannel] = useState<ChannelType>('whatsapp');
  const [newHandle, setNewHandle] = useState('');

  const pipelineStages: { id: CustomerStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All Contacts' },
    { id: 'lead', label: 'New Lead' },
    { id: 'engaged', label: 'Engaged' },
    { id: 'interested', label: 'Interested' },
    { id: 'checkout', label: 'Checkout' },
    { id: 'purchased', label: 'Purchased' },
    { id: 'repeat', label: 'Repeat Customer' },
  ];

  const filtered = customers.filter((c) => {
    const matchStatus = selectedStatus === 'all' || c.status === selectedStatus;
    const matchChannel =
      selectedChannel === 'all' ||
      c.primaryChannel === selectedChannel ||
      c.identities?.some((i) => i.channel === selectedChannel);
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      c.identities?.some((i) => i.handle.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchChannel && matchSearch;
  });

  const getChannelBadge = (ch: ChannelType) => {
    switch (ch) {
      case 'instagram':
        return { name: 'IG', bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'tiktok':
        return { name: 'TT', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
      case 'whatsapp':
        return { name: 'WA', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'telegram':
        return { name: 'TG', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
    }
  };

  const handleAddIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;
    if (onLinkIdentity && activeCustomer) {
      onLinkIdentity(activeCustomer.id, {
        channel: newChannel,
        handle: newHandle.trim(),
        verifiedAt: 'Just now',
        isPrimary: false,
      });
    }
    setLinkModalOpen(false);
    setNewHandle('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <span>Unified Customer CRM</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {customers.length} Cross-Platform Contacts
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            One unified profile per customer across Instagram, TikTok, WhatsApp, and Telegram. No fragmented records.
          </p>
        </div>
      </div>

      {/* Pipeline Stage Pills & Channel Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Pipeline Stages */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {pipelineStages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStatus(stage.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedStatus === stage.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Channel Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Channel:</span>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value as any)}
            className="p-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-none"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, email, phone, Instagram handle, WhatsApp number, or Telegram username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        />
      </div>

      {/* Main CRM Workspace (List + Customer Profile Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Customer List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No customer records match this search.
            </div>
          ) : (
            filtered.map((cust) => {
              const isSelected = activeCustomer?.id === cust.id;

              return (
                <div
                  key={cust.id}
                  onClick={() => setActiveCustomer(cust)}
                  className={`p-4.5 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50/70 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={cust.avatarUrl}
                      alt={cust.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-xs">{cust.name}</h3>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200 capitalize">
                          {cust.status}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5">{cust.email}</p>

                      {/* Channel identities icons */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {cust.identities?.map((id) => {
                          const badge = getChannelBadge(id.channel);
                          return (
                            <span
                              key={id.id}
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${badge.bg}`}
                              title={`${id.channel}: ${id.handle}`}
                            >
                              {badge.name}: {id.handle}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 font-mono block">
                      ${cust.totalSpent}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {cust.ordersCount} orders
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Unified Profile Details (5 cols) */}
        {activeCustomer && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 sticky top-6">
            {/* Profile Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img
                  src={activeCustomer.avatarUrl}
                  alt={activeCustomer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100 shadow-xs"
                />
                <div>
                  <h2 className="text-base font-bold text-slate-900">{activeCustomer.name}</h2>
                  <span className="text-xs text-slate-500 font-mono block">{activeCustomer.email}</span>
                  <span className="text-xs text-slate-400 font-mono">{activeCustomer.phone}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectCustomerConversation(activeCustomer.id)}
                className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                title="Open Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            {/* Social Identities (Unified Accounts) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Linked Channel Identities</span>
                </span>
                <button
                  onClick={() => setLinkModalOpen(true)}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Link Handle</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {activeCustomer.identities?.map((id) => (
                  <div
                    key={id.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800 font-mono">{id.handle}</span>
                      <span className="text-[10px] text-slate-400 block">Verified {id.verifiedAt}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                      {id.channel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commerce Summary */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Commerce &amp; Spending History
              </span>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block">Total Lifetime Spend</span>
                  <span className="text-lg font-bold text-emerald-600 font-mono">${activeCustomer.totalSpent}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block">Storefront Orders</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">{activeCustomer.ordersCount}</span>
                </div>
              </div>
            </div>

            {/* Interested Products */}
            {activeCustomer.interestedProducts?.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-1.5">
                  Interested Offers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCustomer.interestedProducts.map((prod, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1 font-medium"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{prod}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-1.5">
                Customer Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCustomer.tags?.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-slate-100 text-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {activeCustomer.notes && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CRM Notes</span>
                <p className="leading-relaxed">{activeCustomer.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Link Social Identity Modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Link Social Handle</h3>
              <button onClick={() => setLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddIdentitySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Channel Network</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as ChannelType)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="instagram">Instagram (@handle)</option>
                  <option value="tiktok">TikTok (@handle)</option>
                  <option value="whatsapp">WhatsApp (+phone)</option>
                  <option value="telegram">Telegram (@username)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Handle / Number</label>
                <input
                  type="text"
                  required
                  placeholder="@handle or +91..."
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Link to Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
