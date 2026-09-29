import React from 'react';
import { Plus, Instagram, Play, Terminal, Settings, Zap } from 'lucide-react';

interface QuickActionsProps {
  onCreateAutomation: () => void;
  onOpenPosts: () => void;
  onOpenSimulator: () => void;
  onViewLogs: () => void;
  onOpenSettings: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateAutomation,
  onOpenPosts,
  onOpenSimulator,
  onViewLogs,
  onOpenSettings,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Auto-DM Actions</h2>
          <span className="text-[10px] uppercase font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
            Instagram Engine
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Quick shortcuts for Instagram comment-to-DM triggers, logs, and simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {/* 1. New Auto-DM Rule */}
        <button
          onClick={onCreateAutomation}
          className="p-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold text-xs transition-all shadow-xs flex flex-col justify-between group cursor-pointer text-left"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">Rule</span>
          </div>
          <div>
            <p className="font-bold text-white text-xs">New Auto-DM</p>
            <p className="text-[10px] text-pink-100 font-normal">Comment → Private DM</p>
          </div>
        </button>

        {/* 2. Instagram Posts & Reels */}
        <button
          onClick={onOpenPosts}
          className="p-3 rounded-xl bg-slate-50 hover:bg-pink-50/70 border border-slate-200 hover:border-pink-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Instagram className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-pink-600 transition-colors">Posts &amp; Reels</p>
            <p className="text-[10px] text-slate-500 font-normal">Select post to trigger DM</p>
          </div>
        </button>

        {/* 3. Launch Test Simulator */}
        <button
          onClick={onOpenSimulator}
          className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-indigo-600" />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">Test Simulator</p>
            <p className="text-[10px] text-slate-500 font-normal">Simulate user comments</p>
          </div>
        </button>

        {/* 4. Live Webhook Logs */}
        <button
          onClick={onViewLogs}
          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-slate-900 transition-colors">Webhook Logs</p>
            <p className="text-[10px] text-slate-500 font-normal">Real-time incoming feed</p>
          </div>
        </button>

        {/* 5. Meta Webhook Setup */}
        <button
          onClick={onOpenSettings}
          className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-200 text-slate-800 transition-all flex flex-col justify-between cursor-pointer group text-left shadow-2xs"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Settings className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs group-hover:text-emerald-600 transition-colors">Meta Webhook</p>
            <p className="text-[10px] text-slate-500 font-normal">URL &amp; Verify Token</p>
          </div>
        </button>
      </div>
    </div>
  );
};
