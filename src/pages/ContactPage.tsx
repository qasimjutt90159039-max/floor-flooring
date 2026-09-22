import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Layers,
  Facebook,
  Instagram,
  ArrowRight
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          DHA Karachi Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Visit Our Showroom & Experience Centre
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e]">
          Consult with our senior surface architects, walk onto full floor mockups, and evaluate custom wire-brushed finishes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Showroom Details & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-6 shadow-xs">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#241c15]">
                Showroom Coordinates
              </h3>
              <p className="text-xs text-[#786c5e] mt-0.5">
                Conveniently located in Tauheed Commercial, DHA Phase 5.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#594d40]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#241c15] block text-sm font-serif">Flagship Address:</strong>
                  <p className="mt-0.5 leading-relaxed">{siteConfig.address.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#241c15] block text-sm font-serif">Direct Telephony:</strong>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[#241c15] font-semibold">
                    {siteConfig.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#faf7f0] border border-[#ded5be] text-[#7b5731] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#241c15] block text-sm font-serif">Visiting Hours:</strong>
                  <p className="mt-0.5">Monday – Saturday: 10:30 AM – 09:30 PM</p>
                  <p className="text-stone-500">Sunday: Closed (Private Architectural Bookings by Appointment)</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25d366] hover:bg-[#20ba59] text-white rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate('site-visit')}
                className="w-full py-3 bg-[#241c15] hover:bg-[#382b20] text-white rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#c98d4d]" />
                <span>Book In-Home Site Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Message Inquiry Form & Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-xl border border-[#ded5be] shadow-xs">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#241c15]">Message Received</h3>
                <p className="text-xs text-[#786c5e]">
                  Thank you, {name}. A member of our architectural team will reach out via WhatsApp or phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#241c15]">
                  Send an Inquiry to Showroom Management
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zainab Siddiqui"
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
                      placeholder="e.g. 0321-35304261"
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. zainab@gmail.com"
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                    >
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Karachi Installation Request">Karachi Installation Request</option>
                      <option value="Architect & Trade Partnership">Architect & Trade Partnership</option>
                      <option value="Showroom Private Appointment">Showroom Private Appointment</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-stone-800 mb-1">Project Details / Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your room dimensions, preferred aesthetic, or questions..."
                    className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#241c15] hover:bg-[#392c20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map Visual */}
          <div className="p-4 bg-white rounded-xl border border-[#ded5be] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#241c15]">
              <span>DHA Phase 5 Map Location:</span>
              <a
                href={`https://maps.google.com/?q=${siteConfig.geo.lat},${siteConfig.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7b5731] hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="aspect-16/9 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 relative">
              <iframe
                title="First Floor Floorings Showroom Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.5794827599026!2d67.0423163!3d24.8102636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d9804e12345%3A0x9876543210abcdef!2sTauheed%20Commercial%20Area%20Defence%20V%20Karachi!5e0!3m2!1sen!2spk!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
