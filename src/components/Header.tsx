import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Compass,
  Calculator,
  Calendar,
  Layers,
  Sparkles,
  User,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { siteConfig, getWhatsAppLink, formatPKR } from '../config/siteConfig';
import { Product } from '../types';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage?: string;
  activePage?: string;
  onOpenCart: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage: propCurrentPage,
  activePage,
  onOpenCart,
  onOpenSearch
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { totalBoxes, subtotal, sampleItems } = useCart();
  const { user, isAdmin, wishlist } = useAuth();
  const { compareList } = useCompare();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products/search/autocomplete?q=${encodeURIComponent(searchQuery.trim())}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.suggestions || []);
          setShowResults(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Atelier Home' },
    { id: 'shop', label: 'Collections' },
    { id: 'visualizer', label: 'Room Visualizer' },
    { id: 'calculator', label: 'Coverage Calculator' },
    { id: 'site-visit', label: 'Karachi Site Visit' },
    { id: 'samples', label: `Samples (${sampleItems.length})` },
    { id: 'trade-program', label: 'Architects & Trade' },
    { id: 'contact', label: 'Showroom' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5] border-b border-[#e5dec9]/60 shadow-xs">
      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          <div className="w-10 h-10 rounded-sm bg-[#241c15] text-[#c98d4d] flex items-center justify-center border border-[#c98d4d]/40 group-hover:bg-[#34281f] transition-colors shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241c15] leading-none">
              FIRST FLOOR
            </span>
            <span className="block text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-[#786c5e] mt-0.5">
              Floorings • Karachi
            </span>
          </div>
        </div>

        {/* Global Search with Autocomplete */}
        <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
              placeholder="Search SPC vinyl, German laminate, herringbone..."
              className="w-full bg-[#f2ecde]/80 text-[#241c15] placeholder-[#8c7f6f] text-sm pl-10 pr-4 py-2 rounded-full border border-[#ded5be] focus:outline-none focus:border-[#7b5731] focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#8c7f6f] absolute left-3.5 top-3" />
            {isSearching && (
              <span className="w-3.5 h-3.5 border-2 border-[#7b5731] border-t-transparent rounded-full animate-spin absolute right-3.5 top-3"></span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#ded5be] py-2 z-50 overflow-hidden">
              <div className="px-3 py-1 text-[11px] uppercase tracking-wider text-[#8c7f6f] font-semibold border-b border-stone-100">
                Found Matching Surfaces
              </div>
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('product-detail', item.slug);
                    setShowResults(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#faf6ee] cursor-pointer transition-colors"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded-sm border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#241c15] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#786c5e]">
                      {item.materialType} • <span className="text-[#a0471d] font-medium">{formatPKR(item.pricePerSqFt)}/sq ft</span>
                    </p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  onNavigate('shop');
                  setShowResults(false);
                }}
                className="px-3 py-2 text-center text-xs text-[#7b5731] font-semibold bg-[#faf6ee] hover:bg-[#f3ebd9] cursor-pointer border-t border-stone-100"
              >
                View all results in Catalog →
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* DHA Showroom Live Chat Pill */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#1b7f3d] transition-all border border-emerald-600/30"
            title="Chat directly with DHA Phase 5 Showroom on WhatsApp"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DHA Showroom</span>
          </a>

          {/* Compare Button */}
          <button
            onClick={() => onNavigate('compare')}
            className="relative p-2 rounded-full text-[#594d40] hover:text-[#241c15] hover:bg-[#ede5d3] transition-colors"
            title="Compare materials"
          >
            <Compass className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7b5731] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Book Site Visit CTA */}
          <button
            onClick={() => onNavigate('site-visit')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#eae0cd] hover:bg-[#ded1bc] text-[#241c15] transition-all border border-[#cfc0a6]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#7b5731]" />
            <span>Book Site Visit</span>
          </button>

          {/* User Account / Admin CTA */}
          <button
            onClick={() => onNavigate(isAdmin ? 'admin' : 'account')}
            className="p-2 rounded-full text-[#594d40] hover:text-[#241c15] hover:bg-[#ede5d3] transition-colors flex items-center gap-1"
            title={user ? user.name : 'Sign In'}
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="hidden xl:inline text-xs font-medium text-[#241c15] max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#241c15] hover:bg-[#382b20] text-white text-xs font-medium transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#c98d4d]" />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[10px] text-[#cfbeaa]">{totalBoxes} Boxes</span>
              <span className="font-semibold text-white">{formatPKR(subtotal)}</span>
            </div>
            {totalBoxes > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#c98d4d] text-[#241c15] text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalBoxes}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#241c15] hover:bg-[#ede5d3] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Architectural Nav Links Bar */}
      <nav className="hidden lg:block bg-[#f4eee1] border-t border-[#ded5be]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`whitespace-nowrap transition-colors pb-0.5 tracking-wide ${
                    isActive
                      ? 'text-[#7b5731] font-bold border-b-2 border-[#7b5731]'
                      : 'text-[#594d40] hover:text-[#241c15]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[#786c5e]">
            <button
              onClick={() => onNavigate('calculator')}
              className="flex items-center gap-1 hover:text-[#241c15] font-semibold text-[#7b5731]"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Flooring Cost Calculator</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f5] border-t border-[#ded5be] px-4 py-4 space-y-3 shadow-xl">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vinyl, laminate, parquet..."
              className="w-full bg-[#f2ecde] text-[#241c15] text-sm pl-10 pr-4 py-2 rounded-lg border border-[#ded5be]"
            />
            <Search className="w-4 h-4 text-[#8c7f6f] absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#241c15] text-white'
                    : 'bg-[#ede5d3] text-[#241c15] hover:bg-[#ded1bc]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#ded5be] flex flex-col gap-2">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2 bg-[#eae0cd] rounded-lg text-xs font-semibold text-[#241c15]"
            >
              <Phone className="w-4 h-4 text-[#7b5731]" />
              Call Showroom: {siteConfig.phoneFormatted}
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 bg-[#25d366]/15 text-[#1b7f3d] rounded-lg text-xs font-semibold"
            >
              <span className="font-bold">●</span> Chat on WhatsApp (+92 321 35304261)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
