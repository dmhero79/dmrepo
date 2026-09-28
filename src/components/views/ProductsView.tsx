import React, { useState } from 'react';
import { Product, ProductType } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Tag, 
  Truck, 
  Download, 
  Calendar,
  X,
  Check,
  PackageCheck
} from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'views' | 'clicks' | 'addToCartCount' | 'ordersCount' | 'revenue'>) => void;
  onDeleteProduct: (id: string) => void;
  onPreviewProduct: (slug: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onPreviewProduct,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'physical' | 'digital' | 'service'>('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form states
  const [newType, setNewType] = useState<ProductType>('digital');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(29);
  const [compareAtPrice, setCompareAtPrice] = useState(49);
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('Digital Guides');
  // Physical fields
  const [sku, setSku] = useState('PROD-01');
  const [stock, setStock] = useState(50);
  const [shippingInfo, setShippingInfo] = useState('Express 2-3 day delivery via Delhivery');
  // Digital fields
  const [downloadFile, setDownloadFile] = useState('resource-pack.zip');
  const [deliverySettings, setDeliverySettings] = useState('Instant download link sent to email and DM');
  // Service fields
  const [duration, setDuration] = useState('45 mins');
  const [bookingInfo, setBookingInfo] = useState('Calendly booking link dispatched automatically upon payment');

  const filtered = products.filter((p) => {
    const matchType = filterType === 'all' || p.type === filterType;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.categoryName.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddProduct({
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: newType,
      description,
      price: Number(price),
      compareAtPrice: Number(compareAtPrice) || undefined,
      images: ['/src/assets/images/post_course_launch_1790498703738.jpg'],
      categoryId: 'cat-1',
      categoryName,
      status: 'active',
      sku: newType === 'physical' ? sku : undefined,
      stock: newType === 'physical' ? Number(stock) : undefined,
      shippingInfo: newType === 'physical' ? shippingInfo : undefined,
      downloadFile: newType === 'digital' ? downloadFile : undefined,
      deliverySettings: newType === 'digital' ? deliverySettings : undefined,
      duration: newType === 'service' ? duration : undefined,
      bookingInfo: newType === 'service' ? bookingInfo : undefined,
    });

    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Product Management</h1>
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {products.length} / 100 limit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sell physical goods, digital assets, and 1-on-1 consultations directly from Instagram
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {(['all', 'physical', 'digital', 'service'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 text-xs font-semibold capitalize rounded-lg transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 pl-6">Product</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Funnel Views</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Revenue</th>
                <th className="py-3 px-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate max-w-xs">{p.title}</p>
                        <span className="font-mono text-[10px] text-slate-400">/{p.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {p.categoryName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    ${p.price}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {p.views.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {p.ordersCount}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                    ${p.revenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreviewProduct(p.slug)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="View Live Storefront Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal (Physical, Digital, Service) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Create New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 overflow-y-auto space-y-4">
              {/* Product Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Choose Product Type</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'physical' as ProductType, label: 'Physical Product', desc: 'Ships with SKU & stock' },
                    { id: 'digital' as ProductType, label: 'Digital Product', desc: 'File download & vault' },
                    { id: 'service' as ProductType, label: '1-on-1 Service', desc: 'Calendly/booking slot' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setNewType(t.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        newType === t.id
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-bold text-slate-900 block">{t.label}</span>
                      <span className="text-[10px] text-slate-500">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Masterclass 2026, Pro Headphones"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Price & Compare-At */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Compare-At Price ($)</label>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed breakdown of features, bonuses, and deliverables..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Specific fields based on type */}
              {newType === 'physical' && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 block">Physical Product Settings</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">SKU</label>
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Stock Count</label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Shipping Info</label>
                    <input
                      type="text"
                      value={shippingInfo}
                      onChange={(e) => setShippingInfo(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              )}

              {newType === 'digital' && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 block">Digital Asset Settings</span>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Download File Name</label>
                    <input
                      type="text"
                      value={downloadFile}
                      onChange={(e) => setDownloadFile(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Delivery Settings</label>
                    <input
                      type="text"
                      value={deliverySettings}
                      onChange={(e) => setDeliverySettings(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              )}

              {newType === 'service' && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 block">Consulting / Service Settings</span>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Booking Link Info</label>
                    <input
                      type="text"
                      value={bookingInfo}
                      onChange={(e) => setBookingInfo(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm cursor-pointer"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
