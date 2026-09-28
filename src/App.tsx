import React, { useState } from 'react';

// Landing Page & Storefront
import { LandingPage } from './components/LandingPage';
import { StorefrontView } from './components/StorefrontView';
import { CheckoutModal } from './components/CheckoutModal';

// Dashboard Navigation & Frame
import { DashboardSidebar, DashboardNavTab } from './components/DashboardSidebar';
import { TopBar } from './components/TopBar';

// Dashboard Overview Components
import { KPICards } from './components/KPICards';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { AccountCard } from './components/AccountCard';
import { AutomationsTable } from './components/AutomationsTable';
import { RecentActivity } from './components/RecentActivity';
import { TopKeywords } from './components/TopKeywords';
import { QuickActions } from './components/QuickActions';
import { PromoCard } from './components/PromoCard';
import { BottomCTA } from './components/BottomCTA';

// 12 View Panels
import { ProductsView } from './components/views/ProductsView';
import { CategoriesView } from './components/views/CategoriesView';
import { StorefrontBuilderView } from './components/views/StorefrontBuilderView';
import { CustomersView } from './components/views/CustomersView';
import { ConversationsView } from './components/views/ConversationsView';
import { AutomationsView } from './components/views/AutomationsView';
import { OrdersView } from './components/views/OrdersView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AccountsView } from './components/views/AccountsView';
import { ChannelsView } from './components/views/ChannelsView';
import { PaymentsView } from './components/views/PaymentsView';
import { SettingsView } from './components/views/SettingsView';
import { LogsView } from './components/views/LogsView';

// Interactive Modals
import { CreateAutomationModal } from './components/CreateAutomationModal';
import { VisualAutomationBuilderModal } from './components/VisualAutomationBuilderModal';
import { InteractiveTestSimulatorModal } from './components/InteractiveTestSimulatorModal';
import { UpgradePlanModal } from './components/UpgradePlanModal';
import { ManageAccountModal } from './components/ManageAccountModal';

// Mock Data & Seed Entities
import { 
  INITIAL_INSTAGRAM_ACCOUNT,
  INITIAL_SOCIAL_CHANNELS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_STOREFRONT_THEME,
  INITIAL_CUSTOM_DOMAIN,
  INITIAL_AUTOMATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_CONVERSATIONS,
  INITIAL_ORDERS,
  INITIAL_PAYMENT_CONFIGS,
  INITIAL_ACTIVITIES,
  TOP_KEYWORDS,
  PERFORMANCE_DATA,
  DMS_OVERVIEW_7D,
  DMS_OVERVIEW_30D,
  DMS_OVERVIEW_90D,
  RECENT_LOGS
} from './mockData';

import { 
  Product, 
  Category, 
  StorefrontTheme, 
  CustomDomainConfig, 
  Automation, 
  Customer, 
  Conversation, 
  Order, 
  PaymentGatewayConfig, 
  InstagramAccountState,
  SocialChannelAccount,
  CustomerIdentity,
  OrderFulfillmentStatus
} from './types';

import { 
  Sparkles, 
  ArrowRight, 
  Store, 
  LayoutDashboard, 
  CheckCircle2, 
  Instagram, 
  MessageSquare, 
  ShoppingBag, 
  CreditCard,
  Zap,
  TrendingUp,
  Users
} from 'lucide-react';

