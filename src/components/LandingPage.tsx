import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Zap, 
  Shield, 
  CreditCard, 
  Store, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Globe, 
  Lock, 
  Share2, 
  ChevronDown, 
  ChevronRight, 
  Tag, 
  MessageSquare, 
  Clock, 
  Copy, 
  QrCode,
  Heart,
  Send,
  ExternalLink,
  MessageCircle,
  X,
  Phone,
  Bot,
  Layers,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

interface LandingPageProps {
  onStartForFiveDollars?: () => void;
  onOpenStorefrontPreview?: () => void;
  onOpenDashboard?: () => void;
  onOpenApp?: () => void;
  onOpenPricing?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = (props) => {
  const onOpenDashboard = props.onOpenDashboard || props.onOpenApp || (() => {});
  const onStartForFiveDollars = props.onStartForFiveDollars || props.onOpenPricing || props.onOpenApp || (() => {});
  const onOpenStorefrontPreview = props.onOpenStorefrontPreview || (() => {});
  
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [domainInput, setDomainInput] = useState('shop.yourname.com');
  const [domainConnected, setDomainConnected] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '/@ankit_creates');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#6355F6] selection:text-white antialiased">
      
      {/* ============================================================== */}
      {/* 1. NAVBAR                                                      */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* AutoDM Logo Icon */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6355F6] via-[#7C6EF6] to-[#A78BFA] p-[1.5px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-[#6355F6] rounded-[10px] flex items-center justify-center text-white">
                <Send className="w-4 h-4 fill-white stroke-none -rotate-12 translate-x-[-1px] translate-y-[-1px]" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-950 tracking-tight">AutoDM</span>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-slate-600">
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-[#6355F6] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-[#6355F6] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('templates')} 
              className="hover:text-[#6355F6] transition-colors cursor-pointer"
            >
              Templates
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="hover:text-[#6355F6] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('analytics')} 
                className="hover:text-[#6355F6] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6355F6]" />
              </button>
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenDashboard}
              className="text-[14px] font-medium text-slate-700 hover:text-[#6355F6] px-2 py-1.5 cursor-pointer transition-colors"
            >
              Login
            </button>
            <button
              onClick={onStartForFiveDollars}
              className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-white bg-[#6355F6] hover:bg-[#5244ED] active:scale-98 transition-all shadow-sm shadow-[#6355F6]/25 cursor-pointer flex items-center gap-1.5"
            >
              <span>Start for $5/month</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
        {/* Soft background ambient glow */}
        <div className="absolute top-12 right-12 w-[600px] h-[500px] bg-gradient-to-tr from-indigo-100/40 via-purple-100/30 to-pink-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Hero Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-[#6355F6] border border-indigo-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6355F6] animate-pulse" />
                <span>Social Commerce CRM for Creators</span>
              </div>

              {/* Huge Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-950 tracking-tight leading-[1.12]">
                Turn Your Social Media <br className="hidden sm:inline" />
                Into a <span className="text-[#6355F6]">Storefront + CRM</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                Turn comments and conversations into customers, orders, and repeat sales — across Instagram, TikTok, WhatsApp and Telegram.
              </p>

              {/* Button Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onStartForFiveDollars}
                  className="px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#6355F6] hover:bg-[#5244ED] active:scale-98 transition-all shadow-md shadow-[#6355F6]/30 cursor-pointer flex items-center gap-2"
                >
                  <span>Start for $5/month</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-5 py-3.5 rounded-full text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <Play className="w-2.5 h-2.5 fill-slate-700 translate-x-[0.5px]" />
                  </div>
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span>No transaction commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span>Your payment gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-slate-500" />
                  <span>Setup minutes</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visuals (5 Cols): Flow Diagram & Floating Smartphone */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Hero Diagram + Mobile Mockup Layout */}
              <div className="w-full flex items-center justify-between gap-4">
                
                {/* 1. System Pipeline Node Flow */}
                <div className="flex-1 flex flex-col items-center max-w-[220px]">
                  
                  {/* Top 4 Social Icons Row */}
                  <div className="flex items-center justify-between w-full px-2 gap-2 mb-3">
                    {/* Instagram */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px] shadow-xs flex items-center justify-center">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 rounded-md border-[1.5px] border-pink-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium mt-1">Instagram</span>
                    </div>

                    {/* TikTok */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black shadow-xs flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">TT</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium mt-1">TikTok</span>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#25D366] shadow-xs flex items-center justify-center text-white">
                        <Phone className="w-4 h-4 fill-white" />
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium mt-1">WhatsApp</span>
                    </div>

                    {/* Telegram */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#229ED9] shadow-xs flex items-center justify-center text-white">
                        <Send className="w-4 h-4 fill-white -rotate-12 translate-x-[-1px]" />
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium mt-1">Telegram</span>
                    </div>
                  </div>

                  {/* Converging connector lines SVG */}
                  <svg className="w-40 h-8 text-indigo-200 stroke-current fill-none" viewBox="0 0 160 32">
                    <path d="M 20 0 Q 20 20 80 30" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 60 0 Q 60 16 80 30" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 100 0 Q 100 16 80 30" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 140 0 Q 140 20 80 30" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>

                  {/* Central AutoDM Engine Box */}
                  <div className="my-2 px-4 py-2 bg-white rounded-xl border border-indigo-100 shadow-md flex items-center gap-2 z-10">
                    <div className="w-6 h-6 rounded-lg bg-[#6355F6] flex items-center justify-center text-white">
                      <Send className="w-3 h-3 fill-white -rotate-12" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 tracking-tight">AutoDM</span>
                  </div>

                  {/* Downward connecting line */}
                  <div className="w-px h-6 border-l-2 border-dashed border-indigo-200 my-1" />

                  {/* 3 Outcome Nodes (Storefront, Orders, CRM) */}
                  <div className="flex items-center justify-center gap-2 w-full">
                    {/* Storefront */}
                    <div className="flex flex-col items-center p-2 rounded-xl bg-pink-50/70 border border-pink-100 shadow-2xs">
                      <Store className="w-4 h-4 text-pink-600" />
                      <span className="text-[9px] font-semibold text-slate-700 mt-1">Storefront</span>
                    </div>

                    {/* Orders */}
                    <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/70 border border-blue-100 shadow-2xs">
                      <ShoppingBag className="w-4 h-4 text-blue-600" />
                      <span className="text-[9px] font-semibold text-slate-700 mt-1">Orders</span>
                    </div>

                    {/* CRM */}
                    <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 shadow-2xs">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="text-[9px] font-semibold text-slate-700 mt-1">CRM</span>
                    </div>
                  </div>
                </div>

                {/* 2. Floating iPhone Smartphone Mockup */}
                <div className="relative w-[210px] sm:w-[220px] rounded-[36px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-800 shrink-0">
                  {/* Speaker & camera notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="bg-white rounded-[28px] overflow-hidden pt-5 pb-3 px-3 flex flex-col justify-between h-[360px] text-slate-900">
                    
                    {/* Product Photo Banner */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                        alt="Summer Vibes Set" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                        <Heart className="w-3 h-3 fill-white" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-2 text-left">
                      <h4 className="font-bold text-xs text-slate-900 tracking-tight">Summer Vibes Set</h4>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">$49.99</p>
                    </div>

                    {/* Buy Now Button */}
                    <button 
                      onClick={onOpenStorefrontPreview}
                      className="w-full py-2 rounded-xl bg-[#6355F6] hover:bg-[#5244ED] text-white text-[11px] font-bold shadow-xs cursor-pointer text-center"
                    >
                      Buy Now
                    </button>

                    {/* Bottom App Navigation */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-slate-400">
                      <Store className="w-3.5 h-3.5 text-[#6355F6]" />
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <Heart className="w-3.5 h-3.5" />
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MULTI-CHANNEL SUPPORT (Engage, Automate, Sell — Everywhere) */}
      {/* ============================================================== */}
      <section id="features" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-[#6355F6] border border-indigo-100 mb-3">
            MULTI-CHANNEL SUPPORT
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Engage, Automate, Sell — Everywhere
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 mb-12">
            Connect your social accounts and turn every interaction into an opportunity.
          </p>

          {/* 4 Supported Channel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Card 1: Instagram */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1.5px] flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-xs border border-pink-600 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-pink-600" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Instagram</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Post &amp; Reel</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Comments</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> DM Automation</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Story</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Webhooks</li>
                </ul>
              </div>

              {/* Graphic Preview */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src="/src/assets/images/avatar_sarah_1790499318738.jpg" 
                    alt="Creator" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="text-[10px]">
                    <span className="font-bold text-slate-800 block">@sarah_style</span>
                    <span className="text-slate-400">New collection reel</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-slate-200/60 shadow-2xs space-y-1.5">
                  <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                    Comment: BUY
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Auto DM sent ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: TikTok */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white text-[10px] font-bold">
                    TT
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">TikTok</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Video Comments</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> DM (where available)</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Keyword Triggers</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Shop Integration</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Analytics</li>
                </ul>
              </div>

              {/* Graphic Preview */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src="/src/assets/images/avatar_ankit_1790498690280.jpg" 
                    alt="TikTok Creator" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="text-[10px]">
                    <span className="font-bold text-slate-800 block">@ankit_tech</span>
                    <span className="text-slate-400">Viral desk setup</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-slate-200/60 shadow-2xs space-y-1.5">
                  <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
                    Comment: PRICE
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Auto DM sent ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: WhatsApp */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center text-white">
                    <Phone className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">WhatsApp</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Business Account</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Incoming Messages</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Automated Replies</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Templates</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Product Links</li>
                </ul>
              </div>

              {/* Graphic Preview */}
              <div className="bg-[#E7F6ED] rounded-xl p-3 border border-emerald-200/60 relative overflow-hidden">
                <div className="bg-white rounded-lg p-2.5 border border-emerald-100 shadow-2xs space-y-2">
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Hi! Here's your product link:
                  </p>
                  <button 
                    onClick={onOpenStorefrontPreview}
                    className="w-full py-1.5 rounded-md bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-[10px] text-center block transition-colors cursor-pointer"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Telegram */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#229ED9] flex items-center justify-center text-white">
                    <Send className="w-3.5 h-3.5 fill-white -rotate-12 translate-x-[-1px]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Telegram</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Bot Integration</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Commands</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Incoming Messages</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Automated Replies</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Product Links</li>
                </ul>
              </div>

              {/* Graphic Preview */}
              <div className="bg-[#EBF7FD] rounded-xl p-3 border border-sky-200/60 relative overflow-hidden">
                <div className="bg-white rounded-lg p-2.5 border border-sky-100 shadow-2xs space-y-2">
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Here is your product link:
                  </p>
                  <button 
                    onClick={onOpenStorefrontPreview}
                    className="w-full py-1.5 rounded-md bg-[#229ED9] hover:bg-sky-600 text-white font-bold text-[10px] text-center block transition-colors cursor-pointer"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SIMPLE 5-STEP FLOW (From Social Media to Sales)              */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-[#6355F6] border border-indigo-100 mb-3">
            SIMPLE 5-STEP FLOW
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            From Social Media to Sales
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 mb-14">
            It's simple. Connect your channels, set up automations, create your store, and start selling — all in one place.
          </p>

          {/* 5-Step Horizontal Flow Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left relative">
            
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center p-2 shadow-2xs">
                  <div className="grid grid-cols-2 gap-1 w-full h-full items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  </div>
                </div>
                <span className="hidden md:inline text-slate-300 text-lg font-light">→</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">1. Social Media</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  People interact with your content, comments, or messages on any channel.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <span className="hidden md:inline text-slate-300 text-lg font-light">→</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">2. Automation</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  AutoDM detects keywords, triggers and sends automated DMs with product links.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-xs">
                  <Store className="w-5 h-5" />
                </div>
                <span className="hidden md:inline text-slate-300 text-lg font-light">→</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">3. Storefront</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Customers visit your beautiful storefront and explore your products and services.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="hidden md:inline text-slate-300 text-lg font-light">→</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">4. Checkout</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  They complete their purchase through your own payment gateway (Razorpay/Cashfree).
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">5. CRM</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Orders, customers and conversations are tracked in your CRM for repeat sales.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DARK SECTION: STOREFRONT TEMPLATES BUILT FOR CREATORS       */}
      {/* ============================================================== */}
      <section id="templates" className="py-16 lg:py-24 bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-4">
            CREATE, CUSTOMIZE, LAUNCH
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content & 6 Templates Grid (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Stunning Storefront Templates <br />
                  Built for Creators
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-xl">
                  Choose from professional templates and customize them with your brand, colors and style. No coding. No hassle.
                </p>
              </div>

              {/* 6 Templates 3x2 Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                
                {/* 1. Creator */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80" 
                      alt="Creator Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-indigo-300 font-semibold">@creator</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Creator</p>
                </div>

                {/* 2. Modern Store */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80" 
                      alt="Modern Store Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-pink-300 font-semibold">Storefront</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Modern Store</p>
                </div>

                {/* 3. Fashion */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80" 
                      alt="Fashion Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-emerald-300 font-semibold">Apparel</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Fashion</p>
                </div>

                {/* 4. Personal Brand */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" 
                      alt="Personal Brand Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-teal-300 font-semibold">Brand</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Personal Brand</p>
                </div>

                {/* 5. Coach / Consultant */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=80" 
                      alt="Coach Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-amber-300 font-semibold">1-on-1 Sessions</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Coach / Consultant</p>
                </div>

                {/* 6. Digital Products */}
                <div 
                  onClick={onOpenStorefrontPreview}
                  className="group bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer shadow-sm"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80" 
                      alt="Digital Products Template" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-purple-300 font-semibold">Downloads</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-2">Digital Products</p>
                </div>

              </div>
            </div>

            {/* Right Stacked White Cards (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 1: Full Customization */}
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl border border-white/10">
                <h3 className="font-bold text-base text-slate-900 mb-4">Full Customization</h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Logo &amp; Profile Image</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Cover Image</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Colors &amp; Fonts</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Light / Dark Mode</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Button Style</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Product Layout</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Featured Products</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Social Links</li>
                </ul>
              </div>

              {/* Card 2: Your Store, Your Domain */}
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl border border-white/10">
                <h3 className="font-bold text-base text-slate-900">Your Store, Your Domain</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Connect your custom domain and build your own brand.
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#6355F6]"
                  />
                  <button
                    onClick={() => setDomainConnected(true)}
                    className="px-3.5 py-2 rounded-lg bg-[#6355F6] hover:bg-[#5244ED] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Connect Domain
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 font-mono mt-3">
                  DNS: CNAME | Name: shop | Value: domains.autodm.com
                </p>

                {domainConnected && (
                  <div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SSL Secured</span>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FLEXIBLE PRODUCT TYPES (Sell Physical, Digital & Services)   */}
      {/* ============================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-14">
            {/* Top Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-[#6355F6] border border-indigo-100 mb-3">
              FLEXIBLE PRODUCT TYPES
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Sell Physical, Digital &amp; Services
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2">
              Create the right product type for your business and give your customers a seamless buying experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 3 Product Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* 1. Physical Products */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80" 
                      alt="Physical Product" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Physical Products</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 mt-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Images, variants, stock</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> SKU &amp; weight</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Shipping information</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenDashboard}
                  className="w-full py-2 rounded-xl bg-[#6355F6] hover:bg-[#5244ED] text-white text-xs font-semibold text-center cursor-pointer shadow-xs"
                >
                  Create Product
                </button>
              </div>

              {/* 2. Digital Products */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80" 
                      alt="Digital Products" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Digital Products</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 mt-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Download files</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Instant delivery</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Access settings</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenDashboard}
                  className="w-full py-2 rounded-xl bg-[#6355F6] hover:bg-[#5244ED] text-white text-xs font-semibold text-center cursor-pointer shadow-xs"
                >
                  Create Product
                </button>
              </div>

              {/* 3. Services */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" 
                      alt="Services" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Services</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 mt-2 mb-4">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Duration &amp; pricing</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Booking / contact</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#6355F6] stroke-[3]" /> Calendar integration</li>
                  </ul>
                </div>
                <button
                  onClick={onOpenDashboard}
                  className="w-full py-2 rounded-xl bg-[#6355F6] hover:bg-[#5244ED] text-white text-xs font-semibold text-center cursor-pointer shadow-xs"
                >
                  Create Service
                </button>
              </div>

            </div>

            {/* Right Product Mockup & Share Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-4">
              
              {/* Phone Mockup with Air Max Sneakers */}
              <div className="w-[210px] rounded-[34px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-800 shrink-0">
                <div className="bg-white rounded-[26px] overflow-hidden p-3 flex flex-col justify-between h-[390px] text-slate-900">
                  
                  {/* Phone Header */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>11:41</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80" 
                      alt="Air Max Sneakers" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900">Air Max Sneakers</h4>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-extrabold text-xs text-slate-900">$89.99</span>
                      <span className="text-[10px] text-slate-400 line-through">$129.99</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">In Stock</span>

                    {/* Sizes */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[9px] text-slate-400 mr-1">Size</span>
                      {['8', '9', '10', '11'].map((sz, idx) => (
                        <span key={sz} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${idx === 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buy Now & Add to Cart Buttons */}
                  <div className="mt-2 space-y-1">
                    <button 
                      onClick={onOpenStorefrontPreview}
                      className="w-full py-1.5 rounded-lg bg-[#6355F6] text-white text-[10px] font-bold text-center cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Related Products Thumbnails */}
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="text-[9px] font-bold text-slate-500 block mb-1">Related Products</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-md bg-slate-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80" alt="Watch" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-md bg-slate-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop&q=80" alt="Smartwatch" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Share Product Card */}
              <div className="w-[190px] bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-left">
                <h4 className="font-bold text-xs text-slate-900 mb-3">Share Product</h4>
                <ul className="space-y-2 text-[11px] text-slate-600 mb-4">
                  <li onClick={handleCopyLink} className="flex items-center gap-2 cursor-pointer hover:text-[#6355F6]">
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-pink-600">
                    <div className="w-3.5 h-3.5 rounded-xs bg-pink-500 flex items-center justify-center text-[8px] text-white font-bold">IG</div>
                    <span>Share to Instagram</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    <span>Share to WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-black">
                    <div className="w-3.5 h-3.5 rounded-xs bg-black flex items-center justify-center text-[8px] text-white font-bold">TT</div>
                    <span>Share to TikTok</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-sky-600">
                    <Send className="w-3.5 h-3.5 text-sky-500 fill-sky-500 -rotate-12" />
                    <span>Share to Telegram</span>
                  </li>
                </ul>

                {/* QR Code */}
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DARK SECTION: SET UP SMART AUTOMATIONS IN MINUTES           */}
      {/* ============================================================== */}
      <section className="py-16 lg:py-24 bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 4 Cols: Copy & CTA */}
            <div className="lg:col-span-4 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                POWERFUL AUTOMATION BUILDER
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Set Up Smart Automations <br />
                in Minutes
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                Trigger actions based on comments, messages, keywords, or customer behavior — and let AutoDM do the rest.
              </p>

              <button
                onClick={onOpenDashboard}
                className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#6355F6] hover:bg-[#5244ED] active:scale-98 transition-all shadow-md shadow-[#6355F6]/30 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Create Automation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right 8 Cols: Automation Pipeline & Trigger Examples */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Card 1: Example: Instagram Automation */}
              <div className="bg-[#111625] rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
                <span className="text-xs font-bold text-slate-300 block mb-4">
                  Example: Instagram Automation
                </span>

                <div className="space-y-3 relative">
                  
                  {/* Step 1 */}
                  <div className="bg-white rounded-xl p-3 text-slate-900 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
                      <div className="w-3.5 h-3.5 rounded-xs border border-pink-600 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-pink-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">Instagram Comment Trigger</p>
                      <p className="text-[10px] text-slate-500">Keyword: BUY</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-xl p-3 text-slate-900 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">Send DM</p>
                      <p className="text-[10px] text-slate-500">"Here is the product..."</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-xl p-3 text-slate-900 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">Send Product Link</p>
                      <p className="text-[10px] text-slate-500 font-mono">{"{{product_link}}"}</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-xl p-3 text-slate-900 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">Add Tag</p>
                      <p className="text-[10px] text-slate-500">"Interested"</p>
                    </div>
                  </div>

                  {/* Glowing Node Line Decoration */}
                  <div className="absolute right-[-10px] top-6 bottom-6 flex flex-col justify-around text-slate-600 text-[10px] pointer-events-none">
                    <span className="text-indigo-400 font-mono text-[9px] bg-slate-900 px-1.5 py-0.5 rounded border border-indigo-900/50">+ Condition</span>
                    <span className="text-pink-400 font-mono text-[9px] bg-slate-900 px-1.5 py-0.5 rounded border border-pink-900/50">+ Action</span>
                    <span className="text-emerald-400 font-mono text-[9px] bg-slate-900 px-1.5 py-0.5 rounded border border-emerald-900/50">+ Wait</span>
                  </div>

                </div>
              </div>

              {/* Card 2: Automation Trigger Examples */}
              <div className="bg-[#111625] rounded-2xl p-5 border border-slate-800 shadow-xl">
                <span className="text-xs font-bold text-slate-300 block mb-4">
                  Automation Trigger Examples
                </span>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <MessageCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>New Comment / Message</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Keyword Match</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>New Customer</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Existing Customer</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                    <span>Order Status</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Product Interest</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Time Based (Wait)</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. POWERFUL ANALYTICS & INSIGHTS                               */}
      {/* ============================================================== */}
      <section id="analytics" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-[#6355F6] border border-indigo-100 mb-3">
            TRACK, IMPROVE, GROW
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Powerful Analytics &amp; Insights
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 mb-12">
            Understand what's working, optimize your strategy, and grow your revenue with real-time data.
          </p>

          {/* 3 Analytics Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1: Revenue by Channel */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Revenue by Channel</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Overview</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-500" /> Instagram</span>
                    <span className="font-bold text-slate-900">$2,845</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[35%] h-full bg-pink-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500" /> TikTok</span>
                    <span className="font-bold text-slate-900">$1,760</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[22%] h-full bg-cyan-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp</span>
                    <span className="font-bold text-slate-900">$1,420</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[18%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Telegram</span>
                    <span className="font-bold text-slate-900">$1,210</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[15%] h-full bg-sky-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> Direct / Other</span>
                    <span className="font-bold text-slate-900">$820</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[10%] h-full bg-slate-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Social Commerce Funnel */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Social Commerce Funnel</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { num: '1', label: 'Social Interaction', rate: '71%' },
                  { num: '2', label: 'Message', rate: '73%' },
                  { num: '3', label: 'Product Link', rate: '77%' },
                  { num: '4', label: 'Store Visit', rate: '67%' },
                  { num: '5', label: 'Product View', rate: '65%' },
                  { num: '6', label: 'Checkout', rate: '40%' },
                  { num: '7', label: 'Purchase', rate: '79%' },
                ].map((item) => (
                  <div key={item.num} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold text-[9px] flex items-center justify-center">
                        {item.num}
                      </span>
                      <span className="text-slate-700 font-medium text-[11px]">{item.label}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] font-mono">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Top Products */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Top Products</h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
                    name: 'Wireless Headphones',
                    price: '$1,499',
                    orders: '142 orders',
                  },
                  {
                    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80',
                    name: 'Fitness Program',
                    price: '$99',
                    orders: '98 orders',
                  },
                  {
                    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&auto=format&fit=crop&q=80',
                    name: 'Makeup Kit',
                    price: '$1,299',
                    orders: '76 orders',
                  },
                  {
                    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
                    name: 'Digital Course',
                    price: '$699',
                    orders: '54 orders',
                  },
                ].map((prod) => (
                  <div key={prod.name} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <img src={prod.img} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{prod.name}</h4>
                        <span className="text-[11px] font-bold text-slate-700">{prod.price}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">{prod.orders}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. DARK SECTION: SIMPLE PRICING ($5/MONTH)                     */}
      {/* ============================================================== */}
      <section id="pricing" className="py-16 lg:py-24 bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 4 Cols: Copy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                SIMPLE PRICING
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Everything You Need. <br />
                Just $5/Month.
              </h2>

              <p className="text-sm text-slate-400">
                No hidden fees. No transaction commission.
              </p>
            </div>

            {/* Right 7 Cols: The Pricing Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-7 text-slate-900 shadow-2xl border border-white/10">
                <div className="flex items-baseline justify-between mb-6 pb-5 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">AutoDM Pro</h3>
                    <p className="text-xs text-slate-500 mt-0.5">All features included for creators</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900">$5</span>
                    <span className="text-xs font-semibold text-slate-500"> /month</span>
                  </div>
                </div>

                {/* 2-Column Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-700">
                  
                  {/* Left Column */}
                  <div className="space-y-3">
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Instagram, TikTok, WhatsApp, Telegram</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Multi-channel automation</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Creator storefront</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> 100 products / 10 categories</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Unlimited DMs / interactions</li>

                    <div className="pt-3">
                      <button
                        onClick={onStartForFiveDollars}
                        className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#6355F6] hover:bg-[#5244ED] active:scale-98 transition-all shadow-md shadow-[#6355F6]/30 cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>Start for $5/month</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Physical, digital &amp; services</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Orders, customer CRM, analytics</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Payment gateway integration</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> Creator's own payment account</li>
                    <li className="flex items-center gap-2 list-none"><Check className="w-4 h-4 text-[#6355F6] stroke-[3]" /> No AutoDM transaction commission</li>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. PRE-FOOTER CTA BANNER                                      */}
      {/* ============================================================== */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Brand & Socials */}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-[#6355F6] flex items-center justify-center text-white">
                  <Send className="w-4 h-4 fill-white -rotate-12" />
                </div>
                <span className="font-bold text-slate-900 text-lg">AutoDM</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Your social media. Your store. Your CRM.</p>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">IG</div>
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">TT</div>
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px] font-bold">
                  <Phone className="w-3 h-3 fill-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#229ED9] text-white flex items-center justify-center text-[9px] font-bold">
                  <Send className="w-3 h-3 fill-white -rotate-12" />
                </div>
              </div>
            </div>

            {/* Right Copy & CTA Button */}
            <div className="text-center md:text-right space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Join thousands of creators already selling on social media with AutoDM.
              </p>
              <button
                onClick={onStartForFiveDollars}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#6355F6] hover:bg-[#5244ED] active:scale-98 transition-all shadow-md shadow-[#6355F6]/30 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Start for $5/month</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FOOTER                                                     */}
      {/* ============================================================== */}
      <footer className="bg-[#0B0F19] text-slate-400 text-xs py-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <div className="w-6 h-6 rounded-lg bg-[#6355F6] flex items-center justify-center text-white">
              <Send className="w-3 h-3 fill-white -rotate-12" />
            </div>
            <span>AutoDM</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => scrollToSection('templates')} className="hover:text-white transition-colors cursor-pointer">Templates</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Help</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
          </div>

          {/* Right Socials & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="hover:text-white cursor-pointer"><div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[7px]">IG</div></span>
              <span className="hover:text-white cursor-pointer"><div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[7px]">TT</div></span>
              <span className="hover:text-white cursor-pointer"><Phone className="w-3.5 h-3.5" /></span>
              <span className="hover:text-white cursor-pointer"><Send className="w-3.5 h-3.5 -rotate-12" /></span>
            </div>
            <p className="text-[11px] text-slate-500">© 2026 AutoDM. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ============================================================== */}
      {/* 12. DEMO / SEE HOW IT WORKS MODAL                              */}
      {/* ============================================================== */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6355F6]">
                  Interactive Demo
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  How AutoDM Comment-to-Sale Works
                </h3>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6355F6] text-white font-bold flex items-center justify-center text-xs">1</span>
                  <p>A customer comments <strong>"BUY"</strong> on your Instagram or TikTok post.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6355F6] text-white font-bold flex items-center justify-center text-xs">2</span>
                  <p>AutoDM detects the keyword instantly and dispatches a private DM with the product link.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6355F6] text-white font-bold flex items-center justify-center text-xs">3</span>
                  <p>Customer taps link → lands on your branded storefront → checks out through Razorpay or Cashfree.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6355F6] text-white font-bold flex items-center justify-center text-xs">4</span>
                  <p>AutoDM records order, logs customer into your CRM, and attributes revenue without taking any fees.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  onOpenStorefrontPreview();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl"
              >
                Preview Live Store
              </button>
              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  onOpenDashboard();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#6355F6] hover:bg-[#5244ED] rounded-xl shadow-xs"
              >
                Open Creator Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
