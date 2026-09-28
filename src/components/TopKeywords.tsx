import React from 'react';
import { KeywordMetric } from '../types';
import { Hash, Sparkles } from 'lucide-react';

interface TopKeywordsProps {
  keywords: KeywordMetric[];
  onSelectKeyword?: (kw: string) => void;
  selectedKeyword?: string | null;
}

export const TopKeywords: React.FC<TopKeywordsProps> = ({
  keywords,
  onSelectKeyword,
  selectedKeyword,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Top Keywords</h2>
            <span className="text-[10px] font-mono font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
              Ranked
            </span>
          </div>
          <p className="text-xs text-slate-500">Most triggered intent keywords in comments</p>
        </div>
        <Hash className="w-4 h-4 text-slate-400" />
      </div>

      {/* Ranked Keywords List with Progress Bars */}
      <div className="space-y-3.5 my-1">
        {keywords.map((item) => {
          const isSelected = selectedKeyword === item.keyword;
          return (
            <div
              key={item.keyword}
              onClick={() => onSelectKeyword && onSelectKeyword(item.keyword)}
              className={`p-2 rounded-lg transition-colors cursor-pointer group ${
                isSelected ? 'bg-indigo-50/80 border border-indigo-200' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 font-semibold w-4 text-[11px]">
                    {item.rank}.
                  </span>
                  <span className="font-bold text-slate-900 font-mono group-hover:text-indigo-600 transition-colors">
                    {item.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.count} hits
                  </span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${item.percentage * 2.5}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Filter Info */}
      <p className="text-[11px] text-slate-400 mt-2 text-center">
        Tip: Click any keyword to filter automations above
      </p>
    </div>
  );
};
