import React, { useState } from 'react';
import { Settings, ShieldCheck, Check, Sparkles, Bell, Sliders, Database, Key } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [debounceSeconds, setDebounceSeconds] = useState(30);
  const [maxDMsPerHour, setMaxDMsPerHour] = useState(150);
  const [autoLikeComment, setAutoLikeComment] = useState(true);
  const [sendPublicReply, setSendPublicReply] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          <span>Automation & Security Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure response throttling, Instagram compliance filters, and Webhook behavior
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Throttling and compliance policies updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Instagram Safety & Compliance */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Safety & Anti-Spam Throttling</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Same-User Debounce Window
              </label>
              <select
                value={debounceSeconds}
                onChange={(e) => setDebounceSeconds(Number(e.target.value))}
                className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-indigo-500"
              >
                <option value={15}>15 seconds (Aggressive)</option>
                <option value={30}>30 seconds (Recommended)</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes (Conservative)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Prevents duplicate DMs if a user comments multiple times consecutively.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Automated DMs / Hour
              </label>
              <input
                type="number"
                value={maxDMsPerHour}
                onChange={(e) => setMaxDMsPerHour(Number(e.target.value))}
                className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Safeguards your Instagram account against hitting Meta platform rate-limits.
              </p>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="pt-2 space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Auto-like matched comment</span>
                <span className="text-[11px] text-slate-500">Automatically heart the comment so the user knows they were seen</span>
              </div>
              <input
                type="checkbox"
                checked={autoLikeComment}
                onChange={(e) => setAutoLikeComment(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Post public reply comment</span>
                <span className="text-[11px] text-slate-500">Post a public comment like "Sent you a DM! Check your requests 📩"</span>
              </div>
              <input
                type="checkbox"
                checked={sendPublicReply}
                onChange={(e) => setSendPublicReply(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
