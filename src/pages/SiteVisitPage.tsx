import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Shield,
  Layers,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { siteConfig, formatPKR, getWhatsAppLink } from '../config/siteConfig';

interface SiteVisitPageProps {
  onNavigate: (page: string) => void;
}

export const SiteVisitPage: React.FC<SiteVisitPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('DHA Phase 5, Karachi');
  const [fullAddress, setFullAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Afternoon (2:00 PM – 5:00 PM)');
  const [approxSqFt, setApproxSqFt] = useState('1,200');
  const [materialsOfInterest, setMaterialsOfInterest] = useState<string[]>([
    'SPC Vinyl (Waterproof)',
    'Herringbone Parquet'
  ]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedVisit, setConfirmedVisit] = useState<any | null>(null);

  const karachiAreas = [
    'DHA Phase 1, Karachi',
    'DHA Phase 2 & Ext, Karachi',
    'DHA Phase 4, Karachi',
    'DHA Phase 5 (Showroom Vicinity)',
    'DHA Phase 6, Karachi',
    'DHA Phase 7 & Ext, Karachi',
    'DHA Phase 8, Karachi',
    'Clifton (Blocks 1 – 9)',
    'Bath Island & Civil Lines',
    'PECHS & Tariq Road Area',
    'KDA Scheme 1 & Tipu Sultan',
    'Gulshan-e-Iqbal',
    'Bahria Town Karachi',
    'Other Karachi Neighborhood'
  ];

  const availableMaterials = [
    'SPC Vinyl (Waterproof)',
    'German AC4 / AC5 Laminate',
    'Engineered European Oak',
    'Herringbone Parquet',
    'Solid Burmese Teak',
    'Commercial Carpet Tiles',
    'Outdoor WPC Decking',
    'Wall Panelling & Flutes'
  ];

  const toggleMaterial = (mat: string) => {
    setMaterialsOfInterest(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !preferredDate) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/site-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          email,
          area,
          address: fullAddress,
          preferredDate,
          timeSlot,
          approxSqFt: Number(approxSqFt.replace(/[^0-9]/g, '')) || 1000,
          materialsOfInterest,
          notes
        })
      });
      const data = await res.json();
      if (data.success && data.siteVisit) {
        setConfirmedVisit(data.siteVisit);
      } else {
        // Fallback confirmation
        setConfirmedVisit({
          id: `sv-${Date.now().toString().slice(-5)}`,
          customerName: fullName,
          preferredDate,
          timeSlot,
          area
        });
      }
    } catch (err) {
      console.error(err);
      setConfirmedVisit({
        id: `sv-${Date.now().toString().slice(-5)}`,
        customerName: fullName,
        preferredDate,
        timeSlot,
        area
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    let msg = `*First Floor Floorings - Site Visit Booking Request*\n\n`;
    msg += `*Name:* ${fullName}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Area:* ${area}\n`;
    msg += `*Address:* ${fullAddress}\n`;
    msg += `*Date Requested:* ${preferredDate} (${timeSlot})\n`;
    msg += `*Approx Area:* ${approxSqFt} sq ft\n`;
    msg += `*Materials to bring swatches of:* ${materialsOfInterest.join(', ')}\n\n`;
    msg += `Please confirm site engineer visit from your DHA Phase 5 showroom.`;

    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold flex items-center justify-center gap-1.5">
          <Calendar className="w-4 h-4" /> White Glove Service in Karachi
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Book a Free In-Home Site Visit & Laser Measurement
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e] leading-relaxed">
          Our senior flooring technician will visit your site with digital laser measurers, subfloor moisture meters, and a customized box of physical sample swatches.
        </p>
      </div>

      {confirmedVisit ? (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-[#ded5be] shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#241c15]">
            Site Visit Scheduled!
          </h2>

          <p className="text-xs text-[#786c5e]">
            Your booking reference is <strong>#{confirmedVisit.id}</strong>. Our DHA Karachi dispatch team will call you within 2 business hours to confirm exact technician arrival.
          </p>

          <div className="p-4 bg-[#f8f5ee] rounded-lg text-left text-xs space-y-2 border border-[#ded5be]">
            <div className="flex justify-between">
              <span className="text-stone-500">Scheduled Date:</span>
              <span className="font-bold text-stone-900">{confirmedVisit.preferredDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Time Window:</span>
              <span className="font-bold text-stone-900">{confirmedVisit.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Location:</span>
              <span className="font-bold text-stone-900">{confirmedVisit.area}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="flex-1 py-3 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              Browse Collections
            </button>
            <a
              href={getWhatsAppLink(`Hello First Floor Floorings, I just scheduled Site Visit #${confirmedVisit.id} for ${confirmedVisit.preferredDate}. Please confirm.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#25d366]/20 text-[#126430] border border-emerald-500/30 rounded-sm text-xs font-bold uppercase tracking-wider text-center"
            >
              Confirm on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-xl border border-[#ded5be] p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div>
              <h3 className="font-serif text-lg font-bold text-[#241c15]">
                Client & Site Details
              </h3>
              <p className="text-xs text-[#786c5e] mt-0.5">
                Complimentary throughout DHA, Clifton, and central Karachi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asad Farooq"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0321-1234567"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. asad@gmail.com"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Karachi Neighborhood *</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                >
                  {karachiAreas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-stone-800 mb-1">Exact Street Address & Landmark *</label>
              <input
                type="text"
                required
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="e.g. House 44-B, 12th Commercial Street, Phase 2 Ext, DHA"
                className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Time Slot *</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                >
                  <option value="Morning (11:00 AM – 2:00 PM)">Morning (11:00 AM – 2:00 PM)</option>
                  <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                  <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Approx. Floor Area (sq ft)</label>
                <input
                  type="text"
                  value={approxSqFt}
                  onChange={(e) => setApproxSqFt(e.target.value)}
                  placeholder="e.g. 1,500"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            {/* Materials of interest selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800">
                Which Material Swatches Should the Technician Bring?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {availableMaterials.map((mat) => (
                  <button
                    type="button"
                    key={mat}
                    onClick={() => toggleMaterial(mat)}
                    className={`p-2.5 rounded-sm border text-left flex items-center justify-between transition-colors ${
                      materialsOfInterest.includes(mat)
                        ? 'border-[#7b5731] bg-[#faf7f0] text-[#241c15] font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span>{mat}</span>
                    {materialsOfInterest.includes(mat) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7b5731]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-stone-800 mb-1">Special Site Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Existing surface is marble chips; 3 bedrooms and living lounge."
                className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 bg-[#241c15] hover:bg-[#3d3126] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Confirming Visit...' : 'Confirm Free Site Visit'}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="py-3.5 px-4 bg-[#25d366]/20 text-[#136630] border border-emerald-500/30 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Book via WhatsApp</span>
              </button>
            </div>
          </form>

          {/* Right: What to Expect & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#f4eee1] rounded-xl border border-[#ded5be] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#241c15]">
                What Happens During the Site Visit?
              </h3>

              <div className="space-y-3 text-xs text-[#594d40]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#241c15] text-[#c98d4d] flex items-center justify-center shrink-0 font-bold text-[10px]">
                    1
                  </div>
                  <div>
                    <strong className="text-[#241c15] block">Digital Laser Precision:</strong>
                    Exact room geometry and door perimeter scanned down to the millimeter.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#241c15] text-[#c98d4d] flex items-center justify-center shrink-0 font-bold text-[10px]">
                    2
                  </div>
                  <div>
                    <strong className="text-[#241c15] block">Subfloor Moisture Testing:</strong>
                    Electronic pin sensors test concrete dampness to prevent marine swelling.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#241c15] text-[#c98d4d] flex items-center justify-center shrink-0 font-bold text-[10px]">
                    3
                  </div>
                  <div>
                    <strong className="text-[#241c15] block">Physical Swatch Testing in Your Light:</strong>
                    Lay full planks on your existing floors to evaluate daylight and warm evening lighting.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#241c15] text-[#c98d4d] flex items-center justify-center shrink-0 font-bold text-[10px]">
                    4
                  </div>
                  <div>
                    <strong className="text-[#241c15] block">Instant On-Site Quotation:</strong>
                    Fixed PKR price with guaranteed box count, zero hidden wastage surprises.
                  </div>
                </div>
              </div>
            </div>

            {/* Showroom Direct Info Card */}
            <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#241c15]">Prefer to visit our Showroom first?</h4>
              <p className="text-xs text-[#786c5e]">
                Walk onto large floor mockups at <strong>20 C, 26th Street, DHA Phase 5, Karachi</strong>.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7b5731] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Showroom: {siteConfig.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
