import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Eye,
  Check,
  ArrowRight,
  Shield,
  Droplets,
  Maximize2,
  Calendar,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

interface UniqueFloorStylesExplorerProps {
  products: Product[];
  onNavigate: (page: string, slug?: string) => void;
}

interface StyleItem {
  id: string;
  productSlug: string;
  name: string;
  subtitle: string;
  origin: string;
  patternType: 'Chevron 45°' | 'Versailles Parquet' | 'Terrazzo & Stone' | 'Japanese Charred' | 'Grand Marble Slab' | 'Ultra-Wide Plank' | 'Classic Herringbone';
  dimensions: string;
  coreType: string;
  finish: string;
  waterproofStatus: string;
  climateSuitability: string;
  textureZoomImage: string;
  roomViewImage: string;
  description: string;
  highlightTag: string;
}

const UNIQUE_STYLES: StyleItem[] = [
  {
    id: 'chateau-chevron',
    productSlug: 'chateau-damboise-45-french-chevron-smoked-oak-spc',
    name: 'Château d\'Amboise 45° French Chevron',
    subtitle: 'Loire Valley Parisian Parquet with 45-degree Hungarian Point',
    origin: 'French Atelier Heritage',
    patternType: 'Chevron 45°',
    dimensions: '600mm x 120mm x 6.5mm (45° Angle Cut)',
    coreType: 'Rigid Limestone SPC with 1mm IXPE Pad',
    finish: 'Synchronized EIR Deep Woodgrain with Painted Bevel',
    waterproofStatus: '100% Waterproof Rigid Core',
    climateSuitability: 'Immune to Karachi coastal air humidity and zero tile swelling',
    textureZoomImage: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    description: 'Unlike standard straight planks or 90° herringbone, authentic French Chevron is cut at exact 45° angled ends to form a seamless, razor-sharp architectural centerline. Recreated here in heavy-duty 100% waterproof composite with zero glue required.',
    highlightTag: 'Architectural Signature'
  },
  {
    id: 'palais-versailles',
    productSlug: 'palais-de-versailles-parquet-cassette-800x800mm-architectural-panel',
    name: 'Palais de Versailles Parquet Cassette',
    subtitle: 'Historical 17th-Century Royal Palace Basketweave Square Panels',
    origin: 'Château de Versailles Tradition',
    patternType: 'Versailles Parquet',
    dimensions: '800mm x 800mm x 18mm Cassette',
    coreType: 'Multi-Ply Baltic Birch with 4mm French Oak Surface',
    finish: 'Hand-scraped & Wire-brushed with Natural Hardwax Oil',
    waterproofStatus: 'Moisture Sealed Hardwood',
    climateSuitability: 'Cross-laminated multi-ply substrate prevents sea-breeze cupping',
    textureZoomImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Originally designed in 1684 for King Louis XIV to replace palace marble floors, each 800x800mm panel features an intricate diamond-in-square basketweave. Pre-assembled into square cassettes for museum-grade symmetry in grand Karachi reception rooms.',
    highlightTag: 'Historical Luxury'
  },
  {
    id: 'venetian-terrazzo',
    productSlug: 'venetian-terrazzo-carrara-marble-chip-600x600mm-waterproof-spc-tile',
    name: 'Venetian Terrazzo & Carrara Marble SPC',
    subtitle: 'Micro-Marble Aggregate Tile with Zero Grout Line Maintenance',
    origin: 'Italian Modernist Atelier',
    patternType: 'Terrazzo & Stone',
    dimensions: '600mm x 600mm x 6.0mm Tile',
    coreType: 'Virgin Limestone SPC with Pre-Attached IXPE Underlay',
    finish: 'Honed Silk Matte Stone Texture with 4V Micro-Bevel',
    waterproofStatus: '100% Waterproof Impermeable',
    climateSuitability: 'Stain-proof against turmeric, tea, lemon, and hard groundwater',
    textureZoomImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
    description: 'Revives Mid-Century Italian villa aesthetics with seeded Carrara white marble and basalt aggregate. Warm, silent, and soft under bare feet—without the porous stains, grout grime, or high cracking risk of poured terrazzo in Karachi.',
    highlightTag: 'Zero-Grout Terrazzo'
  },
  {
    id: 'shou-sugi-ban',
    productSlug: 'shou-sugi-ban-japanese-flame-charred-yakisugi-timber-plank',
    name: 'Shou Sugi Ban Japanese Flame-Charred',
    subtitle: 'Ancient Yakisugi Carbonized Architectural Cedar Texture',
    origin: 'Japanese Minimalist Craft',
    patternType: 'Japanese Charred',
    dimensions: '1220mm x 180mm x 6.5mm',
    coreType: 'Ultra-Dense Rigid SPC with Carbon Diamond Shield',
    finish: 'Deep Carbonized Relief with Sculptural Shadow Contrast',
    waterproofStatus: '100% Waterproof & Fire Retardant',
    climateSuitability: 'UV-stable pigments resist intense Karachi sun glare without fading',
    textureZoomImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
    description: 'Inspired by the 18th-century Japanese technique of charring cedarwood to preserve timber against saltwater, weather, and decay. Presents a breathtaking deep velvet-black texture with dramatic light reflections for Japandi & contemporary interior projects.',
    highlightTag: 'Artisanal Charred'
  },
  {
    id: 'calacatta-oro',
    productSlug: 'calacatta-oro-extra-large-waterproof-spc-slabs-600x1200mm',
    name: 'Calacatta Oro Grand Slabs (600x1200mm)',
    subtitle: 'Monumental 4ft x 2ft Bookmatched Italian Marble Surface',
    origin: 'Carrara Region Marble Scan',
    patternType: 'Grand Marble Slab',
    dimensions: '1200mm x 600mm x 6.5mm (Extra-Large Slab)',
    coreType: 'Heavyweight Limestone Rigid Core with 1mm Sound Pad',
    finish: 'Satin Silk Polish with Micro-Precision Click Edge',
    waterproofStatus: '100% Waterproof Impervious Slabs',
    climateSuitability: 'Lay directly over old bathroom or salon tiles with zero demolition',
    textureZoomImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    description: 'Brings the monumental proportions of 4-foot Italian marble slabs into your home without heavy wet-mortar installation or fragile hollow tiles. Fluid golden-grey veins drift across a warm alabaster white background.',
    highlightTag: 'Grand 4x2ft Format'
  },
  {
    id: 'copenhagen-fir',
    productSlug: 'copenhagen-240mm-ultra-wide-scandinavian-fir-engineered-plank',
    name: 'Copenhagen 240mm Ultra-Wide Scandinavian Fir',
    subtitle: 'Bespoke 9.5-Inch Wide Nordic Timber in White Lye Wash',
    origin: 'Nordic Forestry Design',
    patternType: 'Ultra-Wide Plank',
    dimensions: '2200mm x 240mm x 16mm (7.2ft long x 9.5in wide)',
    coreType: 'Multi-Ply Baltic Birch with 4mm Select Nordic Conifer',
    finish: 'Brushed Natural Oil with Traditional White Lye Hue',
    waterproofStatus: 'Moisture Sealed Engineered Timber',
    climateSuitability: 'Dimensional stability certified for continuous Karachi air conditioning',
    textureZoomImage: 'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=1200&auto=format&fit=crop',
    roomViewImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop',
    description: 'Extra-wide 240mm (9.5-inch) planks with continuous 7.2-foot lengths eliminate visual clutter and butt-joints. Treated in Danish white lye for an airy, peaceful blonde aesthetic that visually expands living spaces.',
    highlightTag: '240mm Ultra-Wide'
  }
];

