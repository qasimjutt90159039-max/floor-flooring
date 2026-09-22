import React, { useState } from 'react';
import {
  Sparkles,
  Building,
  CheckCircle2,
  Layers,
  Phone,
  FileText,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface TradeProgramPageProps {
  onNavigate: (page: string) => void;
}

export const TradeProgramPage: React.FC<TradeProgramPageProps> = ({ onNavigate }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('Architect / Architecture Studio');
  const [projectsPerYear, setProjectsPerYear] = useState('5 - 10 Projects');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) return;
    setRegistered(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          Professional Trade Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#241c15]">
          Architects & Interior Designers Program
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e] leading-relaxed">
          Partner with Pakistan’s premier surface atelier. Access wholesale trade pricing, bespoke European specs, comprehensive architect sample libraries, and dedicated project management.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#241c15]">Exclusive Trade Pricing</h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Registered studios receive tiered commercial discounts up to 20% on factory carton pricing, enabling maximum client value and budget flexibility.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#241c15]">Complimentary Studio Swatch Binder</h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Receive a luxury hardcover sample chest for your design studio, stocked with high-grade SPC, European oak, and herringbone planks.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#241c15]">Technical Field Support</h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Our master technicians handle moisture barrier calculations, subfloor leveling advice, and site supervision across Karachi.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#ded5be] p-6 sm:p-8 shadow-sm">
        {registered ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#241c15]">Trade Application Received!</h3>
            <p className="text-xs text-[#786c5e]">
              Thank you, {contactName}. A dedicated trade representative from our DHA Karachi showroom will contact {companyName} within 24 hours to deliver your studio sample kit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-[#241c15]">
              Register for Trade Credentials & Sample Chest
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Architecture / Design Firm Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Studio Linea Architecture"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Principal / Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ar. Tariq Mansoor"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0321-35304261"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. tariq@studiolinea.pk"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Discipline</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                >
                  <option value="Architect / Architecture Studio">Architect / Architecture Studio</option>
                  <option value="Interior Designer / Decorator">Interior Designer / Decorator</option>
                  <option value="General Contractor / Builder">General Contractor / Builder</option>
                  <option value="Real Estate Developer">Real Estate Developer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Estimated Annual Projects</label>
                <select
                  value={projectsPerYear}
                  onChange={(e) => setProjectsPerYear(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                >
                  <option value="1 - 4 Projects">1 - 4 Projects</option>
                  <option value="5 - 10 Projects">5 - 10 Projects</option>
                  <option value="10+ Projects">10+ Projects</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#241c15] hover:bg-[#392c20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Submit Trade Partnership Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
