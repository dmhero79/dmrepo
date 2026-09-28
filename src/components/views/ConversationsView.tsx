import React, { useState } from 'react';
import { Conversation, Customer, Product, ChannelType } from '../../types';
import { 
  MessageSquare, 
  Search, 
  Send, 
  ShoppingBag, 
  Receipt, 
  Tag, 
  User, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2,
  Globe,
  Bot,
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';

interface ConversationsViewProps {
  conversations: Conversation[];
  customers: Customer[];
  products: Product[];
  onSendMessage: (conversationId: string, text: string) => void;
  onPreviewProduct: (slug: string) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  conversations,
  customers,
  products,
  onSendMessage,
  onPreviewProduct,
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [channelFilter, setChannelFilter] = useState<'all' | ChannelType>('all');
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');
  const [productPickerOpen, setProductPickerOpen] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeCustomer = customers.find((c) => c.id === activeConv?.customerId);

  const getChannelBadge = (ch: ChannelType) => {
    switch (ch) {
      case 'instagram':
        return {
          name: 'Instagram',
          bg: 'bg-pink-50 text-pink-700 border-pink-200',
          dot: 'bg-pink-500',
          gradient: 'from-amber-400 via-pink-500 to-purple-600',
        };
      case 'tiktok':
        return {
          name: 'TikTok',
          bg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
          dot: 'bg-cyan-500',
          gradient: 'from-cyan-400 via-slate-900 to-pink-500',
        };
      case 'whatsapp':
        return {
          name: 'WhatsApp',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          gradient: 'from-emerald-500 to-green-600',
        };
      case 'telegram':
        return {
          name: 'Telegram',
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
          gradient: 'from-sky-400 to-blue-600',
        };
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const matchChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchSearch =
      !search ||
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.channelHandle.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase());
    return matchChannel && matchSearch;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleSendProductCard = (prod: Product) => {
    onSendMessage(
      activeConv.id,
      `Check out ${prod.title} ($${prod.price}):\nhttps://shop.creator.com/p/${prod.slug}`
    );
    setProductPickerOpen(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Banner with Channel Filters */}
      <div className="px-6 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Unified Multi-Channel Inbox</span>
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {conversations.length} Active Threads
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Instagram, TikTok, WhatsApp, and Telegram conversations synced in one unified view
          </p>
        </div>

        {/* Channel Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl text-xs overflow-x-auto">
          {(['all', 'instagram', 'tiktok', 'whatsapp', 'telegram'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1 font-semibold rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${
                channelFilter === ch
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ch === 'all' ? 'All Channels' : ch}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Conversation List (320px) */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-white shrink-0">
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search inbox or handle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              const chBadge = getChannelBadge(conv.channel);

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-indigo-50/60 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Avatar + Channel Pill */}
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatarUrl}
                      alt={conv.customerName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr ${chBadge.gradient} p-[1px] shadow-2xs flex items-center justify-center text-[8px] font-bold text-white`}>
                      {conv.channel[0].toUpperCase()}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {conv.customerName}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-mono text-slate-500 truncate">
                        {conv.channelHandle}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 mt-1 font-normal">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${chBadge.bg}`}>
                        {chBadge.name}
                      </span>
                      {conv.assignedStatus && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600">
                          {conv.assignedStatus === 'bot_handling' ? '🤖 Bot Active' : '👤 Assigned'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Active Chat Stream (Flex-1) */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-slate-50/40 min-w-0">
            {/* Chat Header */}
            <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.avatarUrl}
                  alt={activeConv.customerName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{activeConv.customerName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getChannelBadge(activeConv.channel).bg}`}>
                      {getChannelBadge(activeConv.channel).name} Direct
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{activeConv.channelHandle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProductPickerOpen(!productPickerOpen)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Recommend Product</span>
                </button>
              </div>
            </div>

            {/* Product Quick-Send Bar (Toggled) */}
            {productPickerOpen && (
              <div className="p-3 bg-indigo-50/90 border-b border-indigo-100 flex items-center gap-3 overflow-x-auto">
                <span className="text-xs font-bold text-indigo-900 shrink-0">Send to chat:</span>
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSendProductCard(p)}
                    className="px-3 py-1.5 bg-white hover:bg-indigo-50 text-indigo-900 rounded-xl text-xs font-semibold border border-indigo-200 shadow-2xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{p.title} (${p.price})</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Messages Thread Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeConv.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isBot = msg.sender === 'system_bot';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      {isBot && <Bot className="w-3 h-3 text-indigo-600" />}
                      <span className="font-semibold text-slate-600">
                        {isCustomer ? activeConv.customerName : isBot ? 'AutoDM Keyword Bot' : 'Ankit (Creator)'}
                      </span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isCustomer
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                          : isBot
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-xs shadow-xs'
                          : 'bg-slate-900 text-white rounded-tr-xs shadow-xs'
                      }`}
                    >
                      {msg.text}

                      {/* Product Card embedded in message */}
                      {msg.productCard && (
                        <div className="mt-3 p-2.5 bg-white text-slate-900 rounded-xl border border-indigo-200 shadow-sm flex items-center gap-3">
                          <img
                            src={msg.productCard.image}
                            alt={msg.productCard.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1 text-left">
                            <p className="font-bold text-xs truncate">{msg.productCard.title}</p>
                            <p className="text-xs font-mono font-bold text-indigo-600">
                              ${msg.productCard.price}
                            </p>
                          </div>
                          <button
                            onClick={() => onPreviewProduct(msg.productCard!.link)}
                            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold shrink-0 cursor-pointer"
                          >
                            Checkout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Reply Composer */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Reply to ${activeConv.customerName} on ${getChannelBadge(activeConv.channel).name}...`}
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-slate-400">
            Select a conversation to start chatting.
          </div>
        )}

        {/* Right: Unified Customer Profile Panel (280px) */}
        {activeCustomer && (
          <div className="w-72 border-l border-slate-200 p-5 bg-white hidden xl:flex flex-col justify-between shrink-0 space-y-4">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-slate-100">
                <img
                  src={activeCustomer.avatarUrl}
                  alt={activeCustomer.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-indigo-100 mb-2"
                />
                <h4 className="font-bold text-slate-900 text-sm">{activeCustomer.name}</h4>
                <p className="text-xs text-slate-500">{activeCustomer.email}</p>
                <p className="text-xs text-slate-400 font-mono">{activeCustomer.phone}</p>
              </div>

              {/* Multi-Channel Identities */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Unified Social Identities
                </span>
                <div className="space-y-1.5">
                  {activeCustomer.identities.map((id) => (
                    <div
                      key={id.id}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex items-center justify-between"
                    >
                      <span className="font-mono text-[11px] text-slate-800">{id.handle}</span>
                      <span className="text-[10px] font-bold capitalize text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                        {id.channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commerce Stats */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Commerce Activity
                </span>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">Orders</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{activeCustomer.ordersCount}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">Spent</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">${activeCustomer.totalSpent}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {activeCustomer.notes && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CRM Notes</span>
                  <p className="leading-relaxed text-[11px]">{activeCustomer.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400">
                Acquired via {activeCustomer.source}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
