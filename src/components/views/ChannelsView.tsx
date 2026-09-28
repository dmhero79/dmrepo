import React, { useState } from 'react';
import { SocialChannelAccount, ChannelType } from '../../types';
import { 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  Settings, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  MessageSquare, 
  Check, 
  X, 
  Zap,
  Info,
  Smartphone,
  Send,
  HelpCircle,
  Copy
} from 'lucide-react';

interface ChannelsViewProps {
  channels: SocialChannelAccount[];
  onToggleChannelConnection: (channelId: string) => void;
  onUpdateChannelAccount: (channelId: string, updates: Partial<SocialChannelAccount>) => void;
  onOpenSimulator: () => void;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({
  channels,
  onToggleChannelConnection,
  onUpdateChannelAccount,
  onOpenSimulator,
}) => {
  const [activeChannelModal, setActiveChannelModal] = useState<SocialChannelAccount | null>(null);
  const [connectingChannel, setConnectingChannel] = useState<ChannelType | null>(null);
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);
  const [webhookSuccessId, setWebhookSuccessId] = useState<string | null>(null);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  // Connection form state
  const [formHandle, setFormHandle] = useState('');
  const [formAccountName, setFormAccountName] = useState('');
  const [formCredentials, setFormCredentials] = useState('');

  const getChannelTheme = (type: ChannelType) => {
    switch (type) {
      case 'instagram':
        return {
          name: 'Instagram',
          gradient: 'from-amber-500 via-pink-500 to-purple-600',
          textColor: 'text-pink-600',
          bgColor: 'bg-pink-50',
          borderColor: 'border-pink-200',
          badgeBg: 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600',
        };
      case 'tiktok':
        return {
          name: 'TikTok',
          gradient: 'from-cyan-400 via-slate-900 to-pink-500',
          textColor: 'text-cyan-700',
          bgColor: 'bg-cyan-50',
          borderColor: 'border-cyan-200',
          badgeBg: 'bg-slate-900 text-cyan-400',
        };
      case 'whatsapp':
        return {
          name: 'WhatsApp',
          gradient: 'from-emerald-500 to-green-600',
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          badgeBg: 'bg-emerald-600 text-white',
        };
      case 'telegram':
        return {
          name: 'Telegram',
          gradient: 'from-sky-400 to-blue-600',
          textColor: 'text-sky-700',
          bgColor: 'bg-sky-50',
          borderColor: 'border-sky-200',
          badgeBg: 'bg-sky-500 text-white',
        };
    }
  };

  const handleTestWebhook = (channel: SocialChannelAccount) => {
    setTestingWebhookId(channel.id);
    setTimeout(() => {
      setTestingWebhookId(null);
      setWebhookSuccessId(channel.id);
      setTimeout(() => setWebhookSuccessId(null), 3000);
    }, 900);
  };

  const handleCopyWebhook = (id: string, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  const openConnectDialog = (type: ChannelType) => {
    setConnectingChannel(type);
    if (type === 'instagram') {
      setFormHandle('@your_instagram_handle');
      setFormAccountName('My Instagram Brand');
      setFormCredentials('EAACEdEose0cBA...');
    } else if (type === 'tiktok') {
      setFormHandle('@your_tiktok');
      setFormAccountName('TikTok Creator Profile');
      setFormCredentials('tt_open_key_94821');
    } else if (type === 'whatsapp') {
      setFormHandle('+91 98000 12345');
      setFormAccountName('WhatsApp Official Store Desk');
      setFormCredentials('EAAG... (Cloud API Token)');
    } else if (type === 'telegram') {
      setFormHandle('@MyStore_Bot');
      setFormAccountName('Telegram Customer VIP Bot');
      setFormCredentials('7192849182:AAH9_394kL...');
    }
  };

  const handleSaveConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectingChannel) return;