export const UniqueFloorStylesExplorer: React.FC<UniqueFloorStylesExplorerProps> = ({
  products,
  onNavigate
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>(UNIQUE_STYLES[0].id);
  const [viewMode, setViewMode] = useState<'texture' | 'room'>('texture');
  const [sampleSuccessMessage, setSampleSuccessMessage] = useState<string | null>(null);

  const { addSample, sampleItems } = useCart();

  const activeStyle = UNIQUE_STYLES.find(s => s.id === selectedStyleId) || UNIQUE_STYLES[0];
  const matchedProduct = products.find(p => p.slug === activeStyle.productSlug) || null;

  const isSampleInCart = matchedProduct
    ? sampleItems.some(s => s.productId === matchedProduct.id)
    : false;

  const handleOrderSample = () => {
    if (!matchedProduct) return;
    const added = addSample(matchedProduct);
    if (added) {
      setSampleSuccessMessage(`Added "${activeStyle.name}" swatch to your complimentary sample box!`);
      setTimeout(() => setSampleSuccessMessage(null), 3500);
    }
  };

  return (
    <section className="bg-[#1b1510] text-[#f4eee1] py-16 sm:py-24 relative overflow-hidden border-y border-[#3d2e20]">
      {/* Decorative architectural layout grid lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#c98d4d_1px,transparent_1px),linear-gradient(to_bottom,#c98d4d_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#3d2f22]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a1f16] border border-[#523d2b] text-[11px] uppercase tracking-[0.2em] text-[#c98d4d] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#c98d4d]" />
              <span>Bespoke Surface Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Unique & Original Flooring Styles
            </h2>
            <p className="text-xs sm:text-sm text-[#ab9b88] max-w-2xl leading-relaxed">
              Explore authentic French 45° Chevron, hand-assembled Palais de Versailles parquet, seamless Venetian terrazzo, and Japanese flame-charred Yakisugi timber. Engineered specifically for Karachi villas, coastal humidity, and luxury architecture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('visualizer', activeStyle.productSlug)}
              className="px-4 py-2.5 rounded-sm bg-[#32251a] hover:bg-[#433224] text-[#f4eee1] text-xs font-semibold border border-[#523d2b] transition-all flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-[#c98d4d]" />
              <span>Open in Room Visualizer</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2.5 rounded-sm bg-[#f4eee1] hover:bg-white text-[#241c15] text-xs font-bold font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>All Collections</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7b5731]" />
            </button>
          </div>
        </div>

        {/* Style Selector Chips / Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {UNIQUE_STYLES.map((style) => {
            const isSelected = style.id === selectedStyleId;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#c98d4d] text-[#1b1510] font-bold border-[#c98d4d] shadow-md scale-102'
                    : 'bg-[#261c14] text-[#cfbeaa] border-[#443324] hover:bg-[#34271c] hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#1b1510]' : 'bg-[#7b5731]'}`} />
                <span>{style.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                  isSelected ? 'bg-[#1b1510]/15 text-[#1b1510]' : 'bg-[#1b1510]/60 text-[#a49684]'
                }`}>
                  {style.patternType}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Stage (High-res Texture & Room Simulation) */}
          <div className="lg:col-span-7 bg-[#241a12] rounded-xl border border-[#443425] p-4 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl">
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#3a2c1f]">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#c98d4d]">
                  {activeStyle.origin}
                </span>
                <span className="text-stone-600">•</span>
                <span className="text-xs text-stone-400 font-medium">
                  {activeStyle.dimensions}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#1a130e] p-1 rounded-md border border-[#3d2e20]">
                <button
                  onClick={() => setViewMode('texture')}
                  className={`px-3 py-1 text-xs rounded-sm transition-all font-medium flex items-center gap-1.5 ${
                    viewMode === 'texture'
                      ? 'bg-[#c98d4d] text-[#1b1510] font-bold'
                      : 'text-[#a49684] hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Macro Texture</span>
                </button>
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-3 py-1 text-xs rounded-sm transition-all font-medium flex items-center gap-1.5 ${
                    viewMode === 'room'
                      ? 'bg-[#c98d4d] text-[#1b1510] font-bold'
                      : 'text-[#a49684] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Room Installed</span>
                </button>
              </div>
            </div>

            {/* Stage Canvas Display */}
            <div className="relative aspect-16/10 rounded-lg overflow-hidden border border-[#4a3928] bg-stone-900 group">
              <img
                src={viewMode === 'texture' ? activeStyle.textureZoomImage : activeStyle.roomViewImage}
                alt={activeStyle.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />

              {/* Floating Pattern Badge */}
              <div className="absolute top-3 left-3 bg-[#1b1510]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#523d2b] flex items-center gap-2 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold">{activeStyle.patternType}</span>
                <span className="text-[#a49684]">•</span>
                <span className="text-[#c98d4d] font-serif">{activeStyle.highlightTag}</span>
              </div>

              {/* Quick Hover Zoom Tip */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] text-stone-300 flex items-center gap-1.5">
                <Maximize2 className="w-3 h-3 text-[#c98d4d]" />
                <span>{viewMode === 'texture' ? 'High-Definition Tactile Grain' : 'Architectural Perspective'}</span>
              </div>
            </div>

            {/* Quick Actions Row below stage */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#cfbeaa]">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>{activeStyle.waterproofStatus}</span>
              </div>

              <div className="flex items-center gap-2 text-[#cfbeaa]">
                <Shield className="w-4 h-4 text-[#c98d4d]" />
                <span>25-Year Guarantee</span>
              </div>

              <div className="flex items-center gap-2 text-[#cfbeaa]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Karachi DHA Stock Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Specification & Direct Actions */}
          <div className="lg:col-span-5 bg-[#261d15] rounded-xl border border-[#443425] p-6 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c98d4d] font-bold block">
                  Surface Profile
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1 leading-snug">
                  {activeStyle.name}
                </h3>
                <p className="text-xs text-[#a49684] mt-1 font-medium">
                  {activeStyle.subtitle}
                </p>
              </div>

              {/* Pricing Callout */}
              {matchedProduct && (
                <div className="p-4 bg-[#1e150f] rounded-lg border border-[#3f2e1f] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#a49684] block font-semibold">
                      Dual Rate Quotation
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-serif text-2xl font-bold text-white">
                        {formatPKR(matchedProduct.pricePerSqFt)}
                      </span>
                      <span className="text-xs text-stone-400">/ sq ft</span>
                    </div>
                  </div>

                  <div className="text-right border-l border-[#3a2c1f] pl-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#a49684] block font-semibold">
                      Factory Carton
                    </span>
                    <span className="text-sm font-semibold text-[#c98d4d] block">
                      {formatPKR(matchedProduct.pricePerBox)} / box
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      ({matchedProduct.coveragePerBox} sq ft coverage)
                    </span>
                  </div>
                </div>
              )}

              {/* Narrative Description */}
              <p className="text-xs text-[#d8cdb8] leading-relaxed">
                {activeStyle.description}
              </p>

              {/* Karachi Spec Attributes Grid */}
              <div className="space-y-2 pt-2 border-t border-[#3a2c1f] text-xs">
                <div className="flex items-start justify-between py-1 border-b border-[#332519]">
                  <span className="text-[#a49684] flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#c98d4d]" />
                    <span>Plank Dimensions</span>
                  </span>
                  <span className="font-medium text-white text-right">{activeStyle.dimensions}</span>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-[#332519]">
                  <span className="text-[#a49684] flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#c98d4d]" />
                    <span>Structural Core</span>
                  </span>
                  <span className="font-medium text-white text-right max-w-[200px] truncate" title={activeStyle.coreType}>
                    {activeStyle.coreType}
                  </span>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-[#332519]">
                  <span className="text-[#a49684] flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#c98d4d]" />
                    <span>Tactile Finish</span>
                  </span>
                  <span className="font-medium text-white text-right max-w-[200px] truncate" title={activeStyle.finish}>
                    {activeStyle.finish}
                  </span>
                </div>

                <div className="flex items-start justify-between py-1">
                  <span className="text-[#a49684] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#c98d4d]" />
                    <span>Karachi Resilience</span>
                  </span>
                  <span className="font-medium text-emerald-400 text-right">
                    Zero Swelling / 100% Waterproof
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons & Triggers */}
            <div className="space-y-2.5 pt-4 border-t border-[#3a2c1f]">
              {sampleSuccessMessage && (
                <div className="p-2.5 rounded-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{sampleSuccessMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleOrderSample}
                  disabled={isSampleInCart}
                  className={`py-3 px-4 rounded-sm text-xs font-bold font-serif uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isSampleInCart
                      ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 cursor-default'
                      : 'bg-[#f4eee1] hover:bg-white text-[#241c15] shadow-md hover:translate-y-[-1px]'
                  }`}
                >
                  {isSampleInCart ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Swatch in Box</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-[#7b5731]" />
                      <span>Order Free Swatch</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate('visualizer', activeStyle.productSlug)}
                  className="py-3 px-4 rounded-sm bg-[#382b1f] hover:bg-[#4a3a2a] text-white border border-[#594431] text-xs font-bold font-serif uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#c98d4d]" />
                  <span>Test in Room 3D</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                {matchedProduct && (
                  <button
                    onClick={() => onNavigate('product-detail', matchedProduct.slug)}
                    className="text-xs text-[#d8cdb8] hover:text-white underline underline-offset-4 transition-colors"
                  >
                    View Complete Spec & Box Quantities →
                  </button>
                )}

                <a
                  href={getWhatsAppLink(`Hello First Floor Floorings, I would like to inquire about "${activeStyle.name}" (Ref: ${activeStyle.productSlug}). Could you confirm availability for my Karachi project?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>WhatsApp DHA Showroom</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
