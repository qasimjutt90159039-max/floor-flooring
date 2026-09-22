import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Shield,
  Layers,
  Facebook,
  Instagram,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1f1812] text-[#d8cdb8] border-t border-[#3c3127] pt-14 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#3c3127]/80 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#2b221a] text-[#c98d4d] border border-[#c98d4d]/30 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">DHA Karachi Showroom</h4>
              <p className="text-[#a49684] mt-0.5">20 C, 26th Street, Phase 5 Tauheed Commercial</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#2b221a] text-[#c98d4d] border border-[#c98d4d]/30 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Complimentary Site Visit</h4>
              <p className="text-[#a49684] mt-0.5">Laser room measuring & swatch box across Karachi</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#2b221a] text-[#c98d4d] border border-[#c98d4d]/30 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Up to 25-Year Warranty</h4>
              <p className="text-[#a49684] mt-0.5">German & European certified surface durability</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#2b221a] text-[#c98d4d] border border-[#c98d4d]/30 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">100% Turnkey Fitting</h4>
              <p className="text-[#a49684] mt-0.5">In-house master installers with moisture tests</p>
            </div>
          </div>
        </div>

        {/* Primary Footer Links & Showroom Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand & Showroom Information */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center gap-3 select-none"
            >
              <div className="w-9 h-9 rounded-sm bg-[#2c2219] text-[#c98d4d] flex items-center justify-center border border-[#c98d4d]/40">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-tight text-white leading-none">
                  FIRST FLOOR
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#a49684] mt-0.5">
                  Floorings • Karachi
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a49684] leading-relaxed max-w-sm">
              Pakistan’s premier architectural flooring showroom and surface atelier. Specializing in 100% waterproof SPC luxury vinyl, German AC5 laminate, European engineered timber, and composite outdoor surfaces.
            </p>

            <div className="space-y-2 text-xs text-[#a49684]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c98d4d] shrink-0 mt-0.5" />
                <span>{siteConfig.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c98d4d] shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#c98d4d] shrink-0" />
                <span>{siteConfig.openingHours.weekdays}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2b221a] hover:bg-[#3d3126] text-[#c98d4d] flex items-center justify-center transition-colors border border-[#3c3127]"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2b221a] hover:bg-[#3d3126] text-[#c98d4d] flex items-center justify-center transition-colors border border-[#3c3127]"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#25d366]/20 hover:bg-[#25d366]/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
              >
                <span className="font-bold">●</span> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: Material Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Flooring Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Vinyl (SPC/WPC) Waterproof
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Laminate Flooring AC4/AC5
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Engineered European Oak
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Burmese Teak Hardwood
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Herringbone & Chevron
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Commercial Carpet Tiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Outdoor WPC Decking & Grass
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Services */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white transition-colors font-medium text-[#c98d4d]"
                >
                  Flooring Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visualizer')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Room Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('site-visit')}
                  className="hover:text-white transition-colors"
                >
                  Book Karachi Site Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('samples')}
                  className="hover:text-white transition-colors"
                >
                  Order Material Swatch Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-program')}
                  className="hover:text-white transition-colors"
                >
                  Architects & Trade Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('installation-guide')}
                  className="hover:text-white transition-colors"
                >
                  Installation & Subfloor Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="hover:text-white transition-colors"
                >
                  Compare Flooring Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Care & Quick Portal */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Client Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('track-order')}
                  className="hover:text-white transition-colors"
                >
                  Track Order / Ticket Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Showroom Directions & Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors"
                >
                  Karachi Flooring Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors"
                >
                  Customer Account Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors text-[#a49684] opacity-80"
                >
                  Showroom Admin Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3c3127] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#857766]">
          <p>© {new Date().getFullYear()} First Floor Floorings. All Rights Reserved. DHA Phase 5, Karachi.</p>
          <div className="flex items-center gap-4">
            <span>Payment Accepted: Meezan Bank • JazzCash • Easypaisa • COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
