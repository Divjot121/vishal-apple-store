'use client';

import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminQuickEdit from '@/components/admin/AdminQuickEdit';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOffers from '@/components/admin/AdminOffers';
import AdminEnquiries from '@/components/admin/AdminEnquiries';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminSettings from '@/components/admin/AdminSettings';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Sparkles,
  Inbox,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AdminPage() {
  const { isAdmin, loginAdmin, logoutAdmin, enquiries } = useStore();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'quick-edit' | 'products' | 'offers' | 'enquiries' | 'reviews' | 'settings'
  >('dashboard');

  // Login Form State
  const [email, setEmail] = useState('admin@vishalapplestore.com');
  const [password, setPassword] = useState('applepremium2026');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password, email);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleDemoQuickLogin = () => {
    setEmail('admin@vishalapplestore.com');
    setPassword('applepremium2026');
    loginAdmin('applepremium2026', 'admin@vishalapplestore.com');
  };

  // If not authenticated, render Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#121215] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative space-y-6">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo tone="reverse" width={180} priority />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Store Owner Portal
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Authorized management desk for live inventory, pricing, and enquiries.
              </p>
            </div>
          </div>

          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleDemoQuickLogin}
            className="w-full py-3 px-4 rounded-xl bg-[#C9A24A]/15 border border-[#C9A24A]/40 text-[#C9A24A] hover:bg-[#C9A24A]/25 text-xs font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>One-Click Demo Admin Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/[0.08]"></div>
            <span className="flex-shrink mx-3 text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
              Or Sign In with Credentials
            </span>
            <div className="flex-grow border-t border-white/[0.08]"></div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
              Invalid credentials. Use demo button or defaults in .env.example
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-xs transition-colors shadow-lg"
            >
              Authenticate & Open Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0E0E12]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" aria-label="Admin home" className="shrink-0 rounded-md">
              <Logo tone="reverse" width={140} />
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#C9A24A]/15 text-[#C9A24A] text-[10px] font-bold uppercase tracking-wider border border-[#C9A24A]/30">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <button
              type="button"
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-white/10 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip (Horizontal scroll on mobile) */}
        <div className="border-t border-white/[0.04] bg-[#121215]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quick-edit')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'quick-edit'
                  ? 'bg-[#C9A24A] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Quick Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'products'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('offers')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'offers'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers & Deals</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors relative ${
                activeTab === 'enquiries'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Enquiries Inbox</span>
              {unreadEnquiriesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#C9A24A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Customer Reviews</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold shrink-0 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Store Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Tab View */}
      <main id="main" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'quick-edit' && <AdminQuickEdit />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'offers' && <AdminOffers />}
        {activeTab === 'enquiries' && <AdminEnquiries />}
        {activeTab === 'reviews' && <AdminReviews />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
}