export default function App() {
  // Navigation & View Modes: 'landing' (first view), 'dashboard' (SaaS CRM), 'storefront' (live public store)
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard' | 'storefront'>('landing');
  const [currentTab, setCurrentTab] = useState<DashboardNavTab>('dashboard');

  // Core Social Commerce CRM State
  const [account, setAccount] = useState<InstagramAccountState>(INITIAL_INSTAGRAM_ACCOUNT);
  const [channels, setChannels] = useState<SocialChannelAccount[]>(INITIAL_SOCIAL_CHANNELS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [theme, setTheme] = useState<StorefrontTheme>(INITIAL_STOREFRONT_THEME);
  const [customDomain, setCustomDomain] = useState<CustomDomainConfig>(INITIAL_CUSTOM_DOMAIN);
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [paymentConfigs, setPaymentConfigs] = useState<PaymentGatewayConfig[]>(INITIAL_PAYMENT_CONFIGS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [logs, setLogs] = useState(RECENT_LOGS);

  // Storefront & Product Page State
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutVariant, setCheckoutVariant] = useState<string | undefined>(undefined);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Global Interactive Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [visualBuilderOpen, setVisualBuilderOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [manageAccountOpen, setManageAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Funnel and Social Commerce KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 24800; // includes past month
  const totalOrdersCount = orders.length + 500;
  const totalStoreVisitors = 8370;
  const conversionRate = ((totalOrdersCount / totalStoreVisitors) * 100).toFixed(1);

  // Handlers for Storefront & Checkout Simulation
  const handleOpenStorefront = (slug?: string) => {
    setActiveProductSlug(slug || null);
    setViewMode('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateCheckout = (product: Product, _quantity: number, variantName?: string) => {
    setCheckoutProduct(product);
    setCheckoutVariant(variantName);
    setCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = (data: {
    customerName: string;
    customerEmail: string;
    instagramUsername: string;
    total: number;
    paymentId: string;
  }) => {
    if (!checkoutProduct) return;

    const newOrderNumber = `#ORD-${8492 + orders.length}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      customerId: `cust-${Date.now()}`,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      channel: 'instagram',
      channelHandle: data.instagramUsername ? `@${data.instagramUsername.replace(/^@/, '')}` : '@shopper',
      instagramUsername: data.instagramUsername,
      items: [
        {
          productId: checkoutProduct.id,
          title: checkoutProduct.title,
          type: checkoutProduct.type,
          price: checkoutProduct.price,
          quantity: 1,
          variantName: checkoutVariant,
          image: checkoutProduct.images[0],
        },
      ],
      subtotal: checkoutProduct.price,
      shipping: 0,
      total: data.total,
      paymentGateway: 'Razorpay',
      paymentId: data.paymentId,
      paymentStatus: 'paid',
      orderStatus: checkoutProduct.type === 'physical' ? 'processing' : 'delivered',
      createdAt: 'Just now',
    };

    // 1. Prepend order
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Add or update customer in CRM
    setCustomers((prev) => {
      const cleanHandle = data.instagramUsername.replace(/^@/, '');
      const existing = prev.find((c) => c.instagramUsername?.replace(/^@/, '') === cleanHandle || c.identities?.some(i => i.handle.replace(/^@/, '') === cleanHandle));
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalSpent: c.totalSpent + data.total,
                ordersCount: c.ordersCount + 1,
                status: 'repeat' as const,
                lastInteraction: 'Just now',
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: data.customerName,
          instagramUsername: data.instagramUsername,
          primaryChannel: 'instagram',
          identities: [
            {
              id: `ident-${Date.now()}`,
              channel: 'instagram',
              handle: `@${cleanHandle}`,
              isPrimary: true,
              verifiedAt: '2026-09-27',
            },
          ],
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          email: data.customerEmail,
          phone: '+91 98000 00000',
          source: 'Instagram',
          interestedProducts: [checkoutProduct.title],
          ordersCount: 1,
          totalSpent: data.total,
          status: 'purchased',
          lastInteraction: 'Just now',
          createdAt: 'Today',
          tags: ['First-Time Buyer', 'Verified Customer'],
        };
        return [newCustomer, ...prev];
      }
    });

    // 3. Add to activity timeline
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'order_placed',
        title: `New Order ${newOrderNumber}`,
        subtitle: `${data.customerName} paid $${data.total} via Razorpay`,
        context: checkoutProduct.title,
        timeAgo: 'Just now',
        userHandle: `@${data.instagramUsername}`,
        amount: data.total,
      },
      ...prev,
    ]);

    // 4. Update Product Analytics
    setProducts((prev) =>
      prev.map((p) =>
        p.id === checkoutProduct.id
          ? {
              ...p,
              ordersCount: p.ordersCount + 1,
              revenue: p.revenue + data.total,
            }
          : p
      )
    );
  };

  // Automations CRUD
  const handleToggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a))
    );
  };

  const handleDeleteAutomation = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveAutomation = (
    data: Omit<Automation, 'id' | 'createdAt' | 'triggerCount' | 'dmsSent' | 'clicks' | 'conversions' | 'conversionRevenue'>
  ) => {
    if (editingAutomation) {
      setAutomations((prev) =>
        prev.map((a) =>
          a.id === editingAutomation.id ? { ...a, ...data } : a
        )
      );
      setEditingAutomation(null);
    } else {
      const newAuto: Automation = {
        ...data,
        id: `auto-${Date.now()}`,
        createdAt: 'Just now',
        triggerCount: 0,
        dmsSent: 0,
        clicks: 0,
        conversions: 0,
        conversionRevenue: 0,
      };
      setAutomations((prev) => [newAuto, ...prev]);
    }
    setCreateModalOpen(false);
  };

  // Products CRUD
  const handleAddProduct = (
    newProdData: Omit<Product, 'id' | 'views' | 'clicks' | 'addToCartCount' | 'ordersCount' | 'revenue'>
  ) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      views: 12,
      clicks: 4,
      addToCartCount: 1,
      ordersCount: 0,
      revenue: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Categories CRUD
  const handleAddCategory = (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Orders Fulfillment Update
  const handleUpdateOrderStatus = (orderId: string, status: OrderFulfillmentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  // Payment Gateway Toggle
  const handleTogglePaymentGateway = (provider: 'Razorpay' | 'Cashfree') => {
    setPaymentConfigs((prev) =>
      prev.map((cfg) =>
        cfg.provider === provider ? { ...cfg, isConnected: !cfg.isConnected } : cfg
      )
    );
  };

  // Custom Domain Update
  const handleUpdateDomain = (domain: string) => {
    setCustomDomain((prev) => ({
      ...prev,
      domain,
      status: 'connected',
      sslStatus: 'active',
    }));
  };

  // Storefront Theme Update
  const handleUpdateTheme = (updatedTheme: Partial<StorefrontTheme>) => {
    setTheme((prev) => ({ ...prev, ...updatedTheme }));
  };

  // Conversations reply message
  const handleSendConversationMessage = (convId: string, text: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === convId) {
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [
              ...conv.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'creator',
                text,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return conv;
      })
    );
  };

  // Cross-Channel Identity Link (Merge into unified profile without duplicate records)
  const handleLinkIdentity = (customerId: string, newIdentity: Omit<CustomerIdentity, 'id'>) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const id = `ident-${Date.now()}`;
          return {
            ...c,
            identities: [...(c.identities || []), { ...newIdentity, id }],
          };
        }
        return c;
      })
    );
  };

  // Channel Connection Toggles
  const handleToggleChannelConnection = (channelId: string) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === channelId
          ? {
              ...ch,
              isConnected: !ch.isConnected,
              status: ch.isConnected ? 'not_connected' : 'active',
            }
          : ch
      )
    );
  };

  const handleUpdateChannelAccount = (channelId: string, updates: Partial<SocialChannelAccount>) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, ...updates } : ch))
    );
  };

  // ==========================================
  // VIEW MODE 1: High-Converting Landing Page
  // ==========================================
  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen bg-white">
        <LandingPage
          onOpenApp={() => setViewMode('dashboard')}
          onOpenDashboard={() => setViewMode('dashboard')}
          onOpenPricing={() => setUpgradeModalOpen(true)}
          onStartForFiveDollars={() => setViewMode('dashboard')}
          onOpenStorefrontPreview={() => handleOpenStorefront()}
        />

        {/* Global floating preview switchbar */}
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900/90 text-white p-2 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700">
          <button
            onClick={() => setViewMode('dashboard')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Open SaaS Dashboard</span>
          </button>
          <button
            onClick={() => handleOpenStorefront()}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-pink-400" />
            <span>Preview Storefront</span>
          </button>
        </div>

        {/* Upgrade Plan Modal */}
        <UpgradePlanModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW MODE 2: Live Public Storefront
  // ==========================================
  if (viewMode === 'storefront') {
    return (
      <div className="relative min-h-screen bg-slate-50">
        {/* Top Sticky Test Bar for Demo Clarity */}
        <div className="bg-slate-900 text-white text-xs px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Public Creator Storefront Preview</span>
            <span className="text-slate-400 hidden sm:inline">
              (Domain: <code className="text-indigo-300 font-mono">{customDomain.domain}</code> or <code className="text-indigo-300 font-mono">autodm.com/@{theme.handle}</code>)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulatorModalOpen(true)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1 text-white"
            >
              <Zap className="w-3 h-3" />
              <span>Test Comment-to-DM</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Back to CRM</span>
            </button>
          </div>
        </div>

        <StorefrontView
          theme={theme}
          products={products}
          activeProductSlug={activeProductSlug}
          onSelectProduct={(p) => setActiveProductSlug(p.slug)}
          onBackToHome={() => setActiveProductSlug(null)}
          onInitiateCheckout={handleInitiateCheckout}
        />

        {/* Direct Creator Checkout Modal (Razorpay / Cashfree) */}
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          product={checkoutProduct}
          selectedVariant={checkoutVariant}
          onPaymentSuccess={handlePaymentSuccess}
        />

        {/* Comment Simulator Modal */}
        <InteractiveTestSimulatorModal
          isOpen={simulatorModalOpen}
          onClose={() => setSimulatorModalOpen(false)}
          automations={automations}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW MODE 3: Full 12-Section SaaS Dashboard
  // ==========================================
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 1. Dark Navy Left Sidebar with all 12 Navigation Items */}
      <DashboardSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'storefront') {
            // tab selected
          }
        }}
        onPreviewStorefront={() => handleOpenStorefront()}
        onBackToLanding={() => setViewMode('landing')}
        ordersCount={orders.length}
        conversationsCount={conversations.length}
        productsCount={products.length}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar with Search & User Dropdown */}
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSimulator={() => setSimulatorModalOpen(true)}
          onOpenCreateAutomation={() => {
            setEditingAutomation(null);
            setCreateModalOpen(true);
          }}
          onBackToLanding={() => setViewMode('landing')}
          onPreviewStorefront={() => handleOpenStorefront()}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto px-6 py-7 lg:px-8 space-y-7">
          
          {/* TAB 1: Main Dashboard Overview */}
          {currentTab === 'dashboard' && (
            <div className="space-y-7">
              {/* Header Greeting */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    Good morning, Ankit! 👋
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Here’s what’s happening with your Instagram automation and social commerce store today.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleOpenStorefront()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                  >
                    <Store className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View Public Storefront</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingAutomation(null);
                      setCreateModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Automation</span>
                  </button>
                </div>
              </div>

              {/* Social Commerce Revenue & Funnel Highlights Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/20">
                      Instagram → Store Funnel
                    </span>
                    <h2 className="text-xl font-bold mt-2">
                      ${totalRevenue.toLocaleString()} Revenue Generated via AutoDM
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Automated keyword triggers route comment traffic directly into your storefront checkout. Zero commission taken by AutoDM.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-xs">
                    <div className="text-center px-3">
                      <span className="text-[11px] text-slate-400 block">Total Orders</span>
                      <span className="text-lg font-bold text-white font-mono">{totalOrdersCount}</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">Store Visitors</span>
                      <span className="text-lg font-bold text-indigo-300 font-mono">{totalStoreVisitors.toLocaleString()}</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">Conv. Rate</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">{conversionRate}%</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">Creator Gateway</span>
                      <span className="text-xs font-semibold text-white mt-1 block">Razorpay Live</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP KPI CARDS */}
              <KPICards
                connectedAccounts={1}
                activeAutomations={automations.filter((a) => a.status === 'active').length}
                pausedAutomations={automations.filter((a) => a.status === 'paused').length}
                totalDMsSent={482}
                commentsProcessed={1342}
              />

              {/* ANALYTICS SECTION (Line Chart + Donut Chart) */}
              <AnalyticsCharts
                dms7d={DMS_OVERVIEW_7D}
                dms30d={DMS_OVERVIEW_30D}
                dms90d={DMS_OVERVIEW_90D}
                performanceData={PERFORMANCE_DATA}
              />

              {/* Main Grid: Automations Table & Side Info */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
                {/* 2-Column Left: Automations Table & Instagram Account */}
                <div className="xl:col-span-2 space-y-7">
                  <AutomationsTable
                    automations={automations}
                    onToggleStatus={handleToggleAutomation}
                    onDelete={handleDeleteAutomation}
                    onEdit={(auto) => {
                      setEditingAutomation(auto);
                      setCreateModalOpen(true);
                    }}
                    onOpenCreate={() => {
                      setEditingAutomation(null);
                      setCreateModalOpen(true);
                    }}
                    searchQuery={searchQuery}
                    selectedKeyword={selectedKeyword}
                    onClearKeyword={() => setSelectedKeyword(null)}
                  />

                  {/* Top Keywords progress bars */}
                  <TopKeywords
                    keywords={TOP_KEYWORDS}
                    selectedKeyword={selectedKeyword}
                    onSelectKeyword={(kw) => setSelectedKeyword(kw === selectedKeyword ? null : kw)}
                  />
                </div>

                {/* 1-Column Right: Account Card, Quick Actions, Promo & Timeline */}
                <div className="space-y-7">
                  <AccountCard
                    account={account}
                    onManageAccount={() => setManageAccountOpen(true)}
                  />

                  <QuickActions
                    onCreateAutomation={() => {
                      setEditingAutomation(null);
                      setVisualBuilderOpen(true);
                    }}
                    onAddProduct={() => setCurrentTab('products')}
                    onConnectInstagram={() => setCurrentTab('channels')}
                    onCustomizeStorefront={() => setCurrentTab('storefront')}
                    onConnectPaymentGateway={() => setCurrentTab('payments')}
                  />

                  <PromoCard onUpgrade={() => setUpgradeModalOpen(true)} />

                  <RecentActivity
                    activities={activities}
                    onOpenSimulator={() => setSimulatorModalOpen(true)}
                  />
                </div>
              </div>

              {/* Bottom CTA Banner */}
              <BottomCTA
                onCreateAutomation={() => {
                  setEditingAutomation(null);
                  setCreateModalOpen(true);
                }}
              />
            </div>
          )}

          {/* TAB 2: Products Management */}
          {currentTab === 'products' && (
            <ProductsView
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onPreviewProduct={(slug) => handleOpenStorefront(slug)}
            />
          )}

          {/* TAB 3: Categories Management */}
          {currentTab === 'categories' && (
            <CategoriesView
              categories={categories}
              products={products}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {/* TAB 4: Storefront Builder & Custom Domain */}
          {currentTab === 'storefront' && (
            <StorefrontBuilderView
              theme={theme}
              customDomain={customDomain}
              onUpdateTheme={handleUpdateTheme}
              onUpdateDomain={handleUpdateDomain}
              onPreviewPublicStorefront={() => handleOpenStorefront()}
            />
          )}

          {/* TAB 5: Social Commerce CRM Customers */}
          {currentTab === 'customers' && (
            <CustomersView
              customers={customers}
              onSelectCustomerConversation={(_custId) => setCurrentTab('conversations')}
              onLinkIdentity={handleLinkIdentity}
            />
          )}

          {/* TAB 6: Instagram DM Conversations */}
          {currentTab === 'conversations' && (
            <ConversationsView
              conversations={conversations}
              customers={customers}
              products={products}
              onSendMessage={handleSendConversationMessage}
              onPreviewProduct={(slug) => handleOpenStorefront(slug)}
            />
          )}

          {/* TAB 7: Comment-to-DM Automations */}
          {currentTab === 'automations' && (
            <AutomationsView
              automations={automations}
              products={products}
              onToggleStatus={handleToggleAutomation}
              onDeleteAutomation={handleDeleteAutomation}
              onOpenCreateModal={() => {
                setEditingAutomation(null);
                setCreateModalOpen(true);
              }}
              onOpenVisualBuilder={() => {
                setEditingAutomation(null);
                setVisualBuilderOpen(true);
              }}
              onOpenSimulator={() => setSimulatorModalOpen(true)}
            />
          )}

          {/* TAB 8: Orders & Fulfillment */}
          {currentTab === 'orders' && (
            <OrdersView
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}

          {/* TAB 9: Analytics & Performance */}
          {currentTab === 'analytics' && (
            <AnalyticsView
              performanceData={PERFORMANCE_DATA}
              dailyData={DMS_OVERVIEW_7D}
            />
          )}

          {/* TAB 10: Multi-Channel Connections (Instagram, TikTok, WhatsApp, Telegram) */}
          {(currentTab === 'channels' || currentTab === 'instagram') && (
            <ChannelsView
              channels={channels}
              onToggleChannelConnection={handleToggleChannelConnection}
              onUpdateChannelAccount={handleUpdateChannelAccount}
              onOpenSimulator={() => setSimulatorModalOpen(true)}
            />
          )}

          {/* TAB 11: Payment Gateway Connections (Razorpay / Cashfree) */}
          {currentTab === 'payments' && (
            <PaymentsView
              configs={paymentConfigs}
              onToggleConnection={handleTogglePaymentGateway}
            />
          )}

          {/* TAB 12: Settings & $5/Month Plan */}
          {currentTab === 'settings' && (
            <div className="space-y-8">
              <SettingsView />
              <div className="pt-6 border-t border-slate-200">
                <LogsView logs={logs} onRefresh={() => setLogs([...logs])} />
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Global Interactive Modals */}
      <CreateAutomationModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingAutomation(null);
        }}
        onSave={handleSaveAutomation as any}
        editingAutomation={editingAutomation as any}
      />

      <VisualAutomationBuilderModal
        isOpen={visualBuilderOpen}
        onClose={() => {
          setVisualBuilderOpen(false);
          setEditingAutomation(null);
        }}
        products={products}
        onSaveAutomation={handleSaveAutomation as any}
        editingAutomation={editingAutomation}
      />

      <InteractiveTestSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        automations={automations}
      />

      <UpgradePlanModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />

      <ManageAccountModal
        isOpen={manageAccountOpen}
        onClose={() => setManageAccountOpen(false)}
        account={account}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        product={checkoutProduct}
        selectedVariant={checkoutVariant}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
