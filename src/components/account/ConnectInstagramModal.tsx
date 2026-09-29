import React, { useState } from 'react';
import { 
  Instagram, 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Key, 
  Play, 
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Lock,
  Layers,
  FlaskConical
} from 'lucide-react';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface ConnectInstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_DEV_TOKEN = 'IGAAPl048uu5RBZAFp4VlJ1N2NpQW13OTR3cEFUMDVOQlNMZAWdhV2kwRkVpVGVaUk5VZATJ1SzlsUnFyVzJkeGdDY0hQdHZASQnhiaDY2aENlZAzRtS2FIZA3k4TzFSWFZACdDJBQnRWX2xZAN1RGanduUS1NVjZAlVC1vTkxjeDdPZAUhGRQZDZD';

export const ConnectInstagramModal: React.FC<ConnectInstagramModalProps> = ({ isOpen, onClose }) => {
  const { addInstagramAccount } = useAuthPlatform();
  const [activeTab, setActiveTab] = useState<'testing_token' | 'manychat_oauth'>('testing_token');
  
  // Testing Token Tab state
  const [testToken, setTestToken] = useState(DEFAULT_DEV_TOKEN);
  const [isValidating, setIsValidating] = useState(false);
  const [tokenInspection, setTokenInspection] = useState<any>(null);
  
  // Custom Handle Tab state
  const [handle, setHandle] = useState('mridaliniofficial');
  const [displayName, setDisplayName] = useState('Mridalini Official');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Validate Token against Meta Graph API
  const handleInspectToken = async () => {
    if (!testToken.trim()) {
      setError('Please paste a Meta Graph API Access Token to inspect');
      return;
    }

    setIsValidating(true);
    setError(null);
    setTokenInspection(null);

    try {
      const res = await fetch('/api/meta/inspect-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: testToken.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Token validation failed. Token might be expired or invalid.');
      }

      setTokenInspection(data);
      if (data.account?.username) {
        setHandle(data.account.username);
        setDisplayName(data.account.username);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to inspect token');
    } finally {
      setIsValidating(false);
    }
  };

  // Submit and save Token to server + Add Account
  const handleSaveTestingAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      setError('Please provide an Instagram handle');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save token on the backend server for runtime DM dispatch
      if (testToken.trim()) {
        await fetch('/api/meta/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: testToken.trim() }),
        });
      }

      // 2. Add or switch active account in the platform
      await addInstagramAccount({
        handle: handle.trim(),
        displayName: displayName.trim() || `@${handle.replace('@', '')}`,
        avatarUrl: tokenInspection?.account?.profilePictureUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${handle}`,
        accessToken: testToken.trim() || undefined,
      });

      setSuccessNotice(`Connected @${handle} with active testing token!`);
      setTimeout(() => {
        onClose();
        setSuccessNotice(null);
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Failed to connect Instagram account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Instagram Account Setup</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Testing Mode
                </span>
              </div>
              <p className="text-xs text-slate-500">Configure Meta Graph API credentials for testing &amp; dev</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 px-5 pt-3 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('testing_token')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testing_token'
                ? 'border-pink-600 text-pink-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Developer / Testing Token (Required in Test Mode)</span>
          </button>
          <button
            onClick={() => setActiveTab('manychat_oauth')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'manychat_oauth'
                ? 'border-pink-600 text-pink-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live OAuth (ManyChat Style)</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* TAB 1: TESTING TOKEN MODE */}
          {activeTab === 'testing_token' && (
            <form onSubmit={handleSaveTestingAccount} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Meta App is in Development / Sandbox Mode</span>
                </p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Because the Meta App is in testing mode (before public App Review), Meta requires an <strong>Instagram Graph API User or Page Token</strong> from Graph API Explorer to dispatch real DMs.
                </p>
              </div>

              {/* Token Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-pink-600" />
                    <span>Meta Graph API Access Token</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setTestToken(DEFAULT_DEV_TOKEN)}
                    className="text-[10px] text-pink-600 hover:underline font-semibold cursor-pointer"
                  >
                    Reset to Default Test Token
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={testToken}
                    onChange={(e) => setTestToken(e.target.value)}
                    placeholder="IGAA... or EAAB..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none font-mono text-[11px] pr-20"
                  />
                  <button
                    type="button"
                    onClick={handleInspectToken}
                    disabled={isValidating}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {isValidating ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                    <span>Inspect</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Obtained from <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Meta Graph API Explorer</a>.
                </p>
              </div>

              {/* Inspection Preview if validated */}
              {tokenInspection && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Token Verified &amp; Active</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {tokenInspection.account?.id || tokenInspection.user?.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[1.5px] shrink-0">
                      <img
                        src={tokenInspection.account?.profilePictureUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">@{tokenInspection.account?.username || 'mridaliniofficial'}</p>
                      <p className="text-[10px] text-slate-400">
                        Type: {tokenInspection.account?.accountType || 'Business'} · {tokenInspection.account?.mediaCount ?? 5} Media Items
                      </p>
                    </div>
                  </div>

                  {/* Permissions granted */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold block mb-1">Granted Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {(tokenInspection.permissions || ['instagram_basic', 'instagram_manage_comments', 'instagram_manage_messages']).map((perm: string) => (
                        <span key={perm} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 font-mono">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Instagram Handle & Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Instagram Handle <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-semibold text-slate-400">@</span>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                      className="w-full pl-7 pr-2.5 py-2 border border-slate-200 rounded-xl focus:border-pink-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Display Title
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Mridalini Official"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-white font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Saving Token &amp; Connecting...</span>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save &amp; Connect Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: LIVE MANYCHAT OAUTH (FOR WHEN APP IS IN PRODUCTION) */}
          {activeTab === 'manychat_oauth' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900 text-xs">Production Meta App Review Flow</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  In production (after Meta App Review approves public permissions), users click this single button to authorize without tokens.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('testing_token');
                  handleInspectToken();
                }}
                className="w-full py-3 px-4 rounded-xl text-white font-bold bg-[#1877F2] hover:bg-[#166fe5] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Switch to Testing Token Mode to Test Live DMs</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
