import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { PlatformUser, UserInstagramAccount, Automation } from '../types';

interface AuthPlatformContextType {
  currentUser: PlatformUser | null;
  firebaseUser: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemoCreator: (handle?: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Instagram Accounts
  connectedAccounts: UserInstagramAccount[];
  activeAccount: UserInstagramAccount | null;
  switchAccount: (accountId: string) => void;
  addInstagramAccount: (accountData: {
    handle: string;
    displayName: string;
    avatarUrl?: string;
    accessToken?: string;
  }) => Promise<UserInstagramAccount>;
  deleteInstagramAccount: (accountId: string) => Promise<void>;

  // User Automations
  automations: Automation[];
  addAutomation: (data: Omit<Automation, 'id' | 'createdAt'>) => Promise<void>;
  updateAutomation: (id: string, updates: Partial<Automation>) => Promise<void>;
  deleteAutomation: (id: string) => Promise<void>;
  toggleAutomation: (id: string) => Promise<void>;
}

const AuthPlatformContext = createContext<AuthPlatformContextType | undefined>(undefined);

const DEFAULT_IG_ACCOUNTS: UserInstagramAccount[] = [
  {
    id: 'ig-default-mridalini',
    userId: 'guest',
    handle: 'mridaliniofficial',
    displayName: 'Mridalini Official',
    avatarUrl: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-19/751206463_18202213531329609_2979703026788183658_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MzUuQzMifQ%3D%3D&_nc_ohc=1iTBTT2cCVMQ7kNvwF2GBlT&_nc_oc=AdoNJAaf0Ao4ugVFxjnt0MwcI4UiIPEaPG1PZ7fkgxHjzS8Ma6oc8KiIbobcvuh4wkdBaCgKPiMXIQm2M93SsLEw&_nc_zt=24&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=AP4hL3IEAAAA&_nc_gid=0Br3A1PkPi7XinQBlGh4Rw&_nc_tpa=Q5bMBQL301xkdOFzDJBWu6rVnbLrwU5FDXiWxA-trQLwHbFQPQEN_fZ7qJJPKUc5g4PuDYwvslHa13diJQ&oh=00_AQOgQpz4HaICA4Mnz6sA_g49vWDvv4DfICD8KsMejrenPg&oe=6AC14CCB',
    category: 'Fashion & Retail',
    isConnected: true,
    connectedAt: '2026-09-28T12:00:00Z',
    isPrimary: true,
    webhookVerifyToken: 'autodm_meta_verify_token_2026',
  }
];

const INITIAL_STARTER_RULES = (handle: string): Automation[] => [
  {
    id: 'rule-starter-1',
    name: 'Instant Product Link DM',
    channel: 'instagram',
    keyword: 'BUY',
    keywords: ['BUY', 'PURCHASE'],
    replyMessage: `Hey! Thanks for commenting on @${handle}! Here is your direct VIP access link: https://${handle}.store/shop 🎉`,
    status: 'active',
    createdAt: 'Just now',
    postCode: 'DbTt-X3yduU',
    postCaption: 'Festive Launch & Styling Reel | Pure silk handloom collection',
    postThumbnail: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.71878-15/758400594_1074641168558022_1484593028835977962_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uQ0xJUFMuQzMifQ%3D%3D&_nc_ohc=HVabN2FWD9oQ7kNvwFM9FBh&_nc_oc=AdoP2Bf2hCiK3OAEETclYPi9L9VgUDxABn71tcLNI0MORMe1y1HOucbGZiNFCAABwHgqnL4umtwQvnzhrNFuOo1c&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQLk8FizTLNX151tK6mV209F174oTBZUa2rPNQc4Hn82y_MIhwf4FvvS5LLXgF8eSfd7z28Gxuvjrg&oh=00_AQOm2l9bXA6nStQi0kisLsse273EDDqCS5zrbE2spawy_A&oe=6AC085D9',
    dmsSent: 284,
  },
  {
    id: 'rule-starter-2',
    name: 'Price & Catalog Request',
    channel: 'instagram',
    keyword: 'PRICE',
    keywords: ['PRICE', 'COST', 'HOW MUCH'],
    replyMessage: `Hi there! The item shown is available in limited quantities starting at $49. Check sizes & colors here: https://${handle}.store ✨`,
    status: 'active',
    createdAt: '1 day ago',
    postCode: 'DbTyxNbSlNJ',
    postCaption: 'Handcrafted Pure Silk Anarkali set. Comment PRICE for sizing & price in DM.',
    postThumbnail: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-15/759408922_18203433670329609_4651465586871677850_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzk1MDcyNDU4MjEzMDQ3MTc1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uRkVFRC5DMyJ9&_nc_ohc=8mFyUENJVCIQ7kNvwE2AhgJ&_nc_oc=AdqW_pUytybg9Kdo_sowbA97rdt6Uyn2a23woREP0K-sBhhV7XC3cSKE87waGrLdV3_vlfaigdjus9r1CQfjtul5&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQK_gVaz89JQXX5TPHjjcC5CtJIOIWI5v0q1mk8EvzELJTIGJvLvKTPUkGGeGAhCVX291OOaXdoWdA&oh=00_AQMfDU3Gh7HFfLZsBYxxfOeqis05_FN3boTb2jfsp2pC7Q&oe=6AC09EEF',
    dmsSent: 142,
  },
  {
    id: 'rule-starter-3',
    name: 'General Link DM',
    channel: 'instagram',
    keyword: 'LINK',
    keywords: ['LINK', 'URL', 'INFO'],
    replyMessage: `Hey! Here is the direct link you requested: https://${handle}.store/collection. Let us know if you need any styling help!`,
    status: 'active',
    createdAt: '2 days ago',
    postCode: 'all',
    dmsSent: 56,
  }
];

export const AuthPlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<PlatformUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Accounts state
  const [connectedAccounts, setConnectedAccounts] = useState<UserInstagramAccount[]>(() => {
    const saved = localStorage.getItem('autodm_accounts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_IG_ACCOUNTS;
  });

  const [activeAccountId, setActiveAccountId] = useState<string>(() => {
    return localStorage.getItem('autodm_active_account_id') || 'ig-default-mridalini';
  });

  // Automations state
  const [automations, setAutomations] = useState<Automation[]>(() => {
    const saved = localStorage.getItem('autodm_rules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_STARTER_RULES('mridaliniofficial');
  });

  // Sync live account and real automations from server
  useEffect(() => {
    async function syncServerData() {
      try {
        // 1. Fetch real account from Graph API
        const accRes = await fetch('/api/instagram/account');
        const accData = await accRes.json();
        if (accData.success && accData.account) {
          const ig = accData.account;
          setConnectedAccounts(prev => {
            const exists = prev.find(a => a.handle.toLowerCase() === ig.username.toLowerCase());
            if (exists) {
              return prev.map(a => a.handle.toLowerCase() === ig.username.toLowerCase()
                ? { ...a, displayName: ig.name || ig.username, avatarUrl: ig.profilePictureUrl || a.avatarUrl }
                : a
              );
            }
            return [{
              id: `ig-${ig.id}`,
              userId: 'user',
              handle: ig.username,
              displayName: ig.name || ig.username,
              avatarUrl: ig.profilePictureUrl,
              category: 'Business & Creator',
              isConnected: true,
              connectedAt: new Date().toISOString(),
              isPrimary: true,
            }, ...prev];
          });
        }

        // 2. Fetch real server automations
        const autoRes = await fetch('/api/automations');
        const autoData = await autoRes.json();
        if (autoData.success && Array.isArray(autoData.automations) && autoData.automations.length > 0) {
          setAutomations(autoData.automations);
        }
      } catch (err) {
        console.warn('Could not sync with backend server:', err);
      }
    }
    syncServerData();
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('autodm_accounts', JSON.stringify(connectedAccounts));
  }, [connectedAccounts]);

  useEffect(() => {
    localStorage.setItem('autodm_active_account_id', activeAccountId);
  }, [activeAccountId]);

  useEffect(() => {
    localStorage.setItem('autodm_rules', JSON.stringify(automations));
  }, [automations]);

  // Active account reference
  const activeAccount = connectedAccounts.find(a => a.id === activeAccountId) || connectedAccounts[0] || null;

  // Listen to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        // User logged in via Firebase
        const platformUser: PlatformUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Creator',
          photoURL: user.photoURL || null,
          plan: 'creator_pro',
          createdAt: new Date().toISOString(),
        };
        setCurrentUser(platformUser);

        // Fetch user document from Firestore if exists
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, {
              ...platformUser,
              updatedAt: serverTimestamp(),
            });
          }
        } catch (err) {
          console.warn('Could not sync user to Firestore:', err);
        }
      } else {
        // Check if demo user saved
        const demoUser = localStorage.getItem('autodm_demo_user');
        if (demoUser) {
          try {
            setCurrentUser(JSON.parse(demoUser));
          } catch (e) {
            setCurrentUser(null);
          }
        } else {
          // Initialize default guest user so the platform works out-of-the-box
          const defaultGuest: PlatformUser = {
            uid: 'guest-creator-2026',
            email: 'creator@autodm.pro',
            displayName: 'Mridalini Creator',
            photoURL: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-19/751206463_18202213531329609_2979703026788183658_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MzUuQzMifQ%3D%3D&_nc_ohc=1iTBTT2cCVMQ7kNvwF2GBlT&_nc_oc=AdoNJAaf0Ao4ugVFxjnt0MwcI4UiIPEaPG1PZ7fkgxHjzS8Ma6oc8KiIbobcvuh4wkdBaCgKPiMXIQm2M93SsLEw&_nc_zt=24&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=AP4hL3IEAAAA&_nc_gid=0Br3A1PkPi7XinQBlGh4Rw&_nc_tpa=Q5bMBQL301xkdOFzDJBWu6rVnbLrwU5FDXiWxA-trQLwHbFQPQEN_fZ7qJJPKUc5g4PuDYwvslHa13diJQ&oh=00_AQOgQpz4HaICA4Mnz6sA_g49vWDvv4DfICD8KsMejrenPg&oe=6AC14CCB',
            plan: 'creator_pro',
            createdAt: new Date().toISOString(),
          };
          setCurrentUser(defaultGuest);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsDemoCreator = async (handle: string = 'mridaliniofficial', name: string = 'Demo Creator') => {
    setIsLoading(true);
    const demoUser: PlatformUser = {
      uid: `user-${Date.now()}`,
      email: `${handle}@instagram.com`,
      displayName: name,
      photoURL: null,
      plan: 'creator_pro',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(demoUser);
    localStorage.setItem('autodm_demo_user', JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (firebaseUser) {
        await firebaseSignOut(auth);
      }
      setCurrentUser(null);
      localStorage.removeItem('autodm_demo_user');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = (accountId: string) => {
    setActiveAccountId(accountId);
  };

  const addInstagramAccount = async (accountData: {
    handle: string;
    displayName: string;
    avatarUrl?: string;
    accessToken?: string;
  }): Promise<UserInstagramAccount> => {
    const cleanHandle = accountData.handle.replace('@', '').trim().toLowerCase();
    const newAccount: UserInstagramAccount = {
      id: `ig-acc-${Date.now()}`,
      userId: currentUser?.uid || 'guest',
      handle: cleanHandle,
      displayName: accountData.displayName.trim() || `@${cleanHandle}`,
      avatarUrl: accountData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      category: 'Creator & Brand',
      isConnected: true,
      accessToken: accountData.accessToken,
      webhookVerifyToken: `autodm_${cleanHandle}_verify_${Math.random().toString(36).substring(2, 7)}`,
      connectedAt: new Date().toISOString(),
    };

    setConnectedAccounts(prev => [newAccount, ...prev]);
    setActiveAccountId(newAccount.id);

    // Also populate default starter rules for this new account
    const newRules = INITIAL_STARTER_RULES(cleanHandle).map(r => ({
      ...r,
      id: `rule-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    }));
    setAutomations(prev => [...newRules, ...prev]);

    return newAccount;
  };

  const deleteInstagramAccount = async (accountId: string) => {
    setConnectedAccounts(prev => prev.filter(a => a.id !== accountId));
    if (activeAccountId === accountId) {
      const remaining = connectedAccounts.filter(a => a.id !== accountId);
      if (remaining.length > 0) {
        setActiveAccountId(remaining[0].id);
      }
    }
  };

  const addAutomation = async (data: Omit<Automation, 'id' | 'createdAt'>) => {
    const newRule: Automation = {
      ...data,
      id: `rule-${Date.now()}`,
      createdAt: 'Just now',
      dmsSent: 0,
    };
    setAutomations(prev => [newRule, ...prev]);

    // Save to real server webhook engine
    try {
      await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          keyword: data.keyword,
          keywords: data.keywords || [data.keyword],
          replyMessage: data.replyMessage,
          postCode: data.postCode || 'all',
          postCaption: data.postCaption,
          postThumbnail: data.postThumbnail,
        }),
      });
    } catch (e) {
      console.warn('Failed to sync new rule to server:', e);
    }
  };

  const updateAutomation = async (id: string, updates: Partial<Automation>) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    try {
      await fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (e) {}
  };

  const deleteAutomation = async (id: string) => {
    setAutomations(prev => prev.filter(a => a.id !== id));
    try {
      await fetch(`/api/automations/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  const toggleAutomation = async (id: string) => {
    const target = automations.find(a => a.id === id);
    const newStatus = target?.status === 'active' ? 'paused' : 'active';
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    try {
      await fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {}
  };

  return (
    <AuthPlatformContext.Provider
      value={{
        currentUser,
        firebaseUser,
        isLoading,
        signInWithGoogle,
        signInAsDemoCreator,
        logout,
        connectedAccounts,
        activeAccount,
        switchAccount,
        addInstagramAccount,
        deleteInstagramAccount,
        automations,
        addAutomation,
        updateAutomation,
        deleteAutomation,
        toggleAutomation,
      }}
    >
      {children}
    </AuthPlatformContext.Provider>
  );
};

export const useAuthPlatform = () => {
  const context = useContext(AuthPlatformContext);
  if (!context) {
    throw new Error('useAuthPlatform must be used within an AuthPlatformProvider');
  }
  return context;
};
