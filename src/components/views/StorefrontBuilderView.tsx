import React, { useState } from 'react';
import { StorefrontTheme, CustomDomainConfig } from '../../types';
import { 
  Store, 
  Globe, 
  Palette, 
  Layout, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Lock
} from 'lucide-react';

interface StorefrontBuilderViewProps {
  theme: StorefrontTheme;
  customDomain: CustomDomainConfig;
  onUpdateTheme: (updated: Partial<StorefrontTheme>) => void;
  onUpdateDomain: (domain: string) => void;
  onPreviewPublicStorefront: () => void;
}

export const StorefrontBuilderView: React.FC<StorefrontBuilderViewProps> = ({
  theme,
  customDomain,
  onUpdateTheme,
  onUpdateDomain,
  onPreviewPublicStorefront,
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'branding' | 'domain'>('templates');
  const [domainInput, setDomainInput] = useState(customDomain.domain);
  const [copiedDns, setCopiedDns] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const templates: { id: StorefrontTheme['template']; name: string; desc: string; previewColor: string }[] = [
    { id: 'creator', name: 'Creator', desc: 'Minimalist video & digital goods layout for personal brands', previewColor: 'from-indigo-600 to-purple-600' },
    { id: 'modern', name: 'Modern Store', desc: 'Clean e-commerce product grid for physical merchandise', previewColor: 'from-slate-900 to-slate-700' },
    { id: 'fashion', name: 'Fashion', desc: 'High-contrast editorial look with large photography showcases', previewColor: 'from-rose-500 to-amber-500' },
    { id: 'personal_brand', name: 'Personal Brand', desc: 'Authoritative portfolio + service booking slots', previewColor: 'from-blue-600 to-indigo-600' },
    { id: 'coach', name: 'Coach/Consultant', desc: 'High conversion client intake & 1-on-1 discovery calls', previewColor: 'from-emerald-600 to-teal-700' },
    { id: 'digital', name: 'Digital Products', desc: 'Software, presets, Notion templates and eBook bundles', previewColor: 'from-violet-600 to-pink-600' },
  ];

  const handleDomainSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    onUpdateDomain(domainInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Store className="w-5 h-5 text-indigo-600" />
            <span>Storefront Builder &amp; Custom Domain</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured customization with polished templates. No messy drag-and-drop complexity.
          </p>
        </div>

        <button
          onClick={onPreviewPublicStorefront}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Live Storefront</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'templates' as const, label: 'Design Templates (6)' },
          { id: 'branding' as const, label: 'Branding & Colors' },
          { id: 'domain' as const, label: 'Custom Domain & SSL' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {templates.map((tpl) => {
            const isSelected = theme.template === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => onUpdateTheme({ template: tpl.id })}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`h-24 rounded-xl bg-gradient-to-r ${tpl.previewColor} mb-3.5 p-3 flex flex-col justify-between text-white shadow-inner`}>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="uppercase tracking-wider">Template Preset</span>
                      {isSelected && (
                        <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-extrabold">{tpl.name}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{tpl.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tpl.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-indigo-600">
                    {isSelected ? 'Currently Selected' : 'Click to Apply'}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: BRANDING & CUSTOMIZATION */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Storefront Name</label>
              <input
                type="text"
                value={theme.brandName}
                onChange={(e) => onUpdateTheme({ brandName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store Handle (autodm.com/@handle)</label>
              <input
                type="text"
                value={theme.handle}
                onChange={(e) => onUpdateTheme({ handle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Creator Bio</label>
            <textarea
              rows={2}
              value={theme.bio}
              onChange={(e) => onUpdateTheme({ bio: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Color Palettes */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Brand Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => onUpdateTheme({ primaryColor: e.target.value })}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => onUpdateTheme({ primaryColor: e.target.value })}
                  className="w-full p-2 text-xs rounded-lg border border-slate-200 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => onUpdateTheme({ secondaryColor: e.target.value })}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => onUpdateTheme({ secondaryColor: e.target.value })}
                  className="w-full p-2 text-xs rounded-lg border border-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Button Style & Layout options */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Button Corner Radius</label>
              <select
                value={theme.buttonStyle}
                onChange={(e) => onUpdateTheme({ buttonStyle: e.target.value as any })}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="rounded-full">Fully Rounded (Pill)</option>
                <option value="rounded-xl">Slightly Rounded (Modern XL)</option>
                <option value="rounded-md">Sharp (Clean Minimal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Showcase Layout</label>
              <select
                value={theme.productLayout}
                onChange={(e) => onUpdateTheme({ productLayout: e.target.value as any })}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="grid">3-Column Grid</option>
                <option value="cards">Featured Big Cards</option>
                <option value="list">Vertical Detailed List</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM DOMAIN & DNS INSTRUCTIONS */}
      {activeTab === 'domain' && (
        <div className="space-y-6 max-w-3xl">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Custom domain configuration saved. SSL certificate is active!</span>
            </div>
          )}

          {/* Connected Domain Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Connected Custom Domain</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {customDomain.status.toUpperCase()}
              </span>
            </div>

            <form onSubmit={handleDomainSave} className="flex gap-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g. shop.creator.com or creator.com"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm cursor-pointer"
              >
                Update Domain
              </button>
            </form>

            {/* SSL Status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">SSL Certificate Status</span>
              </div>
              <span className="font-bold text-emerald-600">Active &amp; Auto-Renewing (Let's Encrypt)</span>
            </div>
          </div>

          {/* DNS Configuration Instructions (Exact Prompt Requirement) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              DNS Configuration Instructions
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add the following CNAME record inside your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains):
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Record Type:</span>
                <span className="text-amber-400 font-bold">CNAME</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Host / Name:</span>
                <span className="text-indigo-300 font-bold">shop (or @ for root)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Value:</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">domains.autodm.com</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText('domains.autodm.com');
                      setCopiedDns(true);
                      setTimeout(() => setCopiedDns(false), 2000);
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer text-[10px]"
                  >
                    {copiedDns ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
