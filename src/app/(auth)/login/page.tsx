'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Eye, EyeOff, Check, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('dealer.saad@sbortix.pk');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Left Column: Navy Brand Hero (as seen in reference design) */}
      <div className="w-full md:w-5/12 bg-[#0F1B33] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden shrink-0">
        {/* Brand Header */}
        <div className="z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PropertyInstallment</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">Manage • Track • Grow</p>
            </div>
          </div>

          {/* Heading & Value Prop */}
          <div className="max-w-sm space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Simplify Your <br />
              <span className="text-blue-400">Installment Management</span>
            </h2>

            {/* Benefit Checkpoints */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-slate-200 font-medium">
                  Track payments easily
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-slate-200 font-medium">
                  Manage clients efficiently
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-slate-200 font-medium">
                  Get automated reminders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* City skyline illustration at bottom */}
        <div className="mt-12 pt-8 relative z-10">
          <div className="w-full flex items-end justify-center opacity-70">
            <svg
              className="w-full max-w-xs h-24 text-blue-400/40"
              viewBox="0 0 240 80"
              fill="currentColor"
            >
              {/* Moon & Stars */}
              <circle cx="210" cy="18" r="4" fill="#93C5FD" />
              <circle cx="40" cy="20" r="1.5" fill="#93C5FD" />
              <circle cx="130" cy="12" r="1.5" fill="#93C5FD" />
              {/* Buildings */}
              <rect x="20" y="35" width="28" height="45" rx="2" fill="#3B82F6" opacity="0.4" />
              <rect x="55" y="20" width="34" height="60" rx="2" fill="#60A5FA" opacity="0.6" />
              <rect x="95" y="40" width="26" height="40" rx="2" fill="#2563EB" opacity="0.5" />
              <rect x="128" y="15" width="38" height="65" rx="2" fill="#93C5FD" opacity="0.5" />
              <rect x="172" y="30" width="32" height="50" rx="2" fill="#3B82F6" opacity="0.4" />
              {/* Windows */}
              <rect x="62" y="28" width="4" height="6" fill="#FEF08A" />
              <rect x="73" y="28" width="4" height="6" fill="#FEF08A" />
              <rect x="62" y="40" width="4" height="6" fill="#FEF08A" />
              <rect x="73" y="40" width="4" height="6" fill="#FEF08A" />
              <rect x="136" y="24" width="4" height="6" fill="#FEF08A" />
              <rect x="148" y="24" width="4" height="6" fill="#FEF08A" />
              <rect x="136" y="38" width="4" height="6" fill="#FEF08A" />
              <rect x="148" y="38" width="4" height="6" fill="#FEF08A" />
            </svg>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2 font-medium">
            Better Management for a Brighter Future
          </p>
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address or Phone Number
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-800"
                required
              />
            </div>

            {/* Password with Show/Hide */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-11 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                />
                <span className="text-slate-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Mock password reset instructions sent to your email.')}
                className="text-[#2563EB] font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 font-bold shadow-md shadow-blue-500/20"
              isLoading={isLoading}
            >
              Sign In to Dashboard
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="text-[#2563EB] font-bold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>

          {/* Demo Credential Tip */}
          <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              Demo dealer mode: Click <strong>Sign In</strong> to explore the full dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

