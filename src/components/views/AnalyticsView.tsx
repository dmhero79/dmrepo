import React, { useState } from 'react';
import { PerformanceSlice, DailyDMData, ChannelAnalyticsData } from '../../types';
import { CHANNEL_ANALYTICS } from '../../mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  Globe, 
  Filter,
  DollarSign
} from 'lucide-react';

interface AnalyticsViewProps {
  performanceData: PerformanceSlice[];
  dailyData: DailyDMData[];
  channelAnalytics?: ChannelAnalyticsData[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  performanceData,
  dailyData,
  channelAnalytics = CHANNEL_ANALYTICS,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');

  const totalRevenue = channelAnalytics.reduce((s, c) => s + c.revenue, 0);
  const totalOrders = channelAnalytics.reduce((s, c) => s + c.orders, 0);
  const totalMessages = channelAnalytics.reduce((s, c) => s + c.messages, 0);
  const totalLeads = channelAnalytics.reduce((s, c) => s + c.leads, 0);

  const funnelSteps = [
    { name: 'Social Interaction', count: '9,710', conv: '100%' },
    { name: 'Automated DM / Message', count: '3,892', conv: '40.1%' },
    { name: 'Product Link Clicked', count: '3,410', conv: '87.6%' },
    { name: 'Creator Store Visit', count: '8,370', conv: '68.2%' },
    { name: 'Product View', count: '4,210', conv: '50.3%' },
    { name: 'Checkout Started', count: '1,280', conv: '30.4%' },
    { name: 'Purchase Completed', count: '505', conv: '39.4%' },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <span>Multi-Channel Social Commerce Analytics</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${totalRevenue.toLocaleString()} Total Channel Sales
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time attribution across Instagram, TikTok, WhatsApp, and Telegram with end-to-end commerce funnel tracking.
          </p>
        </div>
      </div>

      {/* Main KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">Total Revenue</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
            ${totalRevenue.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% this month</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">Store Orders</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
            {totalOrders}
          </span>
          <span className="text-[10px] text-slate-500">Across 4 channels</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">Store Visitors</span>
          <span className="text-xl font-bold text-indigo-600 font-mono mt-1 block">
            8,370
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">+22% vs last cycle</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">New Customers</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
            342
          </span>
          <span className="text-[10px] text-slate-400">Captured to CRM</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">Total Leads</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
            {totalLeads}
          </span>
          <span className="text-[10px] text-indigo-600 font-semibold">Active in pipeline</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-medium block">Conversion Rate</span>
          <span className="text-xl font-bold text-emerald-600 font-mono mt-1 block">
            6.03%
          </span>
          <span className="text-[10px] text-slate-400">vs 1.8% web avg</span>
        </div>
      </div>

      {/* CHANNEL ATTRIBUTION BREAKDOWN CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Channel Attribution &amp; Revenue Breakdown</span>
          </h2>
          <span className="text-xs text-slate-400">0% Commission taken by AutoDM</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {channelAnalytics.map((c) => {
            const pct = Math.round((c.revenue / totalRevenue) * 100);
            return (
              <div
                key={c.channel}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${c.iconBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                      {c.name[0]}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                      <span className="text-[10px] font-semibold text-slate-400">{pct}% of revenue</span>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">
                    ${c.revenue.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">DMs/Msgs</span>
                    <span className="font-bold text-slate-900 font-mono">{c.messages}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">Visits</span>
                    <span className="font-bold text-indigo-600 font-mono">{c.storeVisits}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">Orders</span>
                    <span className="font-bold text-emerald-600 font-mono">{c.orders}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SOCIAL COMMERCE FUNNEL VISUALIZER */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Social Commerce Conversion Funnel
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How followers convert from organic social interactions into completed orders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 pt-2">
          {funnelSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 text-center relative flex flex-col justify-between"
            >
              <div>
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold mx-auto flex items-center justify-center mb-2">
                  {idx + 1}
                </span>
                <p className="text-xs font-bold text-slate-800 leading-tight min-h-[32px]">
                  {step.name}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2">
                <span className="text-base font-extrabold text-slate-900 font-mono block">
                  {step.count}
                </span>
                <span className="text-[10px] font-bold text-indigo-600">
                  {step.conv} pass
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Channel Analytics Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">
            Detailed Performance Metrics by Channel
          </h3>
          <span className="text-xs text-slate-400 font-mono">Last 30 Days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Inbound Messages</th>
                <th className="py-3 px-4">Social Engagement</th>
                <th className="py-3 px-4">Leads Captured</th>
                <th className="py-3 px-4">Product Clicks</th>
                <th className="py-3 px-4">Store Visits</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4 text-right">Attributed Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {channelAnalytics.map((c) => (
                <tr key={c.channel} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{c.messages.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-700">{c.engagement.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-indigo-600 font-bold">{c.leads.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-700">{c.productClicks.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-700">{c.storeVisits.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold">{c.orders}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    ${c.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
