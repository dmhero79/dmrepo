import React from 'react';
import { 
  Instagram, 
  Workflow, 
  Send, 
  MessageSquareCode, 
  TrendingUp, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface KPICardsProps {
  connectedAccounts: number;
  activeAutomations: number;
  pausedAutomations: number;
  totalDMsSent: number;
  commentsProcessed: number;
}

export const KPICards: React.FC<KPICardsProps> = ({
  connectedAccounts,
  activeAutomations,
  pausedAutomations,
  totalDMsSent,
  commentsProcessed,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Connected Accounts */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-sm transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Connected Accounts</span>
          <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Instagram className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {connectedAccounts}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          @yourbusiness · Graph API v21.0
        </p>
      </div>

      {/* 2. Active Automations */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-sm transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Active Automations</span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Workflow className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {activeAutomations}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{pausedAutomations} paused</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          5 total rules configured
        </p>
      </div>

      {/* 3. Total DMs Sent */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-sm transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Total DMs Sent</span>
          <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Send className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {totalDMsSent.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <TrendingUp className="w-3 h-3" />
            <span>+12%</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          since last week · 98.8% delivery
        </p>
      </div>

      {/* 4. Comments Processed */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:shadow-sm transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Comments Processed</span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageSquareCode className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {commentsProcessed.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <TrendingUp className="w-3 h-3" />
            <span>+18%</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          since last week · avg 180ms parse
        </p>
      </div>
    </div>
  );
};
