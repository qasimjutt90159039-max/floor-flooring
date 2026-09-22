import React from 'react';
import {
  Wrench,
  Droplets,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface InstallationGuidePageProps {
  onNavigate: (page: string) => void;
}

export const InstallationGuidePage: React.FC<InstallationGuidePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          Technical Handbook
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Subfloor Preparation & Installation Protocol
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e]">
          Engineered best practices for laying click-lock SPC vinyl, laminate, and hardwood in Karachi’s coastal humidity.
        </p>
      </div>

      {/* Warning Box for Karachi Climate */}
      <div className="p-6 bg-[#f4eee1] rounded-xl border border-[#ded5be] flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-[#7b5731] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#524434]">
          <h3 className="font-serif text-sm font-bold text-[#241c15]">
            Karachi Coastal Moisture Notice (DHA & Clifton)
          </h3>
          <p className="leading-relaxed">
            Due to the proximity of the Arabian Sea, subfloors in Karachi can experience vapor pressure from concrete slabs. Always install our 0.2mm heavy-duty polyethylene vapor barrier over ground-floor slabs before laying underlayment, and maintain an <strong>8mm to 10mm expansion perimeter</strong> under skirting boards.
          </p>
        </div>
      </div>

      {/* 4 Phases of Installation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b5731]">Phase 01</span>
          <h3 className="font-serif text-base font-bold text-[#241c15]">
            Subfloor Leveling & Moisture Inspection
          </h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Ensure the subfloor is flat within 3mm across a 2-meter straight edge. Existing ceramic tile or marble can serve as an ideal base if grout lines do not exceed 4mm in depth. Grind down high points and fill hollow depressions with self-leveling compound.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b5731]">Phase 02</span>
          <h3 className="font-serif text-base font-bold text-[#241c15]">
            Carton Acclimatization (24–48 Hours)
          </h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Store unopened cartons flat in the room of installation for 48 hours prior to fitting. This allows the planks to equalize to the ambient room temperature and relative humidity of your living space.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b5731]">Phase 03</span>
          <h3 className="font-serif text-base font-bold text-[#241c15]">
            Underlayment & Acoustic Pad Alignment
          </h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            If your product does not feature an integrated IXPE pad, lay 1.5mm to 2mm high-density acoustic underlayment butt-jointed with aluminum tape. Do not overlap underlayment seams to avoid uneven ridges.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b5731]">Phase 04</span>
          <h3 className="font-serif text-base font-bold text-[#241c15]">
            Uniclic Precision Engagement
          </h3>
          <p className="text-xs text-[#786c5e] leading-relaxed">
            Begin installation from the longest unobstructed wall. Angle the tongue into the groove at approximately 25 degrees and press down gently until the joint clicks shut flush. Stagger plank end joints by at least 30cm between adjacent rows.
          </p>
        </div>
      </div>

      {/* Turnkey Fitting CTA */}
      <div className="p-8 bg-[#241c15] text-[#f4eee1] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="font-serif text-xl font-bold text-white">
            Prefer Professional Turnkey Fitting by Master Installers?
          </h3>
          <p className="text-xs text-[#a49684]">
            Our in-house Karachi installation teams handle everything from door trimming to laser alignment at just Rs. {siteConfig.standardInstallationRateSqFt}/sq ft.
          </p>
        </div>

        <button
          onClick={() => onNavigate('site-visit')}
          className="px-6 py-3.5 bg-[#f4eee1] text-[#241c15] rounded-sm text-xs font-serif font-bold uppercase tracking-wider hover:bg-white transition-colors shrink-0"
        >
          Book Karachi Installation
        </button>
      </div>
    </div>
  );
};
