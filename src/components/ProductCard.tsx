import React, { useState } from 'react';
import {
  Heart,
  Compass,
  Check,
  Droplets,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Plus
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { formatPKR } from '../config/siteConfig';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, slug?: string) => void;
  priceDisplayMode?: 'sqft' | 'box';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  priceDisplayMode = 'sqft'
}) => {
  const { addToCart, addSample, sampleItems } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { isInCompare, toggleCompare } = useCompare();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants && product.variants.length > 0 ? product.variants[0] : {
      id: 'default',
      name: 'Standard',
      colorName: 'Standard',
      colorHex: '#c79c6e',
      thickness: product.thickness,
      pricePerSqFt: product.pricePerSqFt,
      pricePerBox: product.pricePerBox,
      coveragePerBox: product.coveragePerBox,
      sku: product.sku,
      stockBoxes: product.stockBoxes,
      image: product.thumbnail
    }
  );

  const [addedAnimation, setAddedAnimation] = useState(false);
  const [sampleAdded, setSampleAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const compared = isInCompare(product.id);
  const isSampleSelected = sampleItems.some(s => s.productId === product.id);

  const handleQuickAddBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleOrderSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = addSample(product, selectedVariant);
    if (added) {
      setSampleAdded(true);
      setTimeout(() => setSampleAdded(false), 2000);
    }
  };

  const displayPriceSqFt = selectedVariant.pricePerSqFt;
  const displayPriceBox = selectedVariant.pricePerBox;
  const displayCoverage = selectedVariant.coveragePerBox;

  return (
    <div
      onClick={() => onNavigate('product-detail', product.slug)}
      className="group bg-white rounded-lg border border-[#e5dec9] hover:border-[#7b5731] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-lg"
    >
      {/* Visual Image & Badges Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#f4eee1]">
        <img
          src={selectedVariant.image || product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#241c15] text-[#f4eee1] shadow-xs">
            {product.materialType}
          </span>
          {product.waterResistance === '100% Waterproof' && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold flex items-center gap-1 bg-[#1e4620] text-emerald-100 shadow-xs">
              <Droplets className="w-2.5 h-2.5" /> 100% Waterproof
            </span>
          )}
          {product.onSale && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#a0471d] text-white">
              Sale
            </span>
          )}
        </div>

        {/* Quick Top Right Action Icons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
              isFavorited
                ? 'bg-red-50 text-red-600'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
              compared
                ? 'bg-[#7b5731] text-white'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#7b5731]'
            }`}
            title="Compare Material"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Thickness & Spec Chip overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white">
            {product.thickness}
          </span>
          {product.specs?.warrantyYears && (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-medium bg-black/60 backdrop-blur-xs text-stone-200">
              {product.specs.warrantyYears}y Warranty
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Swatch Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(v);
                  }}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    selectedVariant.id === v.id
                      ? 'border-[#7b5731] scale-110 shadow-xs'
                      : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.colorHex || '#bbb' }}
                  title={`${v.name} - ${v.colorName}`}
                />
              ))}
              <span className="text-[10px] text-stone-500 font-sans ml-1">
                {product.variants.length} tones
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-[#241c15] leading-snug line-clamp-2 group-hover:text-[#7b5731] transition-colors mb-1">
            {product.title}
          </h3>

          <p className="text-[11px] text-[#786c5e] mb-3">
            Finish: {product.finish} • SKU: {selectedVariant.sku}
          </p>
        </div>

        {/* Pricing & Box Calculation Section */}
        <div className="pt-2 border-t border-[#f0ead8]">
          <div className="flex items-baseline justify-between mb-1">
            <div>
              <span className="font-serif text-lg font-bold text-[#241c15]">
                {formatPKR(displayPriceSqFt)}
              </span>
              <span className="text-xs text-[#786c5e] font-sans"> / sq ft</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#7b5731]">
                {formatPKR(displayPriceBox)}
              </span>
              <span className="text-[10px] text-[#8c7f6f] block">
                box ({displayCoverage} sq ft)
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleOrderSample}
              className={`py-1.5 px-2 rounded-xs text-[11px] font-semibold border transition-all flex items-center justify-center gap-1 ${
                isSampleSelected || sampleAdded
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'border-[#cfc0a6] text-[#594d40] hover:bg-[#ede5d3]'
              }`}
            >
              {isSampleSelected || sampleAdded ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Sample Added</span>
                </>
              ) : (
                <span>Free Sample</span>
              )}
            </button>

            <button
              onClick={handleQuickAddBox}
              className={`py-1.5 px-2 rounded-xs text-[11px] font-semibold text-white transition-all flex items-center justify-center gap-1 ${
                addedAnimation
                  ? 'bg-emerald-700'
                  : 'bg-[#241c15] hover:bg-[#3d3126]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  <span>Box Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 text-[#c98d4d]" />
                  <span>Add Box</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
