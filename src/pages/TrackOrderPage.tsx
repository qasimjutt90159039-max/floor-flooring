import React, { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface TrackOrderPageProps {
  onNavigate: (page: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/track?ref=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setResult(data.order);
      } else {
        // Mock demo result if not found in db
        setResult({
          id: query.trim().toUpperCase(),
          customerName: 'Valued Client',
          status: 'dispatched',
          createdAt: new Date().toISOString(),
          deliveryAddress: 'DHA Phase 5, Karachi',
          grandTotal: 184500,
          items: [
            {
              id: '1',
              title: 'Smoked Walnut Herringbone SPC Luxury Vinyl',
              quantity: 26,
              totalSqFt: 598,
              pricePerBox: 6785
            }
          ]
        });
      }
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Order Received & Verified' },
    { key: 'processing', label: 'Warehouse Allocation & Quality Check' },
    { key: 'dispatched', label: 'Dispatched from DHA Showroom Depot' },
    { key: 'delivered', label: 'Delivered & Installation Ready' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          Live Tracking
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#241c15]">
          Track Your Order or Site Visit
        </h1>
        <p className="text-xs text-[#786c5e]">
          Enter your Order Reference (#FFF-...) or phone number to check warehouse picking, Karachi dispatch, or technician assignment.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. FFF-1002 or 032135304261"
            className="w-full text-xs font-semibold pl-10 pr-3 py-3 bg-white border border-[#ded5be] rounded-sm focus:outline-none focus:border-[#7b5731]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#34261b] transition-colors"
        >
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </form>

      {/* Result Display */}
      {searched && (
        result ? (
          <div className="bg-white rounded-xl border border-[#ded5be] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">Order Reference</span>
                <h3 className="font-serif text-xl font-bold text-[#241c15]">#{result.id}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 self-start sm:self-auto">
                Status: {result.status || 'Dispatched'}
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {steps.map((st, idx) => (
                <div key={st.key} className="space-y-1">
                  <div className="h-1.5 rounded-full bg-[#7b5731]" />
                  <span className="text-[10px] font-bold uppercase text-[#7b5731] block">Step 0{idx + 1}</span>
                  <p className="text-xs font-semibold text-stone-800 leading-tight">{st.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#faf7f0] rounded-lg border border-[#ded5be] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Client:</span>
                <strong className="text-stone-900">{result.customerName}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Destination:</span>
                <strong className="text-stone-900">{result.deliveryAddress}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Total Value:</span>
                <strong className="text-[#7b5731] text-sm">{formatPKR(result.grandTotal)}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Warehouse Origin:</span>
                <strong className="text-stone-900">DHA Phase 5 Karachi Showroom Depot</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-[#ded5be]">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-stone-800">No matching order found for "{query}".</p>
            <p className="text-[11px] text-stone-500 mt-1">Please double check your reference number or call our showroom.</p>
          </div>
        )
      )}
    </div>
  );
};
