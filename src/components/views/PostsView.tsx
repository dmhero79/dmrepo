import React, { useState, useEffect } from 'react';
import { Instagram, Video, Image, MessageSquare, Zap, ExternalLink, RefreshCw, Plus } from 'lucide-react';
import { Automation } from '../../types';
import { useAuthPlatform } from '../../context/AuthPlatformContext';

interface PostItem {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
  comments_count?: number;
}

interface PostsViewProps {
  automations: Automation[];
  onOpenCreateWithPost: (postCode: string, postTitle: string) => void;
}

export const PostsView: React.FC<PostsViewProps> = ({ automations, onOpenCreateWithPost }) => {
  const { activeAccount } = useAuthPlatform();
  const currentHandle = activeAccount?.handle || 'mridaliniofficial';
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackPosts: PostItem[] = [
    {
      id: '17997579704996102',
      media_type: 'VIDEO',
      permalink: 'https://www.instagram.com/reel/DbTt-X3yduU/',
      thumbnail_url: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.71878-15/758400594_1074641168558022_1484593028835977962_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uQ0xJUFMuQzMifQ%3D%3D&_nc_ohc=HVabN2FWD9oQ7kNvwFM9FBh&_nc_oc=AdoP2Bf2hCiK3OAEETclYPi9L9VgUDxABn71tcLNI0MORMe1y1HOucbGZiNFCAABwHgqnL4umtwQvnzhrNFuOo1c&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQLk8FizTLNX151tK6mV209F174oTBZUa2rPNQc4Hn82y_MIhwf4FvvS5LLXgF8eSfd7z28Gxuvjrg&oh=00_AQOm2l9bXA6nStQi0kisLsse273EDDqCS5zrbE2spawy_A&oe=6AC085D9',
      caption: '✨ Festive Launch & Styling Reel | Pure silk handloom collection. Comment LINK or BUY for direct DM!',
      timestamp: '2026-09-28T14:30:00Z',
      comments_count: 14,
    },
    {
      id: '18093289088565237',
      media_type: 'IMAGE',
      permalink: 'https://www.instagram.com/p/DbTyxNbSlNJ/',
      media_url: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-15/759408922_18203433670329609_4651465586871677850_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzk1MDcyNDU4MjEzMDQ3MTc1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uRkVFRC5DMyJ9&_nc_ohc=8mFyUENJVCIQ7kNvwE2AhgJ&_nc_oc=AdqW_pUytybg9Kdo_sowbA97rdt6Uyn2a23woREP0K-sBhhV7XC3cSKE87waGrLdV3_vlfaigdjus9r1CQfjtul5&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQK_gVaz89JQXX5TPHjjcC5CtJIOIWI5v0q1mk8EvzELJTIGJvLvKTPUkGGeGAhCVX291OOaXdoWdA&oh=00_AQMfDU3Gh7HFfLZsBYxxfOeqis05_FN3boTb2jfsp2pC7Q&oe=6AC09EEF',
      caption: 'Handcrafted Pure Silk Anarkali set. Comment PRICE for price & sizing details in DM.',
      timestamp: '2026-09-28T12:15:00Z',
      comments_count: 8,
    },
    {
      id: '17940209985297255',
      media_type: 'IMAGE',
      permalink: 'https://www.instagram.com/p/DbTxR2oSIp9/',
      media_url: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-15/757954711_18203430457329609_9017753783645031254_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzk1MDcxODAyOTMwMjEwNjc0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uRkVFRC5DMyJ9&_nc_ohc=PZ6JxjyCOIMQ7kNvwHbKImY&_nc_oc=AdpSGnm8N4gVVfSvCXbvfKwmwbxhOjGOc2qgOAgYnn_owlaExFMNwlXy5en-mbZi48_4ZqJBbJmwkjmFHsDDYivD&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQLVIucMKNhf8xc_F5Fu2KB2nB03DdoJK_3-twvUMmmQ7zUH7TSdusD1BfBP4a-etgVkOo1sqLqJYw&oh=00_AQOzXGrS1hjbNVT5gMe3FChLf42tCl9_7-cb6vY-qFRapg&oe=6AC07DC2',
      caption: 'Zari Bordered Tissue Stole collection. Available now. Comment ORDER for quick checkout.',
      timestamp: '2026-09-27T18:00:00Z',
      comments_count: 5,
    },
    {
      id: '18159760033480259',
      media_type: 'IMAGE',
      permalink: 'https://www.instagram.com/p/DbTxOh8SMnz/',
      media_url: 'https://scontent-tpe1-1.cdninstagram.com/v/t51.82787-15/757656953_18203430388329609_9134546905843078551_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzk1MDcxNzgwMDkzMDY1ODgwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=a54f6b&efg=eyJlZmdfdGFnIjoiYmVzdF9pbWFnZV91cmxnZW4uRkVFRC5DMyJ9&_nc_ohc=CRNZ2vILwuEQ7kNvwHRJ_l0&_nc_oc=AdpNcvdy2FYqE4umgbP-8OKwPs4K91RLfF3tWkwXxBKJLxyo7J86xKlKAnMif66U5V5nvWxy6RtbV-5g3eTcLLZ8&_nc_zt=23&_nc_ht=scontent-tpe1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=QtKzGqASPYGF0NL_5VfPVA&_nc_tpa=Q5bMBQJmKoW59rIXiSaQKgNT-sPQnQykOcBq9r9zOVTfUmCsZfzCb2G63r0f_DkPRv6Ll9eaRKn1TeRc5Q&oh=00_AQMdvwRmPptAYXpL-ulnmS89xl0zOifJehi8Zgx3daUulw&oe=6AC087BC',
      caption: 'Royal Velvet Kurta in Emerald Green. Hand embroidery detailing. Comment INFO for catalogue.',
      timestamp: '2026-09-27T16:20:00Z',
      comments_count: 9,
    },
  ];

  const fetchLivePosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/instagram/posts');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
      } else {
        setPosts(fallbackPosts);
      }
    } catch (err: any) {
      console.warn('Using fallback posts:', err);
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivePosts();
  }, []);

  const getPostCode = (permalink: string) => {
    if (!permalink) return '';
    const reelMatch = permalink.match(/\/reel\/([A-Za-z0-9_-]+)/);
    if (reelMatch) return reelMatch[1];
    const postMatch = permalink.match(/\/p\/([A-Za-z0-9_-]+)/);
    if (postMatch) return postMatch[1];
    return permalink.slice(-11).replace('/', '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-600" />
            <span>Instagram Posts &amp; Reels</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Live feed for <strong className="text-slate-800">@{currentHandle}</strong>. Attach Auto-DM keyword rules to any reel or post.
          </p>
        </div>

        <button
          onClick={fetchLivePosts}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post) => {
          const code = getPostCode(post.permalink);
          const activeRule = automations.find(
            (a) => a.postCode === code || a.postCaption?.includes(code)
          );
          const imageUrl = post.thumbnail_url || post.media_url;

          return (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={post.caption || 'Instagram Post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <Instagram className="w-10 h-10" />
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
                    {post.media_type === 'VIDEO' ? (
                      <>
                        <Video className="w-3 h-3 text-pink-400" />
                        <span>Reel</span>
                      </>
                    ) : (
                      <>
                        <Image className="w-3 h-3 text-indigo-400" />
                        <span>Post</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Automation Status Badge */}
                {activeRule ? (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 fill-white" />
                      <span>Auto-DM Active</span>
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900/80 text-slate-300 backdrop-blur-xs">
                      No Auto-DM
                    </span>
                  </div>
                )}
              </div>

              {/* Post Details & Actions */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-medium">
                    {post.caption || 'No caption available'}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span className="font-mono">#{code}</span>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>View on IG</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Trigger Setup Button */}
                <div>
                  {activeRule ? (
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-between">
                      <div className="truncate">
                        <span className="font-bold">Keywords: </span>
                        <span>{activeRule.keywords?.join(', ') || activeRule.keyword}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 shrink-0 ml-1">
                        {activeRule.dmsSent || 0} DMs
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenCreateWithPost(code, post.caption ? post.caption.slice(0, 35) + '...' : 'Instagram Post')}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Set Auto-DM for this Post</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
