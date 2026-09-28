import React from 'react';
import { ActivityItem } from '../types';
import { MessageSquare, Send, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityItem[];
  onSimulateEvent?: () => void;
  onOpenSimulator?: () => void;
  onViewAllLogs?: () => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  onSimulateEvent,
  onOpenSimulator,
  onViewAllLogs,
}) => {
  const handleSimulate = onOpenSimulator || onSimulateEvent || (() => {});
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Activity</h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-500">Live stream of incoming comments & outbound DMs</p>
        </div>

        <button
          onClick={handleSimulate}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline cursor-pointer"
          title="Simulate live comment webhook"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Simulate</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-100">
        {activities.slice(0, 5).map((item) => {
          const isDm = item.type === 'dm_sent';
          return (
            <div key={item.id} className="relative flex items-start gap-3 pl-1 group">
              {/* Event Icon Node */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ring-4 ring-white ${
                  isDm
                    ? 'bg-indigo-600 text-white'
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}
              >
                {isDm ? (
                  <Send className="w-3 h-3" />
                ) : (
                  <MessageSquare className="w-3 h-3" />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 bg-slate-50/70 group-hover:bg-slate-100/70 p-2.5 rounded-lg border border-slate-100 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {item.timeAgo}
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
                    {item.content || item.subtitle || 'Instagram Event'}
                  </span>
                  {item.context && (
                    <span className="text-[11px] text-slate-500">
                      {item.context}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link to view full audit logs */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={onViewAllLogs || (() => {})}
          className="w-full py-1.5 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-lg transition-colors cursor-pointer"
        >
          View All Logs & Payloads →
        </button>
      </div>
    </div>
  );
};
