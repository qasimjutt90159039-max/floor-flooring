import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { getWhatsAppLink, siteConfig } from '../config/siteConfig';

interface FaqPageProps {
  onNavigate: (page: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can SPC vinyl flooring be installed directly over existing marble or chips in Karachi villas?',
      a: 'Yes, absolutely! SPC (Stone Plastic Composite) is rigid and engineered specifically for overlay installation. As long as the existing tile, marble, or terrazzo floor is clean, firmly bonded, and reasonably level, our technicians can lay the planks directly on top with acoustic underlayment without having to break or demo your existing floor. This eliminates dust, demolition costs, and debris.'
    },
    {
      q: 'Why is flooring sold by the carton (box) instead of loose square feet?',
      a: 'Flooring planks are manufactured and packaged in sealed factory cartons with protective corner cushioning to protect the precision-engineered click-lock tongue and groove joints during transport. Opening cartons damages the precision joints, so we calculate the exact number of sealed boxes needed for your room plus a 10% wastage allowance.'
    },
    {
      q: 'What is the exact difference between SPC Vinyl and AC4/AC5 German Laminate?',
      a: 'SPC Vinyl has a 100% waterproof limestone-polymer core that cannot swell or absorb moisture, making it ideal for coastal Karachi areas, kitchens, basements, and pet-friendly homes. Laminate has an ultra-dense HDF wood-fiber core with a diamond-hard melamine wear surface, providing exceptional scratch resistance and authentic warm timber acoustic reverberation.'
    },
    {
      q: 'Do you charge for site visits and laser measurements in Karachi?',
      a: 'No! Our site visit service is 100% complimentary throughout DHA Phase 1–8, Clifton, PECHS, KDA Scheme 1, and central Karachi. Our technician visits your location equipped with digital laser distance meters, electronic concrete moisture testers, and a custom swatch box of physical planks for you to inspect in your home’s natural light.'
    },
    {
      q: 'What is included in the Karachi Turnkey Installation rate (Rs. 40/sq ft)?',
      a: 'Our turnkey installation service includes subfloor sweep and level inspection, moisture barrier/underlayment placement, precision laser plank alignment, expansion gap management (8-10mm perimeter), and door height trimming if necessary. Master click-lock fitting is executed dust-free in 1 to 2 days.'
    },
    {
      q: 'Where is your showroom located, and what are your opening hours?',
      a: 'Our flagship architectural atelier is located at 20 C, 26th Street, DHA Phase 5, Tauheed Commercial Area, Karachi. We are open Monday through Saturday from 10:30 AM to 09:30 PM. On Sundays, private appointments can be scheduled for architects and interior designers.'
    },
    {
      q: 'How does the Free Swatch Box program work?',
      a: 'You can select up to 5 material swatches on our website. We package them into an architectural sample box and dispatch them via local courier directly to your doorstep in Karachi with complimentary delivery.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          Knowledge Base
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#241c15]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#786c5e]">
          Answers to technical specifications, subfloor readiness, box packaging, and Karachi installation protocols.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#ded5be] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#241c15] hover:text-[#7b5731] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-[#7b5731]" /> : <ChevronDown className="w-5 h-5 shrink-0 text-stone-400" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#5c5043] leading-relaxed border-t border-stone-100 font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-8 bg-[#faf7f0] rounded-xl border border-[#ded5be] text-center space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#241c15]">
          Have a unique architectural specification question?
        </h3>
        <p className="text-xs text-[#786c5e] max-w-md mx-auto">
          Our senior flooring consultants in DHA Karachi are ready to assist you via WhatsApp or phone.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25d366] hover:bg-[#20ba59] text-white rounded-sm text-xs font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold hover:bg-[#34271c]"
          >
            Visit Showroom
          </button>
        </div>
      </div>
    </div>
  );
};
