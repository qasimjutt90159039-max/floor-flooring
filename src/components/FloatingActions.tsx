import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, Calendar, Calculator, Sparkles } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface FloatingActionsProps {
  onNavigate: (page: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onNavigate }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#241c15] text-[#f4eee1] flex items-center justify-center shadow-lg hover:bg-[#3d3023] transition-all hover:scale-105"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 text-[#c98d4d]" />
        </button>
      )}

      {/* Quick Calculator Action */}
      <button
        onClick={() => onNavigate('calculator')}
        className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white text-[#241c15] border border-[#ded5be] shadow-lg hover:bg-[#faf7f0] transition-all hover:scale-105 text-xs font-semibold"
      >
        <Calculator className="w-4 h-4 text-[#7b5731]" />
        <span>Cost Calc</span>
      </button>

      {/* Book Karachi Site Visit Floating Pill */}
      <button
        onClick={() => onNavigate('site-visit')}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#7b5731] hover:bg-[#634526] text-white shadow-xl transition-all hover:scale-105 text-xs font-semibold border border-[#a2784d]"
      >
        <Calendar className="w-4 h-4 text-[#e8caa4]" />
        <span>Book Site Visit</span>
      </button>

      {/* Direct WhatsApp Callout */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 relative group"
        title="Chat with First Floor Floorings on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#241c15] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          WhatsApp Showroom
        </span>
      </a>
    </div>
  );
};
