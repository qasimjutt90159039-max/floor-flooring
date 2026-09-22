import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Wrench, RefreshCw, Clock, MapPin, Sparkles } from 'lucide-react';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface BentoHeroProps {
  onNavigate: (page: string, param?: string) => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onNavigate }) => {
  // Live Countdown for Deal of the Day (resets daily)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Large Hero Card (Cols 1 to 7) */}
        <div className="lg:col-span-7 bg-graphite text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between border border-sage-800 shadow-xl group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="relative z-10 flex items-center gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multan's Premium Boutique</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-sage-800 text-sage-200 text-xs font-medium border border-sage-700">
              100% PTA Approved & Official Warranty
            </span>
          </div>

          {/* Headline & Description */}
          <div className="relative z-10 max-w-md my-4">
            <h1 className="font-heading font-black text-3xl sm:text-5xl tracking-tight leading-none text-white">
              iPhone 15 <span className="text-accent">Pro Max</span>
            </h1>
            <p className="text-sage-300 text-sm sm:text-base mt-3 leading-relaxed">
              Titanium strength. A17 Pro Chip. Official PTA customs tax cleared with verified invoice. Visit our Katchehry Chowk shop today or get same-day hand delivery in Multan.
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                {formatPKR(445000)}
              </span>
              <span className="text-sm sm:text-base line-through text-sage-500 font-mono">
                {formatPKR(485000)}
              </span>
              <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold text-xs">
                In Stock at Multan
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative z-10 flex items-center gap-3 pt-6 flex-wrap">
            <button
              id="hero-buy-now-btn"
              onClick={() => onNavigate('product-detail', 'apple-iphone-15-pro-max')}
              className="px-6 py-3.5 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Explore Device</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3.5 rounded-xl bg-sage-800 hover:bg-sage-700 text-white font-semibold text-sm transition-all border border-sage-700 cursor-pointer"
            >
              Browse All Mobiles
            </button>
          </div>

          {/* Product Floating Image */}
          <div className="lg:absolute lg:right-4 lg:bottom-4 mt-6 lg:mt-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
              alt="iPhone 15 Pro Max"
              className="w-48 sm:w-64 lg:w-72 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Stack of 2 Cards (Cols 8 to 12) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {/* Card 1: Deal of the Day with Countdown */}
          <div className="bg-sage-50 rounded-3xl p-6 border border-sage-200 relative overflow-hidden flex flex-col justify-between group hover:border-accent transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-accent" />
                <span>Deal of the Day</span>
              </span>

              {/* Countdown Pills */}
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-graphite">
                <span className="w-6 h-6 rounded bg-graphite text-white flex items-center justify-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="w-6 h-6 rounded bg-graphite text-white flex items-center justify-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="w-6 h-6 rounded bg-accent text-white flex items-center justify-center">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 my-3">
              <img
                src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop"
                alt="Samsung S24 Ultra"
                className="w-20 h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="font-heading font-extrabold text-base text-graphite">
                  Samsung Galaxy S24 Ultra
                </h4>
                <p className="text-xs text-sage-500">12GB/512GB • Titanium Grey • PTA Approved</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-base font-black font-mono text-accent">
                    {formatPKR(398000)}
                  </span>
                  <span className="text-xs line-through text-sage-400 font-mono">
                    {formatPKR(425000)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('product-detail', 'samsung-galaxy-s24-ultra')}
              className="w-full py-2.5 rounded-xl bg-graphite hover:bg-accent text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Claim Discount</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: 2 Mini-Tiles for Repair & Trade-In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Repair Lab */}
            <div
              onClick={() => onNavigate('repair-booking')}
              className="bg-white rounded-2xl p-4 border border-sage-200 hover:border-accent hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-accent flex items-center justify-center mb-2">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm text-graphite group-hover:text-accent transition-colors">
                  Repair Lab Multan
                </h5>
                <p className="text-[11px] text-sage-500 mt-0.5">
                  Screen, battery, and chip-level motherboard fixes with 90-day warranty.
                </p>
              </div>
              <span className="text-[11px] font-bold text-accent mt-3 flex items-center gap-1">
                Book a Slot →
              </span>
            </div>

            {/* Trade-In Old Phone */}
            <div
              onClick={() => onNavigate('trade-in')}
              className="bg-white rounded-2xl p-4 border border-sage-200 hover:border-accent hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="w-9 h-9 rounded-xl bg-sage-100 text-graphite flex items-center justify-center mb-2">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm text-graphite group-hover:text-accent transition-colors">
                  Instant Trade-In
                </h5>
                <p className="text-[11px] text-sage-500 mt-0.5">
                  Sell your old smartphone or swap it for a new one at top market value.
                </p>
              </div>
              <span className="text-[11px] font-bold text-graphite group-hover:text-accent mt-3 flex items-center gap-1">
                Check Valuation →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
