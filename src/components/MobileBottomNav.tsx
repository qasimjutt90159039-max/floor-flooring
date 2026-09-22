import React from 'react';
import { Home, Layers, Calculator, Calendar, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileBottomNavProps {
  currentPage?: string;
  activePage?: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenCart?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage: propCurrentPage,
  activePage,
  onNavigate,
  onOpenCart
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { totalBoxes, sampleItems } = useCart();
  const totalCartCount = totalBoxes + sampleItems.length;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ded5be] px-2 py-1.5 flex items-center justify-around shadow-lg no-print">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'home' ? 'text-[#7b5731]' : 'text-stone-500'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Atelier</span>
      </button>

      <button
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'shop' ? 'text-[#7b5731]' : 'text-stone-500'
        }`}
      >
        <Layers className="w-5 h-5 mb-0.5" />
        <span>Surfaces</span>
      </button>

      <button
        onClick={() => onNavigate('calculator')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'calculator' ? 'text-[#7b5731]' : 'text-stone-500'
        }`}
      >
        <Calculator className="w-5 h-5 mb-0.5" />
        <span>Calculator</span>
      </button>

      <button
        onClick={() => onNavigate('site-visit')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'site-visit' ? 'text-[#7b5731]' : 'text-stone-500'
        }`}
      >
        <Calendar className="w-5 h-5 mb-0.5" />
        <span>Site Visit</span>
      </button>

      <button
        onClick={() => onOpenCart ? onOpenCart() : onNavigate('checkout')}
        className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-stone-500"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#241c15] text-[#c98d4d] text-[9px] font-bold rounded-full border border-[#c98d4d]/40 flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>
    </div>
  );
};
