import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Layers,
  Sun,
  Moon,
  RotateCw,
  Calculator,
  ArrowRight,
  Check,
  Maximize2
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/siteConfig';

interface VisualizerPageProps {
  products: Product[];
  initialProductSlug?: string;
  onNavigate: (page: string, slug?: string) => void;
}

export const VisualizerPage: React.FC<VisualizerPageProps> = ({
  products,
  initialProductSlug,
  onNavigate
}) => {
  const { addSample, sampleItems } = useCart();

  const rooms = [
    {
      id: 'living',
      name: 'DHA Coastal Living Room',
      baseImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      lightTone: 'Warm Afternoon Sun'
    },
    {
      id: 'bedroom',
      name: 'Master Sanctuary Bedroom',
      baseImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4b8e?q=80&w=1200&auto=format&fit=crop',
      lightTone: 'Soft Morning Light'
    },
    {
      id: 'kitchen',
      name: 'Minimalist Monolith Kitchen',
      baseImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
      lightTone: 'Bright Studio Daylight'
    },
    {
      id: 'office',
      name: 'Executive Architectural Chamber',
      baseImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      lightTone: 'Subdued Warm Glow'
    }
  ];

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    if (initialProductSlug) {
      const match = products.find(p => p.slug === initialProductSlug || p.id === initialProductSlug);
      if (match) return match;
    }
    return products[0] || ({} as any);
  });
  const [pattern, setPattern] = useState<'straight' | 'herringbone' | 'chevron' | 'cassette'>('straight');
  const [lighting, setLighting] = useState<'daylight' | 'warm' | 'evening'>('warm');
  const [splitPosition, setSplitPosition] = useState<number>(50);

  // Sync if initialProductSlug updates
  React.useEffect(() => {
    if (initialProductSlug) {
      const match = products.find(p => p.slug === initialProductSlug || p.id === initialProductSlug);
      if (match) {
        setSelectedProduct(match);
        if (match.slug.includes('chevron')) {
          setPattern('chevron');
        } else if (match.slug.includes('herringbone')) {
          setPattern('herringbone');
        } else if (match.slug.includes('versailles')) {
          setPattern('cassette');
        }
      }
    }
  }, [initialProductSlug, products]);

  const isSampleSelected = sampleItems.some(s => s.productId === selectedProduct.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 pb-4 border-b border-[#ded5be]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 3D Architectural Surface Studio
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241c15] mt-1">
            Interactive Room Visualizer
          </h1>
          <p className="text-xs text-[#786c5e] mt-1">
            Test real plank tones, textures, and patterns directly in luxury residential settings before ordering.
          </p>
        </div>

        {/* Selected Material Quick Summary */}
        {selectedProduct && (
          <div className="p-3 bg-white rounded-lg border border-[#e5dec9] flex items-center gap-3 shadow-xs">
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-12 h-12 object-cover rounded-sm border border-stone-200"
            />
            <div>
              <span className="font-serif text-xs font-bold text-[#241c15] block line-clamp-1">
                {selectedProduct.title}
              </span>
              <span className="text-xs text-[#7b5731] font-bold">
                {formatPKR(selectedProduct.pricePerSqFt)}/sq ft
              </span>
              <span className="text-[10px] text-stone-500 block">
                {formatPKR(selectedProduct.pricePerBox)} / box ({selectedProduct.coveragePerBox} sq ft)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Visualizer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Viewport Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-900 border border-[#ded5be] shadow-lg group">
            {/* Visualizer Image Canvas */}
            <img
              src={activeRoom.baseImage}
              alt={activeRoom.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                lighting === 'warm' ? 'brightness-95 sepia-[0.15]' : lighting === 'evening' ? 'brightness-75 contrast-125' : 'brightness-105'
              }`}
            />

            {/* Projected Floor Overlay Simulation */}
            <div
              className={`absolute inset-x-0 bottom-0 h-1/2 pointer-events-none transition-all duration-500 mix-blend-overlay opacity-80 ${
                pattern === 'herringbone'
                  ? 'bg-[radial-gradient(#241c15_2px,transparent_2px)] [background-size:16px_16px]'
                  : pattern === 'chevron'
                  ? 'bg-[repeating-linear-gradient(45deg,#241c15,#241c15_2px,transparent_2px,transparent_16px)]'
                  : pattern === 'cassette'
                  ? 'bg-[linear-gradient(to_right,#241c15_1px,transparent_1px),linear-gradient(to_bottom,#241c15_1px,transparent_1px)] [background-size:28px_28px]'
                  : ''
              }`}
              style={{
                backgroundImage: `url(${selectedProduct.thumbnail})`,
                backgroundSize: pattern === 'herringbone' ? '120px' : pattern === 'chevron' ? '140px' : pattern === 'cassette' ? '180px' : '220px',
                backgroundRepeat: 'repeat',
                transform: pattern === 'chevron' ? 'perspective(500px) rotateX(48deg) rotate(22deg) scale(1.5)' : 'perspective(500px) rotateX(45deg) scale(1.4)',
                transformOrigin: 'bottom'
              }}
            />

            {/* Room Name & Specs Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-xs text-white">
                {activeRoom.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/50 backdrop-blur-xs text-stone-200">
                Pattern: {
                  pattern === 'chevron' ? 'French Chevron 45°' :
                  pattern === 'herringbone' ? 'Herringbone Parquet 90°' :
                  pattern === 'cassette' ? 'Versailles Cassette / Tile' : 'Straight Staggered Planks'
                } • Light: {lighting}
              </span>
            </div>

            {/* Floating Quick Action CTA on Visualizer */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => addSample(selectedProduct)}
                className="px-3 py-2 bg-white/95 hover:bg-white text-[#241c15] text-xs font-bold rounded-sm shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Layers className="w-3.5 h-3.5 text-[#7b5731]" />
                <span>{isSampleSelected ? 'Sample in Basket' : 'Order Free Swatch'}</span>
              </button>

              <button
                onClick={() => onNavigate('product-detail', selectedProduct.slug)}
                className="px-3 py-2 bg-[#241c15]/95 hover:bg-[#241c15] text-white text-xs font-bold rounded-sm shadow-md flex items-center gap-1.5"
              >
                <span>View Specs</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c98d4d]" />
              </button>
            </div>
          </div>

          {/* Controls Bar: Room Selector + Lighting + Pattern */}
          <div className="p-4 bg-white rounded-lg border border-[#e5dec9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Rooms */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                Select Scene
              </label>
              <select
                value={activeRoom.id}
                onChange={(e) => setActiveRoom(rooms.find(r => r.id === e.target.value) || rooms[0])}
                className="w-full p-2 bg-[#faf7f0] border border-stone-300 rounded-sm font-semibold text-stone-900"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Pattern Mode */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                Plank & Tile Layout
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setPattern('straight')}
                  className={`py-1.5 px-2 rounded-sm border text-[11px] font-semibold ${
                    pattern === 'straight' ? 'bg-[#241c15] text-white border-[#241c15]' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Straight
                </button>
                <button
                  onClick={() => setPattern('herringbone')}
                  className={`py-1.5 px-2 rounded-sm border text-[11px] font-semibold ${
                    pattern === 'herringbone' ? 'bg-[#241c15] text-white border-[#241c15]' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Herringbone 90°
                </button>
                <button
                  onClick={() => setPattern('chevron')}
                  className={`py-1.5 px-2 rounded-sm border text-[11px] font-semibold ${
                    pattern === 'chevron' ? 'bg-[#241c15] text-white border-[#241c15]' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Chevron 45°
                </button>
                <button
                  onClick={() => setPattern('cassette')}
                  className={`py-1.5 px-2 rounded-sm border text-[11px] font-semibold ${
                    pattern === 'cassette' ? 'bg-[#241c15] text-white border-[#241c15]' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Versailles / Tile
                </button>
              </div>
            </div>

            {/* Lighting Tone */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                Lighting Atmosphere
              </label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setLighting('daylight')}
                  className={`flex-1 py-1.5 px-1 rounded-sm border text-[11px] font-semibold ${
                    lighting === 'daylight' ? 'bg-[#241c15] text-white' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Daylight
                </button>
                <button
                  onClick={() => setLighting('warm')}
                  className={`flex-1 py-1.5 px-1 rounded-sm border text-[11px] font-semibold ${
                    lighting === 'warm' ? 'bg-[#7b5731] text-white' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Warm Glow
                </button>
                <button
                  onClick={() => setLighting('evening')}
                  className={`flex-1 py-1.5 px-1 rounded-sm border text-[11px] font-semibold ${
                    lighting === 'evening' ? 'bg-stone-800 text-white' : 'bg-[#faf7f0] text-stone-700 border-stone-300'
                  }`}
                >
                  Evening
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Surface Palette Swatches */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#ded5be] p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-serif text-sm font-bold text-[#241c15]">
              Available Flooring Palettes
            </h3>
            <span className="text-[11px] text-[#786c5e] font-sans">
              {products.length} Designs
            </span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {products.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-[#7b5731] bg-[#faf6ee] shadow-xs'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-14 h-14 object-cover rounded-sm border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#241c15] truncate">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-[#786c5e]">
                      {p.materialType} • {p.thickness}
                    </p>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xs font-bold text-[#7b5731]">
                        {formatPKR(p.pricePerSqFt)}/sq ft
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {p.coveragePerBox} sq ft/box
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => onNavigate('calculator')}
              className="w-full py-2.5 bg-[#f4eee1] hover:bg-[#ede5d3] text-[#241c15] text-xs font-bold rounded-sm border border-[#cfc0a6] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-[#7b5731]" />
              <span>Calculate Required Boxes for This Surface</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
