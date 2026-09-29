import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  onSnapshot 
} from 'firebase/firestore';

// 1. Firebase Client SDK Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBgGX5sOX2PFMW-TJLKMod8kjiZqgYRf70",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gen-lang-client-0580617321.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gen-lang-client-0580617321",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gen-lang-client-0580617321.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "209780279655",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:209780279655:web:e71d0b6a504ec3870587c2",
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app, "ai-studio-autodmsocialcomm-03a18bb6-5e83-47c0-803a-3b37f6ae884c");
const googleProvider = new GoogleAuthProvider();

// Meta OAuth Configuration Constants
const META_APP_ID = import.meta.env.VITE_META_APP_ID || "1097121733196692";
const META_REDIRECT_URI = import.meta.env.VITE_META_REDIRECT_URI || `${window.location.origin}/api/auth/meta/callback`;
const META_OAUTH_SCOPES = "instagram_manage_messages,instagram_manage_comments,pages_manage_metadata,pages_show_list,pages_read_engagement";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);

  // 4. Track Authentication State & Listen to Connected Instagram Account
  useEffect(() => {
    let unsubscribeFirestore = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Query /instagram_accounts for the active user's connected account
        const q = query(
          collection(db, 'instagram_accounts'),
          where('userId', '==', currentUser.uid)
        );

        unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const accDoc = snapshot.docs[0].data();
            setConnectedAccount(accDoc);
          } else {
            setConnectedAccount(null);
          }
        }, (err) => {
          console.warn('Firestore accounts query note:', err.message);
        });
      } else {
        setConnectedAccount(null);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  // Check URL params for any redirect notifications from OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected') === 'true') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (params.get('auth_error')) {
      setError(decodeURIComponent(params.get('auth_error')));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Google Sign In
  const handleSignIn = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;

      const userRef = doc(db, 'users', loggedUser.uid);
      const userSnap = await getDoc(userRef);

      const userData = {
        uid: loggedUser.uid,
        name: loggedUser.displayName || 'Anonymous User',
        email: loggedUser.email || '',
        createdAt: userSnap.exists() && userSnap.data()?.createdAt 
          ? userSnap.data().createdAt 
          : new Date().toISOString(),
      };

      await setDoc(userRef, userData, { merge: true });
    } catch (err) {
      console.error('Sign in failed:', err);
      setError(err.message || 'Authentication error occurred');
    }
  };

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // STEP 2: META OAUTH AUTHORIZATION REDIRECT
  const handleConnectInstagram = () => {
    if (!user) return;

    // Construct official Meta OAuth Authorization endpoint URL
    const metaOAuthUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    metaOAuthUrl.searchParams.set("client_id", META_APP_ID);
    metaOAuthUrl.searchParams.set("redirect_uri", META_REDIRECT_URI);
    metaOAuthUrl.searchParams.set("scope", META_OAUTH_SCOPES);
    metaOAuthUrl.searchParams.set("response_type", "code");
    metaOAuthUrl.searchParams.set("state", user.uid); // Active Firebase user UID

    // Redirect the browser window to Meta OAuth
    window.location.href = metaOAuthUrl.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ERROR BANNER */}
      {error && (
        <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2.5 text-xs text-rose-300 text-center">
          {error}
        </div>
      )}

      {/* IF LOGGED IN */}
      {user ? (
        <div className="flex-1 flex flex-col">
          {/* Dashboard Header */}
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                DM
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-100">
                  {user.displayName || 'Instagram Auto-DM'}
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            >
              Log Out
            </button>
          </header>

          {/* Body Section */}
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6 bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 shadow-2xl">
              
              {connectedAccount ? (
                /* Connected Account State */
                <div className="space-y-5">
                  <div className="relative mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
                    <img 
                      src={connectedAccount.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                      alt={connectedAccount.handle}
                      className="w-full h-full rounded-full object-cover bg-slate-800"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Connected &amp; Active
                    </div>
                    <h2 className="text-xl font-bold text-white">@{connectedAccount.handle}</h2>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {connectedAccount.instagramAccountId}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={handleConnectInstagram}
                      className="text-xs text-slate-400 hover:text-white transition underline cursor-pointer"
                    >
                      Reconnect or Switch Account
                    </button>
                  </div>
                </div>
              ) : (
                /* Disconnected State: STEP 2 BUTTON */
                <>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-2xl">
                    📸
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Instagram Channel Setup
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Link your Instagram Business or Creator account to start receiving comment webhooks and dispatching automatic private DMs.
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleConnectInstagram}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>🔌 Connect Instagram Business Account</span>
                    </button>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500">
                    Tenant ID: <span className="font-mono text-slate-400">{user.uid}</span>
                  </div>
                </>
              )}

            </div>
          </main>
        </div>
      ) : (
        /* IF LOGGED OUT */
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
          <div className="max-w-xl w-full text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Multi-Tenant Instagram Auto-DM Platform
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Turn Instagram Comments into Instant{' '}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Direct Message Funnels
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
                When a customer comments on your posts or reels with words like "PRICE", "BUY", or "LINK", our cloud engine immediately sends a personalized private DM with your checkout link.
              </p>
            </div>

            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleSignIn}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl shadow-white/10 transition cursor-pointer flex items-center justify-center gap-3"
              >
                <span>🚀 Sign In with Google to Start</span>
              </button>
              <p className="text-[11px] text-slate-500">
                No credit card required. Secure session initialized via Firebase Auth &amp; Firestore.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
