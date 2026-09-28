import React, { useState } from 'react';
import { LogEntry } from '../../types';
import { Terminal, Search, Filter, RefreshCw, CheckCircle2, AlertTriangle, AlertCircle, Info, Download } from 'lucide-react';

interface LogsViewProps {
  logs: LogEntry[];
  onRefresh: () => void;
}

export const LogsView: React.FC<LogsViewProps> = ({ logs, onRefresh }) => {
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = logs.filter((log) => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesSearch =
      !search ||
      log.event.toLowerCase().includes(search.toLowerCase()) ||
      log.userHandle.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.postCode.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-600" />
            <span>Webhook & Delivery Logs</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of Instagram comment webhooks and outbound direct messages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event, handle, or post..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
          />
        </div>

        {/* Level pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          {(['ALL', 'SUCCESS', 'INFO', 'WARN', 'ERROR'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Level</th>
                <th className="py-2.5 px-4">Event</th>
                <th className="py-2.5 px-4">Post</th>
                <th className="py-2.5 px-4">Recipient</th>
                <th className="py-2.5 px-4">Details</th>
                <th className="py-2.5 px-4 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filtered.map((log) => {
                const badgeColor =
                  log.level === 'SUCCESS'
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : log.level === 'INFO'
                    ? 'text-sky-700 bg-sky-50 border-sky-200'
                    : log.level === 'WARN'
                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-rose-700 bg-rose-50 border-rose-200';

                return (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 tabular-nums">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColor}`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-800">
                      {log.event}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-indigo-600">
                      {log.postCode}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {log.userHandle}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-sm truncate">
                      {log.details}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400 tabular-nums">
                      {log.latencyMs ?? 184}ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
