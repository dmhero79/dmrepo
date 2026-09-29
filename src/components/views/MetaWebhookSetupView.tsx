import React, { useState } from 'react';
import { 
  Instagram, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  Terminal,
  Key
} from 'lucide-react';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface MetaWebhookSetupViewProps {
  appUrl: string;
}

export const MetaWebhookSetupView: React.FC<MetaWebhookSetupViewProps> = ({ appUrl }) => {
  const { activeAccount } = useAuthPlatform();
  const currentHandle = activeAccount?.handle || 'mridaliniofficial';
  const verifyToken = activeAccount?.webhookVerifyToken || 'autodm_meta_verify_token_2026';
  const webhookUrl = `${window.location.origin}/api/webhook/instagram?account=${currentHandle}`;

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'url' | 'token') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleTestPing = async () => {
    setTestStatus('testing');
    setTestResult(null);
    try {
      const res = await fetch('/api/webhook/simulate-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentText: 'BUY',
          senderUsername: 'test_instagram_user',
          mediaId: '17997579704996102',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestStatus('success');
        setTestResult(data.actionTaken || 'Auto-DM dispatched successfully!');
      } else {
        setTestStatus('error');
        setTestResult(data.error || 'Failed to trigger test DM');
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestResult(err.message || 'Connection error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-600" />
          <span>Meta Webhook &amp; Instagram API Configuration</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          ManyChat-style architecture: Centralized Meta Webhook pipelines automatically manage comment-to-DM routing for <strong className="text-slate-800">@{currentHandle}</strong>.
        </p>
      </div>

      {/* ManyChat Platform Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700">
          <p className="font-bold text-slate-900 text-sm">Automated Cloud Engine (Zero Token Requirement)</p>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Just like ManyChat, end-users and creators never have to create developer accounts or paste Graph API tokens. The platform handles token exchange, permissions, and webhook delivery behind the scenes.
          </p>
        </div>
      </div>

      {/* Live Connection Status Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">Meta Graph API v21.0 Connected</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Account: <span className="font-semibold text-slate-900">@{currentHandle}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleTestPing}
          disabled={testStatus === 'testing'}
          className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Zap className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-pulse' : 'fill-white'}`} />
          <span>{testStatus === 'testing' ? 'Testing...' : 'Test Webhook Pipeline'}</span>
        </button>
      </div>

      {testResult && (
        <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
          testStatus === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {testStatus === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
          <span>{testResult}</span>
        </div>
      )}

      {/* Copyable Credentials Panel */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Meta Developer Webhook Fields</h2>
        </div>

        {/* 1. Callback URL */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Webhook Callback URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={webhookUrl}
              className="flex-1 p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-800 select-all"
            />
            <button
              onClick={() => copyToClipboard(webhookUrl, 'url')}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Paste this in Meta Developer Console under <strong>Instagram &gt; Webhooks &gt; Edit Subscription</strong>.
          </p>
        </div>

        {/* 2. Verify Token */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Verify Token
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={verifyToken}
              className="flex-1 p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-800 select-all"
            />
            <button
              onClick={() => copyToClipboard(verifyToken, 'token')}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedToken ? 'Copied!' : 'Copy Token'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Used by Meta during handshake verification to confirm your server is authentic.
          </p>
        </div>
      </div>

      {/* Step-by-Step Meta Setup Guide */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <h2 className="text-sm font-bold text-slate-900">How to Connect in Meta Developer Dashboard</h2>
          </div>
          <a
            href="https://developers.facebook.com/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Open Meta Apps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <ol className="space-y-3 text-xs text-slate-600">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
            <div>
              <p className="font-semibold text-slate-900">Open your app in developers.facebook.com</p>
              <p className="text-slate-500 mt-0.5">Select your Meta App (App ID: 1097121733196692).</p>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
            <div>
              <p className="font-semibold text-slate-900">Set Webhook Callback URL</p>
              <p className="text-slate-500 mt-0.5">
                Go to <strong>Webhooks &gt; Instagram</strong>, paste the Callback URL and Verify Token from above, and click <strong>Verify and Save</strong>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
            <div>
              <p className="font-semibold text-slate-900">Subscribe to Comments and Messages</p>
              <p className="text-slate-500 mt-0.5">
                Click <strong>Subscribe</strong> next to <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">comments</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">messages</code>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
            <div>
              <p className="font-semibold text-slate-900">Important Testing Note</p>
              <p className="text-slate-500 mt-0.5">
                Meta strictly prevents an Instagram account from sending DMs to itself. Always test by commenting from a <strong>different personal account</strong> (added under App Roles &gt; Instagram Testers).
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};
