import React, { useState, useEffect } from 'react';

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

// View Panels
import { ConversationsView } from './components/views/ConversationsView';
import { AutomationsView } from './components/views/AutomationsView';
import { LogsView } from './components/views/LogsView';
import { PostsView } from './components/views/PostsView';
import { MetaWebhookSetupView } from './components/views/MetaWebhookSetupView';
import { SimulatorView } from './components/views/SimulatorView';

// Interactive Modals
import { CreateAutomationModal } from './components/CreateAutomationModal';
import { InteractiveTestSimulatorModal } from './components/InteractiveTestSimulatorModal';
import { AuthModal } from './components/auth/AuthModal';
import { ConnectInstagramModal } from './components/account/ConnectInstagramModal';

// Auth Context
import { AuthPlatformProvider, useAuthPlatform } from './context/AuthPlatformContext';

// Seed & Mock Entities
import { 
  INITIAL_CONVERSATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_PRODUCTS,
  INITIAL_ACTIVITIES,
  TOP_KEYWORDS,
  PERFORMANCE_DATA,
  DMS_OVERVIEW_7D,
  DMS_OVERVIEW_30D,
  DMS_OVERVIEW_90D,
  RECENT_LOGS,
} from './mockData';

import { 
  Automation, 
  InstagramAccount as InstagramAccountState 
} from './types';

import { 
  Sparkles, 
  Zap, 
  Play,
  Plus,
  Instagram,
  UserCheck
} from 'lucide-react';

