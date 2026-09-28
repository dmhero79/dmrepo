import React from 'react';
import { Automation } from '../../types';
import { MessageSquare, Copy, Send, CheckCircle2, Plus } from 'lucide-react';

interface MessagesViewProps {
  automations: Automation[];
  onOpenCreate: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ automations, onOpenCreate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span>Automated DM Templates & Content</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the message templates and links sent automatically to commenters
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Message Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((auto) => {
          const kw = auto.keyword || auto.keywords?.[0] || 'auto';
          const msg = auto.replyMessage || auto.dmMessage || '';
          const count = auto.dmCount ?? auto.dmsSent ?? 0;

          return (
            <div key={auto.id} className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">{auto.name}</span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                    #{kw}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Linked to Post {auto.postCode}</p>

                {/* Message Bubble Preview */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 whitespace-pre-line leading-relaxed mb-4">
                  {msg}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
                <span className="font-mono text-[11px]">{count} DMs delivered</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(msg)}
                  className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
