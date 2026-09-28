// AutoDM Comprehensive Multi-Channel Social Commerce CRM Data Models & Entities

export type ChannelType = 'instagram' | 'tiktok' | 'whatsapp' | 'telegram';

export interface ChannelCapability {
  channel: ChannelType;
  name: string;
  comments: boolean | 'configurable';
  dm: boolean | 'configurable';
  keywordTrigger: boolean | 'configurable';
  templates?: boolean;
  commands?: boolean;
  postBasedAutomation?: boolean;
  webhooks: boolean;
  statusNotice?: string;
}

export interface SocialChannelAccount {
  id: string;
  channel: ChannelType;
  accountName: string;
  handle: string;
  profileImage: string;
  isConnected: boolean;
  status: 'active' | 'not_connected' | 'action_required';
  channelTypeLabel: string;
  lastSync: string;
  webhookStatus: 'operational' | 'pending' | 'error';
  webhookUrl: string;
  capabilities: ChannelCapability;
  metrics: {
    followers?: number;
    subscribers?: number;
    messagesReceived?: number;
    conversions?: number;
  };
  credentialsHint?: string;
}

export interface CustomerIdentity {
  id: string;
  channel: ChannelType;
  handle: string;
  name?: string;
  avatarUrl?: string;
  verifiedAt?: string;
  isPrimary?: boolean;
}

export type ProductType = 'physical' | 'digital' | 'service';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  status: 'active' | 'draft' | 'archived';
  sku?: string;
  stock?: number;
  variants?: ProductVariant[];
  weight?: string;
  shippingInfo?: string;
  downloadFile?: string;
  deliverySettings?: string;
  duration?: string;
  bookingInfo?: string;
  views: number;
  clicks: number;
  addToCartCount: number;
  ordersCount: number;
  revenue: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  order: number;
}

export interface StorefrontTheme {
  template: 'creator' | 'modern' | 'fashion' | 'personal_brand' | 'coach' | 'digital';
  brandName: string;
  handle: string;
  bio: string;
  tagline: string;
  avatarUrl: string;
  coverUrl: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  mode: 'light' | 'dark';
  buttonStyle: 'rounded-full' | 'rounded-xl' | 'rounded-md';
  productLayout: 'grid' | 'cards' | 'list';
  featuredProductIds: string[];
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    telegram?: string;
    youtube?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CustomDomainConfig {
  domain: string;
  status: 'connected' | 'pending_verification' | 'failed' | 'disconnected';
  sslStatus: 'active' | 'provisioning' | 'expired';
  type: 'CNAME' | 'A';
  name: string;
  targetValue: string;
  configuredAt: string;
}

export type TriggerType = 
  | 'instagram_comment' 
  | 'instagram_dm' 
  | 'tiktok_comment' 
  | 'tiktok_interaction' 
  | 'whatsapp_incoming_message' 
  | 'telegram_command' 
  | 'telegram_message';

export type ConditionType = 
  | 'keyword_contains' 
  | 'message_contains' 
  | 'product_match' 
  | 'customer_tag' 
  | 'new_customer' 
  | 'existing_customer' 
  | 'order_status';

export type ActionType = 
  | 'send_message' 
  | 'send_product' 
  | 'send_storefront_link' 
  | 'add_customer' 
  | 'add_tag' 
  | 'create_lead' 
  | 'update_crm' 
  | 'notify_creator';

export interface AutomationStep {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'wait';
  title: string;
  subtitle?: string;
  channel?: ChannelType;
  config: Record<string, any>;
}

export interface Automation {
  id: string;
  name: string;
  channel: ChannelType;
  triggerType?: TriggerType;
  conditionType?: ConditionType;
  actionType?: ActionType;
  steps?: AutomationStep[];
  postId?: string;
  postTitle?: string;
  postCode?: string;
  postThumbnail?: string;
  postCaption?: string;
  keyword?: string;
  keywords?: string[];
  command?: string;
  replyMessage?: string;
  dmMessage?: string;
  targetProductId?: string;
  status: 'active' | 'paused';
  createdAt: string;
  triggerCount?: number;
  matchCount?: number;
  dmCount?: number;
  dmsSent?: number;
  clicks?: number;
  conversions?: number;
  conversionRevenue?: number;
}

export type CustomerStatus = 'lead' | 'engaged' | 'interested' | 'checkout' | 'purchased' | 'repeat';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  source: 'Instagram' | 'TikTok' | 'WhatsApp' | 'Telegram' | 'Storefront Direct' | 'Referral';
  primaryChannel: ChannelType;
  identities: CustomerIdentity[];
  interestedProducts: string[];
  ordersCount: number;
  totalSpent: number;
  status: CustomerStatus;
  lastInteraction: string;
  createdAt: string;
  tags: string[];
  notes?: string;
  // Legacy backward-compat
  instagramUsername?: string;
}

