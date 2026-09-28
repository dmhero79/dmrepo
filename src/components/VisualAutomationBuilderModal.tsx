import React, { useState } from 'react';
import { 
  ChannelType, 
  Automation, 
  Product, 
  TriggerType, 
  ConditionType, 
  ActionType,
  AutomationStep 
} from '../types';
import { 
  X, 
  Sparkles, 
  ArrowDown, 
  Check, 
  Smartphone, 
  Instagram, 
  MessageSquare, 
  ShoppingBag, 
  Tag, 
  UserCheck, 
  Clock, 
  Send,
  Zap,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface VisualAutomationBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveAutomation: (automation: Omit<Automation, 'id' | 'createdAt' | 'triggerCount' | 'dmsSent' | 'clicks' | 'conversions' | 'conversionRevenue'>) => void;
  editingAutomation?: Automation | null;
}

export const VisualAutomationBuilderModal: React.FC<VisualAutomationBuilderModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveAutomation,
  editingAutomation,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>(
    editingAutomation?.channel || 'instagram'
  );
  const [ruleName, setRuleName] = useState(
    editingAutomation?.name || 'New Multi-Channel Campaign'
  );
  const [triggerType, setTriggerType] = useState<TriggerType>(
    editingAutomation?.triggerType || 'instagram_comment'
  );
  const [conditionType, setConditionType] = useState<ConditionType>(
    editingAutomation?.conditionType || 'keyword_contains'
  );
  const [actionType, setActionType] = useState<ActionType>(
    editingAutomation?.actionType || 'send_message'
  );

  // Trigger details
  const [keywordInput, setKeywordInput] = useState(
    editingAutomation?.keywords?.join(', ') || editingAutomation?.keyword || 'buy, price, link'
  );
  const [commandInput, setCommandInput] = useState(
    editingAutomation?.command || '/buy'
  );
  const [postCode, setPostCode] = useState(
    editingAutomation?.postCode || '#cKcJ39'
  );
  const [targetProductId, setTargetProductId] = useState(
    editingAutomation?.targetProductId || products[0]?.id || ''
  );
  const [replyMessage, setReplyMessage] = useState(
    editingAutomation?.replyMessage ||
    editingAutomation?.dmMessage ||
    'Hey {{name}}! 👋 Thanks for asking.\nHere is the direct product link:\n{{product_link}}\n\nUse code CREATOR10 for 10% off today!'
  );
  const [enableWaitDelay, setEnableWaitDelay] = useState(false);
  const [waitSeconds, setWaitSeconds] = useState(15);
  const [secondaryAction, setSecondaryAction] = useState<ActionType>('add_tag');
  const [customerTag, setCustomerTag] = useState('High Intent Lead');

  if (!isOpen) return null;

  const targetProduct = products.find((p) => p.id === targetProductId) || products[0];

  const channels: { id: ChannelType; name: string; icon: string; gradient: string }[] = [
    { id: 'instagram', name: 'Instagram', icon: 'IG', gradient: 'from-amber-400 via-pink-500 to-purple-600' },
    { id: 'tiktok', name: 'TikTok', icon: 'TT', gradient: 'from-cyan-400 via-slate-900 to-pink-500' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'WA', gradient: 'from-emerald-500 to-green-600' },
    { id: 'telegram', name: 'Telegram', icon: 'TG', gradient: 'from-sky-400 to-blue-600' },
  ];

  // Dynamic triggers per channel capability
  const getTriggersForChannel = (ch: ChannelType) => {
    switch (ch) {
      case 'instagram':
        return [
          { id: 'instagram_comment' as TriggerType, title: 'Instagram Post Comment', desc: 'Fires when a user comments on any reel or feed post' },
          { id: 'instagram_dm' as TriggerType, title: 'Instagram Direct Message', desc: 'Fires when an inbound DM is received' },
        ];
      case 'tiktok':
        return [
          { id: 'tiktok_comment' as TriggerType, title: 'TikTok Video Comment', desc: 'Monitors comments on your published TikTok videos' },
          { id: 'tiktok_interaction' as TriggerType, title: 'TikTok Profile Mention', desc: 'Fires when a user tags or mentions your creator handle' },
        ];
      case 'whatsapp':
        return [
          { id: 'whatsapp_incoming_message' as TriggerType, title: 'WhatsApp Inbound Message', desc: 'Customer chats with your official WhatsApp Business number' },
        ];
      case 'telegram':
        return [
          { id: 'telegram_command' as TriggerType, title: 'Telegram Bot Command', desc: 'Customer sends commands like /buy, /catalog, or /start' },
          { id: 'telegram_message' as TriggerType, title: 'Telegram Chat Message', desc: 'Customer sends arbitrary text to your Telegram bot' },
        ];
    }
  };

  const handleChannelSelect = (ch: ChannelType) => {
    setSelectedChannel(ch);
    const triggers = getTriggersForChannel(ch);
    setTriggerType(triggers[0].id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const keywordsList = keywordInput
      .split(',')
      .map((k) => k.trim().toLowerCase().replace(/^#/, ''))
      .filter(Boolean);

    const steps: AutomationStep[] = [
      {
        id: 'step-1',
        type: 'trigger',
        title: triggerType.replace(/_/g, ' ').toUpperCase(),
        channel: selectedChannel,
        config: { postCode, command: commandInput },
      },
      {
        id: 'step-2',
        type: 'condition',
        title: conditionType === 'keyword_contains' ? `Keyword contains: ${keywordsList.join(', ')}` : conditionType,
        config: { keywords: keywordsList, targetProductId },
      },
      {
        id: 'step-3',
        type: 'action',
        title: actionType.replace(/_/g, ' ').toUpperCase(),
        channel: selectedChannel,
        config: { replyMessage, productId: targetProductId },
      },
    ];

    if (enableWaitDelay) {
      steps.push({
        id: 'step-4',
        type: 'wait',
        title: `WAIT ${waitSeconds} SECONDS (Anti-Spam Delay)`,
        config: { delaySeconds: waitSeconds },
      });
      steps.push({
        id: 'step-5',
        type: 'action',
        title: `SECONDARY ACTION: ${secondaryAction.replace(/_/g, ' ').toUpperCase()}`,
        channel: selectedChannel,
        config: { tag: customerTag },
      });
    }

    onSaveAutomation({
      name: ruleName.trim() || 'New Campaign',
      channel: selectedChannel,
      triggerType,
      conditionType,
      actionType,
      steps,
      postId: postCode,
      postCode,
      keyword: keywordsList[0] || 'buy',
      keywords: keywordsList,
      command: commandInput,
      replyMessage,
      dmMessage: replyMessage,
      targetProductId,
      status: 'active',
      postThumbnail: targetProduct?.images[0] || '/src/assets/images/post_course_launch_1790498703738.jpg',
      postCaption: `Automated campaign running on ${selectedChannel}`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-indigo-600 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Visual Multi-Channel Automation Builder
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  TRIGGER → CONDITION → ACTION
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Design cross-platform keyword triggers and personalized DM reply flows
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder Workspace: Left configuration / Right visual pipeline & phone preview */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Left Form: 7 cols */}
          <form onSubmit={handleSave} className="lg:col-span-7 p-6 space-y-6">
            {/* Automation Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Campaign / Rule Name
              </label>
              <input
                type="text"
                required
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g. Masterclass VIP Launch"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* STEP 1: Select Channel */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  Select Channel
                </span>
                <span className="text-[11px] text-slate-400">Channel-Agnostic Engine</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleChannelSelect(ch.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedChannel === ch.id
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-7 h-7 rounded-xl bg-gradient-to-tr ${ch.gradient} text-white text-[10px] font-bold flex items-center justify-center`}>
                        {ch.icon}
                      </span>
                      {selectedChannel === ch.id && (
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{ch.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Select Trigger */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  Select Platform Trigger
                </span>
                <span className="text-[11px] text-indigo-600 font-semibold">
                  Filtered by {selectedChannel} API
                </span>
              </div>

              <div className="space-y-2">
                {getTriggersForChannel(selectedChannel).map((trig) => (
                  <label
                    key={trig.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      triggerType === trig.id
                        ? 'border-indigo-600 bg-indigo-50/40 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="trigger"
                      checked={triggerType === trig.id}
                      onChange={() => setTriggerType(trig.id)}
                      className="mt-0.5 text-indigo-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{trig.title}</p>
                      <p className="text-[11px] text-slate-500">{trig.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* STEP 3: Select Condition */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  Select Condition
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {[
                  { id: 'keyword_contains' as ConditionType, label: 'Keyword contains' },
                  { id: 'message_contains' as ConditionType, label: 'Message contains text' },
                  { id: 'product_match' as ConditionType, label: 'Specific Product intent' },
                  { id: 'new_customer' as ConditionType, label: 'New customer only' },
                ].map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setConditionType(cond.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-colors cursor-pointer ${
                      conditionType === cond.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>

              {/* Conditional Inputs */}
              {selectedChannel === 'telegram' && triggerType === 'telegram_command' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Telegram Command
                  </label>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="/buy or /catalog"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Trigger Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="e.g. buy, price, course, link"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              )}
            </div>

            {/* STEP 4: Select Action */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                  Select Action
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { id: 'send_message' as ActionType, label: 'Send Message' },
                  { id: 'send_product' as ActionType, label: 'Send Product' },
                  { id: 'send_storefront_link' as ActionType, label: 'Store Link' },
                  { id: 'add_tag' as ActionType, label: 'Tag in CRM' },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActionType(act.id)}
                    className={`p-2 rounded-xl border text-center text-xs font-semibold transition-colors cursor-pointer ${
                      actionType === act.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>

              {/* Target Product Picker */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Attached Product / Service Offer
                  </label>
                  <select
                    value={targetProductId}
                    onChange={(e) => setTargetProductId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} (${p.price}) — {p.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Direct Response Message Template
                  </label>
                  <textarea
                    rows={4}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed"
                  />
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                    <span>Variables:</span>
                    <button
                      type="button"
                      onClick={() => setReplyMessage((prev) => prev + ' {{username}}')}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono"
                    >
                      {'{' + '{username}' + '}'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyMessage((prev) => prev + ' {{product_link}}')}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono"
                    >
                      {'{' + '{product_link}' + '}'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional WAIT & Secondary Action */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableWaitDelay}
                  onChange={(e) => setEnableWaitDelay(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Add Anti-Spam WAIT &amp; Secondary Action</span>
              </label>

              {enableWaitDelay && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Wait Duration</span>
                    <select
                      value={waitSeconds}
                      onChange={(e) => setWaitSeconds(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value={15}>15 Seconds</option>
                      <option value={30}>30 Seconds</option>
                      <option value={60}>1 Minute</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Auto-Add CRM Tag</span>
                    <input
                      type="text"
                      value={customerTag}
                      onChange={(e) => setCustomerTag(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Bar */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save Automation Flow</span>
              </button>
            </div>
          </form>

          {/* Right Visual Pipeline & Live Phone Preview: 5 cols */}
          <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Visual Flow Hierarchy
              </span>

              {/* Connected Visual Pipeline Blocks */}
              <div className="space-y-2">
                {/* 1. Trigger */}
                <div className="p-3 bg-white rounded-xl border border-indigo-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">TRIGGER</span>
                      <p className="text-xs font-bold text-slate-900 capitalize">
                        {triggerType.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                    {selectedChannel}
                  </span>
                </div>

                <div className="flex justify-center text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 2. Condition */}
                <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase">CONDITION</span>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedChannel === 'telegram' ? commandInput : `Keyword = [${keywordInput}]`}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    Match
                  </span>
                </div>

                <div className="flex justify-center text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 3. Action */}
                <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">ACTION</span>
                      <p className="text-xs font-bold text-slate-900">
                        Send DM + Store Link
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    0ms Latency
                  </span>
                </div>

                {enableWaitDelay && (
                  <>
                    <div className="flex justify-center text-slate-300">
                      <ArrowDown className="w-4 h-4" />
                    </div>

                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center text-xs font-semibold text-amber-800">
                      WAIT {waitSeconds} SECONDS (Debounce / Rate Guard)
                    </div>

                    <div className="flex justify-center text-slate-300">
                      <ArrowDown className="w-4 h-4" />
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-800">Tag Customer: "{customerTag}"</span>
                      <span className="text-[10px] font-mono text-slate-400">CRM Updated</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Live Message Simulator Preview */}
            <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-lg space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold">Channel Output Preview</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 capitalize">
                  {selectedChannel} Chat
                </span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {replyMessage
                  .replace('{{name}}', '@johndoe')
                  .replace('{{username}}', '@johndoe')
                  .replace('{{product_link}}', `https://shop.creator.com/p/${targetProduct?.slug || 'item'}`)}
              </div>

              {targetProduct && (
                <div className="bg-white text-slate-900 p-3 rounded-xl flex items-center gap-3">
                  <img
                    src={targetProduct.images[0]}
                    alt={targetProduct.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{targetProduct.title}</p>
                    <p className="text-[11px] font-mono font-bold text-indigo-600">${targetProduct.price}</p>
                  </div>
                  <span className="px-2 py-1 bg-indigo-600 text-white rounded-md text-[10px] font-bold">
                    Buy Now
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
