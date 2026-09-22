import React, { useState } from 'react';
import {
  Layers,
  Trash2,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  Package,
  Plus
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface SampleOrderPageProps {
  products: Product[];
  onNavigate: (page: string, slug?: string) => void;
}

export const SampleOrderPage: React.FC<SampleOrderPageProps> = ({
  products,
  onNavigate
}) => {
  const { sampleItems, removeSample, addSample } = useCart();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientCity, setClientCity] = useState('Karachi');
  const [ordered, setOrdered] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const handleOrderSamples = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || sampleItems.length === 0) return;

    const ref = `SW-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrdered(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold flex items-center justify-center gap-1.5">
          <Layers className="w-4 h-4" /> Physical Atelier Swatches
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Order Your Curated Swatch Box
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e]">
          Experience true wire-brushed textures, beveled edges, and authentic timber tones in your home’s exact daylight and evening ambience.
        </p>
      </div>

      {ordered ? (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-[#ded5be] text-center space-y-4 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#241c15]">
            Swatch Box Dispatched!
          </h2>
          <p className="text-xs text-[#786c5e]">
            Your sample order reference is <strong>#{orderRef}</strong>. Our DHA Karachi logistics team is preparing your curated swatches for complimentary same-day dispatch.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Swatch Basket & Delivery Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif text-base font-bold text-[#241c15] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#7b5731]" />
                  <span>Selected Swatches ({sampleItems.length}/5)</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Complimentary in Karachi
                </span>
              </div>

              {sampleItems.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-xs text-[#786c5e]">No sample swatches selected yet.</p>
                  <p className="text-[11px] text-stone-400">
                    Browse any collection below and click <strong>"Add to Swatch Box"</strong>!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sampleItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#faf7f0] rounded-lg border border-[#ded5be] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-sm border border-stone-200"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-[#241c15]">{item.title}</h4>
                          <span className="text-[11px] text-[#786c5e]">
                            Finish: {item.finish} • Thickness: {item.thickness}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeSample(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Remove swatch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Details Form */}
            {sampleItems.length > 0 && (
              <form
                onSubmit={handleOrderSamples}
                className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-4 shadow-xs"
              >
                <h3 className="font-serif text-base font-bold text-[#241c15]">
                  Karachi Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Architect Sarah Ahmed"
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 0321-35304261"
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-stone-800 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="e.g. 15-C, Street 8, Phase 6, DHA, Karachi"
                    className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">City</label>
                    <input
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Shipping Fee</label>
                    <span className="block p-2.5 bg-emerald-50 text-emerald-800 font-bold rounded-sm border border-emerald-200">
                      Free (Karachi Priority)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#241c15] hover:bg-[#392c20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Confirm Free Swatch Box Dispatch
                </button>
              </form>
            )}
          </div>

          {/* Right: Quick Add Palette */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#ded5be] p-6 space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#241c15]">
              Quick-Add Samples to Box
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {products.map((p) => {
                const isSelected = sampleItems.some(s => s.productId === p.id);
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg border border-stone-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xs border border-stone-200"
                      />
                      <div>
                        <h4 className="font-semibold text-stone-900 truncate max-w-[180px]">{p.title}</h4>
                        <span className="text-[11px] text-stone-500">{p.materialType} • {p.thickness}</span>
                      </div>
                    </div>

                    <button
                      disabled={isSelected || sampleItems.length >= 5}
                      onClick={() => addSample(p)}
                      className={`px-3 py-1.5 rounded-sm font-bold text-[11px] flex items-center gap-1 ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-[#241c15] text-white hover:bg-[#382b20]'
                      }`}
                    >
                      {isSelected ? 'Added' : <><Plus className="w-3 h-3" /> Add</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