export interface Message {
  id: string;
  sender: 'creator' | 'customer' | 'system_bot';
  text: string;
  timestamp: string;
  channel?: ChannelType;
  productCard?: {
    title: string;
    price: number;
    image: string;
    link: string;
  };
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  channel: ChannelType;
  channelHandle: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'open' | 'closed' | 'flagged';
  assignedStatus?: 'assigned' | 'bot_handling' | 'escalated';
  tags: string[];
  messages: Message[];
  // Legacy backward-compat
  instagramUsername?: string;
}

export type OrderPaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderFulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  type: ProductType;
  price: number;
  quantity: number;
  variantName?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  channel: ChannelType | 'direct' | 'custom_domain';
  channelHandle: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentGateway: 'Razorpay' | 'Cashfree';
  paymentId: string;
  paymentStatus: OrderPaymentStatus;
  orderStatus: OrderFulfillmentStatus;
  createdAt: string;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  // Legacy backward-compat
  instagramUsername?: string;
}

export interface PaymentGatewayConfig {
  provider: 'Razorpay' | 'Cashfree';
  isConnected: boolean;
  merchantId: string;
  keyId: string;
  webhookSecretSet: boolean;
  webhookUrl: string;
  currency: string;
  mode: 'live' | 'test';
  connectedAt?: string;
}

export interface PerformanceSlice {
  label: string;
  percentage: number;
  color: string;
  count?: number;
}

export interface DailyDMData {
  date: string;
  value?: number;
  dmsSent?: number;
  comments?: number;
}

export interface KeywordMetric {
  keyword: string;
  percentage: number;
  count?: number;
  revenue?: number;
  rank?: number;
  color?: string;
}

export interface ChannelAnalyticsData {
  channel: ChannelType;
  name: string;
  color: string;
  iconBg: string;
  messages: number;
  engagement: number;
  leads: number;
  productClicks: number;
  storeVisits: number;
  orders: number;
  revenue: number;
}

export interface InstagramAccount {
  handle: string;
  name: string;
  businessName?: string;
  connectedSince?: string;
  deliveryRate?: string;
  category?: string;
  accountType?: 'Creator' | 'Business';
  isConnected: boolean;
  avatarUrl: string;
  followers: number;
  postsCount: number;
  apiHealth?: string;
  webhookActive?: boolean;
  lastSyncedAt?: string;
}

export type InstagramAccountState = InstagramAccount;

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR';
  channel?: ChannelType;
  event: string;
  userHandle: string;
  postCode: string;
  details: string;
  latencyMs?: number;
}

export interface ActivityItem {
  id: string;
  type: 'comment_matched' | 'dm_sent' | 'order_placed' | 'checkout_started' | 'keyword_miss';
  channel?: ChannelType;
  title: string;
  subtitle: string;
  context?: string;
  content?: string;
  timeAgo: string;
  userHandle?: string;
  amount?: number;
}
