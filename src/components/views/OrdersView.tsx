import React, { useState } from 'react';
import { Order, OrderFulfillmentStatus, ChannelType } from '../../types';
import { 
  Receipt, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  ExternalLink,
  CreditCard,
  Package,
  Globe
} from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderFulfillmentStatus) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [search, setSearch] = useState('');

  const statuses: { id: string; label: string }[] = [
    { id: 'all', label: 'All Orders' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'processing', label: 'Processing' },
    { id: 'pending', label: 'Pending' },
  ];

  const getChannelBadge = (ch: ChannelType | 'direct' | 'custom_domain') => {
    switch (ch) {
      case 'instagram':
        return { name: 'Instagram', bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'tiktok':
        return { name: 'TikTok', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
      case 'whatsapp':
        return { name: 'WhatsApp', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'telegram':
        return { name: 'Telegram', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
      default:
        return { name: 'Storefront', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.orderStatus === filterStatus;
    const matchChannel = filterChannel === 'all' || o.channel === filterChannel;
    const matchSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.channelHandle?.toLowerCase().includes(search.toLowerCase()) ||
      o.paymentId.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchChannel && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Receipt className="w-6 h-6 text-indigo-600" />
              <span>Multi-Channel Orders &amp; Fulfillment</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {orders.length} Synced Orders
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track customer orders with exact social channel attribution (Instagram, TikTok, WhatsApp, Telegram, Direct).
          </p>
        </div>
      </div>

      {/* Channel Attribution Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {[
          { channel: 'Instagram', orders: '218', revenue: '$25,000', color: 'border-l-4 border-pink-500' },
          { channel: 'TikTok', orders: '142', revenue: '$12,000', color: 'border-l-4 border-cyan-500' },
          { channel: 'WhatsApp', orders: '94', revenue: '$8,000', color: 'border-l-4 border-emerald-500' },
          { channel: 'Telegram', orders: '51', revenue: '$5,000', color: 'border-l-4 border-sky-500' },
        ].map((item, idx) => (
          <div key={idx} className={`p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs ${item.color}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">{item.channel} Attribution</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-bold text-slate-900 font-mono text-base">{item.revenue}</span>
              <span className="text-[11px] text-slate-500">{item.orders} orders</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, or channel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Channel dropdown */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>

          {/* Status buttons */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => setFilterStatus(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterStatus === s.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID &amp; Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Channel Origin</th>
                <th className="py-3.5 px-4">Product Offer</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => {
                const item = order.items[0];
                const chBadge = getChannelBadge(order.channel);

                return (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 font-mono text-xs block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {order.createdAt}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{order.customerEmail}</span>
                    </td>

                    {/* Channel Origin */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${chBadge.bg}`}>
                          {chBadge.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {order.channelHandle}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5 max-w-xs">
                        {item?.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{item?.title}</p>
                          <span className="text-[10px] text-slate-400 capitalize">
                            {item?.type} {item?.variantName && `• ${item.variantName}`}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      ${order.total}
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Paid ({order.paymentGateway})
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {order.paymentId}
                      </span>
                    </td>

                    {/* Fulfillment Status Selector */}
                    <td className="py-4 px-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          onUpdateStatus(order.id, e.target.value as OrderFulfillmentStatus)
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          order.orderStatus === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : order.orderStatus === 'shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
