import React, { useState } from 'react';
import { DailyDMData, PerformanceSlice } from '../types';
import { TrendingUp, BarChart2, PieChart, Info, Calendar } from 'lucide-react';

interface AnalyticsChartsProps {
  data7d?: DailyDMData[];
  data30d?: DailyDMData[];
  data90d?: DailyDMData[];
  dms7d?: DailyDMData[];
  dms30d?: DailyDMData[];
  dms90d?: DailyDMData[];
  performanceData: PerformanceSlice[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  data7d,
  data30d,
  data90d,
  dms7d,
  dms30d,
  dms90d,
  performanceData,
}) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(6);

  const set7 = dms7d || data7d || [];
  const set30 = dms30d || data30d || [];
  const set90 = dms90d || data90d || [];

  const rawDataset = timeRange === '7D' ? set7 : timeRange === '30D' ? set30 : set90;

  // Normalized items
  const activeDataset = rawDataset.map((d) => ({
    date: d.date,
    value: d.value ?? d.dmsSent ?? 100,
    dmsSent: d.dmsSent ?? d.value ?? 100,
    comments: d.comments ?? Math.round((d.value ?? d.dmsSent ?? 100) * 1.8),
  }));

  // Chart coordinate calculations
  const chartWidth = 560;
  const chartHeight = 180;
  const paddingX = 35;
  const paddingY = 25;

  const maxVal = Math.max(...activeDataset.map((d) => d.value), 150);
  const minVal = 0;

  const getX = (index: number) => {
    if (activeDataset.length <= 1) return paddingX;
    return paddingX + (index / (activeDataset.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (chartHeight - paddingY * 2);
  };

  // Generate SVG path using smooth cubic beziers
  const points = activeDataset.map((d, i) => ({ x: getX(i), y: getY(d.value), ...d }));
  
  let linePath = points.length > 0 ? `M ${points[0].x} ${points[0].y}` : '';
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  const hoveredIndex = hoveredPointIndex !== null && hoveredPointIndex < activeDataset.length 
    ? hoveredPointIndex 
    : Math.max(0, activeDataset.length - 1);
  const currentHovered = activeDataset[hoveredIndex] || { date: 'Apr 27', value: 142, dmsSent: 142, comments: 256 };

  // Donut chart math
  let cumulativePercentage = 0;
  const donutSlices = performanceData.map((slice) => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += slice.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return {
      ...slice,
      startAngle,
      endAngle,
      count: slice.count ?? Math.round(slice.percentage * 14.8),
    };
  });

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const actualEnd = endAngle >= 360 ? 359.99 : endAngle;
    const start = polarToCartesian(x, y, radius, actualEnd);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = actualEnd - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Large Card: DMs Sent Overview */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">DMs Sent Overview</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +14.8% vs last cycle
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily automated responses delivered directly to commenters' Instagram inboxes
            </p>
          </div>

          {/* Time range selector tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
            {(['7D', '30D', '90D'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setTimeRange(tab);
                  setHoveredPointIndex(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  timeRange === tab
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab === '7D' ? '7 Days' : tab === '30D' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tooltip Banner Indicator */}
        <div className="my-3 flex items-center justify-between text-xs bg-slate-50/80 border border-slate-100 rounded-xl px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="font-semibold text-slate-800">
              {currentHovered.date} — DMs Sent: <span className="text-indigo-600 font-mono text-sm font-bold">{currentHovered.dmsSent}</span>
            </span>
          </div>
          <div className="text-slate-500 text-[11px]">
            <span>Comments matched: </span>
            <span className="font-mono text-slate-700 font-semibold">{currentHovered.comments}</span>
          </div>
        </div>

        {/* SVG Line Chart Viewport */}
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-48 select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={yVal}
                  x2={chartWidth - paddingX}
                  y2={yVal}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Gradient Fill under the curve */}
            {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

            {/* Smooth SVG Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Points */}
            {points.map((p, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#4338ca' : '#ffffff'}
                    stroke="#6366f1"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all cursor-pointer"
                  />
                  {/* Invisible hit targets for easier hover */}
                  <rect
                    x={p.x - 15}
                    y={paddingY}
                    width={30}
                    height={chartHeight - paddingY * 2}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointIndex(idx)}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dates across the bottom */}
        <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
          {activeDataset.map((d, i) => (
            <span
              key={i}
              className={`cursor-pointer transition-colors ${
                hoveredIndex === i ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'
              }`}
              onMouseEnter={() => setHoveredPointIndex(i)}
            >
              {d.date}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Second Card: Automation Performance (Donut Chart) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Automation Performance</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of 1,342 processed Instagram comments
          </p>
        </div>

        {/* Donut Chart Visualization */}
        <div className="relative my-4 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90">
            {donutSlices.map((slice, i) => {
              const pathData = describeArc(80, 80, 58, slice.startAngle, slice.endAngle);
              return (
                <path
                  key={i}
                  d={pathData}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="transition-all duration-300 hover:opacity-85"
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">72%</span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Success Rate
            </span>
          </div>
        </div>

        {/* Legend with percentages */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          {donutSlices.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 text-[11px]">({item.count})</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
