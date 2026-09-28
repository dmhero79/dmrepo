import React, { useState } from 'react';
import { Product, StorefrontTheme } from '../types';
import { 
  Instagram, 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  Download, 
  Calendar, 
  Share2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

interface StorefrontViewProps {
  theme: StorefrontTheme;
  products: Product[];
  activeProductSlug?: string | null;
  onSelectProduct: (product: Product) => void;
  onBackToHome: () => void;
  onInitiateCheckout: (product: Product, quantity: number, variantName?: string) => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  theme,
  products,
  activeProductSlug,
  onSelectProduct,
  onBackToHome,
  onInitiateCheckout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // If a specific product slug is active, show the Product Page!
  const activeProduct = activeProductSlug 
    ? products.find((p) => p.slug === activeProductSlug) 
    : null;

  const categories = Array.from(new Set(products.map((p) => p.categoryName)));

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.categoryName === selectedCategory);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Top Browser URL Bar Simulation */}
      <div className="bg-slate-900 text-white text-xs px-4 py-2 border-b border-slate-800 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">Back to Store</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 py-1 px-3 rounded-full text-slate-300 font-mono text-[11px]">
            <Lock className="w-2.5 h-2.5 text-emerald-400" />
            <span>
              {activeProduct 
                ? `shop.ankitsharma.me/p/${activeProduct.slug}` 
                : 'shop.ankitsharma.me (Custom Domain Verified)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
            <span>{copiedUrl ? 'Link Copied!' : 'Share'}</span>
          </button>
          <div className="flex items-center gap-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>AutoDM Secured Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Creator Header Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={theme.avatarUrl}
                alt={theme.brandName}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full p-1 text-white shadow-xs">
                <Instagram className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{theme.brandName}</h1>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">@{theme.handle} · Verified Creator Storefront</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700 font-medium self-center sm:self-auto">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 Rating (480+ Reviews)</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-2xl">
                {theme.bio}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-500">
                <a 
                  href={theme.socialLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-indigo-600"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram</span>
                </a>
                <span>·</span>
                <span>Direct Payments via Razorpay</span>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">100% Guaranteed Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONDITIONAL: EITHER DETAILED PRODUCT PAGE OR STOREFRONT CATALOG */}
        {activeProduct ? (
          /* PRODUCT PAGE (Mobile-first, rich product detail) */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all products</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Product Image Gallery */}
              <div className="space-y-3">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  <img
                    src={activeProduct.images[0]}
                    alt={activeProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info & Buy Now Zone */}
              <div className="space-y-5">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 mb-2">
                    {activeProduct.type === 'physical' ? 'Physical Product' : activeProduct.type === 'digital' ? 'Instant Digital Download' : '1-on-1 Service'}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {activeProduct.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Category: <strong className="text-slate-700">{activeProduct.categoryName}</strong>
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-3 border-b border-slate-100">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    ${activeProduct.price}
                  </span>
                  {activeProduct.compareAtPrice && (
                    <span className="text-base text-slate-400 line-through font-mono">
                      ${activeProduct.compareAtPrice}
                    </span>
                  )}
                  {activeProduct.compareAtPrice && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Save {Math.round(((activeProduct.compareAtPrice - activeProduct.price) / activeProduct.compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Physical Product Variants Selection */}
                {activeProduct.type === 'physical' && activeProduct.variants && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800">Select Edition / Color:</label>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedVariant === v.name
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{v.name}</span>
                          <span className="ml-1.5 font-mono text-[11px] text-slate-500">(${v.price})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Type specific information badge */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  {activeProduct.type === 'physical' && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{activeProduct.shippingInfo}</span>
                    </div>
                  )}
                  {activeProduct.type === 'digital' && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{activeProduct.deliverySettings}</span>
                    </div>
                  )}
                  {activeProduct.type === 'service' && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>{activeProduct.duration} · {activeProduct.bookingInfo}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons: Buy Now & Add To Cart */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onInitiateCheckout(activeProduct, 1, selectedVariant)}
                    className="flex-1 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Instant Checkout with Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setCartCount((c) => c + 1);
                      alert(`Added "${activeProduct.title}" to cart!`);
                    }}
                    className="py-3.5 px-5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({cartCount})</span>
                  </button>
                </div>

                {/* Safe & Direct Payouts Guarantee */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Direct to Creator Account
                  </span>
                  <span>SSL 256-Bit Encrypted</span>
                  <span>UPI, Cards, NetBanking</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-4">Other Products by Ankit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products.filter((p) => p.id !== activeProduct.id).slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer bg-white group"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.title}
                      className="w-full h-28 rounded-lg object-cover mb-2 group-hover:scale-102 transition-transform"
                    />
                    <h5 className="text-xs font-bold text-slate-900 truncate">{rel.title}</h5>
                    <p className="text-xs font-bold text-indigo-600 mt-1">${rel.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STOREFRONT CATALOG (All categories & products) */
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Items ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-slate-800 shadow-2xs">
                        {product.type}
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">
                        {product.categoryName}
                      </p>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-slate-900 font-mono">
                          ${product.price}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-slate-400 line-through font-mono">
                            ${product.compareAtPrice}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
