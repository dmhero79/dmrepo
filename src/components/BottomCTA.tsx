import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface BottomCTAProps {
  onCreateAutomation: () => void;
  onOpenSimulator?: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  onCreateAutomation,
  onOpenSimulator,
}) => {
  return (
    <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-slate-50 p-6 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Text */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              More engagement, less manual work.
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Let AutoDM handle the comments. You handle the growth.
          </p>

          <div className="flex items-center gap-4 pt-1.5 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Meta Official API
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Anti-Spam Throttling
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Avg 180ms dispatch
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSimulator}
            className="py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Test Comment Simulator</span>
          </button>

          <button
            onClick={onCreateAutomation}
            className="py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>Create Automation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
