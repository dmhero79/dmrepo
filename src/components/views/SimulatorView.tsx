import React, { useState } from 'react';
import { 
  Play, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  MessageSquare, 
  Instagram, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Automation } from '../../types';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface SimulatorViewProps {
  automations: Automation[];
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ automations: propAutomations }) => {
  const { activeAccount, automations: contextAutomations } = useAuthPlatform();
  const automations = propAutomations.length > 0 ? propAutomations : contextAutomations;
  const currentHandle = activeAccount?.handle || 'mridaliniofficial';

  const [userHandle, setUserHandle] = useState('@priya_fashion');
  const [commentText, setCommentText] = useState('BUY please! Can you send me the link?');
  const [selectedPost, setSelectedPost] = useState('DbTt-X3yduU');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    matched: boolean;
    matchedRule?: Automation;
    matchedKeyword?: string;
    generatedDm?: string;
    apiResponse?: any;
  } | null>(null);

  const posts = [
    { code: 'DbTt-X3yduU', title: 'Reel: Festive Launch & Styling' },
    { code: 'DbTyxNbSlNJ', title: 'Post: Handcrafted Pure Silk Anarkali' },
    { code: 'DbTxR2oSIp9', title: 'Post: Zari Bordered Tissue Stole' },
    { code: 'DbTxOh8SMnz', title: 'Post: Royal Velvet Kurta' },
    { code: 'all', title: 'Any Post or Reel (Universal Trigger)' },
  ];

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setResult(null);

    // Simulate delay for realistic feeling
    await new Promise((r) => setTimeout(r, 600));

    // Match keywords against active automations
    const activeRules = automations.filter((a) => a.status === 'active');
    const upperComment = commentText.toUpperCase();

    let matched: Automation | null = null;
    let hitKeyword = '';

    for (const rule of activeRules) {
      // Check post matching
      if (rule.postCode && rule.postCode !== 'all' && rule.postCode !== selectedPost && !rule.postCode.includes(selectedPost)) {
        continue;
      }

      const kws = rule.keywords?.length ? rule.keywords : rule.keyword ? [rule.keyword] : [];
      for (const kw of kws) {
        const regex = new RegExp(`\\b${kw.trim()}\\b`, 'i');
        if (regex.test(commentText) || upperComment.includes(kw.trim().toUpperCase())) {
          matched = rule;
          hitKeyword = kw;
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      // Try to dispatch live test event to server
      try {
        const res = await fetch('/api/webhook/simulate-comment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commentText,
            senderUsername: userHandle.replace('@', ''),
            mediaId: selectedPost,
          }),
        });
        const serverData = await res.json();

        setResult({
          matched: true,
          matchedRule: matched,
          matchedKeyword: hitKeyword,
          generatedDm: matched.replyMessage || matched.dmMessage || 'Thanks for reaching out! Here is your link.',
          apiResponse: serverData,
        });
      } catch (err) {
        setResult({
          matched: true,
          matchedRule: matched,
          matchedKeyword: hitKeyword,
          generatedDm: matched.replyMessage || matched.dmMessage,
        });
      }
    } else {
      setResult({
        matched: false,
      });
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Play className="w-5 h-5 text-indigo-600 fill-indigo-600" />
          <span>Instagram Auto-DM Test Simulator</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Simulate an inbound comment from any Instagram user and test whether your keyword rules match and dispatch the DM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Input Form */}
        <form onSubmit={handleRunSimulation} className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Instagram className="w-4 h-4 text-pink-600" />
            <h2 className="text-sm font-bold text-slate-900">Simulate Commenter</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Post / Reel
            </label>
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-indigo-500"
            >
              {posts.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Commenter Handle
            </label>
            <input
              type="text"
              value={userHandle}
              onChange={(e) => setUserHandle(e.target.value)}
              placeholder="@username"
              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Comment Text
            </label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="e.g. Can you please send the LINK or BUY info?"
              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:border-indigo-500"
              required
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-slate-400">Quick keywords:</span>
              {['BUY', 'LINK', 'PRICE', 'ORDER', 'INFO'].map((kw) => (
                <button
                  type="button"
                  key={kw}
                  onClick={() => setCommentText(`I love this outfit! ${kw} please.`)}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 cursor-pointer"
                >
                  +{kw}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className={`w-4 h-4 fill-white ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Evaluating Keyword Triggers...' : 'Test & Simulate Auto-DM'}</span>
          </button>
        </form>

        {/* Right: Instagram DM Preview Mockup */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center font-bold text-[10px]">
                IG
              </div>
              <div>
                <p className="text-xs font-bold text-white">{currentHandle}</p>
                <p className="text-[10px] text-slate-400">Direct Message Preview</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-pink-950 text-pink-300 border border-pink-800">
              Instagram DM
            </span>
          </div>

          {result ? (
            result.matched ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">Keyword Matched: "{result.matchedKeyword}"</p>
                    <p className="text-[11px] text-emerald-400/80">Rule: {result.matchedRule?.name}</p>
                  </div>
                </div>

                {/* Simulated DM Bubble */}
                <div className="bg-slate-800 rounded-2xl rounded-tl-xs p-4 space-y-2 border border-slate-700 max-w-[90%]">
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {result.generatedDm}
                  </p>
                  <p className="text-[10px] text-slate-500 text-right">Delivered just now</p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-2 bg-slate-800/50 rounded-xl border border-slate-800">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="text-xs font-bold text-white">No Matching Keyword Found</p>
                <p className="text-[11px] text-slate-400">
                  Comment "{commentText}" did not match any active Auto-DM keywords.
                </p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs font-medium">Ready to simulate</p>
              <p className="text-[11px] text-slate-500">
                Click "Test &amp; Simulate Auto-DM" to see how the DM is delivered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
