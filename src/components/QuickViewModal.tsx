import React, { useState } from 'react';
import {
  X,
  Droplets,
  Layers,
  Shield,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Calculator,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { formatPKR, siteConfig } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  isOpen?: boolean;
  product: Product | null;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  product,
  onClose,
  onNavigate
}) => {
  const { addToCart, addSample, sampleItems } = useCart();
  const [boxes, setBoxes] = useState(1);

  if (isOpen === false || !product) return null;

  const totalSqFt = Math.round(boxes * (product.coveragePerBox || 20) * 10) / 10;
  const totalPrice = boxes * product.pricePerBox;
  const isSampleAdded = sampleItems.some(s => s.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, undefined, boxes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-print">
      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#241c15]/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative inline-block w-full max-w-2xl bg-white rounded-xl text-left overflow-hidden shadow-2xl border border-[#ded5be] z-10 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Stage */}
            <div className="relative bg-[#faf7f0] aspect-square md:aspect-auto">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="px-2.5 py-1 rounded-xs bg-[#241c15] text-[#c98d4d] text-[10px] font-bold uppercase tracking-wider">
                  {product.materialType}
                </span>
                {product.waterResistance === '100% Waterproof' && (
                  <span className="px-2 py-0.5 rounded-xs bg-emerald-800 text-white text-[9px] font-bold flex items-center gap-1">
                    <Droplets className="w-3 h-3" /> 100% Waterproof
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
                    {product.brand} • {product.specs?.origin || 'Karachi Stock'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#241c15] leading-snug mt-0.5">
                    {product.title}
                  </h3>
                </div>

                {/* Dual Pricing */}
                <div className="p-3 bg-[#faf7f0] rounded-lg border border-[#ded5be] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Square Foot</span>
                    <span className="font-serif text-xl font-bold text-[#7b5731]">
                      {formatPKR(product.pricePerSqFt)}
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans"> / sq ft</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Sealed Carton</span>
                    <span className="font-serif text-base font-bold text-stone-900">
                      {formatPKR(product.pricePerBox)}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      ({product.coveragePerBox} sq ft/box)
                    </span>
                  </div>
                </div>

                {/* Specs bullets */}
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                  <div className="p-2 rounded-xs bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-400 block uppercase">Thickness</span>
                    <span className="font-semibold">{product.thickness}</span>
                  </div>
                  <div className="p-2 rounded-xs bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-400 block uppercase">Installation</span>
                    <span className="font-semibold truncate block">{product.specs?.installationMethod || 'Click-Lock'}</span>
                  </div>
                </div>

                {/* Box Selector */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">Select Box Quantity:</span>
                    <span className="text-[#7b5731] font-semibold">{totalSqFt} sq ft total</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                      <button
                        onClick={() => setBoxes(Math.max(1, boxes - 1))}
                        className="p-2 hover:bg-stone-100 text-stone-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-bold text-xs font-mono">{boxes}</span>
                      <button
                        onClick={() => setBoxes(boxes + 1)}
                        className="p-2 hover:bg-stone-100 text-stone-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-serif font-bold text-base text-[#241c15]">
                      {formatPKR(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-[#241c15] hover:bg-[#382b20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c98d4d]" />
                  <span>Add {boxes} Carton{boxes > 1 ? 's' : ''} to Cart</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => addSample(product)}
                    className="flex-1 py-2 bg-[#f4eee1] hover:bg-[#ede5d3] text-[#241c15] rounded-sm text-[11px] font-bold border border-[#ded5be] flex items-center justify-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#7b5731]" />
                    <span>{isSampleAdded ? 'Sample in Box' : 'Free Sample'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('product-detail', product.slug);
                    }}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-sm text-[11px] font-bold flex items-center justify-center gap-1"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
