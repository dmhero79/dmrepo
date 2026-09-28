import React, { useState } from 'react';
import { Automation, ChannelType } from '../types';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  MessageSquare, 
  Instagram, 
  Smartphone,
  Globe,
  Bot
} from 'lucide-react';

interface InteractiveTestSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  automations: Automation[];
  onTriggerSimulatedActivity?: (keyword: string, postTitle: string, dmText: string) => void;
}

export const InteractiveTestSimulatorModal: React.FC<InteractiveTestSimulatorModalProps> = ({
  isOpen,
  onClose,
  automations,
  onTriggerSimulatedActivity,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('instagram');
  const [commentInput, setCommentInput] = useState('Hey Ankit, can you send the course link please?');
  const [userHandle, setUserHandle] = useState('@demo_tester');
  const [simulationState, setSimulationState] = useState<'idle' | 'processing' | 'success' | 'no_match'>('idle');
  const [matchedRule, setMatchedRule] = useState<Automation | null>(null);

  if (!isOpen) return null;

  const activeAutomations = automations.filter(
    (a) => a.status === 'active' && a.channel === selectedChannel
  );

  const getKeywords = (rule: Automation): string[] => {
    if (rule.keywords && rule.keywords.length > 0) return rule.keywords;
    if (rule.keyword) return [rule.keyword];
    if (rule.command) return [rule.command];
    return [];
  };

  const getDM = (rule: Automation): string => {
    return rule.replyMessage || rule.dmMessage || 'Thanks for reaching out! Here is your link.';
  };

  const handleChannelTabChange = (ch: ChannelType) => {
    setSelectedChannel(ch);
    setSimulationState('idle');
    setMatchedRule(null);

    if (ch === 'instagram') {
      setUserHandle('@demo_creator');
      setCommentInput('Hey! Can you send the course link?');
    } else if (ch === 'tiktok') {
      setUserHandle('@tiktok_fan');
      setCommentInput('Drop the link for the creator playbook!');
    } else if (ch === 'whatsapp') {
      setUserHandle('+91 98112 23344');
      setCommentInput('What is the price for studio headphones?');
    } else if (ch === 'telegram') {
      setUserHandle('@tele_vip');
      setCommentInput('/buy');
    }
  };

  const handleSimulate = () => {
    setSimulationState('processing');
    const inputLower = commentInput.toLowerCase().trim();

    setTimeout(() => {
      // Find matching automation on this channel
      const match = activeAutomations.find((rule) => {
        const kws = getKeywords(rule);
        if (rule.command && inputLower.startsWith(rule.command.toLowerCase())) {
          return true;
        }
        return kws.some((kw) => inputLower.includes(kw.toLowerCase()));
      });

      if (match) {
        setMatchedRule(match);
        setSimulationState('success');
        const kw = getKeywords(match)[0] || 'auto';
        onTriggerSimulatedActivity?.(kw, match.name, getDM(match));
      } else {
        setMatchedRule(null);
        setSimulationState('no_match');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Multi-Channel Automation Simulator
              </h2>
              <p className="text-xs text-slate-500">
                Simulate inbound interactions on Instagram, TikTok, WhatsApp, or Telegram in real time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Channel Selector */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              Select Test Social Channel
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'instagram' as ChannelType, name: 'Instagram', sub: 'Reel Comment' },
                { id: 'tiktok' as ChannelType, name: 'TikTok', sub: 'Video Comment' },
                { id: 'whatsapp' as ChannelType, name: 'WhatsApp', sub: 'Business Chat' },
                { id: 'telegram' as ChannelType, name: 'Telegram', sub: 'Bot /buy' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleChannelTabChange(ch.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedChannel === ch.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{ch.name}</p>
                  <p className="text-[10px] text-slate-500">{ch.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Test Input */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tester Handle / Number
                </label>
                <input
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono outline-none focus:border-indigo-500"
                />
              </div>

              <div className="w-full sm:w-2/3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inbound Message / Comment
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                      if (simulationState !== 'idle') setSimulationState('idle');
                    }}
                    placeholder={selectedChannel === 'telegram' ? 'Type /buy or /catalog' : 'Type trigger keyword...'}
                    className="w-full pl-3 pr-24 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleSimulate}
                    disabled={simulationState === 'processing'}
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {simulationState === 'processing' ? 'Pinging...' : 'Simulate'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Sample Presets */}
            <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
              <span className="text-[11px]">Quick Samples:</span>
              {selectedChannel === 'instagram' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCommentInput('Hey! Can you send me the course link?')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    "course link"
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentInput('Great reel!')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    "no match"
                  </button>
                </>
              )}
              {selectedChannel === 'whatsapp' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCommentInput('What is the price for studio headphones?')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    "price?"
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentInput('Can I buy the hardware?')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    "buy"
                  </button>
                </>
              )}
              {selectedChannel === 'telegram' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCommentInput('/buy')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer font-mono"
                  >
                    "/buy"
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentInput('/start')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer font-mono"
                  >
                    "/start"
                  </button>
                </>
              )}
              {selectedChannel === 'tiktok' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCommentInput('link please!')}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    "link"
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Simulation Output Area */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {simulationState === 'idle' && (
              <p className="text-center text-xs text-slate-400 py-4">
                Click "Simulate" to test keyword detection and view the dispatched response for {selectedChannel}.
              </p>
            )}

            {simulationState === 'processing' && (
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-indigo-600 font-medium">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Validating {selectedChannel} webhook &amp; matching keywords (24ms)...</span>
              </div>
            )}

            {simulationState === 'success' && matchedRule && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Trigger Verified on {selectedChannel.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Latency: 118ms</span>
                </div>

                {/* Delivered Chat Card */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Dispatched to {userHandle}:
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 capitalize font-bold">
                      {selectedChannel} API
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-600 text-white rounded-xl text-xs whitespace-pre-line leading-relaxed font-mono">
                    {getDM(matchedRule)}
                  </div>
                </div>
              </div>
            )}

            {simulationState === 'no_match' && (
              <div className="py-2 text-center text-xs space-y-1">
                <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>No keyword match on {selectedChannel}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  The event was safely verified by the webhook, but no active rule matched this comment/command.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
