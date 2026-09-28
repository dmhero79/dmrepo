import React, { useState } from 'react';
import { Automation } from '../types';
import { 
  MoreVertical, 
  Play, 
  Pause, 
  ExternalLink, 
  Copy, 
  Check, 
  Edit3, 
  Trash2, 
  Sparkles,
  Search,
  Plus,
  SendHorizontal,
  X
} from 'lucide-react';

interface AutomationsTableProps {
  automations: Automation[];
  onToggleStatus: (id: string) => void;
  onEdit?: (auto: Automation) => void;
  onEditAutomation?: (auto: Automation) => void;
  onDelete?: (id: string) => void;
  onDeleteAutomation?: (id: string) => void;
  onTestAutomation?: (auto: Automation) => void;
  onCreateAutomation?: () => void;
  onOpenCreate?: () => void;
  filterQuery?: string;
  searchQuery?: string;
  selectedKeyword?: string | null;
  onClearKeyword?: () => void;
}

export const AutomationsTable: React.FC<AutomationsTableProps> = ({
  automations,
  onToggleStatus,
  onEdit,
  onEditAutomation,
  onDelete,
  onDeleteAutomation,
  onTestAutomation,
  onCreateAutomation,
  onOpenCreate,
  filterQuery = '',
  searchQuery = '',
  selectedKeyword,
  onClearKeyword,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleEdit = onEdit || onEditAutomation || (() => {});
  const handleDelete = onDelete || onDeleteAutomation || (() => {});
  const handleCreate = onCreateAutomation || onOpenCreate || (() => {});

  const query = (searchQuery || filterQuery).toLowerCase().trim();

  const getKeyword = (item: Automation) => {
    return item.keyword || item.keywords?.[0] || 'auto';
  };

  const getDM = (item: Automation) => {
    return item.replyMessage || item.dmMessage || '';
  };

  // Filter automations
  const filtered = automations.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const kw = getKeyword(item).toLowerCase();
    const msg = getDM(item).toLowerCase();
    const matchesQuery = 
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.postCode && item.postCode.toLowerCase().includes(query)) ||
      kw.includes(query) ||
      msg.includes(query);
    
    const matchesSelectedKeyword = 
      !selectedKeyword || 
      kw === selectedKeyword.toLowerCase() ||
      item.keywords?.some((k) => k.toLowerCase() === selectedKeyword.toLowerCase());

    return matchesStatus && matchesQuery && matchesSelectedKeyword;
  });

  const handleCopyDM = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Automations</h2>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {filtered.length} of {automations.length}
            </span>
            {selectedKeyword && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                Filtered: #{selectedKeyword}
                {onClearKeyword && (
                  <button onClick={onClearKeyword} className="hover:text-purple-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active trigger rules matching incoming Instagram comments to automated direct messages
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Status filter pill tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs">
            {(['all', 'active', 'paused'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Rule</span>
          </button>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Post & Campaign</th>
              <th className="py-3 px-4">Keyword</th>
              <th className="py-3 px-4">DM Message</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <p className="font-medium text-sm text-slate-600">No automations found</p>
                  <p className="text-xs mt-1">Try resetting filters or creating a new comment automation.</p>
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const kw = getKeyword(item);
                const dm = getDM(item);

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Post Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.postThumbnail}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
                          <span className="font-mono text-[11px] text-indigo-600 bg-indigo-50/80 border border-indigo-100 px-1.5 py-0.2 rounded font-medium">
                            Post: {item.postCode}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Keyword Column */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 font-mono text-xs font-bold">
                        <span className="text-purple-400 font-normal">#</span>
                        <span>{kw}</span>
                      </div>
                    </td>

                    {/* DM Message Column */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="relative bg-slate-50 border border-slate-200/80 rounded-lg p-2 group-hover:border-slate-300 transition-colors">
                        <p className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed font-sans line-clamp-2">
                          {dm}
                        </p>
                        <button
                          onClick={() => handleCopyDM(item.id, dm)}
                          className="mt-1 text-[10px] text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                          title="Copy message template"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onToggleStatus(item.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          item.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                          }`}
                        />
                        <span className="capitalize">{item.status}</span>
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {item.createdAt}
                    </td>

                    {/* Action Menu */}
                    <td className="py-3.5 px-4 text-right relative">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onToggleStatus(item.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            item.status === 'active'
                              ? 'text-amber-600 border-amber-200 hover:bg-amber-50'
                              : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                          }`}
                          title={item.status === 'active' ? 'Pause Automation' : 'Activate Automation'}
                        >
                          {item.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        </button>

                        <button
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {activeMenuId === item.id && (
                        <div className="absolute right-4 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 text-left">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              handleEdit(item);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Edit Automation</span>
                          </button>
                          {onTestAutomation && (
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onTestAutomation(item);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer font-medium"
                            >
                              <SendHorizontal className="w-3.5 h-3.5" />
                              <span>Simulate Trigger</span>
                            </button>
                          )}
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              handleDelete(item.id);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Rule</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
