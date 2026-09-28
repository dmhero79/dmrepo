import React, { useState } from 'react';
import { Automation } from '../types';
import { X, Sparkles, Instagram, Link2, Send, Check, Hash, AlertCircle } from 'lucide-react';

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAuto: any) => void;
  editAutomation?: Automation | null;
  editingAutomation?: Automation | null;
}

export const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editAutomation,
  editingAutomation,
}) => {
  const currentAuto = editAutomation || editingAutomation;
  const [name, setName] = useState(currentAuto?.name || '');
  const [postCode, setPostCode] = useState(currentAuto?.postCode || '#cKcJ39');
  const [keyword, setKeyword] = useState(
    currentAuto?.keyword || currentAuto?.keywords?.[0] || ''
  );
  const [dmMessage, setDmMessage] = useState(
    currentAuto?.replyMessage ||
    currentAuto?.dmMessage ||
    'Hey! Here’s the link:\nhttps://yourlink.com/details\n\nLet me know if you have questions! 😊'
  );
  const [postThumbnail, setPostThumbnail] = useState(
    currentAuto?.postThumbnail || '/src/assets/images/post_course_launch_1790498703738.jpg'
  );
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const samplePosts = [
    {
      code: '#cKcJ39',
      title: 'Course Launch: Creator Masterclass 2026',
      thumbnail: '/src/assets/images/post_course_launch_1790498703738.jpg',
    },
    {
      code: '#B7eX4a',
      title: 'Product Info: Acoustic Studio Pro Wireless',
      thumbnail: '/src/assets/images/post_product_headphones_1790498714259.jpg',
    },
    {
      code: '#T9h2Lp',
      title: 'Travel Deals: Mediterranean Retreats',
      thumbnail: '/src/assets/images/post_travel_deals_1790498725783.jpg',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a campaign name.');
      return;
    }
    if (!keyword.trim()) {
      setError('Please specify at least one trigger keyword.');
      return;
    }
    if (!dmMessage.trim()) {
      setError('Please provide the automated DM reply text.');
      return;
    }

    const cleanKw = keyword.toLowerCase().trim().replace(/^#/, '');

    onSave({
      name: name.trim(),
      postCode,
      postTitle: samplePosts.find((p) => p.code === postCode)?.title || 'Instagram Post',
      postThumbnail,
      keyword: cleanKw,
      keywords: [cleanKw],
      dmMessage: dmMessage.trim(),
      replyMessage: dmMessage.trim(),
      status: 'active',
    });
    onClose();
  };

  const insertVariable = (variable: string) => {
    setDmMessage((prev: string) => prev + ` {${variable}}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {editAutomation ? 'Edit Automation Rule' : 'Create New Automation'}
              </h2>
              <p className="text-xs text-slate-500">
                Detect comment keywords on Instagram and dispatch instant DMs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns (Form + Instagram Phone Preview) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Form: 7 cols */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Campaign Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Automation Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Summer Course Launch, VIP Discount"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                required
              />
            </div>

            {/* Select Target Post */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Instagram Post to Monitor
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {samplePosts.map((post) => {
                  const isSelected = postCode === post.code;
                  return (
                    <div
                      key={post.code}
                      onClick={() => {
                        setPostCode(post.code);
                        setPostThumbnail(post.thumbnail);
                      }}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className="w-full h-16 rounded-lg overflow-hidden bg-slate-200 mb-1.5">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 truncate">{post.code}</p>
                      <p className="text-[10px] text-slate-500 truncate">{post.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trigger Keyword */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Trigger Keyword
                </label>
                <span className="text-[10px] text-slate-400">Exact or phrase match</span>
              </div>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. course, link, price, travel"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 font-mono focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                When a user leaves a comment containing this word, AutoDM immediately sends the DM below.
              </p>
            </div>

            {/* DM Message Template */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Direct Message Response
                </label>
                <div className="flex items-center gap-1.5 text-[10px] text-indigo-600">
                  <span>Insert:</span>
                  <button
                    type="button"
                    onClick={() => insertVariable('username')}
                    className="font-mono bg-indigo-50 px-1.5 py-0.5 rounded hover:bg-indigo-100 cursor-pointer"
                  >
                    @username
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable('first_name')}
                    className="font-mono bg-indigo-50 px-1.5 py-0.5 rounded hover:bg-indigo-100 cursor-pointer"
                  >
                    firstName
                  </button>
                </div>
              </div>
              <textarea
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none leading-relaxed"
                placeholder="Hey! Here's the link: https://yourlink.com..."
                required
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>Supports links & emojis</span>
                <span>{dmMessage.length} / 1000 characters</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{editAutomation ? 'Save Changes' : 'Activate Automation'}</span>
              </button>
            </div>
          </form>

          {/* Right Column: 5 cols — Live Instagram Phone DM Simulator */}
          <div className="md:col-span-5 bg-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between shadow-inner">
            <div>
              {/* Instagram App Header Mock */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[1.5px]">
                    <img
                      src="/src/assets/images/avatar_ankit_1790498690280.jpg"
                      alt="Your Account"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">yourbusiness</p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active now
                    </p>
                  </div>
                </div>
                <Instagram className="w-4 h-4 text-slate-400" />
              </div>

              {/* Comment Trigger Mock */}
              <div className="my-4 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">User Commented:</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-semibold text-slate-300">@sarah_123:</span>
                  <span className="text-slate-200">
                    Where can I get the <strong className="text-indigo-400 underline">{keyword || 'course'}</strong>?
                  </span>
                </div>
              </div>

              {/* Dispatched Instagram DM Preview Bubble */}
              <div className="space-y-1 my-3">
                <span className="text-[10px] text-slate-400 block text-right font-mono">Automated DM · Just now</span>
                <div className="ml-auto max-w-[90%] bg-indigo-600 text-white rounded-2xl rounded-br-xs p-3 text-xs shadow-md">
                  <p className="whitespace-pre-line leading-relaxed">{dmMessage}</p>
                </div>
              </div>
            </div>

            {/* Simulated DM Input Field */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                disabled
                placeholder="Type a message..."
                className="w-full bg-slate-800 text-[11px] text-slate-400 px-3 py-1.5 rounded-full border border-slate-700"
              />
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <Send className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