    const existing = channels.find((c) => c.channel === connectingChannel);
    if (existing) {
      onUpdateChannelAccount(existing.id, {
        isConnected: true,
        status: 'active',
        handle: formHandle.trim(),
        accountName: formAccountName.trim(),
        lastSync: 'Just now',
        credentialsHint: `Key: ${formCredentials.slice(0, 10)}...`,
      });
    }
    setConnectingChannel(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe className="w-6 h-6 text-indigo-600" />
              <span>Multi-Channel Social Channels</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {channels.filter((c) => c.isConnected).length} of 4 Channels Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Connect your accounts across Instagram, TikTok, WhatsApp, and Telegram. AutoDM executes automations according to each platform's approved capabilities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold border border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
          >
            <Zap className="w-4 h-4 fill-indigo-600" />
            <span>Test Multi-Channel Simulator</span>
          </button>
        </div>
      </div>

      {/* Channel Capability Matrix Info Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Channel-Agnostic Capability Engine
            </span>
            <h2 className="text-lg font-bold text-white">
              Compliant, Platform-Specific Automation Policies
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              AutoDM detects approved APIs per network. We do NOT fake unsupported functionality — features like comment keyword triggers, bot commands, or approved template DMs adapt dynamically to what each platform safely supports.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white border border-white/15">
              100% Meta &amp; TikTok Compliant
            </span>
          </div>
        </div>
      </div>

      {/* 4 Supported Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((chan) => {
          const theme = getChannelTheme(chan.channel);
          const isConnected = chan.isConnected;

          return (
            <div
              key={chan.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between overflow-hidden ${
                isConnected ? 'border-slate-200 hover:border-slate-300' : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Card Top Banner / Channel Type */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Channel Icon Badge */}
                    <div className="relative shrink-0">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.gradient} p-[2px] shadow-sm flex items-center justify-center`}>
                        <img
                          src={chan.profileImage}
                          alt={chan.accountName}
                          className="w-full h-full rounded-[14px] object-cover bg-white"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-900 border border-slate-200 shadow-2xs">
                        {theme.name[0]}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{chan.accountName}</h3>
                        {isConnected ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Connected ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                            Not Connected
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {chan.handle}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">
                        {chan.channelTypeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Connect / Manage Action */}
                  <div>
                    {isConnected ? (
                      <button
                        onClick={() => setActiveChannelModal(chan)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                      >
                        Manage
                      </button>
                    ) : (
                      <button
                        onClick={() => openConnectDialog(chan.channel)}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Notice if specific to channel capability */}
                {chan.capabilities.statusNotice && (
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{chan.capabilities.statusNotice}</span>
                  </div>
                )}
              </div>

              {/* Capabilities Breakdown */}
              <div className="p-6 bg-slate-50/40 space-y-4 flex-1">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Platform Capabilities Matrix
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Comments */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
                      <span className="text-slate-600">Comments</span>
                      {chan.capabilities.comments === true && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Supported
                        </span>
                      )}
                      {chan.capabilities.comments === 'configurable' && (
                        <span className="text-[10px] font-bold text-amber-600">
                          Configurable
                        </span>
                      )}
                      {chan.capabilities.comments === false && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          N/A (Inbox only)
                        </span>
                      )}
                    </div>

                    {/* Direct Messages / Inbound */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
                      <span className="text-slate-600">Direct Messages</span>
                      {chan.capabilities.dm === true && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Supported
                        </span>
                      )}
                      {chan.capabilities.dm === 'configurable' && (
                        <span className="text-[10px] font-bold text-amber-600">
                          Partner Perms
                        </span>
                      )}
                      {chan.capabilities.dm === false && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          Unsupported
                        </span>
                      )}
                    </div>

                    {/* Keyword Detection */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
                      <span className="text-slate-600">Keyword Triggers</span>
                      {chan.capabilities.keywordTrigger === true && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Supported
                        </span>
                      )}
                      {chan.capabilities.keywordTrigger === 'configurable' && (
                        <span className="text-[10px] font-bold text-amber-600">
                          Configurable
                        </span>
                      )}
                    </div>

                    {/* Special Feature: Commands or Templates */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
                      <span className="text-slate-600">
                        {chan.channel === 'telegram'
                          ? 'Bot Commands (/buy)'
                          : chan.channel === 'whatsapp'
                          ? 'WABA Templates'
                          : 'Post Triggers'}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600">
                        {chan.channel === 'telegram' ? 'Active' : chan.channel === 'whatsapp' ? 'Verified' : 'Supported'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Webhook & Sync Status */}
                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400">Webhook:</span>
                    <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {chan.webhookStatus === 'operational' ? 'Live & Listening' : chan.webhookStatus}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">Last Synced: {chan.lastSync}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleTestWebhook(chan)}
                  disabled={testingWebhookId === chan.id}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {testingWebhookId === chan.id ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Test Ping...</span>
                    </>
                  ) : webhookSuccessId === chan.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">200 OK Received</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Test Webhook Ping</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {isConnected && (
                    <button
                      onClick={() => onToggleChannelConnection(chan.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 font-medium hover:underline cursor-pointer"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Management Detail Modal */}
      {activeChannelModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeChannelModal.profileImage}
                  alt={activeChannelModal.accountName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{activeChannelModal.accountName}</h3>
                  <p className="text-xs text-slate-500 font-mono">{activeChannelModal.handle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveChannelModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                  Dedicated Webhook Endpoint
                </span>
                <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 font-mono text-slate-800">
                  <span className="truncate">{activeChannelModal.webhookUrl}</span>
                  <button
                    onClick={() => handleCopyWebhook(activeChannelModal.id, activeChannelModal.webhookUrl)}
                    className="text-indigo-600 font-semibold flex items-center gap-1 shrink-0"
                  >
                    {copiedUrlId === activeChannelModal.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Configure this callback URL in your {activeChannelModal.accountName} developer console.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Channel Credentials &amp; Verification</span>
                <p className="text-slate-500 text-xs mb-2">
                  AutoDM encrypts all OAuth refresh tokens and API secrets with AES-256 server-side.
                </p>
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{activeChannelModal.credentialsHint || 'Credentials verified'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleChannelConnection(activeChannelModal.id);
                  setActiveChannelModal(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                Disconnect Channel
              </button>
              <button
                onClick={() => setActiveChannelModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connect New Channel Modal */}
      {connectingChannel && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Connect Channel
                </span>
                <h3 className="font-bold text-slate-900 text-base capitalize mt-0.5">
                  Link {connectingChannel} Account
                </h3>
              </div>
              <button
                onClick={() => setConnectingChannel(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConnection} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile / Bot Handle
                </label>
                <input
                  type="text"
                  required
                  value={formHandle}
                  onChange={(e) => setFormHandle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Display Account Name
                </label>
                <input
                  type="text"
                  required
                  value={formAccountName}
                  onChange={(e) => setFormAccountName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  API Token / Secret Key / Phone ID
                </label>
                <input
                  type="password"
                  required
                  value={formCredentials}
                  onChange={(e) => setFormCredentials(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setConnectingChannel(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Verify &amp; Connect Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
