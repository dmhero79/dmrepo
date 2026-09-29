import React, { useState } from 'react';
import { 
  LogIn, 
  X, 
  Sparkles, 
  Instagram, 
  ShieldCheck, 
  User, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, signInWithGoogle, signInAsDemoCreator, logout, isLoading } = useAuthPlatform();
  const [customHandle, setCustomHandle] = useState('');
  const [customName, setCustomName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setAuthError(err.message || 'Google sign-in failed');
    }
  };

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInAsDemoCreator(
        customHandle.trim() || 'my_brand', 
        customName.trim() || 'My Instagram Store'
      );
      onClose();
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">InstaAutoDM Platform</h2>
              <p className="text-xs text-slate-500">Sign in to manage your automated DM flows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {currentUser ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {currentUser.displayName?.slice(0, 2).toUpperCase() || 'CR'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{currentUser.displayName}</p>
                  <p className="text-slate-500 text-xs">{currentUser.email || 'Creator Account'}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Logged In
                </span>
                <button
                  onClick={() => { logout(); onClose(); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Option 1: One-Click Google Login */}
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-800 transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer text-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] uppercase font-bold text-slate-400">or start instantly</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Option 2: Instant Creator Handle Login */}
              <form onSubmit={handleDemoSignIn} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Instagram Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400">@</span>
                    <input
                      type="text"
                      required
                      value={customHandle}
                      onChange={(e) => setCustomHandle(e.target.value.replace('@', ''))}
                      placeholder="e.g. mridaliniofficial or your_handle"
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Brand / Store Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Mridalini Couture"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Platform Workspace</span>
                </button>
              </form>
            </>
          )}

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Tenant Creator Architecture</span>
            </p>
            <p>
              Each user can connect multiple Instagram accounts and independently manage keywords, DMs, and webhook tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