function PlatformDashboard() {
  const { 
    currentUser, 
    activeAccount, 
    connectedAccounts,
    automations, 
    addAutomation, 
    updateAutomation, 
    deleteAutomation, 
    toggleAutomation 
  } = useAuthPlatform();

  const [currentTab, setCurrentTab] = useState<DashboardNavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);
  
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [logs, setLogs] = useState(RECENT_LOGS);

  const currentHandle = activeAccount?.handle || 'mridaliniofficial';
  const currentDisplayName = activeAccount?.displayName || 'Mridalini Official';
  const currentAvatar = activeAccount?.avatarUrl || 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-19/751206463_18202213531329609_2979703026788183658_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MzUuQzMifQ%3D%3D&_nc_ohc=1iTBTT2cCVMQ7kNvwF2GBlT&_nc_oc=AdoNJAaf0Ao4ugVFxjnt0MwcI4UiIPEaPG1PZ7fkgxHjzS8Ma6oc8KiIbobcvuh4wkdBaCgKPiMXIQm2M93SsLEw&_nc_zt=24&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=AP4hL3IEAAAA&_nc_gid=0Br3A1PkPi7XinQBlGh4Rw&_nc_tpa=Q5bMBQL301xkdOFzDJBWu6rVnbLrwU5FDXiWxA-trQLwHbFQPQEN_fZ7qJJPKUc5g4PuDYwvslHa13diJQ&oh=00_AQOgQpz4HaICA4Mnz6sA_g49vWDvv4DfICD8KsMejrenPg&oe=6AC14CCB';

  const accountState: InstagramAccountState = {
    handle: currentHandle,
    name: currentDisplayName,
    businessName: currentDisplayName,
    category: activeAccount?.category || 'Creator & Retail',
    accountType: 'Business',
    avatarUrl: currentAvatar,
    postsCount: 5,
    followers: 12400,
    isConnected: true,
    apiHealth: '100% Operational (Graph API v21.0)',
    webhookActive: true,
    lastSyncedAt: 'Live',
  };

  const handleToggleAutomation = (id: string) => {
    toggleAutomation(id);
  };

  const handleDeleteAutomation = (id: string) => {
    deleteAutomation(id);
  };

  const handleSaveAutomation = (
    data: Omit<Automation, 'id' | 'createdAt' | 'triggerCount' | 'dmsSent' | 'clicks' | 'conversions' | 'conversionRevenue'>
  ) => {
    if (editingAutomation) {
      updateAutomation(editingAutomation.id, data);
      setEditingAutomation(null);
    } else {
      addAutomation({
        ...data,
        channel: 'instagram',
        status: 'active',
        postCode: data.postCode || 'all',
      });
    }
    setCreateModalOpen(false);
  };

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

  const activeAutomationsCount = automations.filter((a) => a.status === 'active').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 1. Left Sidebar */}
      <DashboardSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeRulesCount={activeAutomationsCount}
        conversationsCount={conversations.length}
        onOpenConnectModal={() => setConnectModalOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar with Search & User Dropdown */}
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSimulator={() => setCurrentTab('simulator')}
          onOpenCreateAutomation={() => {
            setEditingAutomation(null);
            setCreateModalOpen(true);
          }}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          onOpenConnectModal={() => setConnectModalOpen(true)}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto px-6 py-7 lg:px-8 space-y-7">
          
          {/* TAB 1: Main Dashboard Overview */}
          {currentTab === 'dashboard' && (
            <div className="space-y-7">
              {/* Platform User Welcome Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Zap className="w-6 h-6 text-pink-600" />
                      <span>Instagram Auto-DM Platform</span>
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
                      Multi-Tenant
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Managing automated comment-to-DM flows for <strong className="text-slate-800">@{currentHandle}</strong>
                    {currentUser && (
                      <span className="ml-1 text-slate-400">· Logged in as {currentUser.displayName}</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setConnectModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-pink-600" />
                    <span>Connect Account</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('simulator')}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
                    <span>Test Simulator</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingAutomation(null);
                      setCreateModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>New Auto-DM Rule</span>
                  </button>
                </div>
              </div>

              {/* Instagram Auto-DM Highlights Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-500/30 text-pink-300 border border-pink-400/20">
                      Active Account: @{currentHandle}
                    </span>
                    <h2 className="text-xl font-bold mt-2">
                      Connected to @{currentHandle}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Inbound comments on your posts and reels trigger instant private DMs containing product links, pricing, and discount codes.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-xs">
                    <div className="text-center px-3">
                      <span className="text-[11px] text-slate-400 block">Active Rules</span>
                      <span className="text-lg font-bold text-white font-mono">{activeAutomationsCount}</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">DMs Dispatched</span>
                      <span className="text-lg font-bold text-pink-300 font-mono">482</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">Delivery Rate</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">99.8%</span>
                    </div>
                    <div className="text-center px-3 border-l border-white/10">
                      <span className="text-[11px] text-slate-400 block">Accounts</span>
                      <span className="text-xs font-semibold text-white mt-1 block">{connectedAccounts.length} Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP KPI CARDS */}
              <KPICards
                connectedAccounts={connectedAccounts.length}
                activeAutomations={activeAutomationsCount}
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

                {/* 1-Column Right: Account Card, Quick Actions & Activity */}
                <div className="space-y-7">
                  <AccountCard
                    account={accountState}
                    onManageAccount={() => setConnectModalOpen(true)}
                  />

                  <QuickActions
                    onCreateAutomation={() => {
                      setEditingAutomation(null);
                      setCreateModalOpen(true);
                    }}
                    onOpenPosts={() => setCurrentTab('posts')}
                    onOpenSimulator={() => setCurrentTab('simulator')}
                    onViewLogs={() => setCurrentTab('logs')}
                    onOpenSettings={() => setCurrentTab('settings')}
                  />

                  <RecentActivity
                    activities={activities}
                    onOpenSimulator={() => setCurrentTab('simulator')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Comment-to-DM Automations */}
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
              onOpenSimulator={() => setCurrentTab('simulator')}
            />
          )}

          {/* TAB 3: Posts & Reels */}
          {currentTab === 'posts' && (
            <PostsView
              automations={automations}
              onOpenCreateWithPost={(postCode, _postTitle) => {
                setEditingAutomation(null);
                setCreateModalOpen(true);
              }}
            />
          )}

          {/* TAB 4: Test Simulator */}
          {currentTab === 'simulator' && (
            <SimulatorView automations={automations} />
          )}

          {/* TAB 5: Live Webhook Logs */}
          {currentTab === 'logs' && (
            <LogsView logs={logs} onRefresh={() => {}} />
          )}

          {/* TAB 6: Instagram DM Conversations */}
          {currentTab === 'conversations' && (
            <ConversationsView
              conversations={conversations}
              customers={customers}
              products={products}
              onSendMessage={handleSendConversationMessage}
              onPreviewProduct={() => {}}
            />
          )}

          {/* TAB 7: Meta Webhook Setup */}
          {currentTab === 'settings' && (
            <MetaWebhookSetupView appUrl={window.location.origin} />
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

      <InteractiveTestSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        automations={automations}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <ConnectInstagramModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthPlatformProvider>
      <PlatformDashboard />
    </AuthPlatformProvider>
  );
}
