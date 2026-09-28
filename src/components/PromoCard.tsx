import React from 'react';
import { Instagram, ArrowRight, Sparkles } from 'lucide-react';

interface PromoCardProps {
  onCreateAutomation?: () => void;
  onUpgrade?: () => void;
}

export const PromoCard: React.FC<PromoCardProps> = ({ onCreateAutomation, onUpgrade }) => {
  const handleClick = onUpgrade || onCreateAutomation || (() => {});
  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 text-white shadow-md">
      {/* Background Decorative Rings */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-indigo-500/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Instagram Icon Lockup */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[1.5px] shadow-lg shadow-pink-500/20 inline-flex items-center justify-center mb-4">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2">
            Turn Comments into Conversations
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-indigo-200/90 leading-relaxed mb-5">
            Automate replies, save time, and focus on what matters — your audience.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleClick}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-indigo-950 bg-white hover:bg-slate-100 active:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
          >
            <span>Create Automation</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-950 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <p className="text-[10px] text-center text-indigo-300/70 mt-2.5">
            Instant setup · No coding required
          </p>
        </div>
      </div>
    </div>
  );
};
